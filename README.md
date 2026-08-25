# Descriptly

Suggest alt text for images in your pull requests using Pollinations vision.

## Why

Most PRs ship images without meaningful alt text. That hurts accessibility, SEO, and downstream tooling. Descriptly inspects PR diffs, sends image URLs to Pollinations, and proposes concise alt text as a PR comment.

## How it works

1. On PR events, it lists changed files via GitHub.
2. It filters added/modified images by extension.
3. It also scans markdown/JSX/HTML diffs for empty/missing `alt` attributes.
4. Each candidate image URL is sent to Pollinations vision.
5. Results are posted back as a single idempotent PR comment.

## Usage

```yaml
permissions:
  pull-requests: write
  contents: write

jobs:
  descriptly:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: g33ky00/descriptly@v1
        with:
          pollinations-token: ${{ secrets.POLLINATIONS_TOKEN }}
          mode: "comment"
```

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `pollinations-token` | Yes | — | Pollinations API token. |
| `mode` | No | `comment` | Output mode. `comment` posts suggestions on the PR. `commit` is not yet available — see [Roadmap](#roadmap) |
| `file-extensions` | No | `png,jpg,jpeg,gif,svg,webp` | Comma-separated image extensions to scan. |
| `github-token` | No | `${{ github.token }}` | GitHub token. |

## Example output

When `mode: comment`, Descriptly posts a single Markdown comment on the PR:

## 🖼 Descriptly — Alt-text suggestions

| File | Suggested alt |
|---|---|
| `assets/hero.png` | "Product dashboard showing monthly revenue and user growth trends." |

If it runs again, it edits the existing Descriptly comment instead of creating a duplicate.

## Setup

1. Add a `POLLINATIONS_TOKEN` secret to your repository or organization.
2. Add the workflow above to `.github/workflows/descriptly.yml`.
3. Open or update a PR with images; Descriptly will comment with suggestions.

## Roadmap

- `commit` mode with auto-alt insertion in markdown/JSX/HTML
- JSX-aware alt audit with AST filtering
- Quota handling with wallet connect flow
- Marketplace listing + release automation
