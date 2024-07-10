import { User } from "@prisma/client"
import prisma from "../configs/prisma.config"
import bcrypt from "bcrypt" // is promise function
import { HttpError } from "../error"
import { sign } from "jsonwebtoken"
import dotenv from "dotenv"
import { redisConn } from "../configs/redis.config"

dotenv.config()

export const userList = async (): Promise<User[]> => {
    try {
        const result = await prisma.user.findMany({
            include: {
                profile: true,
                posts: true
            }
        })
        await redisConn.setEx("user3", 10, JSON.stringify(result)) // timer = 3600s = 1 hr. | user = path url
        return result
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
        const result = await prisma.user.create({
            data: {
                username: body.username,
                password: await hashPassword(body.password),
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
        await redisConn.del("user3") // clear cache ก่อน เพราะไม่งั้นจะไปดึง cache ตัวเก่ามาแสดง
        return result
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

export const checkLogin = async (userName: string, passWord: string) => {
    try {
        const result = await prisma.user.findUnique({
            where: { username: userName }
        })
        if (result) {
            const match = await bcrypt.compare(passWord, result.password);
            if (match) {
                const id: number = result.id
                const username: string = result.username
                const token: string = sign({ id, username }, String(process.env.JWT_SECRET)) // sign create token
                return { token, id, username }
            } else {
                throw new HttpError(400, "Wrong user or password!!")
            }
        } else {
            throw new HttpError(400, "Wrong user or password!!")
        }
    } catch (error) {
        throw error;
    }
}

const hashPassword = (pass: string) => {
    return new Promise<string>((resolve, reject) => {
        bcrypt.hash(pass, 10, (err, hash) => {
            if (err) reject(err)
                resolve(hash)
        })
    })
}