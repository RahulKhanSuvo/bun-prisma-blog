import express from "express"
import postRouter from "./src/modules/posts/post.router"
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.send("hello world")
})
app.use("/posts", postRouter)

export default app