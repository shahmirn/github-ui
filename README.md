# Real Brokerage Inc - Front End Interview Project

## The Project

We're going to create an application that uses the public Github API to render Github users and display information
about their account.

The application will consist of two pages:

1. A Home Page, where I can see a list of users.
2. A User detail page, where I can view specific information for a user.

The home page will query the [users](https://api.github.com/users) endpoint and render each user. We should:

- show their avatar
- show their username

When I click on a user, I will be taken to a dedicated user detail page. On that page, I should see:

- their repos, which is the main content of the page.
- their organizations
- their first 5 followers, and include a count of total followers.

## Main Tech

- [React] - A JavaScript library for building user interfaces.
- [Redux Toolkit] - The official, opinionated, batteries-included toolset for efficient Redux development.
- [octokit/rest.js] - GitHub REST API client for JavaScript
- [MUI] - Material UI is a library of React UI components that implements Google's Material Design.
- [Lodash] - A modern JavaScript utility library delivering modularity, performance & extras.
- [Typescript] - An open-source language which builds on JavaScript.
- [Vite] - Next generation frontend tooling.
- [Vitest] - A blazing fast unit test framework powered by Vite.
- [Cypress] - Javascript component testing and e2e testing.
- [Express] - Fast, unopinionated, minimalist web framework.
- [http-proxy-middleware] - The one-liner node.js proxy middleware.

## Implementation Details

- I use the technologies listed above to implement my solution. The code-base is set up as a monorepo using npm workspaces, with a client and server package.

- The client package contains a react application, with vite as the tooling. RTK Query is used in order to effeciently fetch and cache data in the redux store, mitigating making repeated API calls for data that most likely has not changed.

  In order to actually fetch data, instead of RTK query making "raw" API calls using fetch, I use @octokit/rest.

- While the Github API can be accessed without authentication, there is a rate limit that we could potentially hit. In order to avoid that limit, I could either create a Github App, an OAuth app, or persosonal access token.

  Since the README.md mentioned a personal access token, I went with that approach.

  In order to avoid leaking the token to the front-end, I created a server package and handle auth in the back-end

- The server package contains a express application which uses http-proxy-middleware. It contains a /api endpoint that proxies to https://api.github.com/ and adds an Authorization header which contains the token.

## Running locally

- git clone https://github.com/codescreen/CodeScreen_ugvxtigm.git
- cd CodeScreen_ugvxtigm
- npm install
- Optional: Set the GITHUB_TOKEN environment variable
  - Generate a fine-grained personal access token
    - https://github.com/settings/personal-access-tokens/new
  - Create packages/server/.env.local with the following, replacing YOUR_TOKEN_HERE with your actual token
    - GITHUB_TOKEN=YOUR_TOKEN_HERE
- npm run dev
- Go to http://localhost:3000/

## Running tests

- Unit tests
  - npm run test
- E2E tests
  - Ensure the app is running
    - npm run dev
  - Either open the cypress UI and run the tests via
    - npm run e2e
  - Or run the tests in the terminal via
    - npm run e2e:run
- Run e2e tests via npm run e2e or npm run e2e:run

## Trade-offs and future work

- Homepage displays what is returned by https://api.github.com/users. There is no sorting, filtering, or paging functionality.

  Given time constraints and that this is a showcase / interview project, I could focus on building a more robust feature-set, or focus on writing clean, modular, reusable, testable code and writing tests, and I chose the latter.

  If I had more time, I'd definitely implement those features.

- Adding internationalization. Currently, the strings in the app are hard-coded to English, but I could use something like https://react.i18next.com/ to add i18n support.

- I used vite as the front-end tooling instead of create-react-app. Create-react-app is effectively dead and not mentioned on https://react.dev/learn/start-a-new-react-project

  I could have used a full-fledged framework like [Next.js](https://nextjs.org/), but I went with the assumption that we most likely already have a back-end and simply need front-end tooling.

- There are no back-end tests. The back-end is mostly to protect secrets and is not the focus of this showcase project.

[React]: https://reactjs.org/
[Redux Toolkit]: https://redux-toolkit.js.org/
[octokit/rest.js]: https://octokit.github.io/rest.js/v20
[MUI]: https://mui.com/
[Lodash]: https://lodash.com/
[Typescript]: https://www.typescriptlang.org/
[Vite]: https://vitejs.dev/
[Vitest]: https://vitest.dev/
[Express]: https://expressjs.com/
[http-proxy-middleware]: https://github.com/chimurai/http-proxy-middleware
[Cypress]: https://www.cypress.io/
