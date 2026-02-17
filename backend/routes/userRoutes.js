import express from "express";
import { getUserData, userEnrolledCourse, purchaseCourse } from "../controllers/userController.js";


export const userRouter = express.Router();

userRouter.get('/user-data', getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourse)
userRouter.post('/purchase', purchaseCourse)


export default userRouter