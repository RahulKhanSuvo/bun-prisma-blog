import { Router } from "express";
import { postController } from "./post.controller";
import { authGard } from "../../middleware/authGard";

const postRouter = Router();
postRouter.post("/", postController.createPost)
postRouter.get("/", authGard(), postController.getAllPost)

export default postRouter;
