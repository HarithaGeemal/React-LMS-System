import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
    return (
        <div className="flex flex-col items-center gap-4 pt-10 pd-24 px-8 md:px-0">
            <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">Learn anything,anytime,anywhere</h1>
            <p className="text-gray-500 sm:text-sm">Learn at your own pace with expert-led courses designed to fit your goals and schedule.<br/>
                Whether you're building new skills, advancing your career, or exploring a new passion,
                our interactive  <br /> lessons and supportive community help you stay motivated and achieve
                real results — from anywhere in the world.
            </p>
            <div className="flex items-center font-medium gap-6 mt-4">
                <button className="px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">Start Learning</button>
                <button className="flex items-center gap-2 cursor-pointer">Learn more <img src={assets.arrow_icon} alt="arrow_icon" /></button>
            </div>
        </div>
    )
}

export default CallToAction