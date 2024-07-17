import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildDir = path.join(__dirname, "..", "build")

export const copyPublicFolder = () => {
  const publicDir = path.join(__dirname, "..", "public")

  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir)
  }

  fs.readdirSync(publicDir).forEach((file) => {
    fs.copyFileSync(path.join(publicDir, file), path.join(buildDir, file))
  })
}
