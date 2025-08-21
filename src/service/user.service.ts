import { db } from "../config/PrismaDbSetup";
import * as bcrypt from 'bcrypt'

export interface CreateUserInput{
    full_name : string;
    password: string;
    email :string;
}
export const CreateUser = async (input: CreateUserInput) => {
    const { full_name, password, email } = input;

    const hashedPassword = await bcrypt.hash(password,10)
    
    const userData = await db.user.create({
        data:{
            full_name,
            email,
            password:hashedPassword,
            role:"USER"
        }
    })

    const { password:_, ...userDataWithoutPassword} = userData
    return userDataWithoutPassword as any;
}