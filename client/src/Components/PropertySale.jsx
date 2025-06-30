import React from 'react'
import { useAppContext } from '../Context/Context'
import { asset } from '../assets/asset'

const PropertySale = () => {
    const { card2, Logos, Sellers, blog } = useAppContext()

    const sortedCards = [...card2].sort((a, b) =>
        a.location.includes("Downtown Dubai") ? -1 : 1
    )

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-12">
            {/* Properties For Sale Header */}
            <div className="text-center mb-8 md:mb-12">
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900'>Properties For Sale</h1>
                <p className='mt-2 md:mt-3 font-semibold text-gray-400 tracking-wide text-xs sm:text-sm md:text-base max-w-2xl mx-auto'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi cumque et rerum illo ipsum
                </p>
            </div>

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
                {sortedCards.map((place, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-[1.02] hover:shadow-lg"
                    >
                        <div className="relative">
                            <img
                                src={place.Image}
                                alt={place.title}
                                className="w-full h-44 sm:h-48 md:h-56 object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                Featured
                            </span>
                        </div>
                        <div className="p-4 sm:p-5">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{place.title}</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">{place.location}</p>
                            <p className="text-lg sm:text-xl font-bold text-red-500 mt-2">{place.price}</p>
                            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 md:mt-6">
                                <span>🛏️ {place.beds} Beds</span>
                                <span>🛁 {place.baths} Baths</span>
                                <span>📏 {place.area} Sqft</span>
                            </div>
                            <div className="flex justify-between items-center mt-3 sm:mt-4">
                                <button className="text-red-500 font-semibold hover:underline text-xs sm:text-sm md:text-base">
                                    + Compare
                                </button>
                                <span className="text-xs text-gray-500">{place.timePosted}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trusted Companies Section */}
            <div className="mt-12 sm:mt-16 md:mt-20">
                <h1 className='text-center text-gray-900 font-bold text-base sm:text-lg md:text-xl'>Trusted by over 150+ major companies</h1>
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-4 sm:mt-6 px-4">
                    {Logos.map((item, index) => (
                        <div key={index} className="flex items-center h-8 sm:h-10 md:h-12">
                            <img 
                                src={item.Image} 
                                alt={`Company logo ${index}`} 
                                className="h-full object-contain max-w-[100px] sm:max-w-[120px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Meet The Agents Section */}
            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">Meet The Agents</h1>
                <p className='text-gray-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base max-w-lg mx-auto'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quis
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 max-w-7xl mx-auto">
                    {Sellers.map((item, index) => (
                        <div key={index} className="relative bg-white rounded-lg overflow-hidden shadow-md">
                            <img 
                                className='w-full h-56 sm:h-60 md:h-64 object-cover' 
                                src={item.Image} 
                                alt={item.name} 
                            />
                            <div className="p-4">
                                <p className='font-semibold text-base sm:text-lg text-gray-800'>{item.name}</p>
                                <p className='text-xs sm:text-sm text-gray-500 mt-1'>{item.description}</p>
                                <div className="flex justify-end gap-2 mt-2 sm:mt-3">
                                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-2 transition">
                                        <img className="w-3 h-3 sm:w-4 sm:h-4" src={asset.mail} alt="mail" />
                                    </button>
                                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-1 sm:p-2 transition">
                                        <img className="w-3 h-3 sm:w-4 sm:h-4" src={asset.phone} alt="phone" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Blog Section */}
            <div className="mt-12 sm:mt-16 md:mt-20 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">From our blog</h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 sm:mt-3 max-w-lg mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mt-8 sm:mt-10 max-w-7xl mx-auto">
                    {blog.map((pic, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                            <div className="relative">
                                <img 
                                    src={pic.Image} 
                                    alt="Blog" 
                                    className="w-full h-44 sm:h-48 md:h-56 object-cover" 
                                />
                                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white px-2 sm:px-3 py-1 rounded-md flex items-center gap-1 sm:gap-2 shadow-sm">
                                    <p className="text-xs sm:text-sm font-semibold">April</p>
                                    <img src={asset.folder} alt="folder" className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <p className="text-xs sm:text-sm font-semibold text-red-600">Housing</p>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5">
                                <p className="font-semibold text-xs sm:text-sm md:text-base leading-tight">
                                    {pic.description.split('\n')[0]}
                                    <br />
                                    {pic.description.split('\n')[1]}
                                </p>
                                <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
                                    <p className='text-red-500 font-semibold text-xs sm:text-sm md:text-base'>Read More</p>
                                    <img className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' src={asset.right} alt="arrow" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PropertySale