import User from "../models/user.js"
import Course from "../models/course.js"
import Purchase from "../models/Purchase.js"
import Stripe from "stripe"
import mongoose from "mongoose";

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
            line_items: line_items,
            mode: "payment",
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
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
