import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
            <div className='flex flex-col md:flex-row items-start px-8 
            md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
                <div className='flex flex-col md:items-start items-center w-full'>
                    <img src={assets.skilloralogo_dark} alt="logo_dark" />
                    <p className='mt-6 text-center md:text-left text-sm text-white/80'>Empowering learners everywhere with high-quality, practical courses designed for real-world success.
                        Build skills, grow your career, and achieve your goals with flexible learning that fits your life.
                    </p>
                </div>
                <div></div>
                <div></div>
            </div>
            <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2026 © Skillora. All Right Reserved</p>
        </footer>

    )
}

export default Footer