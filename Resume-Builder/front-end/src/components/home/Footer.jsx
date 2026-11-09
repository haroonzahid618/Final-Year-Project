import React from 'react'

const Footer = () => {
   
  return (
    <div>
         <div id='contact' className="px-6 md:px-16 lg:px-24 xl:px-32 mt-40
         bg-gradient-to-r from-white via-green-200/60 to-white">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src="./logo.svg" alt="logo" />
                    <p className="max-w-[410px] mt-6">Create edit and download professional resumes with AI-powered features.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        <ul className="mt-2 space-y-2">
                             <p className="text-slate-800 font-semibold">Product</p>
                            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Affiliate</a></li>
                        </ul>
                        <ul className="mt-2 space-y-2">
                             <p className="text-slate-800 font-semibold">Product</p>
                            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Affiliate</a></li>
                        </ul>
                        <ul className="mt-2 space-y-2">
                             <p className="text-slate-800 font-semibold">Product</p>
                            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Support</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-green-600 transition">Affiliate</a></li>
                        </ul>
                    

                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright 2026 © <a href="https://prebuiltui.com">Resmue</a> All Right Reserved.
            </p>
        </div>
      
    </div>
  )
}

export default Footer
