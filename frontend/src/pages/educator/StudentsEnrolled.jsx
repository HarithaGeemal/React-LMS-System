import React, { useEffect, useState, useContext } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading';
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const StudentsEnrolled = () => {

    const { BACKEND_URL, getToken, isEducator } = useContext(AppContext);
    const [enrolledStudents, setEnrolledStudents] = useState([]);

    const fetchEnrolledStudents = async () => {
        try {
            const token = await getToken();
            const base = BACKEND_URL.replace(/\/$/, "");
            const { data } = await axios.get(`${base}/api/educator/enrolled-students`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {

                const list = Array.isArray(data.enrolledStudentsData) ? data.enrolledStudentsData : [];
                setEnrolledStudents(list.slice().reverse());
            } else {
                toast.error(data.messege);
                setEnrolledStudents([]);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (isEducator) {
            fetchEnrolledStudents();
        }

    }, [isEducator])

    return enrolledStudents.length > 0 ? (
        <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
            <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
                <table className='table-fixed md:table-auto w-full overflow-hidden pb-4'>

                    <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                        <tr>
                            <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                            <th className='px-4 py-3 font-semibold'>Student Name</th>
                            <th className='px-4 py-3 font-semibold'>Course Title</th>
                            <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
                        </tr>
                    </thead>

                    <tbody className='text-sm text-gray-500'>
                        {enrolledStudents.map((item, index) => (
                            <tr key={index} className='border-b border-gray-500/20'>
                                <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                                <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                                    <img src={item.student?.imageUrl || ""} alt="" className="w-9 h-9 rounded-full" />
                                    <span className="truncate">{item.student?.name || "Unknown"}</span>
                                </td>

                                <td className='px-4 py-3 truncate'>{item.courseTitle}</td>
                                <td className='px-4 py-3 hidden sm:table-cell'>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <div className="min-h-screen md:p-8 p-4 pt-8">
            <p className="text-gray-500">No enrolled students yet.</p>
        </div>
    );
}

export default StudentsEnrolled