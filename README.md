# copy-mjs

Build tool to copy `.js` files from input directory to corresponding `.mjs`
files in output directory.

## Why?

If we have multiple files in a package and we want all of them to be importable
we often suggest to users doing it like this:

```js
import module from "package/lib/module";
```

This normally has a serious drawback because by doing so we often point people
to using files authored in CommonJS format (being the lowest common
denominator). This prevents bundlers' optimizations such as tree-shaking & scope
hoisting (a.k.a. module concatenation).

If we provide a second build in ESM format we might mention it in the docs and
propose importing the same thing with i.e. `"package/es/module"` for people
using module-aware bundlers. This is a mental overhead that can be avoided.

**I recommend** using "proxy directories" technique described by me in
[this article](https://developers.livechatinc.com/blog/how-to-create-javascript-libraries-in-2018-part-2#proxy-directories)
as it allows wider set of tools to choose appropriate files _automatically_.
I've also created a package which creates such directories for you -
[`cherry-pick`](https://github.com/Andarist/cherry-pick/edit/master/README.md).

If you do not like this technique and you'd still like to improve the situation
for your users **this package** might help you in that.

webpack@4 came with `.mjs` files support. What does it mean? It means that if
your user imports `"package/module"` webpack will try to load
`package/module.mjs` first, before falling back to loading `package/module.js`
(tools not recognizing `.mjs` will fall back gracefully to `.js`). This means
that we can just put `.js` files authored in CJS format side by side with `.mjs`
files authored in ESM.

To provide the best developer experience you should either:

- publish alternate directory
- or move temporarily your files to root when publishing.

Doing so can allow people to import i.e. `"package/module"` instead of
`"package/lib/module"`.

## CLI Options

```
copy-mjs

Copy `.js` files from input directory to `.mjs` files in output directory.

Options:
  --help, -h        Show help                                          [boolean]
  --version, -v     Show version number                                [boolean]
  --input-dir, -i                                               [default: "esm"]
  --output-dir, -o                                              [default: "lib"]
  --cwd                                                           [default: "."]
```

### Example usage

```sh
copy-mjs --input-dir esm --output-dir lib
```

## JS API

`copy-mjs` exports a `default` method which copies `.js` files from input
directory to corresponding `.mjs` files in output directory. It accepts the same
options as CLI command.

```js
const copyMjs = require("copy-mjs");

copyMjs({ inputDir: "esm", outputDir: "lib" }).then(() =>
  console.log("Successfully created .mjs files.")
);
```
