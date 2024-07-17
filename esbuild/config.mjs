import esbuild from "esbuild"
import { CSSPlugin } from "./plugins.mjs"
import { copyPublicFolder } from "./utils.mjs"

const isProd = process.env.NODE_ENV === "production"
const watch = process.argv.includes("--watch")

const configs = [
  {
    entryPoints: ["src/app.ts"],
    outfile: "build/app.js",
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    target: "es6",
    platform: "browser",
    plugins: [CSSPlugin],
  },
  {
    entryPoints: ["src/server.ts"],
    outfile: "build/server.js",
    bundle: true,
    minify: isProd,
    sourcemap: !isProd,
    target: "node20",
    platform: "node",
    format: "cjs",
    external: ["express"],
  },
]

const contexts = configs.map(async (config) => {
  const context = await esbuild.context({
    ...config,
  })
  return { context, config }
})

Promise.all(contexts)
  .then(async (results) => {
    copyPublicFolder()
    if (watch) {
      results.forEach(({ context }) => context.watch())
    } else {
      await Promise.all(results.map(({ context }) => context.rebuild()))
      results.forEach(({ context }) => context.dispose())
    }
  })
  .catch((error) => {
    console.error("Build error:", error)
    process.exit(1)
  })
