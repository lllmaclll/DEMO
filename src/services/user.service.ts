import { user_order } from "@prisma/client"
import prisma from "../configs/prisma.config"

export const userList = async (): Promise<user_order[]> => {
    try {
        return await prisma.user_order.findMany()
    } catch (error) {
        throw error
    }
}

export const findUser = async (userId: number): Promise<user_order | null> => {
    try {
        return await prisma.user_order.findUnique({
            where: {
                id: userId
            }
        })
    } catch (error) {
        throw error
    }
}

export const insertUser = async (body: user_order): Promise<user_order> => {
    try {
        return await prisma.user_order.create({
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const changeUser = async (userId: number, body: user_order): Promise<user_order> => {
    try {
        return await prisma.user_order.update({
            where: {
                id: userId
            },
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const removeUser = async (userId: number): Promise<user_order> => {
    try {
        return await prisma.user_order.delete({
            where: {
                id: userId
            }
        })
    } catch (error) {
        throw error
    }
}