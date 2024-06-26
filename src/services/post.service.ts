import { Post } from "@prisma/client"
import prisma from "../configs/prisma.config"

export const postList = async (): Promise<Post[]> => {
    try {
        return await prisma.post.findMany()
    } catch (error) {
        throw error
    }
}

export const findPost = async (postId: number): Promise<Post | null> => {
    try {
        return await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
    } catch (error) {
        throw error
    }
}

export const insertPost = async (body: Post): Promise<Post> => {
    try {
        return await prisma.post.create({
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const changePost = async (postId: number, body: Post): Promise<Post> => {
    try {
        return await prisma.post.update({
            where: {
                id: postId
            },
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const removePost = async (postId: number): Promise<Post> => {
    try {
        return await prisma.post.delete({
            where: {
                id: postId
            }
        })
    } catch (error) {
        throw error
    }
}