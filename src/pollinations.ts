const PROMPT = `Describe this image in one concise sentence suitable as an HTML alt attribute, no more than 125 characters, no "image of" prefix.`;

export async function generateAltText(imageUrl: string, token: string): Promise<string> {
  const url = new URL("https://gen.pollinations.ai/v1/chat/completions");
  url.searchParams.set("model", "openai-fast");
  url.searchParams.set("image_url", imageUrl);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: PROMPT },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    if (res.status === 429 || res.status === 402) {
      throw new Error(`Quota/rate limit: ${res.status}`);
    }
    throw new Error(`Pollinations error ${res.status}`);
  }

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = json?.choices?.[0]?.message?.content ?? "";
  const trimmed = text.trim().slice(0, 125);
  if (!trimmed) throw new Error("Empty alt text from provider");
  return trimmed;
}
