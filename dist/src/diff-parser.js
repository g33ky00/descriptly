export async function parseDiffForImages(octokit, owner, repo, prNumber, extensions) {
    const { data } = await octokit.rest.pulls.listFiles({
        owner,
        repo,
        pull_number: prNumber,
        per_page: 100,
    });
    const candidates = [];
    for (const file of data) {
        if (!file.filename || !file.raw_url)
            continue;
        if (!isTargetFile(file.filename, extensions))
            continue;
        const added = file.additions ?? 0;
        const removed = file.deletions ?? 0;
        if (added <= removed)
            continue;
        candidates.push({ file: file.filename, url: file.raw_url });
    }
    return candidates;
}
function isTargetFile(filename, extensions) {
    const lower = filename.toLowerCase();
    return extensions.some((ext) => lower.endsWith(`.${ext.trim()}`));
}
//# sourceMappingURL=diff-parser.js.map