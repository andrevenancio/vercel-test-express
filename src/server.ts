import express, { Request, Response } from "express"
import path from "path"
import dotenv from "dotenv"

const app = express()
const port = process.env.PORT || 8080
const build =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "..", "build")
    : path.join(__dirname)

dotenv.config()
app.use(express.json())

app.use(express.static(build))

console.log("STATIC PATH:", build)

app.get("/ping", (_req: Request, res: Response) => {
  return res.json({
    message: "pong 🏓",
    test: process.env.TEST || "not defined",
  })
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})
