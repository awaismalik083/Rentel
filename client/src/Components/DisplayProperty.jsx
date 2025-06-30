import React, { useState } from "react";
import Navbar from "./Navbar";
import { DisplayAsset } from "../DisplayAssets/DisplayAsset";
import { asset } from "../assets/asset";
import { Link } from "react-router-dom";
import BlogFooter from "../pages/BlogFooter";
import { useAppContext } from "../Context/Context";
import PropertyCard from "../Components/PropertyCard";
import { cardImages } from "../cardAssets/cardImages";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const DisplayProperty = () => {
  const properties = [
    {
      image: cardImages.img1,
      price: "3.85",
      marla: 8,
      beds: 4,
      baths: 5,
      datePosted: "1 DAY AGO",
    },
    {
      image: cardImages.img2,
      price: "2.98",
      marla: 5,
      beds: 3,
      baths: 4,
      datePosted: "2 DAYS AGO",
    },
    {
      image: cardImages.img3,
      price: "2.98",
      marla: 7,
      beds: 1,
      baths: 2,
      datePosted: "4 DAYS AGO",
    },
    {
      image: cardImages.img4,
      price: "2.98",
      marla: 5,
      beds: 3,
      baths: 4,
      datePosted: "2 DAYS AGO",
    },
    {
      image: cardImages.img2,
      price: "2.98",
      marla: 5,
      beds: 3,
      baths: 4,
      datePosted: "2 DAYS AGO",
    },
    {
      image: cardImages.img1,
      price: "2.98",
      marla: 5,
      beds: 3,
      baths: 4,
      datePosted: "2 DAYS AGO",
    },
  ];

  const { features } = useAppContext();
  const [showAll, setShowAll] = useState(false);
  const visibleFeatures = showAll ? features : features.slice(0, 3);

  const property = DisplayAsset[0];
  const images = [property.image, property.imgae2, property.imgae3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Navbar />
      <section className="w-full min-h-screen bg-white px-10 py-8">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-8">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">
              {property.title}
            </h1>

            {/* Image Carousel */}
            <div className="relative w-full max-w-4xl h-[400px]">
              <img
                src={images[currentImageIndex]}
                alt={`Property ${currentImageIndex + 1}`}
                className="rounded-lg w-full h-full object-cover transition-all duration-300"
              />
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white p-2 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
              >
                ▶
              </button>
            </div>

            {/* Property Location */}
            <p className="mt-4 text-[10px] text-gray-600">{property.location}</p>

            {/* Property Price */}
            <p className="mt-2 text-3xl text-gray-600 font-semibold">
              {property.price}
            </p>

            {/* Property Features */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <img src={asset.area} alt="Area" className="w-5 h-5" />
                <p className="text-sm text-gray-700">{property.area}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={asset.bed} alt="Beds" className="w-5 h-5" />
                <p className="text-sm text-gray-700">{property.beds}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={asset.bath} alt="Baths" className="w-5 h-5" />
                <p className="text-sm text-gray-700">{property.baths}</p>
              </div>
            </div>

            {/* Status Row */}
            <div className="flex justify-between items-center mt-5">
              <div className="flex items-center space-x-2">
                <div className="bg-gray-500 rounded-full w-2 h-2"></div>
                <p className="text-gray-600">{property.status}</p>
              </div>
              <div className="flex items-center space-x-2 mr-[35rem]">
                <div className="bg-gray-500 rounded-full w-2 h-2"></div>
                <p className="text-gray-600">Updated 14 Hours Ago</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h1 className="mt-5 text-3xl font-semibold text-gray-600">
                Description
              </h1>
              <p className="mt-10 max-w-[50rem] text-gray-700 text-[16px]">
                1000 yards bungalow for sale 6 master size bedrooms drawing room
                dinning room. teak wood work peaceful location swimming pool
                basement theatre room for further details feel free to contact us
                INDUS ENTERPRISES
              </p>

              {/* Features Section */}
              <h1 className="mt-10 text-3xl font-semibold text-gray-600">
                Amenities
              </h1>
              <h2 className="text-xl mt-4 font-semibold text-gray-600">
                Main Features
              </h2>
              <ul className="mt-4 space-y-2">
                {visibleFeatures.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
              {features.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-3 text-sm text-blue-600 font-medium hover:underline"
                >
                  {showAll ? "Show Less ▲" : "Show More ▼"}
                </button>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[300px]">
            <div className="bg-white rounded-xl mt-12 border border-gray-200 shadow-md p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                PKR <span className="text-2xl">25 Crore</span>
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white text-sm font-medium py-3 w-full rounded-lg flex justify-center items-center gap-2">
                <img src={asset.phone} alt="Phone Icon" className="w-5 h-5" />
                Show Phone Number
              </button>
            </div>

            <div className="flex flex-col bg-white border border-gray-200 shadow-md p-6 space-y-4 rounded-xl mt-10">
              <h1 className="text-2xl font-semibold">Ask About Property</h1>
              <input
                className="w-full py-3 outline-none p-3 text-[13px] border-b border-gray-300"
                type="text"
                placeholder="Enter Your Name"
                required
              />
              <input
                className="w-full py-3 outline-none p-3 text-[13px] border-b border-gray-300"
                type="email"
                placeholder="Email is Required"
                required
              />
              <input
                className="w-full py-3 outline-none p-3 text-[13px] border-b border-gray-300"
                type="tel"
                placeholder="Phone Number"
                required
              />
              <textarea
                className="w-full outline-none text-[14px] p-3 border border-gray-300 rounded-md"
                rows="4"
                placeholder="I would like to inquire about your property. Please contact me at your earliest convenience."
              ></textarea>
              <button className="border-2 border-gray-700 hover:bg-gray-200 w-full py-2 rounded-md flex items-center justify-center gap-2">
                <img src={asset.email} alt="Email Icon" className="w-4 h-4" />
                Send Email
              </button>
            </div>

            <div className="w-full h-auto flex flex-col rounded-xl drop-shadow-2xl bg-white border border-gray-200 mt-6 p-4">
              <h1 className="text-3xl font-semibold">Useful Links</h1>
              <p className="mt-5 font-semibold text-[15px]">Other Useful Links</p>
              <Link to="#" className="hover:text-blue-600 text-[12px] mt-5">
                Houses For Sale in DHA Phase 6 Karachi (855)
              </Link>
              <Link to="#" className="hover:text-blue-600 text-[12px] mt-3">
                Flats For Sale in Bahawalpur DHA (455)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🏠 Property Carousel Section */}
      <div className="px-6 pb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Similar Properties
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {properties.map((property, index) => (
            <SwiperSlide key={index}>
              <PropertyCard {...property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <BlogFooter />
    </>
  );
};

export default DisplayProperty;
