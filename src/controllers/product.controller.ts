import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../models";
import { productList } from "../services";

export const getProduct = async (req: Request, res: Response<BaseResponse<string>>) => {
    try{
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: productList()
        })
    } catch (error) {
        
    }
}