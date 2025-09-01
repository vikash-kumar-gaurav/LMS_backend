import { Router } from "express";
import { authCheck } from "../middleware/authcheck";
import { createNewCourse, ViewAllCourses } from "../controller/course.controller";

const router = Router();

router.post('/create-course',authCheck,createNewCourse)
router.get('/courses',ViewAllCourses)



export default router;