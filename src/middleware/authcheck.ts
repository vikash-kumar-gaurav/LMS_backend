import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}


const ACCESS_TOKEN_SECRET = process.env.ACCESSTOKENPRIVATE_KEY!
const REFRESH_TOKEN_SECRET = process.env.REFRESHTOKENPRIVATE_KEY!

export function authCheck(req: Request, res: Response, next:NextFunction) {
    const accessToken = req.headers['accesstoken'] as string;
    const refreshToken = req.headers['refreshtoken'] as string;

    if (!accessToken && !refreshToken) {
        return res.status(401).json({ message: 'No tokens provided' });
    }

    try {
        if (accessToken) {
            const data = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
            const userId = (data as any).userId
            req.userId= userId
            console.log(data);
            
            return next();
        }
    } catch (err) {
        try {
            if (refreshToken) {
                const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                const userId = (data as any).userId
                req.userId= userId
                console.log(data);
                
                return next();
            }
        } catch (err) {
            console.log("token is expired and login again")
        }
    }

    

    return res.status(401).json({ message: 'Invalid token(s)' });
}