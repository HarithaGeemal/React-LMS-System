import React, { useRef, useState, useEffect, useContext } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const AddCourse = () => {

    const { BACKEND_URL, getToken } = useContext(AppContext);

    const quilRef = useRef(null);
    const editorRef = useRef(null);

    const [courseTitle, setCourseTitle] = useState('');
    const [coursePrice, setCoursePrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [image, setImage] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [currentChatperId, setCurrentChatperId] = useState(null);
    const [lectureDetails, setLectureDetails] = useState(
        {
            lectureTitle: '',
            lectureDuration: '',
            lectureUrl: '',
            isPreviewFree: false
        }
    );

    const handleChapter = (action, chapterId) => {
        if (action === 'add') {
            const title = prompt('Enter Chapter Title');
            if (title) {
                const newChapter = {
                    chapterId: uniqid(),
                    chapterTitle: title,
                    chapterContent: [],
                    collapsed: false,
                    chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,

                };
                setChapters([...chapters, newChapter]);
            }
        } else if (action === 'remove') {
            setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
        } else if (action === 'toggle') {
            setChapters(
                chapters.map((chapter) => chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter)
            )
        }
    }

    const handleLec = (action, chapterId, lectureId) => {
        if (action === 'add') {
            if (!currentChatperId) return;

            setChapters(prev =>
                prev.map(ch => {
                    if (ch.chapterId !== currentChatperId) return ch;

                    const nextOrder = (ch.chapterContent?.length ?? 0) + 1;

                    const newLecture = {
                        lectureId: uniqid(),
                        lectureTitle: lectureDetails.lectureTitle.trim(),
                        lectureUrl: lectureDetails.lectureUrl.trim(),
                        lectureDuration: Number(lectureDetails.lectureDuration),
                        isPreviewFree: Boolean(lectureDetails.isPreviewFree),
                        lectureOrder: nextOrder,
                    };

                    return { ...ch, chapterContent: [...ch.chapterContent, newLecture] };
                })
            );


            setShowPopup(false);
            setCurrentChatperId(null);
            setLectureDetails({ lectureTitle: '', lectureDuration: '', lectureUrl: '', isPreviewFree: false });

        } else if (action === 'remove') {
            setChapters(prev =>
                prev.map(ch => {
                    if (ch.chapterId !== chapterId) return ch;

                    const updated = ch.chapterContent
                        .filter(lec => lec.lectureId !== lectureId)
                        .map((lec, i) => ({ ...lec, lectureOrder: i + 1 })); // ✅ keep orders clean

                    return { ...ch, chapterContent: updated };
                })
            );
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!image) {
                toast.error('Please select a course image');
                return;
            }

            if (chapters.length === 0) {
                toast.error("Add at least one chapter");
                return;
            }

            for (const ch of chapters) {
                if (!ch.chapterTitle?.trim()) {
                    toast.error("Chapter title is required");
                    return;
                }
                if (!ch.chapterContent || ch.chapterContent.length === 0) {
                    toast.error(`Chapter "${ch.chapterTitle}" has no lectures`);
                    return;
                }
                for (const lec of ch.chapterContent) {
                    if (!lec.lectureTitle?.trim() || !lec.lectureUrl?.trim() || !lec.lectureDuration) {
                        toast.error(`Fill all lecture fields in chapter "${ch.chapterTitle}"`);
                        return;
                    }
                    if (lec.lectureOrder == null) {
                        toast.error(`Lecture order missing in chapter "${ch.chapterTitle}"`);
                        return;
                    }
                }
            }


            const courseData = {
                courseTitle,
                courseDescription: quilRef.current.root.innerHTML,
                coursePrice: Number(coursePrice),
                discount: Number(discount),
                courseContent: chapters
            }

            const formData = new FormData();
            formData.append('courseData', JSON.stringify(courseData));
            formData.append('image', image);

            const token = await getToken();
            const base = BACKEND_URL.replace(/\/$/, "");

            const { data } = await axios.post(`${base}/api/educator/add-course`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                toast.success(data.messege);
                setCourseTitle('');
                setCoursePrice(0);
                setDiscount(0);
                setImage(null);
                setChapters([]);
                quilRef.current.root.innerHTML = '';
            } else {
                toast.error(data.messege);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (!quilRef.current && editorRef.current) {
            quilRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }

    }, [])




    return (
        <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
                <div className='flex flex-col gap-1'>
                    <p>Course Title</p>
                    <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type='text' placeholder='Type Here'
                        className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
                </div>
                <div className='flex flex-col gap-1'>
                    <p>Course Description</p>
                    <div ref={editorRef}></div>
                </div>

                <div className='flex items-center justify-between flex-wrap'>
                    <div className='flex flex-col gap-1'>
                        <p>Course Price</p>
                        <input onChange={e => setCoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0'
                            className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
                    </div>

                    <div className='flex md:flex-row flex-col items-center gap-3'>
                        <p>Course Thumbnail</p>
                        <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
                            <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded cursor-pointer' />
                            <input type='file' id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
                            {image && <img className='max-h-10' src={URL.createObjectURL(image)} alt="preview" />}

                        </label>
                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <p>Discount %</p>
                    <input onChange={e => setDiscount(e.target.value)} value={discount} type="number" placeholder='0'
                        min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
                </div>

                {/* adding cahpters and lecs */}
                <div>
                    {chapters.map((chapter, chapterIndex) => (
                        <div key={chapter.chapterId} className='bg-white border rounded-lg mb-4'>
                            <div className='flex justify-between items-center p-4 border-b'>
                                <div className='flex items-center'>
                                    <img src={assets.dropdown_icon} alt="" width={14} onClick={() => handleChapter('toggle', chapter.chapterId)} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`} />
                                    <span className='font-semibold'>{chapterIndex + 1}.{chapter.chapterTitle}</span>
                                </div>
                                <span className='text-gray-500'>
                                    {chapter.chapterContent.length} Lectures
                                </span>
                                <img
                                    src={assets.cross_icon}
                                    className='cursor-pointer'
                                    onClick={() => handleChapter('remove', chapter.chapterId)}
                                />

                            </div>
                            {
                                !chapter.collapsed && (
                                    <div className='p-4'>
                                        {chapter.chapterContent.map((lecture, lectureIndex) => (
                                            <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                                                <span>{lectureIndex + 1}{lecture.lectureTitle}-{lecture.lectureDuration}
                                                    mins - <a href={lecture.lectureUrl}
                                                        target='_blank' rel="noreferrer" className='text-blue-500'>Link</a> -{lecture.isPreviewFree ? "Free Preview" : "Paid Preview"}</span>
                                                <img
                                                    src={assets.cross_icon}
                                                    className='cursor-pointer'
                                                    onClick={() => handleLec('remove', chapter.chapterId, lecture.lectureId)}
                                                />

                                            </div>
                                        ))}

                                        <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={() => {
                                            setCurrentChatperId(chapter.chapterId)
                                            setShowPopup(true)
                                        }}> + Add Lectures </div>
                                    </div>
                                )}
                        </div>
                    ))}
                    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={() => handleChapter('add')}> + Add Chapters</div>
                    {
                        showPopup && (
                            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
                                <div className='bg-white text-gray-700 p-4 rounded-3xl relative w-full max-w-80'>
                                    <h2 className='text-lg font-semibold mb-4'>Add Lectures</h2>
                                    <div className='mb-2'>
                                        <p>Lecture Title</p>
                                        <input type="text"
                                            className='mt-1 block w-full border rounded py-1 px-2'
                                            value={lectureDetails.lectureTitle}
                                            onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })} />
                                    </div>

                                    <div className='mb-2'>
                                        <p>Duration (minutes)</p>
                                        <input type="number"
                                            className='mt-1 block w-full border rounded py-1 px-2'
                                            value={lectureDetails.lectureDuration}
                                            onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })} />
                                    </div>

                                    <div className='mb-2'>
                                        <p>Lecture URL</p>
                                        <input type="text"
                                            className='mt-1 block w-full border rounded py-1 px-2'
                                            value={lectureDetails.lectureUrl}
                                            onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })} />
                                    </div>

                                    <div className='flex gap-2 my-4'>
                                        <p>Is Preview Free?</p>
                                        <input type="checkbox"
                                            className='mt-1 scale-125'
                                            checked={lectureDetails.isPreviewFree}
                                            onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })} />
                                    </div>

                                    <button type='button' className='w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400' onClick={() => handleLec('add')}>Add</button>
                                    <img onClick={() => setShowPopup(false)} src={assets.cross_icon} alt="" className='absolute top-4 right-4 w-4 cursor-pointer' />
                                </div>

                            </div>
                        )
                    }
                </div>
                <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4 cursor-pointer hover:bg-gray-800'>ADD</button>
            </form>
        </div>
    )
}

export default AddCourse