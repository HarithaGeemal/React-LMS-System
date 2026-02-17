import Course from "../models/course.js";

// get all courses

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({
            isPublished: true
        }).select(['-courseContent', '-enrolledStudents']).populate({ path: 'educator' })

        res.json({ success: true, messege: "Courses fetched successfully", courses })
    } catch (error) {
        res.json({ success: false, messege: error.message })
    }
}


// get course by id
export const getCourseId = async (req, res) => {
    const { id } = req.params

    try {
        const courseData = await Course.findById(id).populate({ path: 'educator' })

        // reove lec url if ispreview is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({ success: true, messege: "Course fetched successfully", courseData })
    } catch (error) {

        res.json({ success: false, messege: error.message })

    }
}