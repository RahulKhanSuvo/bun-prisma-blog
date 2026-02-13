import type { Post } from "../../../generated/prisma/client"
import type { PostWhereInput } from "../../../generated/prisma/models"
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
const getAllPost = async (search?: string, tags?: string[], isFeatured?: boolean) => {
    const andCondition: PostWhereInput[] = [];

    if (search) {
        andCondition.push({
            OR: [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
            ],
        });
    }

    if (tags?.length) {
        andCondition.push({
            tags: { hasEvery: tags },
        });
    }
    if (typeof isFeatured === 'boolean') {
        andCondition.push({
            isFeatured
        })
    }

    const where = andCondition.length ? { AND: andCondition } : undefined;

    return prisma.post.findMany({ where });
};

export const PostService = { createPost, getAllPost }