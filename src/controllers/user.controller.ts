import { NextFunction, Request, Response } from "express";
import { BaseResponse, ZUser } from "../models";
import { changeUser, findUser, insertUser, removeUser, userList } from "../services";
import { User } from "@prisma/client";
import { z } from "zod";
import { ValidationError, fromZodError } from "zod-validation-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { HttpError } from "../error";

export const getUser = async (req: Request, res: Response<BaseResponse<User[]>>, next: NextFunction) => {
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

export const getUserById = async (req: Request, res: Response<BaseResponse<User | null>>, next: NextFunction) => {
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

export const createUser = async (req: Request, res: Response<BaseResponse<User>>, next: NextFunction) => {
    try{
        const body = ZUser.parse(req.body) // validate 
        res.status(201).json({
            message: 'Successful',
            success: true,
            data: await insertUser(body as User)
        })
    } catch (error) {
        // handle error
        if (error instanceof z.ZodError) {
            next(new ValidationError(fromZodError(error).toString()))
        } else if (error instanceof PrismaClientKnownRequestError) {
            next(new HttpError(400, `${error.name} : ${error.code}`))
        } else {
            next(error) // การโยน error
        }
    }
}

export const updateUser = async (req: Request, res: Response<BaseResponse<User>>, next: NextFunction) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: await changeUser(Number( req.params.userId), req.body as User)
        })
    } catch (error) {
        next(error) // การโยน error
    }
}

export const deleteUser = async (req: Request, res: Response<BaseResponse<User>>, next: NextFunction) => {
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