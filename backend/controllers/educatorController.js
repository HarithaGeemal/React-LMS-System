import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import { v2 as cloudinary } from "cloudinary";


// update user role

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: "educator",
            }
        })

        res.json({ success: true, messege: "User role updated to educator" })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}

// add new course

export const addCourse = async(req, res) => {
    try {
        const {courseData} = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if(!imageFile){
            return res.json({success: false, messege: "Please upload course image"});
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()
        res.json({success: true, messege: "Course added successfully"})

    } catch (error) {
        res.json({success: false, messege: error.message})
    }

}