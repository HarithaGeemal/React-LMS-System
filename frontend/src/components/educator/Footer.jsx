import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
    return (

        <footer className='flex md:flex-row flex-col-reverse items-center 
    justify-between w-full px-8 md:px-16 py-6 border-t border-gray-200 
    bg-gray-50 text-sm'>

            {/* Left Section */}
            <div className="flex items-center gap-4 text-gray-600">

                <img
                    className="hidden md:block w-24 object-contain"
                    src={assets.skilloralogo}
                    alt="logo"
                />

                <div className="hidden md:block h-6 w-px bg-gray-300"></div>

                <p className="text-xs md:text-sm tracking-wide">
                    © 2026 Skillora. All Rights Reserved.
                </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 max-md:mb-4">

                <a
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                    <img className="w-5 h-5" src={assets.facebook_icon} alt="facebook" />
                </a>

                <a
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                    <img className="w-5 h-5" src={assets.twitter_icon} alt="twitter" />
                </a>

                <a
                    href="#"
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                    <img className="w-5 h-5" src={assets.instagram_icon} alt="instagram" />
                </a>

            </div>

        </footer>

    )
}

export default Footer
