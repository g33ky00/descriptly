# Descriptly

GitHub Action that suggests image alt text for PRs using Pollinations vision.

## Usage

```yaml
- uses: g33ky00/descriptly@v1
  with:
    pollinations-token: ${{ secrets.POLLINATIONS_TOKEN }}
    mode: "comment"
```

Inputs:
- `pollinations-token`: Pollinations API token.
- `mode`: `comment` only for now.
- `file-extensions`: default `png,jpg,jpeg,gif,svg,webp`.
- `github-token`: defaults to `${{ github.token }}`.
