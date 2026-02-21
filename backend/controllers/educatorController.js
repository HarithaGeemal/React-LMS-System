import { clerkClient } from "@clerk/express";
import Course from "../models/course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import User from "../models/user.js";


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

export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.json({ success: false, messege: "Please upload course image" });
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId

        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()
        res.json({ success: true, messege: "Course added successfully" })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }

}

// get educator all courses

export const getEducatorCourses = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        res.json({ success: true, messege: "Courses fetched successfully", courses })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }

}

// getting all the data to dashboard

export const getDashboardData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const totalCourses = courses.length;
        const courseId = courses.map(course => course._id)
        const purchases = await Purchase.find({ courseId: { $in: courseId }, status: "completed" })
        const totalEarnings = purchases.reduce((acc, purchase) => acc + purchase.amount, 0)

        // collect unique enrolled student ids enrolled in courses
        const enrolledStudentsData = [];
        for (const course of courses) {
            const students = await User.find({ _id: { $in: course.enrolledStudents } }, 'name email imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });
            });

        }
        res.json({ success: true, dashboardData: { totalCourses, totalEarnings, enrolledStudentsData } })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}

// get enrolled student data with purchase data

export const getEnrolledStudentsData = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({ educator })
        const courseId = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseId }, status: "completed"
        }).populate('userId', 'name email imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudentsData = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.json({ success: true, enrolledStudentsData })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}
