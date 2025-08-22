import * as jwt from "jsonwebtoken";

export async function generateAccessToken(userId:string) {
    const token = jwt.sign(userId, process.env.ACCESSTOKENPRIVATE_KEY!,{expiresIn:"2hr"});
    return token
} 

export async function generateRefreshToken(userId:string) {
    const token = jwt.sign(userId, process.env.REFRESHTOKENPRIVATE_KEY!, { expiresIn: "24h" });
    return token
}