import express from "express";
import { getUserData, userEnrolledCourse, purchaseCourse, updateUserCourseProgress, getUserCourseProgress, addUserRating } from "../controllers/userController.js";


export const userRouter = express.Router();

userRouter.get('/user-data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourse)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-course-progress', getUserCourseProgress)
userRouter.post('/add-rating', addUserRating)


export default userRouter