import React, { useContext, useRef, useEffect, useState } from "react";
import { PropertyContext } from "../Context/PropertyContext";
import { FaMapMarkerAlt, FaBed, FaBath, FaArrowsAltH } from "react-icons/fa";
import { IoArrowForwardCircle, IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const DashCarousal = () => {
  const { propertyData } = useContext(PropertyContext);
  const [shuffledProperties, setShuffledProperties] = useState([]);


  const scrollRef = useRef(null);

  // Function to shuffle array randomly
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    // Normalize the data
    const properties = Array.isArray(propertyData)
      ? propertyData
      : propertyData?.properties || [];

    // Shuffle the properties array
    if (properties.length > 0) {
      setShuffledProperties(shuffleArray(properties));
    }
  }, [propertyData]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -270 : 270,
        behavior: "smooth",
      });
    }
  };

  const Card = ({
    image,
    price,
    title,
    location,
    beds,
    baths,
    size,
    Purpose,
  }) => (
    <div className="relative bg-white w-[271px] rounded-xl shadow-md flex-shrink-0 group mx-2">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt="property"
          className="h-44 w-full rounded-xl object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-[#D7E2FF] text-blue-800 text-sm px-3 py-1 rounded-md font-semibold z-20">
          {price !== "N/A" ? `Rs ${price}` : "Price not set"}
        </span>
      </div>

      {/* Text Section */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <FaMapMarkerAlt className="text-blue-600" size={12} /> {location}
        </p>
        <div className="bg-blue-100 mt-2 w-fit px-4 py-1 text-blue-600 text-sm text-center rounded-2xl font-medium">
          {Purpose}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700 mt-3">
          <div className="flex items-center gap-1">
            <FaBed size={12} /> {beds}
          </div>
          <div className="flex items-center gap-1">
            <FaBath size={12} /> {baths}
          </div>
          <div className="flex items-center gap-1">
            <FaArrowsAltH size={12} /> {size}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative hidden lg:block mt-5 ml-[176px] max-w-full overflow-x-hidden mx-auto p-4  bg-gray-100 rounded-xl z-30">
      <div className="flex items-center gap-4  w-full">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="text-black hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
        >
          <IoArrowBackCircle size={36} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden scrollbar-hide snap-x snap-mandatory gap-1 w-full px-2"
        >
          {shuffledProperties.length > 0 ? (
            shuffledProperties.map((prop) => (
              <Link to="/dashproperty" state={{ property: prop }}>
                <Card  className ="hover:shadow-2xl cursor-pointer"
                  key={prop._id}
                  image={
                    prop.Images && prop.Images.length > 0
                      ? `http://localhost:3000${prop.Images[0]}`
                      : "/placeholder.jpg" // fallback image
                  }
                  price={prop.monthlyRent || prop.price || "N/A"}
                  title={prop.Title || prop.Property_Type || prop.Home_Type}
                  location={`${prop.City || ""}${
                    prop.Location ? ", " + prop.Location : ""
                  }`}
                  beds={prop.Bed || 0}
                  baths={prop.Bath || 0}
                  size={`${prop.Area_Size || "N/A"} ${prop.Area_Unit || ""}`}
                  Purpose={prop.Purpose || "N/A"}
                />
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No properties available</p>
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="text-black hover:scale-110 transition p-1 md:p-2 z-40 shrink-0"
        >
          <IoArrowForwardCircle size={36} />
        </button>
      </div>
    </div>
  );
};

export default DashCarousal;
