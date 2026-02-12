import express from "express"
import postRouter from "./src/modules/posts/post.router"
import { auth } from "./src/lib/auth"
import { toNodeHandler } from "better-auth/node"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:4000", // your frontend
    credentials: true,               // REQUIRED for cookies
}));

app.get("/", (req, res) => {
    res.send("hello world")
})
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/posts", postRouter)

export default app