# Training SDET Playwright

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

## Badges

### GitLab

[![Release](https://gitlab.com/ianriizky/training-sdet-playwright/-/badges/release.svg)](https://gitlab.com/ianriizky/training-sdet-playwright/-/releases)
[![Pipeline Status](https://gitlab.com/ianriizky/training-sdet-playwright/badges/main/pipeline.svg)](https://gitlab.com/ianriizky/training-sdet-playwright/-/commits/main)
[![Coverage Status](https://gitlab.com/ianriizky/training-sdet-playwright/badges/main/coverage.svg)](https://gitlab.com/ianriizky/training-sdet-playwright/-/commits/main)

### GitHub

[![Release](https://badgen.net/github/release/ianriizky/training-sdet-playwright 'Release')](https://github.com/ianriizky/training-sdet-playwright/releases)
[![Pipeline Status](https://github.com/ianriizky/training-sdet-playwright/actions/workflows/playwright.yml/badge.svg 'Pipeline Status')](https://github.com/ianriizky/training-sdet-playwright/actions/workflows/playwright.yml)
[![Codecov Coverage](https://codecov.io/github/ianriizky/training-sdet-playwright/graph/badge.svg?token=89QP3GJD60)](https://codecov.io/github/ianriizky/training-sdet-playwright)

## Table of contents

- [Training SDET Playwright](#training-sdet-playwright)
  - [Badges](#badges)
    - [GitLab](#gitlab)
    - [GitHub](#github)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [Architecture](#architecture)
  - [Requirements](#requirements)
  - [Tech stack](#tech-stack)
  - [Project setup](#project-setup)
  - [Run tests](#run-tests)
  - [Author](#author)
  - [License](#license)

## Description

A training project to learn SDET using Playwright.

## Architecture

You can read the architecture [here](ARCHITECTURE.md).

## Requirements

- [![Node.js](https://img.shields.io/badge/Node.js%2024.11.0-43853D?logo=node.js&logoColor=white 'Node.js')](https://nodejs.org)

## Tech stack

- [![TypeScript](https://img.shields.io/badge/TypeScript%205.9.3-007ACC?logo=typescript&logoColor=white 'TypeScript')](https://www.typescriptlang.org)
- [![Playwright](https://img.shields.io/badge/Playwright%201.56.1-2EAD33?logo=playwright&logoColor=white 'Playwright')](https://playwright.dev)

## Project setup

```bash
$ cp .env.example .env # Copy .env.example to .env
$ npm install
$ npx playwright install
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Author

- [Septianata Rizky Pratama](https://ianrizky.web.id) - hi@ianrizky.web.id

## License

You can read the license [here](LICENSE.md).
