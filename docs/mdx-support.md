# MDX Support

Notes about MDX support (what worked, what didn't go here...)

## Supporting npm packages

These packages are used for MDX support:

- "@mdx-js/loader": "^1.6.21"
- "@next/mdx": "^10.0.1"


## Next.js Config File

### Markdown

For Markdown, remove this piece from `next.config.js`.

### MDX

For MDX, make sure this piece is there.

`next.config.js`

Notice the `extension: /\.mdx?$/` and `pageExtensions: ["js", "jsx", "md", "mdx"],`.

***BEFORE***

```js
const withMDX = require("@next/mdx")({
    extension: /\.md?$/
});

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "md"],
});
```

***AFTER***

```js
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/
});

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx"],
});
```


## Posts

In `/posts`, be sure to acknowledge `.md` and `.mdx` files


## Loading Posts `/lib/posts.js`

This is the file where we're loading the literal files containing our MDX/Markdown content.

So, depending on which file extension we want to switch to, change all references of `.mdx` or `.md` to the appropriate extension.