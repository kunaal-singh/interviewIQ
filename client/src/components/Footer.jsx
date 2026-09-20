import React from 'react'
import logo from '../assets/logo (2).png'

function Footer() {
    return (
        <div className='bg-[#f3f3f3] flex justify-center px-4 pb-10 pt-10'>
            <div className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm
            border border-gray-200 py-8 px-3 text-center'>

                <div className='flex flex-col justify-center items-center gap-2 mb-3'>

                    {/* Logo */}
                    <img
                        src={logo}
                        alt="InterviewIQ.AI"
                        className='w-20 h-20 object-contain'
                    />

                    {/* Text */}
                    <h2 className='font-semibold text-lg'>
                        InterviewIQ.AI
                    </h2>

                </div>

                <p className='text-gray-500 text-sm max-w-xl mx-auto'>
                    AI-powered interview preparation platform designed to improve
                    communication skills, technical depth and professional confidence.
                </p>

            </div>
        </div>
    )
}

export default Footer