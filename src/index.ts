import { config } from "./config.js";
import { parseDiffForImages, ImageCandidate } from "./diff-parser.js";
import { generateAltText } from "./pollinations.js";
import { postComment, updateExistingComment } from "./github-client.js";
import { getOctokit } from "@actions/github";
import * as core from "@actions/core";

async function main(): Promise<void> {
  try {
    const ctx = config();
    const octokit = getOctokit(ctx.githubToken);

    const owner = process.env.GITHUB_REPOSITORY?.split("/")[0];
    const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
    const prNumber = Number(process.env.GITHUB_REF?.replace("refs/pull/", "").replace("/merge", ""));

    if (!owner || !repo || !prNumber) {
      throw new Error("GITHUB_REPOSITORY or GITHUB_REF missing");
    }

    core.info(`Fetching PR #${prNumber} files...`);
    const candidates = await parseDiffForImages(octokit, owner, repo, prNumber, ctx.fileExtensions.split(",").map((s) => s.trim()));
    core.info(`Found ${candidates.length} image candidate(s)`);

    const rows: { file: string; alt: string }[] = [];
    for (const c of candidates) {
      core.info(`Generate alt for ${c.file}`);
      try {
        const alt = await generateAltText(c.url, ctx.pollinationsToken);
        rows.push({ file: c.file, alt });
      } catch (err) {
        core.warning(`Failed alt for ${c.file}: ${err instanceof Error ? err.message : "unknown"}`);
      }
    }

    if (ctx.mode === "commit") {
      throw new Error("commit mode not implemented yet");
    }

    const existing = await findExistingComment(octokit, owner, repo, prNumber);
    const body = buildMarkdown(rows);

    if (existing) {
      await updateExistingComment(octokit, owner, repo, existing.id, body);
      core.info("Updated existing Descriptly comment.");
    } else {
      await postComment(octokit, owner, repo, prNumber, body);
      core.info("Posted new Descriptly comment.");
    }
  } catch (err) {
    core.setFailed(err instanceof Error ? err.message : String(err));
  }
}

function buildMarkdown(rows: { file: string; alt: string }[]): string {
  if (rows.length === 0) return "## 🖼 Descriptly — Alt-text suggestions\n\nNo image candidates found in this PR.";
  const table = rows.map((r) => `| \`${r.file}\` | "${r.alt}" |`).join("\n");
  return `## 🖼 Descriptly — Alt-text suggestions\n\n| File | Suggested alt |\n|---|---|\n${table}\n`;
}

async function findExistingComment(octokit: ReturnType<typeof getOctokit>, owner: string, repo: string, prNumber: number): Promise<{ id: number } | null> {
  const list = await octokit.rest.issues.listComments({ owner, repo, issue_number: prNumber, per_page: 100 });
  const comment = list.data.find((c) => c.body?.startsWith("## 🖼 Descriptly — Alt-text suggestions"));
  return comment ? { id: comment.id } : null;
}

main();
