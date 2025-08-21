import type { Request, Response} from "express"
import { ErrorResponse } from "../utils/SendErrorREsponse";
import { CreateUser } from "../service/user.service";

export const RegisterUserController = async(req:Request,res:Response) => {
    try {
        const { email, full_name, password } = req.body;

        if(!email || !full_name || !password ){
            return ErrorResponse(res,401,"All fields are required")
        }

        const user = await CreateUser({email, full_name, password});

        return res.status(201).json({
            success:true,
            message: "user created please logIn"
        })
    } catch (error) {
        console.log("Error from the RegisterUserController", error);
        return ErrorResponse(res,500,"Server Error");
    }
}