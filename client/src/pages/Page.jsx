import React from 'react'
import { cardAssets } from '../cardAssets/cardAsset'
import Navbar from '../Components/Navbar'

const Page = () => {
  return (
    <>
    <Navbar/>
    <div className="p-4 relative left-0 space-y-6 max-w-5xl  mx-4">
      {cardAssets.map((card) => (
        <div key={card.id} className="flex bg-white shadow-md rounded-lg overflow-hidden">
          {/* Left Side - Image */}
          <div className="relative w-1/3">
            <img src={card.img} alt="Property" className="max-w-[330px] max-h-[330px] object-cover" />
            <div className="absolute bottom-2 left-2 bg-black text-white text-sm px-2 py-0.5 rounded-md">
              📷 {card.photos}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="w-2/3 p-4 flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">PKR {card.price}</h2>
                <p className="text-sm text-gray-600">{card.location}</p>
              </div>
              <span className="text-xs text-gray-500">{card.time}</span>
            </div>

            {/* Features */}
            <div className="flex gap-6 text-sm text-gray-700 mt-3">
              <div>🧱 {card.area}</div>
              <div>🛏️ {card.beds}</div>
              <div>🛁 {card.baths}</div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {/* Placeholder Text */}
              1 Kanal fully furnished brand new modern bungalow. Luxury estate offer 1 Kanal home...
            </p>

            {/* Buttons */}
            <div className="flex mt-4 gap-2">
              <button className="bg-rose-600 text-white px-10 py-4 text-sm rounded-md hover:bg-rose-700"> Call</button>
              <button className="bg-gray-200 text-black px-10 py-4 text-sm rounded-md hover:bg-gray-300"> Email</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Page
