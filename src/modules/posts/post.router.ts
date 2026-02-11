import { Router } from "express";
import { postController } from "./post.controller";

const postRouter = Router();
postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getAllPost)

export default postRouter;
