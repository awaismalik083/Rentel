import React from 'react';

const PropertyCard = ({ image, price, marla, beds, baths, datePosted }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border w-full max-w-xs bg-white">
      <div className="relative">
        <img src={image} alt="Property" className="w-full h-48 object-cover" />
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-0.5 rounded">
          {datePosted}
        </span>
      </div>
      <div className="p-4">
        <p className="text-gray-700 text-lg font-semibold">PKR <span className="text-blue-700 text-xl">{price} Crore</span></p>
        <p className="text-sm text-blue-600">DHA 9 Town - Block A</p>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <p>📐 {marla} Marla</p>
          <p>🛏 {beds}</p>
          <p>🛁 {baths}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">📞 Call</button>
          <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-lg text-sm">📧 Email</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
