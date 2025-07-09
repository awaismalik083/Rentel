import React, { useState } from 'react';
import { cardAssets } from '../cardAssets/cardAsset';
import { FaMapMarkerAlt, FaBed, FaBath } from 'react-icons/fa';
import { MdPhotoSizeSelectActual } from 'react-icons/md';
import DashSidebar from './DashSidebar';
import DashNavbar from './DashNavbar';
import DashCarousal from './DashCarousal';

const DashDisplay = () => {
  const [selected, setSelected] = useState('recommended');

  const tabClass = (tab) =>
    `px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
      selected === tab
        ? 'bg-gradient-to-r from-rose-600 to-red-800 text-white shadow-md'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Sidebar on top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <DashSidebar />
      </div>

      {/* Navbar below sidebar */}
      <div className="  z-40">
        <DashNavbar />
      </div>

      {/* Main Content Area */}
      <div className="pt-[140px] px-4">
        <DashCarousal />

        <div className="bg-gray-100 rounded-xl shadow-md ml-[175px] max-w-[64rem] min-h-[40rem] p-6 mt-6">
          {/* Tabs & Filter Section */}
          <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center mb-8">
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setSelected('recommended')} className={tabClass('recommended')}>
                Recommended
              </button>
              <button onClick={() => setSelected('latest')} className={tabClass('latest')}>
                Latest
              </button>
              <button onClick={() => setSelected('popular')} className={tabClass('popular')}>
                Popular
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-[228px] flex items-center gap-2 border px-3 py-2 rounded-lg bg-white">
              <select className="bg-transparent text-sm text-gray-800 border-none outline-none w-full">
                <option>Most Recent</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cardAssets.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition w-full"
              >
                {/* Image */}
                <div className="relative w-full h-44">
                  <img src={item.img} alt="property" className="h-full w-full object-cover" />
                  <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 font-semibold text-sm px-3 py-1 rounded-lg">
                    {item.price}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                    <FaMapMarkerAlt className="text-blue-500" /> {item.location}
                  </p>
                  <div className="flex text-gray-600 text-xs gap-3 mb-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <FaBed /> {item.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath /> {item.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdPhotoSizeSelectActual /> {item.photos}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashDisplay;
