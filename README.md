# Surglogs interview project

## Getting started
API and APP is in single monorepo, I've used yarn workspaces for pre-commit hook and single command boot but they can be run separately.

### Prerequisites
1. node 16.*
2. yarn (`npm install -g yarn`)

### Run the app and api (powered by yarn workspaces)
1. `yarn`
2. `yarn dev`
3. app is running on `localhost:5173` (api on `localhost:8001`)

## Used tech

- Official `vite` scaffold
- `airbnb eslint` config and `prettier` for formatting
- Testing with `vitest` and `cypress`
- Styling with `styled-components`
- Virtual scroll with `react-window`
- Drag and drop with `react-beautiful-dnd`
- For API only simple `express` with typescript
