import type { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body)
        return res.status(201).json({
            status: true,
            message: "Post create successfully",
            data: result
        })
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({
            status: false,
            message: "Failed to create post",
            error: err.message
        });
    }
}
export const PostController = {
    createPost
}