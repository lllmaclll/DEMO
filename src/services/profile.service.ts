import { Profile } from "@prisma/client"
import prisma from "../configs/prisma.config"

export const profileList = async (): Promise<Profile[]> => {
    try {
        return await prisma.profile.findMany()
    } catch (error) {
        throw error
    }
}

export const findProfile = async (profileId: number): Promise<Profile | null> => {
    try {
        return await prisma.profile.findUnique({
            where: {
                id: profileId
            }
        })
    } catch (error) {
        throw error
    }
}

export const insertProfile = async (body: Profile): Promise<Profile> => {
    try {
        return await prisma.profile.create({
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const changeProfile = async (profileId: number, body: Profile): Promise<Profile> => {
    try {
        return await prisma.profile.update({
            where: {
                id: profileId
            },
            data: body
        })
    } catch (error) {
        throw error
    }
}

export const removeProfile = async (profileId: number): Promise<Profile> => {
    try {
        return await prisma.profile.delete({
            where: {
                id: profileId
            }
        })
    } catch (error) {
        throw error
    }
}