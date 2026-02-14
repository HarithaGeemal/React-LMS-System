import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {

    const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);
    const [progressArray, setProgressArray] = useState([
        { lectureCompleted: 2, totalLectures: 4 },
        { lectureCompleted: 5, totalLectures: 20 },
        { lectureCompleted: 0, totalLectures: 15 },
        { lectureCompleted: 10, totalLectures: 10 },
        { lectureCompleted: 30, totalLectures: 55 },
        { lectureCompleted: 100, totalLectures: 300 },
        { lectureCompleted: 40, totalLectures: 100 },
        { lectureCompleted: 20, totalLectures: 55 },
        { lectureCompleted: 0, totalLectures: 12 },
        { lectureCompleted: 12, totalLectures: 80 },
        { lectureCompleted: 0, totalLectures: 60 },
        { lectureCompleted: 0, totalLectures: 10 },
        { lectureCompleted: 60, totalLectures: 60 },
        { lectureCompleted: 40, totalLectures: 40 }
    ])
    return (
        <>
            <div className='md:px-36 px-8 pt-14 pb-12 bg-gray-50 min-h-screen'>

                <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>
                    My Enrollments
                </h1>

                <table className='md:table-auto table-fixed w-full mt-10 border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white'>

                    <thead className='bg-gray-100 text-gray-700 border-b border-gray-200 text-sm uppercase tracking-wider text-left max-sm:hidden'>
                        <tr>
                            <th className='px-6 py-4 font-semibold truncate'>
                                Course Title
                            </th>
                            <th className='px-6 py-4 font-semibold truncate'>
                                Duration
                            </th>
                            <th className='px-6 py-4 font-semibold truncate'>
                                Completed
                            </th>
                            <th className='px-6 py-4 font-semibold truncate'>
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody className='text-gray-700'>
                        {enrolledCourses.map((course, index) => (
                            <tr key={index} className='border-b border-gray-500/20'>
                                <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                                    <img src={course.courseThumbnail} alt="" className='w-14 sm:w-24' />
                                    <div className='flex-1'>
                                        <p className='mb-1 max-sm:text-sm'>{course.courseTitle}</p>
                                        <Line strokeWidth={2} percent={progressArray[index] ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures : 0} className='bg-gray-300 rounded-full' />
                                    </div>
                                </td>

                                <td className='px-4 py-3 max-sm:hidden'>
                                    <p>{calculateCourseDuration(course)}</p>
                                </td>

                                <td className='px-4 py-3 max-sm:hidden'>
                                    <p> {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`} <span>Lectures</span></p>
                                </td>

                                <td className='px-4 py-3 max-sm:text-right'>
                                    <button className='px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded-full hover:bg-blue-700 cursor-pointer'
                                        onClick={() => navigate('/player/' + course._id)}>
                                        {progressArray[index] && progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1 ? "Completed" : "On Going"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <Footer />
        </>
    )
}

export default MyEnrollments