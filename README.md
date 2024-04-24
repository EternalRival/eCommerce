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

- TypeScript
- React
- NextJS
- Feature Sliced Design
- Tanstack/Query
- Jest (jsdom, @testing-library/jest-dom, @testing-library/react)
- ESLint (airbnb, typescript, next, react, @stylistic/ts, jest)
- Stylelint (standard, clean-order)
- Husky (commitlint, lint-staged)
- Tailwindcss (postcss)
- Ant Design
- Prettier

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

```bash
# Development Server
npm run dev
npm run dev:4000

# Build project
npm run build

# Project preview
npm run start

# Scripts for lint-staged package (linting/formatting)
npm run ci:lint
npm run ci:format
npm run ci:stylelint

# Scripts for manual linting-formatting
npm run lint
npm run format
npm run stylelint

# Combined `fix all` script
npm run fix

# Script for linting commit names via husky
npm run commitlint

# Script for `staged files only` linter/formatter checks
npm run lint-staged

# Launch tests
npm run test

# Script for Husky package init
npm run prepare
```
