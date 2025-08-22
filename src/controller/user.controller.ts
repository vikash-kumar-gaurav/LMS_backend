import type { Request, Response} from "express"
import { ErrorResponse } from "../utils/SendErrorREsponse";
import { CreateUser, LoginUser } from "../service/user.service";
import { generateAccessToken, generateRefreshToken } from "../utils/Generatetoken";


//creating a new user 
export const RegisterUserController = async(req:Request,res:Response) => {
    try {
        const { email, full_name, password } = req.body;

        if(!email || !full_name || !password ){
            return ErrorResponse(res,401,"All fields are required")
        }

        const user = await CreateUser({email, full_name, password});

        return res.status(201).json({
            success:true,
            message: "user created please logIn",
            user
        })
    } catch (error) {
        console.log("Error from the RegisterUserController", error);
        return ErrorResponse(res,500,"Server Error");
    }
};


//Login a existing user 
export const LoginUserController = async(req:Request, res:Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return ErrorResponse(res,401, "All fields are required")
        }

        //call the loginService and get the userId
        const userDetail =  await LoginUser({email, password});

        //from the service we will receive the if valid user is true or false

        const accessToken = await generateAccessToken(userDetail.id);
        const refreshToken = await generateRefreshToken(userDetail.id);

        const cookiesOptions = {
            httpOnly: true,
            sameSite: (process.env.NODE_ENV === "production" ? "strict" : "lax") as  "strict" | "lax" ,
            secure: process.env.NODE_ENV === "production",
        };

        res.cookie("accessToken", accessToken, cookiesOptions);
        res.cookie("refreshToken", refreshToken, cookiesOptions);

        return res.json({
                success:true,
                userData :{
                    name:userDetail.full_name,
                    email:userDetail.email,
                    profilePic:userDetail.profile_pic,
                    role:userDetail.role
                }

            })
    } catch (error) {
        console.log("Error from the LoginUserController", error);
        return ErrorResponse(res,500,"Server Error");
    }
}


