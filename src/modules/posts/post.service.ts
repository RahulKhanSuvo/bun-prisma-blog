import type { Post } from "../../../generated/prisma/client"
import { prisma } from "../../utility/db"

const createPost = async (data: Omit<Post, "id" | "createdAt" | "updateAt">) => {
    return await prisma.post.create({
        data
    })
}
const getAllPost = async () => {
    return await prisma.post.findMany()
}
export const PostService = { createPost, getAllPost }