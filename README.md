# Paper Crane Client (React)

![release](https://github.com/Debora-k/Paper_Crane_front-end/actions/workflows/release.yml/badge.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23fe5196)](https://conventionalcommits.org/)

## Prerequisites

- [node/npm](http://nodejs.org/)
- [pnpm](https://pnpm.io/)

Install pnpm:

```bash
# via npm
npm i -g pnpm

# via binaries
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Verify installations:

```bash
npm -v && node -v && pnpm -v
# 8.19.2
# v18.12.0
# 7.25.1
```

## Development

Install dependencies (if package.json changes, then run this command. e.g) like I just downloaded antd package):

```bash
pnpm i
```

Start development server:

```bash
pnpm start
```

Visit [http://localhost:3000/](http://localhost:3000/)

## Scripts

```bash
# lint w/ eslint
pnpm lint

# format w/ prettier
pnpm format
```

## Notes

- This codebase uses the [Conventional Commits](https://conventionalcommits.org/) specification for commit messages
  - Read guidelines for how to format your commit messages
  - This allows us to generate changelogs and releases via the release workflow: `.github/workfows/release.yml`
  - Config : `commitlintrc.json`
- Release Workflow:
  - Requires `GH_TOKEN` secret
    - Generate token (repo owner only)
      - Profile (top right) -> Developer settings -> Personal access tokens
        - Either `Fine-grained tokens` or `Tokens (classic)` work
        - Required permission: `admin:repo` (if setting branch protection rules), `repo`, `workflow`, `write:packages`
    - Settings -> Secrets and variables -> Actions -> New repository secret
      - Name: GH_TOKEN
      - Secret: <your_token>
- Hosting
  - Free/easy options for staging: [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/)
- Development workflow
  - Recommended to set branch protection rules and only work on feature branches (instead of directly committing to main), then issuing pull requests for review to be merged into main branch
    - This allows us to see if deployment succeeds (the code builds, or tests pass, etc.) before merging into main
  - Syncing feature branch with main
    - Avoid using `rebase` as it does not preserve history and causes other problems as well
    - Use: `git merge origin main` while in feature branch, then resolve any conflicts one-by-one
      - (do not force merge as it can potentially delete someone else's work)
