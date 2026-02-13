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
                <div className='flex flex-col md:items-start items-center w-full'>
                    <h2 className='font-semibold text-white mb-5'>Company</h2>

                    <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
                        <li>
                            <a href="#" className="relative inline-block 
            after:content-[''] after:absolute after:left-1/2 after:bottom-0 
            after:w-0 after:h-[2px] after:bg-blue-600 
            after:transition-all after:duration-300 
            after:-translate-x-1/2 
            hover:after:w-[60%]">
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="#" className="relative inline-block 
                                after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                                after:w-0 after:h-[2px] after:bg-blue-600 
                                after:transition-all after:duration-300 
                                after:-translate-x-1/2 
                                hover:after:w-[60%]">
                                About us
                            </a>
                        </li>

                        <li>
                            <a href="#" className="relative inline-block 
                                after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                                after:w-0 after:h-[2px] after:bg-blue-600 
                                after:transition-all after:duration-300 
                                after:-translate-x-1/2 
                                hover:after:w-[60%]">
                                Contact us
                            </a>
                        </li>

                        <li>
                            <a href="#" className="relative inline-block 
                                after:content-[''] after:absolute after:left-1/2 after:bottom-0 
                                after:w-0 after:h-[2px] after:bg-blue-600 
                                after:transition-all after:duration-300 
                                after:-translate-x-1/2 
                                hover:after:w-[60%]">
                                Privacy policy
                            </a>
                        </li>
                    </ul>
                </div>


                <div className='hidden md:flex flex-col items-start w-full'>
                    <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
                    <p className='text-sm text-white/80'>Stay updated with our latest news and offers.</p>
                    <div className='flex items-center gap-2 pt-4'>
                        <input type="email" placeholder='Enter your email'
                            className='border border-gray-500/30 bg-gray-800 text-gray-500
                        placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'/>
                        <button className='bg-blue-600 w-24 h-9 text-white rounded'>Subscribe</button>
                    </div>
                </div>
            </div>
            <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2026 © Skillora. All Right Reserved</p>
        </footer>

    )
}

export default Footer