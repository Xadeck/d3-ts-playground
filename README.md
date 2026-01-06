# D3 Typescript playground

Run the following command in this directory:

```shell
npm run dev
```

Navigate to http://localhost:3000/index.html.

Edit the `dist/*.html` files and the `src/*.ts` files. Upon saving, changed
Typescript files are recompiled, and the browser automatically reloads.

## Directory structure

*   `/src` contains the `.ts` files with D3 code.
*   `/dist` contains the files served, which are
    *   the manually added `.html` files
    *   the manually added `.js` files, such as D3 library
    *   the *generated* `.js` files from the `/src` directory
*   `/bin` contains the `server.ts` which contains the logic for serving files,
    with live reload.
