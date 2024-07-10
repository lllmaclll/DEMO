import { Request, Response, NextFunction } from "express"
import { redisConn } from "../configs/redis.config"
import { BaseResponse } from "../models"

export const cachedData = async (req: Request, res: Response<BaseResponse>, next: NextFunction) => {
    const path = req.originalUrl.split("/")[2]
    const checkCachedData = await redisConn.get(path)
    if (checkCachedData) {
        console.log('caching hit')
        return res.status(200).json({
            message: 'Successful',
            success: true,
            data: JSON.parse(checkCachedData)
        })
    } else {
        next()
    }
}