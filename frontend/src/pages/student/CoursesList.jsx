import React, { useEffect } from 'react'
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from "../../components/student/SearchBar";
import CourseCard from "../../components/student/CourseCard"
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {

    const { navigate, allCourses } = useContext(AppContext);
    const { input } = useParams()

    const [filteredCourses, setFilteredCourses] = useState([])

    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses.slice();

            input ?
                setFilteredCourses(
                    tempCourses.filter(
                        item => item.courseTitle.toLowerCase().includes(input.toLowerCase())
                    )
                )
                : setFilteredCourses(tempCourses)

        }
    }, [allCourses, input])

    return (
        <>
            <div className='relative md:px-36 px-8 pt-20 text-left'>
                <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
                    <div>
                        <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
                        <p className='text-gray-500'>
                            <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>Home </span> /
                            <span>Course List</span>
                        </p>
                    </div>
                    <div className='ml-0 md:ml-6 w-full md:w-auto'>
                        <SearchBar data={input} />
                    </div>
                </div>

                {input && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600 hover:bg-gray-200 rounded '>
                    <p>{input}</p>
                    <img src={assets.cross_icon} alt="CLear" className=' cursor-pointer ' onClick={() => navigate('/course-list')} />
                </div>
                }

                {input && filteredCourses.length === 0 ? (
                    <div className='my-16 flex flex-col items-center justify-center text-center gap-4 px-2'>
                        <img src={assets.courseNotFound} alt="no_result" className='w-10/12 sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md' />
                        <button
                            onClick={() => navigate('/course-list')}
                            className='mt-2 px-4 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition cursor-pointer'
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
                        {filteredCourses.map((course, index) => (
                            <CourseCard key={course?._id || course?.id || index} course={course} />
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default CoursesList