import express from "express";
import {addCourse, updateRoleToEducator } from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducatorRoute } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

// add educator role

educatorRouter.get('/update-role' , updateRoleToEducator)
educatorRouter.post('/add-course' , upload.single('image') ,protectEducatorRoute , addCourse)

export default educatorRouter;