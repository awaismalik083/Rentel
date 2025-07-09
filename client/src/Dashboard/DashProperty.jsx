import React from 'react';
import { FaMapMarkerAlt, FaBed, FaBath, FaWifi, FaSmoking, FaParking } from 'react-icons/fa';
import { MdBalcony, MdOutlineKitchen } from 'react-icons/md';
import { PiRuler } from 'react-icons/pi';
import { asset } from '../assets/asset';
import DashSidebar from './DashSidebar';
import DashNavbar from './DashNavbar';

const DashProperty = () => {
    return (
        <>
           <DashNavbar/>
            <div className="w-full  min-h-screen bg-white mt-10">
                <div className="max-w-7xl lg:max-w-[67rem] lg:ml-[11rem] mx-auto p-4 sm:p-6 bg-gray-300 rounded-xl shadow-md font-sans">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Section */}
                        <div className="bg-white w-full justify-center pt-6 rounded-xl px-4 sm:px-6">
                            <div className="w-full lg:w-[95%] space-y-6 mx-auto">
                                {/* Main Image */}
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                                        alt="Main"
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                    <button className="absolute bottom-4 left-4 px-4 py-1 bg-white text-black rounded-md text-sm shadow">
                                        Virtual Tour
                                    </button>
                                </div>

                                {/* Thumbnails */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                                        alt=""
                                        className="rounded-xl h-24 w-full object-cover"
                                    />
                                    <div className="relative">
                                        <img
                                            className="rounded-xl h-24 w-full object-cover"
                                            src={asset.sg}
                                            alt=""
                                        />
                                       
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-gray-600">APARTMENT</h3>
                                    <h1 className="text-2xl font-bold text-gray-900">Star Sun Hotel & Apartment</h1>
                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                        <FaMapMarkerAlt className="mr-1" /> Jl Letda Nasir 45 RT 001/02
                                    </p>
                                </div>

                                {/* Facilities */}
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><FaBed /> 2 Beds</div>
                                    <div className="flex items-center gap-2"><FaBath /> 3 Baths</div>
                                    <div className="flex items-center gap-2"><PiRuler /> 24M area</div>
                                    <div className="flex items-center gap-2"><MdOutlineKitchen /> Kitchen</div>
                                    <div className="flex items-center gap-2"><MdBalcony /> Balcony</div>
                                    <div className="flex items-center gap-2"><FaWifi /> Wifi</div>
                                    <div className="flex items-center gap-2"><FaSmoking /> Smoking Area</div>
                                    <div className="flex items-center gap-2"><FaParking /> Parking Area</div>
                                </div>

                                {/* Description */}
                                <div className="mt-4 text-gray-600 mb-6 text-sm leading-relaxed">
                                    <p>
                                        Star Apartment by Star Hotel is an inn that has a room concept in an apartment, which is comfortable and clean.
                                        This apartment is located in a strategic area of Semarang City, thus providing easy access to several famous
                                        places in Semarang City. With the facilities and services in this apartment, you can make this apartment your
                                        vacation accommodation with your family or partner.
                                        <span className="text-blue-500 ml-1 cursor-pointer">Learn More</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Agent, Price, Map */}
                        <div className="w-full lg:w-1/3 space-y-6">
                            {/* Agent */}
                            <div className="rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="agent" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <h4 className="text-md font-bold text-gray-900">Jaydon Lipshutz</h4>
                                        <p className="text-sm text-gray-500">AGENT</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Ampera 3 no 8 Daerah Khusus</p>
                                <p className="text-sm text-gray-500">12 Properties</p>
                                <div className="flex gap-2 mt-4">
                                    <button className="bg-blue-600 text-white px-4 py-1 rounded-md text-sm">Message</button>
                                    <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm">Call</button>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="bg-white rounded-xl p-4 shadow-sm">
                                <p className="text-lg font-semibold text-gray-900">Price</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    $80 <span className="text-sm text-gray-500">/night</span>
                                </p>
                            </div>

                            {/* Map */}
                            <div className="rounded-xl bg-white overflow-hidden shadow-sm">
                                <img
                                    src={asset.maps}
                                    alt="map"
                                    className="w-full h-48 object-cover"
                                />
                            </div>

                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           <DashSidebar/>

        </>
    );
};

export default DashProperty;
