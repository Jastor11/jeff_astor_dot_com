# JeffAstor.com

Repository hosting code that powers my Astro.js-powered [site](https://jeffastor.com) on the web.

## ToDo

+ Chores
	+ [ ] Remove all the extra theme stuff from the custom moonlight II theme
	+ [ ] Cleanup and organize the theme like the old custom theme was
	+ [X] Move all undraw SVGs out of the public folder. Delete them. Reference the assets directory instead.
+ SEO & Analytics
	+ [ ] See why tags and other SEO items aren't working properly
	+ [X] Migrate from Google Analytics to Plausible
	+ [X] Migrate from Plausible to Microsoft Clarity
+ Issues
	+ [ ] Lighthouse scores could be improved
	+ [ ] Consider only pre-fetching when hovering over a link
	+ [X] Download only the IBM Plex Mono fonts that we actually need. Get rid of the others
	+ [X] Commento has been discontinued. Disable comments until a migration plan has been decided upon
+ UI & UX
	+ PostDetail
		+ [ ] Integrate the `SimilarPosts` model into any post that is not a series or a review
		+ [ ] For reviews, show a section to see other reviews
		+ [ ] ~~Make commento load only when visible~~
	+ BlogPost Listing Page
		+ [ ] Add the ability to filter by category
		+ [ ] Add the ability to filter by `post`, `review`, or `series`
		+ [ ] Show popular posts/serieses
		+ [ ] Improve that terrible pagination hook
+ Content
	+ [ ] Migrate the rest of the CodeSandbox examples to Stackblitz
	+ [ ] Remove all posts that are no longer relevant
	+ Post Ideas
		+ [ ] Write a post on mini-trpc in express (using the typed router)
		+ [ ] Write a post on migrating to `Hono.js` for JS backends
	+ Series Ideas
		+ [ ] Finish FastAPI series with React on Phresh
		+ [ ] Create a parallel series using `Hono.js`, `Vite`, and `React` in a monorepo setup with `Turborepo`
+ Misc
	+ RSS
		+ [ ] Get RSS feed working

## 🚀 Project Structure

The project has the following folders and file structure:

```
├── public/
├── scripts/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── posts/
│   │   └── svg/
│   ├── components/
│   ├── content/
│   ├── core/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   └── pages/
│   └── services/
│   └── styles/
│   └── types/
│   └── utils/
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierignore
├── .prettierrc.cjs
├── astro.config.mjs
├── netlify.toml
├── pnpm-lock.yaml
├── README.md
├── package.json
├── tailwind.config.cjs
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any React components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/posts/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `assets/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:3000`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
