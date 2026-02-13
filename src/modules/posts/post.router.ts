import { Router } from "express";
import { postController } from "./post.controller";
import { authGard, UseRole } from "../../middleware/authGard";

const postRouter = Router();
postRouter.post("/", authGard(UseRole.USER), postController.createPost)
postRouter.get("/", authGard(UseRole.USER), postController.getAllPost)

export default postRouter;
