# eCommerce app

## Table of Contents

- [eCommerce app](#ecommerce-app)
  - [Table of Contents](#table-of-contents)
  - [Stack](#stack)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Git & NodeJS](#git--nodejs)
      - [Notes](#notes)
      - [Downloading](#downloading)
      - [Installing NPM modules](#installing-npm-modules)
      - [Setting environment variables](#setting-environment-variables)
      - [Run](#run)
  - [Scripts](#scripts)

## Stack

- ![NodeJS](https://img.shields.io/badge/node.js-417e38?style=for-the-badge&logoColor=fff&logo=node.js)
- ![NPM](https://img.shields.io/badge/npm-cb0000?style=for-the-badge&logoColor=fff&logo=npm)
- ![TypeScript](https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logoColor=fff&logo=typescript)
- ![React](https://img.shields.io/badge/react-087ea4?style=for-the-badge&logoColor=fff&logo=react)
- ![Next JS](https://img.shields.io/badge/next-171717?style=for-the-badge&logoColor=fff&logo=next.js)
- ![Feature Sliced Design](https://img.shields.io/badge/feature--sliced--design-262224?style=for-the-badge&logoColor=fff&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAACXBIWXMAAALFAAACxQGJ1n/vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA/SURBVHgB7dKxCgAgCIThs/d/51JoNQIdDrxvqMXlR4FmFs92KDIX/wI7JSdDN+eHtkxIycnQvMNW8hN/crsDc5QgGX9NvT0AAAAASUVORK5CYII=)
- ![Tanstack Query](https://img.shields.io/badge/tanstack_query-ef4444?style=for-the-badge&logoColor=fff&logo=reactquery)
- ![Zod](https://img.shields.io/badge/zod-3068b7?style=for-the-badge&logoColor=fff&logo=zod)
- ![Vitest](https://img.shields.io/badge/vitest-506e10?style=for-the-badge&logoColor=fff&logo=vitest) ![jsdom](https://img.shields.io/badge/jsdom-ccc?style=for-the-badge&logoColor=fff&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xNDkgNDUxIDEwMCAxMDAiPgogIDxwYXRoIGZpbGw9IiNkYmMwMWQiIGQ9Ik0tNjMuNyA1MjdsLTMwLjUgMTcuNmE5LjQgOS40IDAgMCAxLTkuNyAwbC0zMC41LTE3LjZjLTMtMS44LTQuOC01LTQuOC04LjR2LTM1LjJjMC0zLjUgMS44LTYuNiA0LjgtOC40bDMwLjUtMTcuNmMzLTEuOCA2LjYtMS44IDkuNyAwbDMwLjUgMTcuNmMzIDEuOCA0LjggNSA0LjggOC40djM1LjJhOS4zIDkuMyAwIDAgMS00LjggOC40eiIvPgogIDxwYXRoIGZpbGw9IiMzODMzMDciIGQ9Ik0tMTA1LjYgNDczLjJzLjEgNS43LTIuMiAxMi4zYy0xLjYgNC43LTMuOCA3LjEtOSAxMi41LTIuNSAyLjUtOS41IDguNy0xNC44IDE1LjRhNTcuNCA1Ny40IDAgMCAwLTYuNCA5LjdzLjkgMi4zIDMuNyA0bDcuNCA0LjMgMy40LTUuNmMxLjUtMi4zIDQtNS40IDQtNS40bDggMTIuMiAxMS41LTcuNy05LjctMTQuNXM0LjYtNC40IDUuOC01LjhsMy4yLTMuN3M0LjkgMi45IDYuOCA0LjJjMi44IDEuOCA2LjQgNC43IDYuNCA0LjdsLTEwLjEgMTUuMSAxMS41IDcuNyA4LjQtMTIuNSA0LjcgNi44YzEuMSAxLjcgMi4zIDQuMiAyLjMgNC4ybDctNGMyLjktMS43IDQtNC41IDQtNC41cy0zLjEtNS42LTUuOS05LjNjLTIuOS0zLjktNy04LjMtOC45LTEwLjMtMy40LTMuMy05LjMtNy45LTEyLjMtOS45LTIuNy0xLjgtNy41LTQuNC03LjUtNC40czEuMS0zLjEgMS44LTcuN2MuNC0yLjguNi03LjUuNi03LjVsLTEzLjctLjN6Ii8+Cjwvc3ZnPgo=) ![Testing Library](https://img.shields.io/badge/testing_library/jest--dom-3578e5?style=for-the-badge&logoColor=fff&logo=testing-library) ![Testing Library](https://img.shields.io/badge/testing_library/react-3578e5?style=for-the-badge&logoColor=fff&logo=testing-library)
- ![ESLint](https://img.shields.io/badge/eslint-4b32c3?style=for-the-badge&logoColor=fff&logo=eslint) (airbnb, typescript, next, react, @stylistic/ts, tanstack/query, jest)
- ![Stylelint](https://img.shields.io/badge/stylelint-3578e5?style=for-the-badge&logoColor=fff&logo=stylelint) (standard, clean-order)
- ![Prettier](https://img.shields.io/badge/prettier-1a2b34?style=for-the-badge&logoColor=fff&logo=prettier)
- ![Husky](https://img.shields.io/badge/husky-ccc?style=for-the-badge&label=🐶&labelColor=ccc) ![Commitlint](https://img.shields.io/badge/commitlint-5672cd?style=for-the-badge&logoColor=fff&logo=commitlint) ![lint-staged](https://img.shields.io/badge/lint--staged-ccc?style=for-the-badge&label=🚫💩&labelColor=ccc)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-0f172a?style=for-the-badge&logoColor=fff&logo=tailwindcss)
- ![Material UI](https://img.shields.io/badge/material_ui-006bd6?style=for-the-badge&logoColor=fff&logo=mui)
- ![Commercetools](https://img.shields.io/badge/commercetools-4f4fd8?style=for-the-badge&logoColor=fff&logo=commercetools)

## Getting started

### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
  - (optional) Download & Install some `node version manager` (e.g. `nvm`, `n`, etc.)

### Git & NodeJS

#### Notes

> v20.11.0 version of Node.js is used

#### Downloading

```bash
git clone <project_url>
cd <project_dir>
```

#### Installing NPM modules

```bash
npm ci
```

#### Setting environment variables

```bash
# copy .env file to .env.local
cp .env .env.local
# get necessary data from `commercetools.com/<project>/settings/developer/api-clients` (or your project manager)
```

```yml
# .env notes
TBD=TBD
```

#### Run

```bash
# for dev
npm run dev

# for prod
npm run build
npm run start
```

## Scripts

| cmd                    | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Development Server at 3000 port                          |
| `npm run dev:4000`     | Development Server at 4000 port                          |
|                        |                                                          |
| `npm run build`        | Build project                                            |
| `npm run start`        | Project preview                                          |
|                        |                                                          |
| `npm run test`         | Launch tests                                             |
|                        |                                                          |
| `npm run ci:lint`      | Linting TS _\*(for lint-staged package only)_            |
| `npm run ci:format`    | Formatting codebase _\*(for lint-staged package only)_   |
| `npm run ci:stylelint` | Linting css _\*(for lint-staged package only)_           |
|                        |                                                          |
| `npm run lint`         | Linting TS _\*(for manual use)_                          |
| `npm run format`       | Formatting codebase _\*(for manual use)_                 |
| `npm run stylelint`    | Linting css _\*(for manual use)_                         |
| `npm run fix`          | Combined **fix all** script                              |
|                        |                                                          |
| `npm run lint-staged`  | Script for **staged files only** linter/formatter checks |
| `npm run commitlint`   | Linting commit messages _\*(for husky only)_             |
| `npm run prepare`      | Script for Husky package init                            |
