import type { Request, Response} from "express"

export const RegisterUserController = async(req:Request,res:Response) => {
    try {
        const { email, full_name, password, role } = req.body;

        if(!email)
    } catch (error) {
        
    }
}