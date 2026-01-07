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
but I have the additional constraint that I can only use Node 20 at work, so I
can't use Bun.

I've tried a pure Node approach, with a custom minimal server and livereload but
I struggled with Javascript module and getting D3 and it's typescript types from
Node's `d3` and `@types/d3` dependencies. I've tried an ESbuild setup using
[this 2023 Medium post](https://eisenbergeffect.medium.com/an-esbuild-setup-for-typescript-3b24852479fe)
but also struggled with D3 integration. In the end, I went with using
parcel.org, despite the fact that it's quite a big dependency - and the previous
Medium article pointing out that they tried and gave up. I got a very useful
kickstart from https://github.com/Lemoncode/d3js-typescript-examples.

## Usage

Run the following command in this directory:

```shell
npm run dev
```

It should open http://localhost:1234 in your browser. Edit the `src/*.html`
files and the `src/*.ts` files. Upon saving, changed Typescript files are
recompiled, and the browser automatically reloads.

When everything is working, you can run `npx parcel build` and distribute the
contents of the `dist/` directory as a standalone webpage.

The above command runs parcel CLI, which doesn't perform Typescript
verifications. In a second terminal, you can run continuously the Typescript
compiler for that:

```shell
npm run check:watch
```

Finally, once you're done editing, you can run ESlint once before committing
your changes:

```shell
npm run list
```

## Directory structure

*   `/src` contains the `.ts` files with D3 code, and the `.html` file to which
    it applies.
*   `/dist` contains the files served, which are
    *   the manually added `.html` files
    *   the manually added `.json` files for data
    *   the generated `.html` files that Parcel produces

Beware that `.gitignore` is configured to ignore the generated files in the
`/dist` directory.
