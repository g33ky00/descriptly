import { describe, expect, test } from "vitest";
import { generateAltText } from "../src/pollinations.js";
describe("generateAltText", () => {
    test("format string must stay <=125 chars and no 'image of' prefix", async () => {
        const original = globalThis.fetch;
        globalThis.fetch = async (_input, _init) => {
            return new Response(JSON.stringify({ choices: [{ message: { content: "A cat sitting on a laptop keyboard." } }] }), { status: 200, headers: { "Content-Type": "application/json" } });
        };
        const text = await generateAltText("https://example.com/img.png", "tok");
        expect(text.toLowerCase().startsWith("image of")).toBe(false);
        expect(text.length).toBeLessThanOrEqual(125);
        globalThis.fetch = original;
    });
    test("quota errors are surfaced as errors", async () => {
        const original = globalThis.fetch;
        globalThis.fetch = async () => new Response("", { status: 429 });
        await expect(generateAltText("https://example.com/img.png", "tok")).rejects.toThrow(/Quota|429/);
        globalThis.fetch = original;
    });
});
//# sourceMappingURL=pollinations.test.js.map