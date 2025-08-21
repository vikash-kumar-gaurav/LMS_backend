import { Response } from "express";

export function ErrorResponse(res: Response, statusCode: number, msg: string) {
    return res.status(statusCode).json({
        success: false,
        message: msg
    });
}