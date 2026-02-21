import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {


    const currency = import.meta.env.VITE_CURRENCY
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const { getToken } = useAuth();
    const { user } = useUser();

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(false)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [userData, setUserData] = useState(null)

    //fetch all courses

    const fetchAllCourses = async () => {
        try {
            const base = BACKEND_URL.replace(/\/$/, "");
            const { data } = await axios.get(`${base}/api/course/all`);

            if (data.success) {
                setAllCourses(data.courses)
            } else {
                toast.error(data.messege)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // fetch userData

    const fetchUserData = async () => {

        if (user?.publicMetadata?.role === "educator") {
            setIsEducator(true);
        }

        try {
            const token = await getToken();

            const base = BACKEND_URL.replace(/\/$/, "");
            const { data } = await axios.get(`${base}/api/user/user-data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.messege)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to claculate average rating of course
    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        })

        return Math.floor(totalRating / course.courseRatings.length);

    }

    // functoin to claculate course chapter time
    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });
    }

    // function to calculate total course time

    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration));
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });
    }

    // fucntion to calculate total lectures
    const calculateNumberOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        })
        return totalLectures;
    }

    // fetch user enrolled courses

    const fetchUserEnrolledCourses = async () => {
        try {
            const token = await getToken();
            const base = BACKEND_URL.replace(/\/$/, "");
            const { data } = await axios.get(`${base}/api/user/enrolled-courses`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse())
            } else {
                toast.error(data.messege)
            }

        } catch (error) {

            toast.error(error.message)
        }
    }


    useEffect(() => {
        fetchAllCourses();
    }, []);



    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchUserEnrolledCourses();
        }
    }, [user])

    const value = {
        currency, allCourses, navigate, calculateRating, isEducator, setIsEducator,
        calculateChapterTime, calculateCourseDuration, calculateNumberOfLectures, enrolledCourses,
        fetchUserEnrolledCourses, BACKEND_URL, userData, setUserData, getToken, fetchAllCourses
    }



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
