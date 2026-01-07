# D3 Typescript playground

This project is a template for learning D3 using Typescript. Most tutorial,
including the excellent
["D3 for the Impatient" book](https://github.com/janert/d3-for-the-impatient),
are in Javascript. Although very convenient - pure Javascript allows for a lot
of shortcuts - it makes it harder to maintain and to engineer solidly. That's
why at work - at the time of writing I am working for Google - the use of
Typescript is mandatory.

It's however painstakingly hard to have a minimal, lightweight setup for serving
just HTML code with script contents written in Typescript. Maybe the use of
[Bun's native typescript](https://bun.com/docs/runtime/typescript) would work,
but I have the additional constraint that I can only use Node 20 at work.

I've tried a pure Node approach, with a custom minimal server and livereload but
I struggled with Javascript modules and getting D3 and it's typescript types from
Node's `d3` and `@types/d3` dependencies. I've tried an ESbuild setup using
[this 2023 Medium post](https://eisenbergeffect.medium.com/an-esbuild-setup-for-typescript-3b24852479fe)
but also struggled with D3 integration. In the end, I went with using
[Parcel](http://parcel.org), despite the fact that it's quite a big dependency
(one that causes `npm audit` to currently report
[vulnerabilities](https://github.com/advisories/GHSA-qm9p-f9j5-w83w) for Parcel
) and that the previous Medium article points out that they tried
and gave up. I got a very useful kickstart from
https://github.com/Lemoncode/d3js-typescript-examples.

## Installation

Clone this directory using your favorite method. Then run:

```shell
npm install
```

This repository does *not* version the `package-lock.json` file. This is
normally the recommended way ([npm
docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)),
although there is a loooooot of debate about this on forums. In my case, it's
simply because at work, I must use a special version of NPM which generates a
`package-lock.json` file that would not be usable for most people, as it uses 
a special verified registry which requires an `npm login`.


## Usage

Run the following command in this directory:

```shell
npm run dev
```

It should open http://localhost:1234 in your browser. Edit the `src/*.html`
files and the `src/*.ts` files. Upon saving, changed Typescript files are
recompiled, and the browser automatically reloads the page.

When everything is working, you can run `npx parcel build` and distribute the
contents of the `dist/` directory as a standalone webpage.

The `npm run dev` command doesn't perform Typescript verifications. In a second
terminal, you can run continuously the Typescript compiler for that:

```shell
npm run check:watch
```

Finally, once you're done editing, you can run ESlint once before committing
your changes:

```shell
npm run lint
```

## Directory structure

*   `/src` contains the `.ts` files with D3 code, and the `.html` file(s) to which
    they apply.
*   `/dist` contains the files served, which are
    *   the generated `.html` files that Parcel produces
    *   the manually added `.json` files for data
    *   other resources like `favicon.ico`

Beware that `.gitignore` is configured to ignore the generated files in the
`/dist` directory.
