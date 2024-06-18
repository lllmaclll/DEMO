import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../models";
import { changeUser, findUser, insertUser, removeUser, userList } from "../services";
import { user_order } from "@prisma/client";

export const getUser = async (req: Request, res: Response<BaseResponse<user_order[]>>, next: NextFunction) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: await userList()
        })
    } catch (error) {
        next(error) // การโยน error
    }
}

export const getUserById = async (req: Request, res: Response<BaseResponse<user_order | null>>, next: NextFunction) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: await findUser(Number(req.params.userId))
        })
    } catch (error) {
        next(error) // การโยน error
    }
}

export const createUser = async (req: Request, res: Response<BaseResponse<user_order>>, next: NextFunction) => {
    try{
        res.status(201).json({
            message: 'Successful',
            success: true,
            data: await insertUser(req.body as user_order)
        })
    } catch (error) {
        next(error) // การโยน error
    }
}

export const updateUser = async (req: Request, res: Response<BaseResponse<user_order>>, next: NextFunction) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: await changeUser(Number( req.params.userId), req.body as user_order)
        })
    } catch (error) {
        next(error) // การโยน error
    }
}

export const deleteUser = async (req: Request, res: Response<BaseResponse<user_order>>, next: NextFunction) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: await removeUser(Number( req.params.userId))
        })
    } catch (error) {
        next(error) // การโยน error
    }
}