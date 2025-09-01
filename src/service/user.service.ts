import { db } from "../config/PrismaDbSetup";
import * as bcrypt from 'bcrypt'
import { LoginUserInput } from "../zodSchemas/LoginSchema";

export interface CreateUserInput{
    full_name : string;
    password: string;
    email :string;
}


export const CreateUser = async (input: CreateUserInput) => {
    const { full_name, password, email } = input;

    //checking if user exist 
    const isUserExists = await db.user.findUnique({
        where:{
            email
        }
    })

    if(isUserExists){
        throw new Error("user already exist");
    }

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
};

export const LoginUser = async(input:LoginUserInput) => {
    const { email, password} = input
    const user = await db.user.findUnique({
        where:{
            email
        }
    });

    if(!user){
        throw new Error("No user Found")
    };

    const checkPassword = await bcrypt.compare(password,user.password);

    if(!checkPassword){
        throw new Error("Invalid password")
    }

    return user
}