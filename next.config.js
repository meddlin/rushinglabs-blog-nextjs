/**
 * By default Next.js will only pickup files with .js or .jsx extensions.
 * So, we need this config to extend that behavior.
 */
const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/
});

module.exports = withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx"]
});