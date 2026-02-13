import type { Post } from "../../../generated/prisma/client"
import { prisma } from "../../utility/db"

const createPost = async (data: Omit<Post, "id" | "createdAt" | "updateAt" | "authorId">, authorId: string) => {
    console.log(authorId)
    return await prisma.post.create({
        data: {
            ...data,
            authorId: authorId
        }
    })
}
const getAllPost = async () => {
    return await prisma.post.findMany()
}
export const PostService = { createPost, getAllPost }