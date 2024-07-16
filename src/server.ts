import express, { Request, Response } from "express"
import dotenv from "dotenv"

const app = express()
const port = process.env.PORT || 8080

dotenv.config()

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel.3")
})

app.get("/ping", (_req: Request, res: Response) => {
  return res.json({
    message: "pong 🏓",
    test: process.env.TEST || "not defined",
  })
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})
