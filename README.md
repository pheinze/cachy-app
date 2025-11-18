# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

---

## Versioning and Releasing

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automate the release workflow. The version number is automatically determined based on the commit messages, a changelog is generated, and a new release is created on GitHub.

### Commit Message Conventions

To make this automation work, all commit messages **must** follow the [Conventional Commits specification](https://www.conventionalcommits.org/).

The most common commit types are:

-   `feat`: A new feature. (triggers a `minor` release, e.g., `1.2.3` -> `1.3.0`)
-   `fix`: A bug fix. (triggers a `patch` release, e.g., `1.2.3` -> `1.2.4`)

Other types like `docs:`, `style:`, `refactor:`, `perf:`, `test:`, and `chore:` are also valid but **do not** trigger a release.

**Example commit messages:**

```
feat: Add user login functionality
```

```
fix: Correct calculation error in the summary view
```

### Breaking Changes

To trigger a major release (e.g., `1.2.3` -> `2.0.0`), you must include a `BREAKING CHANGE:` footer in your commit message.

```
feat: Rework the entire API for better performance

BREAKING CHANGE: The `getUser` endpoint has been renamed to `fetchUser` and the response format has changed.
```

When you push commits with these formats to the `main` branch, the GitHub Action will automatically create a new release.
