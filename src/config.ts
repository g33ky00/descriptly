export interface Config {
  pollinationsToken: string;
  mode: "comment" | "commit";
  fileExtensions: string;
  githubToken: string;
}

export function config(): Config {
  const pollinationsToken = required("pollinations-token");
  const githubToken = required("github-token");
  const mode = (process.env.INPUT_MODE ?? "comment") as Config["mode"];
  const fileExtensions = process.env.INPUT_FILE_EXTENSIONS ?? "png,jpg,jpeg,gif,svg,webp";

  if (mode !== "comment" && mode !== "commit") {
    throw new Error(`Unsupported mode: ${mode}`);
  }
  return { pollinationsToken, mode, fileExtensions, githubToken };
}

function required(name: string): string {
  const value = process.env[`INPUT_${name.toUpperCase().replace(/-/g, "_")}`];
  if (!value) throw new Error(`Missing required input: ${name}`);
  return value;
}
