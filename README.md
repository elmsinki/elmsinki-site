# elmsinki-site

## Install Prerequisites

You will need to [install Elm](https://guide.elm-lang.org/install.html), which is the language the main site is written in.

For the development tools, you will need to [install node](https://nodejs.org/en/download/). Node comes with `npm`, a package manager that can install dependencies the project.

## Development

With the prerequisites installed, run:

```shell
npm run dev
```

Then navigate your browser to http://localhost:9090/, and the site should be there.
Edit the file in `src/Home.elm`, and refresh the page to see changes.

## Production

To build for production, run:

```shell
npm run build
```

The built site will be available under the root folder.

## Structure

This is a static site. It is built once, when something changes, and the resulting `index.html` served from a server.

The site is automatically deployed with [Netlify](https://netlify.com).

## License

[BSD 3-clause](LICENSE)
