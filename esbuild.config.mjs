import esbuild from "esbuild"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const isProd = process.env.NODE_ENV === "production"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildDir = path.join(__dirname, "build")

const copyPublicFolder = () => {
  const publicDir = path.join(__dirname, "public")

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir)
  }

  fs.readdirSync(publicDir).forEach((file) => {
    fs.copyFileSync(path.join(publicDir, file), path.join(buildDir, file))
  })
}

const AppOptions = {
  entryPoints: ["src/app.ts"],
  outfile: "build/app.js",
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  target: "es6",
  platform: "browser",
}

const ServerOptions = {
  entryPoints: ["src/server.ts"],
  outfile: "build/server.js",
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  target: "node20",
  platform: "node",
  format: "cjs",
  external: ["express"],
}

esbuild.build(AppOptions).catch((error) => {
  console.error("App build failed:", error)
  process.exit(1)
})

esbuild
  .build(ServerOptions)
  .then(copyPublicFolder)
  .catch((error) => {
    console.error("Server build failed:", error)
    process.exit(1)
  })
