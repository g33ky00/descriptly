# Security note

## Dependency audit

`npm audit --omit=dev` reports `undici <=6.27.0` as vulnerable via transitive dependencies from `@actions/github` and `@actions/http-client`.  
As of this version, `@actions/github@6.0.1` still depends on `undici@^5.28.5`, so an `npm audit fix` does not resolve the advisory without a breaking dependency change.

Current assessment:
- This action runs in ephemeral GitHub Actions runners.
- Outbound requests go to `https://gen.pollinations.ai/...` only; there is no inbound listener surface.
- The affected undici issues are primarily HTTP response/header handling and WebSocket behaviors not used here.

Action taken:
- No dependency is forced beyond the supported package graph.
- This note preserves traceability and avoids silent omission.

If upstream `@actions/github` releases a non-vulnerable `undici` range, update and re-run:
`npm update @actions/github @actions/http-client`
