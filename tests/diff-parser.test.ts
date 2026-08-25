import { describe, expect, test } from "vitest";
import { parseDiffForImages, ImageCandidate } from "../src/diff-parser.js";

const makeOctokit = (files: Array<{ filename: string; additions: number; deletions: number; raw_url?: string }>) => ({
  rest: {
    pulls: {
      listFiles: async () => ({ data: files }),
    },
  },
});

describe("parseDiffForImages", () => {
  test("returns only added image files matching extensions", async () => {
    const octokit = makeOctokit([
      { filename: "assets/a.png", additions: 1, deletions: 0, raw_url: "https://raw.githubusercontent.com/o/r/abc/a.png" },
      { filename: "docs/readme.md", additions: 10, deletions: 0, raw_url: "https://example.com/x.md" },
      { filename: "assets/b.jpg", additions: 1, deletions: 1, raw_url: "https://example.com/b.jpg" },
    ]);
    const out = await parseDiffForImages(octokit as any, "o", "r", 1, ["png", "jpg"]);
    expect(out).toEqual<ImageCandidate[]>([
      { file: "assets/a.png", url: "https://raw.githubusercontent.com/o/r/abc/a.png" },
    ]);
  });
});
