import { db } from "../config/PrismaDbSetup";
export interface CreateCourseInput{
    title :string;
    price :number;
    creatorId : string;
    thumbnail_url :string
}

export interface FindCourseInput{
    category :string | null;
}

export const createCourse = async(input:CreateCourseInput) => {
    const { title, price, creatorId, thumbnail_url} = input

    const course = await db.course.create({
        data:{
            title,
            ...(thumbnail_url && { thumbnail_url}),
            price,
            creatorId
        }
    })

    return course
}

export const FindAllCourses = async(input:FindCourseInput) => {
    const { category }= input;

    const allCourse = await db.course.findMany();

    return allCourse;
}