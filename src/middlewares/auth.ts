import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { HttpError } from "../error";

// front-end get token at localStorage | use about role
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token: string = req.headers.authorization.split(" ")[1] // not use bearer
            const decoded = verify(String(token), String(process.env.JWT_SECRET)) // compare with JWT_SECRET and Decode
            res.locals.token = decoded
            next()
        } else {
            next(new HttpError(401, "Invalid token!!"))
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            next(new HttpError(401, `${error.name} : ${error.message}`))
        } else {
            next(error)
        }
    }
}