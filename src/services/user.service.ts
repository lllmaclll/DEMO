import { User } from "@prisma/client"
import prisma from "../configs/prisma.config"

export const userList = async (): Promise<User[]> => {
    try {
        return await prisma.user.findMany({
            include: {
                profile: true,
                posts: true
            }
        })
    } catch (error) {
        throw error
    }
}

export const findUser = async (userId: number): Promise<User | null> => {
    try {
        return await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
    } catch (error) {
        throw error
    }
}

export const insertUser = async (body: User): Promise<User> => {
    try {
        return await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
                age: body.age,
                profile: {
                    create: {
                        email: "*",
                        location: "*"
                    }
                }
            },
            include: {
                profile: true
            }
        })
    } catch (error) {
        throw error
    }
}

export const changeUser = async (userId: number, body: User): Promise<User> => {
    try {
        return await prisma.user.update({
            where: {
                id: userId
            },
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const removeUser = async (userId: number): Promise<User> => {
    try {
        return await prisma.user.delete({
            where: {
                id: userId
            }
        })
    } catch (error) {
        throw error
    }
}