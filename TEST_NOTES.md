## Observations - Project

- `yarn.lock` appears to be in the outdated v1 format
- 341 known security vulnerabilities in the supply chain at the time of writing
- `yarn start` crashes under current Node LTS (18)
- No formatting configs are present, will try to guess the existing style

## Observations - Task

- Covers:
  - Refactoring for best practice
  - Component rendering
  - Input validation
  - HTTP requests
  - Error handling
  - Testing
  - Styling
  - Routing
- Doesn't explicitly ask for:
  - Complex state management
  - Data mutations
  - Localisation
  - E2E testing
  - SSR

## Assumptions

- Updating CRA, package manager and existing deps is out-of-scope for this test
- Adding third party libraries is acceptable otherwise (necessary for at least redux)
