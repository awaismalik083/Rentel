import React from 'react';
import { useAppContext } from '../Context/Context.jsx';
import { asset } from '../assets/asset.js';

const ListSection = () => {
    const { list_places, card } = useAppContext();

    // Sort card array to place "Downtown Dubai" first
    const sortedCards = [...card].sort((a, b) =>
        a.location.includes("Downtown Dubai") ? -1 : 1
    );

    return (
        <div className="mt-[296px] sm:mt-[296px] md:mt-[296px] lg:mt-0">
            <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-0 text-center max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Explore our listings</h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
                    </p>

                    <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-20">
                        {list_places.map((place, index) => (
                            <div key={index} className="flex flex-col items-center w-24 sm:w-28">
                                <img
                                    src={place.Image}
                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-full border-2 border-gray-200 shadow"
                                    alt={place.name}
                                />
                                <h3 className="mt-2 sm:mt-4 text-sm sm:text-base font-semibold text-gray-800">{place.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-500">{place.listings}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Property Cards Section */}
                <div className="mb-12 md:mb-16">
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">Discover The Latest Real Estate</h1>
                    <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lobortis justo
                    </p>

                    <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mx-auto">
                        {sortedCards.map((place, index) => (
                            <div
                                key={index}
                                className="relative bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="relative">
                                    <img
                                        src={place.Image}
                                        alt={place.title}
                                        className="w-full h-48 sm:h-56 object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Featured
                                    </span>
                                </div>
                                <div className="p-4 sm:p-5">
                                    <h3 className="text-lg font-semibold text-gray-800">{place.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {place.location}
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold text-red-500 mt-2">{place.price}</p>
                                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-4">
                                        <span className="flex items-center">🛏️ {place.beds}</span>
                                        <span className="flex items-center">🛁 {place.baths}</span>
                                        <span className="flex items-center">📏 {place.area}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <button className="text-red-500 text-sm sm:text-base font-semibold hover:underline">
                                            + Compare
                                        </button>
                                        <span className="text-xs sm:text-sm text-gray-500">{place.timePosted}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 md:mt-16 flex flex-col lg:flex-row rounded-lg overflow-hidden shadow-lg">
                    {/* Left Side - Image */}
                    <div className="lg:w-1/2">
                        <img
                            src={asset.bg1}
                            alt="Modern house with pool"
                            className="w-full h-64 sm:h-80 md:h-[400px] object-cover"
                        />
                    </div>
                    {/* Right Side - Content */}
                    <div className="lg:w-1/2 bg-rose-300 p-6 sm:p-8 flex flex-col justify-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                            Explore Your Dream Home or Boost Your Investment Portfolio Today - Your Future Awaits!
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base mt-2 md:mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
                            {/* Agent Card 1 */}
                            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full"></div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">Darlene Robertson</h4>
                                    <button className="text-red-500 text-xs sm:text-sm font-semibold hover:underline">
                                        Contact Seller
                                    </button>
                                </div>
                            </div>
                            {/* Agent Card 2 */}
                            <div className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-full"></div>
                                <div>
                                    <h4 className="text-sm sm:text-base font-semibold text-gray-800">Darlene Robertson</h4>
                                    <button className="text-red-500 text-xs sm:text-sm font-semibold hover:underline">
                                        Contact Seller
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListSection;
