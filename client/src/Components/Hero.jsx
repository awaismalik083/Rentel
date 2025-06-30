import React, { useState } from 'react'
import { asset } from '../assets/asset'

const Hero = () => {
    const [selectedTab, setSelectedTab] = useState('rent');
    const categories = [
        { name: 'Houses', icon: asset.home },
        { name: 'Villa', icon: asset.villa },
        { name: 'Office', icon: asset.office },
        { name: 'Apartments', icon: asset.apartment },
    ];

    return (
        <>
            <div className="relative">
                <img src={asset.bg} alt="" className="w-full h-auto object-cover min-h-[400px] md:min-h-[600px]" />
                <div className="absolute top-0 left-0 w-full flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-16">
                    <div className='text-white pl-0 md:pl-16 m-8 md:m-[117px]'>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Find Your Perfect <br />Property With Us</h1>
                        <p className='w-full sm:w-[19rem] font-bold mt-3 text-xs sm:text-[10px]'>
                            Discover Your Dream Property With Us - Where Perfect Meets Possible in Every Home
                        </p>
                    </div>

                    <div className="mx-auto md:mx-0 mb-8 md:mb-0">
                        <div className='bg-white text-black w-full sm:w-[350px] rounded-xl mt-0 md:mt-[93px] mr-0 md:mr-[20px] p-4 shadow-lg'>
                            {/* Tabs - Fixed positioning */}
                            <div className="flex mb-3">
                                <button
                                    onClick={() => setSelectedTab('rent')}
                                    className={`px-4 py-1 h-[47px] w-[76px] rounded-tl-lg 
                                    ${selectedTab === 'rent' ? 'bg-red-600 text-white' : 'bg-pink-200 text-black'}`}>
                                    Rent
                                </button>
                                <button
                                    onClick={() => setSelectedTab('buy')}
                                    className={`px-4 py-1 h-[47px] w-[76px] rounded-tr-lg 
                                    ${selectedTab === 'buy' ? 'bg-red-600 text-white' : 'bg-pink-200 text-black'}`}>
                                    Buy
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="flex flex-col w-full gap-4 sm:gap-6 mt-0">
                                <input
                                    className='border border-gray-300 rounded-lg h-12 sm:h-14 px-3 placeholder:text-gray-400 text-sm'
                                    type="text"
                                    placeholder='Type keyword...'
                                />
                                <select className='border border-gray-300 rounded-lg h-12 sm:h-14 px-3 text-sm'>
                                    <option>Property type</option>
                                </select>
                                <select className='border border-gray-300 rounded-lg h-12 sm:h-14 px-3 text-sm'>
                                    <option>Location</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                                <button className="bg-pink-200 text-black flex items-center justify-center px-4 py-2 rounded-lg w-1/2 text-sm font-semibold">
                                    Filters <span className="ml-1"><img className='w-4 mt-1' src={asset.filter} alt="" /></span>
                                </button>
                                <button className="bg-red-600 text-white flex items-center justify-center px-4 py-2 rounded-lg w-1/2 text-sm font-semibold">
                                    Search Now <span className="ml-3"><img className='w-4 mt-0.5' src={asset.search} alt="" /></span>
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 rounded-[5px] flex-row w-full sm:w-[355px] h-8 bg-black opacity-80 flex justify-center gap-4 sm:gap-10 items-center">
                            {
                                categories.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 text-white text-[10px]"
                                    >
                                        <img className='w-3 sm:w-4' src={item.icon} alt={item.name} />
                                        <p>{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero