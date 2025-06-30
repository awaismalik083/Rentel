import React from "react";

const PropertyMapSection = ({ mapUrl }) => {
  // Placeholder image that looks like a society map
  const mapImage = "https://via.placeholder.com/900x400.png?text=Tap+to+View+Society+Map";

  return (
    <div className="location-section px-6 py-4">
      <h2 className="text-2xl font-semibold mb-4">Location & Nearby</h2>

      <div className="tabs mb-4 flex space-x-6 border-b pb-2">
        <span className="font-bold text-green-600 border-b-4 border-green-600">F-8/1 MAP</span>
        <span className="text-gray-600 cursor-pointer">NEARBY</span>
        <a href="/islamabad-maps" className="ml-auto text-green-600">More Islamabad Maps</a>
      </div>

      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative overflow-hidden rounded-xl shadow-md cursor-pointer">
          <img src={mapImage} alt="Society Map" className="w-full h-auto opacity-90 hover:opacity-100 transition" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
            <div className="text-green-600 text-3xl mb-2">📍</div>
            <h3 className="text-xl font-bold text-black">Tap to View Society Maps</h3>
            <p className="text-gray-700">Find out the location of the property on an interactive society map</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PropertyMapSection;
