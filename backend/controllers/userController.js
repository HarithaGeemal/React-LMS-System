import User from "../models/user.js"
import Course from "../models/course.js"
import Purchase from "../models/Purchase.js"
import Stripe from "stripe"
import mongoose from "mongoose";
import { CourseProgress } from "../models/courseProgress.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, messege: "User not found" });
        }

        res.json({ success: true, messege: "User fetched successfully", user })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}

// user enrolled courses with lec links

export const userEnrolledCourse = async (req, res) => {
    try {
        const userId = req.auth.userId
        const userData = await User.findById(userId).populate('enrolledCourses')
        if (userData.enrolledCourses.length === 0) {
            return res.json({ success: false, messege: "You have not enrolled any course" });
        }
        res.json({ success: true, messege: "User enrolled courses fetched successfully", enrolledCourses: userData.enrolledCourses })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}


// purchase course
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId

        if (!courseId) {
            return res.json({ success: false, messege: "courseId is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.json({ success: false, messege: "Invalid courseId" });
        }

        const userData = await User.findById(userId)
        const courseData = await Course.findById(courseId)

        if (!userData || !courseData) {
            return res.json({ success: false, messege: "User or course not found" });
        }

        const purchaseData = {
            userId,
            courseId: courseData._id,
            amount: Number(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2),
        }

        // saving purchase data in mongodb
        const newPurchase = await Purchase.create(purchaseData)

        // Stripe Gateway Initialize
        const StripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency = process.env.CURRENCY.toLocaleLowerCase();

        // creating line items for stripe
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle,
                },
                unit_amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100) * 100,
            },
            quantity: 1,
        }]

        const session = await StripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: "payment",
            metadata: {
                purchaseCourseId: newPurchase._id.toString()
            },
            payment_intent_data: {
                metadata: { purchaseCourseId: newPurchase._id.toString() }
            }
        })

        res.json({ success: true, messege: "Course purchased successfully", session_url: session.url })

    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}


// update user Course Progress
export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body

        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, messege: "You have already completed this lecture" });

            }

            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
        }

        res.json({ success: true, messege: "Course progress updated successfully" })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}

// get user Course Progress

export const getUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        res.json({ success: true, messege: "Course progress fetched successfully", progressData })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}

// add user rating to the course
export const addUserRating = async (req, res) => {
    const userId = req.auth.userId
    const { courseId, rating } = req.body;

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, messege: "Invalid  details" })
    }

    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.json({ success: false, messege: "Course not found" });
        }

        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, messege: "User has not purchased this course" });
        }

        const existingRatingIndex = course.courseRatings.findIndex((rating) => rating.userId === userId);

        if (existingRatingIndex > -1) {
            course.courseRatings[existingRatingIndex].rating = rating;
        } else {
            course.courseRatings.push({ userId, rating });
        }

        await course.save();
        return res.json({ success: true, messege: "Rating added successfully" });


    } catch (error) {

        res.json({ success: false, messege: error.message })

    }

}