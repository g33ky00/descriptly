export interface ImageCandidate {
  file: string;
  url: string;
}

export async function parseDiffForImages(
  octokit: { rest: { pulls: { listFiles: (params: { owner: string; repo: string; pull_number: number; per_page?: number }) => Promise<{ data: Array<{ filename: string; additions: number; deletions: number; raw_url?: string; changes?: number }> }> } } },
  owner: string,
  repo: string,
  prNumber: number,
  extensions: string[],
): Promise<ImageCandidate[]> {
  const { data } = await octokit.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: prNumber,
    per_page: 100,
  });

  const candidates: ImageCandidate[] = [];
  for (const file of data) {
    if (!file.filename || !file.raw_url) continue;
    if (!isTargetFile(file.filename, extensions)) continue;

    const added = file.additions ?? 0;
    const removed = file.deletions ?? 0;
    if (added <= removed) continue;

    candidates.push({ file: file.filename, url: file.raw_url });
  }

  return candidates;
}

function isTargetFile(filename: string, extensions: string[]): boolean {
  const lower = filename.toLowerCase();
  return extensions.some((ext) => lower.endsWith(`.${ext.trim()}`));
}
