import { getOctokit } from "@actions/github";
export function getOctokitFromInput(token) {
    return getOctokit(token);
}
export async function postComment(octokit, owner, repo, issueNumber, body) {
    await octokit.rest.issues.createComment({ owner, repo, issue_number: issueNumber, body });
}
export async function updateExistingComment(octokit, owner, repo, commentId, body) {
    await octokit.rest.issues.updateComment({ owner, repo, comment_id: commentId, body });
}
//# sourceMappingURL=github-client.js.map