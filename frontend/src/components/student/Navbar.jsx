import React from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {

    const location = useLocation();
    const isCourseListPage = location.pathname.includes('/course-list');
    const { openSignIn } = useClerk();
    const { user } = useUser();

    return (

        <div className={`flex w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-200 py-4 shadow-sm sticky top-0 z-50 backdrop-blur-md ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`} >
            <img src={assets.logo} alt="Logo" className="w-28 lg:w-32
            cursor-pointer hover:scale-105 transition-transform duration-200"/>

            <div className="hidden md:flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-4">
                    <button className="text-base font-medium hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                        Become Educator
                    </button>

                    <div className="h-5 w-[2px] bg-blue-400"></div>

                    <Link to='/my-enrollments' className="text-base font-medium hover:text-blue-600 transition-colors duration-200">My Enrollments</Link>
                </div>

                {user ? <UserButton /> :
                    <button onClick={() => openSignIn()} className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200 cursor-pointer">Create Account</button>
                }

            </div>

            {/* mobile screen view */}

            <div className="md:hidden flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-8">
                    <button className="hover:text-blue-600 transition cursor-pointer">Become Educator</button>
                    <div className="h-4 w-[2px] bg-gray-500 opacity-70"></div>

                    <Link to='/my-enrollments' className="hover:text-blue-600 transition">My Enrollments</Link>
                </div>

                {user ? <UserButton /> :
                    <button onClick={() => openSignIn()} className="p-2 rounded-full hover:bg-gray-100 transition"><img src={assets.user_icon} alt="User Icon" className="w-6 h-6" /></button>
                }

            </div>
        </div>
    )
}

export default Navbar;