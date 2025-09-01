import type { Request, Response } from "express"
import { ErrorResponse } from "../utils/SendErrorREsponse";
import { CreateUser, LoginUser } from "../service/user.service";
import { generateAccessToken, generateRefreshToken } from "../utils/Generatetoken";
import { loginSchema } from "../zodSchemas/LoginSchema";


//creating a new user 
export const RegisterUserController = async (req: Request, res: Response) => {
    try {
        const { email, full_name, password } = req.body;

        if (!email || !full_name || !password) {
            return ErrorResponse(res, 401, "All fields are required")
        }

        const user = await CreateUser({ email, full_name, password });

        return res.status(201).json({
            success: true,
            message: "user created please logIn",
            user
        })
    } catch (error) {
        console.log("Error from the RegisterUserController", error);
        if ((error as any).message === "user already exist") {
            return ErrorResponse(res, 402, "user already present please logIn")
        };

        return ErrorResponse(res, 500, "Server Error");
    }
};


//Login a existing user 
export const LoginUserController = async (req: Request, res: Response) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        console.log(parsed)

        if (!parsed.success) {
            const errors = parsed.error.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message      
            }));

            return res.status(400).json({
                success: false,
                errors
            });
        }


        const { email, password } = parsed.data;

        if (!email || !password) {
            return ErrorResponse(res, 401, "All fields are required")
        }

        //call the loginService and get the userId
        const userDetail = await LoginUser({ email, password });

        //from the service we will receive the if valid user is true or false

        const accessToken = await generateAccessToken(userDetail.id);
        const refreshToken = await generateRefreshToken(userDetail.id);

        const cookiesOptions = {
            httpOnly: true,
            sameSite: (process.env.NODE_ENV === "production" ? "strict" : "lax") as "strict" | "lax",
            secure: process.env.NODE_ENV === "production",
        };

        res.cookie("accessToken", accessToken, cookiesOptions);
        res.cookie("refreshToken", refreshToken, cookiesOptions);

        return res.json({
            success: true,
            userData: {
                id: userDetail.id,
                name: userDetail.full_name,
                email: userDetail.email,
                profilePic: userDetail.profile_pic,
                role: userDetail.role
            },
            accessToken

        })
    } catch (error) {
        console.log("Error from the LoginUserController", error);

        if ((error as any).message === "Invalid password") {
            return ErrorResponse(res, 403, "Incorrect password try again")
        }

        return ErrorResponse(res, 500, "Server Error");
    }
}


