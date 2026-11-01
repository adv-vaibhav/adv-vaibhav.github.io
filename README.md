# Adv. Kumar Vaibhav — Portfolio

A responsive professional portfolio for Adv. Kumar Vaibhav, built with Vite and plain HTML, CSS, and JavaScript. The hero uses the repository's `background.png` image.

## Run locally

Install [pnpm](https://pnpm.io/installation), then run:

```sh
pnpm install
pnpm dev
```

Create a production build with `pnpm build`; preview it with `pnpm preview`.

## Content

The experience, education, and credentials are summarized from the supplied professional profile. Update `src/data/profileData.js` as the profile changes.

## Project structure

- `src/main.js` assembles the page and initializes navigation.
- `src/components/<section>/` contains each section's renderer and styles.
- `src/data/profileData.js` holds the profile, experience, education, and credentials.
- `src/styles/global.css` contains shared tokens and typography; `responsive.css` applies breakpoints after component styles.
- `background.png` is the hero image and is bundled by Vite for production.

Run the render checks with `pnpm test`.
