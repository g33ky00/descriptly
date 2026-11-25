# Descriptly
[![CI](https://img.shields.io/github/actions/workflow/status/g33ky00/descriptly/ci-unified.yml)](https://github.com/g33ky00/descriptly/actions/workflows/ci-unified.yml)

Suggest alt text for images in your pull requests using Pollinations vision.

![License](https://img.shields.io/badge/License-MIT-blue.svg)(./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs)](#tech-stack)
[![CI Checks](https://github.com/g33ky00/descriptly/actions/workflows/ci-unified.yml/badge.svg)](https://github.com/g33ky00/descriptly/actions/workflows/ci-unified.yml)

---

## À propos

Descriptly inspecte les pull requests, détecte les images
ajoutées ou modifiées, et utilise l'IA de vision de Pollinations
pour générer automatiquement des suggestions d'attributs `alt`
— améliorant l'accessibilité et le SEO.

## Structure

```text
descriptly/
├── action.yml            # Définition GitHub Action
├── src/
│   ├── index.ts          # Logique principale
│   ├── config.ts         # Configuration
│   ├── diff-parser.ts    # Détection images dans PR diff
│   ├── github-client.ts  # Client GitHub
│   └── pollinations.ts   # Appel API vision
├── tests/                # Tests unitaires et d'intégration
├── dist/                 # Build compilé
└── README.md
```

## Tech Stack

- **Node.js 20** — Runtime principal
- **GitHub Actions** — Distribution et exécution
- **Pollinations Vision API** — Génération automatique d'alt text
- **Jest** — Tests unitaires
- **Undici** — Client HTTP (natif Node.js)

---

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
| --- | --- | --- | --- |
| `pollinations-token` | Yes | — | Pollinations API token. |
| `mode` | No | `comment` | Output mode. See [Roadmap](#roadmap). |
| `file-extensions` | No | `png,jpg,jpeg,gif,svg,webp` | Image extensions. |
| `github-token` | No | `${{ github.token }}` | GitHub token. |

## Example output

When `mode: comment`, Descriptly posts a single Markdown
comment on the PR:

## 🖼 Descriptly — Alt-text suggestions

| File | Suggested alt |
| ---- | ------------- |
| `assets/hero.png` | "Product dashboard." |

If it runs again, it edits the existing Descriptly comment
instead of creating a duplicate.

## Setup

1. Add a `POLLINATIONS_TOKEN` secret to your repository or organization.
2. Add the workflow above to `.github/workflows/descriptly.yml`.
3. Open or update a PR with images; Descriptly will comment with suggestions.

## Roadmap

- `commit` mode with auto-alt insertion in markdown/JSX/HTML
- JSX-aware alt audit with AST filtering
- Quota handling with wallet connect flow
- Marketplace listing + release automation

## Contribution

Les contributions sont bienvenues. Ouvrez une issue ou une
pull request sur le dépôt principal.

## Licence

MIT License — voir [LICENSE](LICENSE) pour les détails.

![CI](https://img.shields.io/badge/CI-passing-brightgreen)
**Version** : 1.0.0

## About

Projet maintenu par g33ky00.

## Stack

Voir le code source.

## Contributing

Les contributions sont les bienvenues via pull request.

## License

MIT
