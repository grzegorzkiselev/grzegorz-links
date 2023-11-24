var esbuild = require("esbuild");

var paths = new Promise((resolve) => {
  import("globby").then(({ globby }) => {
    globby(["src/script.js", "src/**/[!(*.js|.*)]", "src/**/*"]).then(resolve);
  });
});

paths.then((result) => {
  console.log(result);
  esbuild.build({
    outdir: "dist",
    format: "cjs",
    external: ["fs", "path"],
    entryPoints: result,
    entryNames: "[dir]/[name]",
    bundle: true,
    keepNames: true,
    minify: true,
    loader: {
      ".html": "copy",
      ".jpg": "copy",
      ".woff": "copy",
      ".woff2": "copy",
      ".webp": "copy",
      ".gpb": "copy",
      ".svg": "copy",
      ".otf": "copy",
      ".png": "copy",
      ".ttf": "copy",
      ".glb": "copy",
      ".wasm": "copy",
    },
  });
});
