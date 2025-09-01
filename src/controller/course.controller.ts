import { Response, Request } from "express";
import { ErrorResponse } from "../utils/SendErrorREsponse";
import { createCourse, FindAllCourses } from "../service/course.service";

export const createNewCourse = async(req:Request,res:Response) => {
    try {

        //expect the creatorId from the middleware
        const creatorId = req.userId!

        const {title, price,thumbnail_url } = req.body;
        console.log(title,price);
        
        if(!title || !price){
            return ErrorResponse(res,401,"All fileds are required");
        };

        const course = await createCourse({title, price, thumbnail_url, creatorId})
        return res.status(201).json({
            success:true,
            course
        })
    } catch (error) {
        console.log("error from createNewCourse", error);
        return ErrorResponse(res, 500, "Server Error")
    }
}

//view all the course 
export const ViewAllCourses = async(req:Request, res:Response) => {
    try {
        const { category } = req.params
    
        const CoursesData = await FindAllCourses({ category: category ?? null })
    
        return res.json({
            success:true,
            CoursesData
        })
    } catch (error) {
        console.log("error from viewAllCoureses", error)
        return ErrorResponse(res, 500, "Server Error")
    }

}