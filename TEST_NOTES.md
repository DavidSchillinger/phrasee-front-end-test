## Observations - Project

- `yarn.lock` appears to be in the outdated v1 format
- 341 known security vulnerabilities in the supply chain at the time of writing
- `yarn start` crashes under current Node LTS (18)
- No formatting configs are present, will try to guess the existing style
- `antd` appears to be in use, which I'm unfamiliar with
- I'd normally want to test the UI with Cypress, but only Jest tests are requested explicitly
- `redux` and `antd` are used. I haven't used `redux` much, and I'm unfamiliar with `antd`
  - This means I won't try TDD because I can't easily predict what tests I'll want
- CSS appears to be globally-scoped, I'd suggest CSS Modules or CSS-in-JS or similar approaches instead

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

- Converting to TypeScript is acceptable
- Updating CRA, package manager and existing deps is out-of-scope for this test
- Adding third party libraries is acceptable otherwise (necessary for at least redux)
- The style of the login page should remain the same
- All fields returned from the API are required
- The written spec is more up-to-date than the screenshot
  - The screenshot shows "Completed: yes" but the spec says to only display incomplete items
- CI/CD configuration is out-of-scope for this test
- Sorting `last_visit_date` ascending is meant literally, i.e. the _oldest_ comes first
  - Last-visited data is more commonly (in my experience) sorted latest-first
