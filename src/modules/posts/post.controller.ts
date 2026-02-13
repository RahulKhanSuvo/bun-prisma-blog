import type { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body, req.user?.id as string)
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
const getAllPost = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string | undefined;
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : false
        console.log({ isFeatured })
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

        const result = await PostService.getAllPost(search, tags, isFeatured);

        return res.status(200).json({
            status: true,
            message: "Get all posts successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Failed to get posts",
        });
    }
};

export const postController = {
    createPost, getAllPost
}