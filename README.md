# Surglogs interview project

## Getting started
API and APP is in single monorepo, I've used yarn workspaces for pre-commit hook and single start command but they can be run separately.

### Prerequisites
1. node 16.*
2. yarn (`npm install -g yarn`)

### Run the app and api (powered by yarn workspaces)
1. `yarn`
2. `yarn dev`
3. app is running on `localhost:5173` (api on `localhost:8001`)

### Running tests
1. `cd app && yarn run test:unit` for unit tests
2. `cd app && yarn run test:e2e` for cypress tests (please make sure the app is running)

Main use-cases are covered by cypress, unit tests are used only for small cases (e.g. loading state, failed state ...)

## Used tech

- Official `vite` scaffold
    - As we don't have multiple routes and not content heavy (otherwise I would use Next.js / Astro)
- `airbnb eslint` config and `prettier` for linting/formatting with small tweaks explained in the file
- Testing with `vitest` and `cypress`
- Styling with `styled-components`
- Virtual scroll with `react-window`
- Drag and drop with `react-beautiful-dnd`
- For API only simple `express` with typescript

