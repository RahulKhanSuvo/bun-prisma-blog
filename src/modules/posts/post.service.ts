import type { Post } from "../../../generated/prisma/client"
import { prisma } from "../../utility/db"

const createPost = async (data: Omit<Post, "id" | "createdAt" | "updateAt">) => {
    return await prisma.post.create({
        data
    })
}
export const PostService = { createPost }