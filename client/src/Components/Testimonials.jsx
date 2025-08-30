"use client";


import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Nguyen",
    location: "San Francisco",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "Rentels truly cares about their clients. They listened to my needs and preferences and helped me find the perfect home in the Bay Area. Their professionalism and attention to detail are unmatched.",
    photo:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Michael Rodriguez",
    location: "San Diego",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    feedback:
      "I had a fantastic experience working with Rentels. Their expertise and personalized service exceeded my expectations. I found my dream home quickly and smoothly. Highly recommended!",
    photo: "/img1.jpg",
  },
  {
    name: "Emily Johnson",
    location: "Los Angeles",
    rating: 5.0,
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    feedback:
      "Rentels made my dream of owning a home a reality! Their team provided exceptional support and guided me through every step of the process. I couldn't be happier with my new home!",
    photo:
      "/img2.jpg",
  },
];

export default function Testimonials() {
  

 
  return (
    <div className="min-h-screen bg-[#fff8f4] flex flex-col items-center justify-center px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#40230f]">
        What People Say <br /> About Rentels
      </h2>

      {/* Cards Container */}
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full justify-center">
        {testimonials.slice().map((t, idx) => (
          <div
            key={idx}
            className="bg-[#f6e8df] rounded-lg overflow-hidden shadow-md w-full max-w-sm transition-all"
          >
            <img
              src={t.photo}
              alt="room"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-yellow-500 font-semibold">
                  <FaStar />
                  {t.rating}
                </div>
              </div>
              <p className="text-sm text-gray-700">{t.feedback}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {/* <div className="flex gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="w-10 h-10 bg-[#40230f] text-white rounded-full flex items-center justify-center hover:bg-[#2d180b]"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 bg-[#40230f] text-white rounded-full flex items-center justify-center hover:bg-[#2d180b]"
        >
          <FaChevronRight />
        </button>
      </div> */}
    </div>
  );
}
