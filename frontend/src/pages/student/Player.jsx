import React, { use, useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
import { assets } from '../../assets/assets'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'


const Player = () => {

    const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [playerData, setPlayerData] = useState(null);



    const getCourseData = () => {
        enrolledCourses.map((course) => {
            if (course._id === courseId) setCourseData(course);

        })
    }

    const extractVideoId = (url) => {
        if (!url) return null;
        try {
            const u = new URL(url);
            // works for https://www.youtube.com/watch?v=XXXX
            const v = u.searchParams.get("v");
            if (v) return v;

            // bonus: support youtu.be/XXXX and /embed/XXXX
            const m = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/);
            return m ? (m[1] || m[2]) : null;
        } catch {
            // if user stored only the id
            return /^[a-zA-Z0-9_-]{11}$/.test(url) ? url : null;
        }
    };

    const videoId = extractVideoId(playerData?.lectureUrl);

    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev, [index]: !prev[index]
        }))
    }

    useEffect(() => {
        getCourseData();
    }, [enrolledCourses])



    return (
        <>
            <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
                {/* Left Column */}
                <div className='text-gray-800'>
                    <h2 className='text-xl font-semibold'>Course Structure</h2>

                    <div className='pt-5'>
                        {courseData && courseData.courseContent.map((chapter, index) => (
                            <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                                <div className='flex items-center justify-between px-4 py-3
                                                        cursor-pointer select-none' onClick={() => toggleSection(index)}>
                                    <div className='flex items-center gap-2'><img className={`transform transition-transform ${openSections[index] ? 'rotate-180' : 'rotate-0'}`}
                                        src={assets.down_arrow_icon} alt="arrow icon" />
                                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                                    </div>
                                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                                </div>

                                <div className={` overflow-hidden transition-all duration-300  ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>
                                    <ul className='list-disc list-inside md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                                        {
                                            chapter.chapterContent.map((lecture, i) => (
                                                <li key={i} className='flex items-start gap-2 py-1'>
                                                    <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className='w-4 h-4 mt-1' />
                                                    <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                                        <p>{lecture.lectureTitle}</p>
                                                        <div className='flex gap-2'>
                                                            {lecture.lectureUrl && <p onClick={() => setPlayerData({
                                                                ...lecture, chapter: index + 1, lecture: i + 1
                                                            })}
                                                                className='text-blue-500 cursor-pointer hover:underline hover:text-blue-600'>Watch</p>}
                                                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'], round: true })}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className='flex items-center gap-2 py-3 mt-10'>
                        <h1 className='text-xl font-bold'>Rate this Course</h1>
                        <div className="flex items-center flex-nowrap">
                            <Rating initialRating={0} />

                        </div>
                    </div>

                </div>



                {/* right column */}
                <div className='md:mt-10'>
                    {videoId ? (
                        <div>
                            <YouTube videoId={videoId} iframeClassName="w-full aspect-video" />
                            <div className="flex justify-between items-center mt-1">
                                <p>
                                    {playerData?.chapter}.{playerData?.lecture} {playerData?.lectureTitle}
                                </p>
                                <button className="text-blue-600 hover:underline cursor-pointer">
                                    Mark Completed
                                </button>
                            </div>
                        </div>
                    ) : courseData?.courseThumbnail ? (
                        <img src={courseData.courseThumbnail} alt="course thumbnail" />
                    ) : (
                        <div className="text-gray-500 text-sm">Select a lecture to play</div>
                    )}

                </div>
            </div>

            <Footer />
        </>
    )
}

export default Player