# Descriptly

> Suggest alt text for images in your pull requests using Pollinations vision.

## Sommaire

- [À propos](#à-propos)
- [Structure du dépôt](#structure-du-dépôt)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Contribution](#contribution)
- [Licence](#licence)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-AGPL--3.0-blue)](./LICENSE)

## À propos

**Quoi** — Descriptly est une GitHub Action qui inspecte les diffs d'une pull request, détecte les images ajoutées/modifiées et les attributs `alt` manquants, envoie les URLs d'images à l'API vision de Pollinations et propose un alt text concis sous forme de commentaire de PR.

**Pour qui** — Mainteneurs et contributeurs de dépôts GitHub qui publient des images dans leurs PR et veulent améliorer l'accessibilité, le SEO et l'outillage downstream.

**Pourquoi** — La plupart des PR livrent des images sans alt text significatif. Descriptly automatise la suggestion d'alt text, de manière idempotente (un seul commentaire édité à chaque exécution).

**Qui** — Auteur et mainteneur : [@g33ky00](https://github.com/g33ky00).

**Contacts** — Issues et discussions via [GitHub Issues](https://github.com/g33ky00/descriptly/issues).

## Structure du dépôt

```text
descriptly/
├── action.yml
├── package.json
├── tsconfig.json
├── dist/
├── src/
│   ├── index.ts
│   ├── config.ts
│   ├── diff-parser.ts
│   ├── github-client.ts
│   └── pollinations.ts
├── tests/
│   ├── diff-parser.test.ts
│   └── pollinations.test.ts
├── docs/
│   └── index.html
├── .github/
│   └── workflows/
├── worker/
│   ├── package.json
│   ├── wrangler.jsonc
│   ├── tsconfig.json
│   ├── migrations/
│   └── src/
├── SECURITY.md
└── LICENSE
```

## Stack technique

| Composant | Version | Source |
|-----------|---------|--------|
| TypeScript | 5.6.3 | `package.json` (`devDependencies.typescript`) |
| Node.js (runtime action) | 20 | `action.yml` (`runs.using: node20`) |
| `@actions/core` | ^1.10.1 | `package.json` |
| `@actions/github` | ^6.0.0 | `package.json` |
| `@octokit/rest` | ^21.1.1 | `package.json` |
| `@vercel/ncc` | ^0.38.2 | `package.json` |
| Wrangler (worker) | ^4.126.0 | `worker/package.json` |
| `@cloudflare/workers-types` | ^5.20260826.1 | `worker/package.json` |

## Installation

```bash
git clone https://github.com/g33ky00/descriptly.git
cd descriptly
npm install
npm run build
npm test
```

Prérequis : Node.js 20+, npm.

## Contribution

### Conventions de commit

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité |
| `fix:` | Correction |
| `docs:` | Documentation |
| `chore:` | Maintenance |
| `ci:` | Intégration continue |

Processus : fork, branche `feat/...` ou `fix/...`, PR vers `main`, CI verte.

## Licence

Ce projet est sous licence **AGPL-3.0**.
Voir [`LICENSE`](./LICENSE).
