import * as core from "@actions/core";
import { getOctokit } from "@actions/github";

export function getOctokitFromInput(token: string) {
  return getOctokit(token);
}

export async function postComment(octokit: ReturnType<typeof getOctokit>, owner: string, repo: string, issueNumber: number, body: string): Promise<void> {
  await octokit.rest.issues.createComment({ owner, repo, issue_number: issueNumber, body });
}

export async function updateExistingComment(octokit: ReturnType<typeof getOctokit>, owner: string, repo: string, commentId: number, body: string): Promise<void> {
  await octokit.rest.issues.updateComment({ owner, repo, comment_id: commentId, body });
}
