import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import BlogNav from '../Components/BlogNav';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { asset } from '../assets/asset';
import BlogArticles from '../Components/blogArticles';
import BlogFooter from './BlogFooter';
const Blog = () => {
  const textRef = useRef();

  useGSAP(() => {
    gsap.from(textRef.current, {
      opacity: 0,
      y: 100,
      ease: 'power2.out',
      duration: 1,
    });
  }, []);

  return (
    <>
      <BlogNav />
      <div className="w-[80rem] flex justify-center mx-20 mt-8 px-4 relative
        [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white
        [&_.swiper-pagination-bullet]:bg-white">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop
          className="rounded-lg overflow-hidden"
          style={{ height: '500px' }}
        >
          <SwiperSlide>
            <div ref={textRef} className="relative h-full">
              <img
                src={asset.metro1}
                alt="Slide 1"
                className="w-full h-full object-cover brightness-80"
              />
              <div className="absolute inset-0 bg-opacity-30"></div>
              <div
                ref={textRef}
                className="absolute bottom-20 p-[10px] left-10 text-white z-10"
              >
                <p ref={textRef} className="text-white font-medium">LifeStyle</p>
                <h1 ref={textRef} className="text-4xl font-bold mt-2 leading-[-5px]">
                  Metro Bus Islamabad:Route,<br />
                  Stations,Timings,Ticket Price <br />
                  and More
                </h1>
                <p className="mt-2 font-medium">6 january 2025</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div ref={textRef} className="relative h-full">
              <img
                src={asset.metro2}
                alt="Slide 2"
                className="w-full h-full object-cover brightness-80"
              />
              <div ref={textRef} className="absolute inset-0 bg-opacity-30"></div>
              <div className="absolute bottom-20 p-[10px] left-10 text-white z-10">
                <p className="text-white font-medium">Law & Regulation</p>
                <h1 className="text-4xl font-bold mt-2 leading-[-5px]">
                  Green Line Bus Karachi:Route,<br />
                  Stations,Timings,Ticket Price <br />
                  and More
                </h1>
                <p className="mt-2 font-small">4 May 2025</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div ref={textRef} className="relative h-full">
              <img
                src={asset.chair}
                alt="Slide 2"
                className="w-full h-full object-cover brightness-80"
              />
              <div ref={textRef} className="absolute inset-0 bg-opacity-30"></div>
              <div className="absolute bottom-20 p-[10px] left-10 text-white z-10">
                <p className="text-white font-small">Achitecture and Furniture Design</p>
                <h1 className="text-4xl font-bold mt-2 leading-[-5px]">
                  Top 10 Marble Flooring For<br />
                  Pakistani Homes,Tyes, Prices <br />
                  and Features
                </h1>
                <p className="mt-2 font-small">25 December 2024</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div ref={textRef} className="relative h-full">
              <img
                src={asset.cnic}
                alt="Slide 1"
                className="w-full h-full object-cover brightness-80"
              />
              <div className="absolute inset-0 bg-opacity-30"></div>
              <div
                ref={textRef}
                className="absolute bottom-20 p-[10px] left-10 text-white z-10"
              >
                <p ref={textRef} className="text-white font-small">Laws & Regulation</p>
                <h1 ref={textRef} className="text-4xl font-bold mt-2 leading-[-5px]">
                  Nadra ID Card Tracking Made,<br />
                  Easy: A Step-By-Step-Guide <br />
                  and More
                </h1>
                <p className="mt-2 font-small">6 january 2025</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div ref={textRef} className="relative h-full">
              <img
                src={asset.phone1}
                alt="Slide 1"
                className=" object-cover w-full h-full brightness-80"
              />
              <div className="absolute inset-0 bg-opacity-30"></div>
              <div
                ref={textRef}
                className="absolute bottom-20 p-[10px] left-10 text-white z-10"
              >
                <p ref={textRef} className="text-white font-small">Laws & Regulation</p>
                <h1 className="text-4xl font-bold mt-2 leading-[-5px]">
                  How To Quickly Check Cnic<br />
                  Number With Your Mobile Number <br />
                  in Pakistan
                </h1>
                <p className="mt-2 font-small">6 january 2025</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <BlogArticles/>
      <BlogFooter/>
    </>
  );
};

export default Blog;
