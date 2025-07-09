// src/constants/assets.js



import lg from "../assets/lg.png";
import sg from "../assets/sg.png";
import home from "../assets/home.png";
import user from "../assets/user.png";
import logo from "../assets/logo.png";
import bg from "../assets/bg.png";
import phone from "../assets/phone.png";
import search from "../assets/search.png";
import filter from "../assets/filter.png";
import apartment from "../assets/apartment.png";
import villa from "../assets/villa.png";
import office from "../assets/office.png";
import lahore from "../assets/lahore.jpg";
import multan from "../assets/multan.jpg";
import fsd from "../assets/fsd.jpg";
import bwp from "../assets/bwp.png";
import islamabad from "../assets/islamabad.jpg";
import left from "../assets/left.png";
import right from "../assets/right.png";
import icon from "../assets/icon.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import bg1 from "../assets/bg1.png";
import seller1 from "../assets/seller1.png";
import seller2 from "../assets/seller2.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import seller3 from "../assets/seller3.png";
import seller4 from "../assets/seller4.png";
import seller5 from "../assets/seller5.png";
import mail from "../assets/mail.png";
import blg1 from "../assets/blg1.png";
import blg2 from "../assets/blg2.png";
import blg3 from "../assets/blg3.png";
import folder from '../assets/folder.png'
import footer1 from '../assets/footer1.png'
import logo7 from '../assets/logo7.png'
import insta from '../assets/insta.png'
import fb from '../assets/fb.png'
import twt from '../assets/twt.png'
import link from '../assets/link.png'
import plant from '../assets/plant.png'
import apple from '../assets/apple.svg'
import eyeopen from '../assets/eyeopen.svg'
import eyeclose from '../assets/eyeclose.svg'
import cnic from '../assets/cnic.jpg'
import chair from '../assets/chair.jpg'
import metro2 from '../assets/metro2.jpg'
import metro1 from '../assets/metro1.jpg'
import mobile from '../assets/mobile.jpg'
import phone1 from '../assets/phone1.jpg'
import speedo from '../assets/speedo.jpg'
import blog1 from '../assets/blog1.jpg'
import blog2 from '../assets/blog2.png'
import blog3 from '../assets/blog3.png'
import blog4 from '../assets/blog4.png'
import blog5 from '../assets/blog5.png'
import blog6 from '../assets/blog6.png'
import email from '../assets/email.png'
import area from '../assets/area.svg'
import bed from '../assets/bed.svg'
import bath from '../assets/bath.svg'
import maps from '../assets/maps.png'


// All assets grouped here
export const asset = {
  logo,
  maps,
  lg,
  sg,
  area,
  bed,
  bath,
  email,
  apple,
  plant,
  logo7,
  mail,
  folder,
  eyeclose,
  eyeopen,
  home,
  user,
  bg,
  search,
  filter,
  apartment,
  villa,
  office,
  left,
  right,
  icon,
  bg1,
  seller1,
  seller2,
  footer1,
  fb,
  link,
  insta,
  twt,
  phone1,
  chair,
  metro1,
  metro2,
  cnic,
  mobile,
  blog1,
  phone
};

// Logos used for "Trusted by companies" section
export const Logos = [
  { Image: logo1 },
  { Image: logo2 },
  { Image: logo3 },
  { Image: logo4 },
  { Image: logo5 },
  { Image: logo6 },
];

// Blog Card Set
export const blog = [
  { Image: blg1, 
    description: "Best Areas for Couples to Live in Karrachi"
   },
  {
    Image: blg2,
    description: "How to Properly Verfiy Ownership in Pakistan",
  },
 
  {
    Image:blg3,
   description:"Villa Rents in Dubai have Reached on All-Time High"
  },
];

// Card set 1
export const card = [
  {
    _id: "1",
    heading: "Spacious & Luxurious in Dubai",
    Image: img1,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 4,
    Baths: 2,
    sqft: 1150,
  },
  {
    _id: "2",
    heading: "Modern Apartment in Downtown",
    Image: img2,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 3,
    Baths: 2,
    sqft: 1000,
  },
  {
    _id: "3",
    heading: "Elegant Living Space",
    Image: img3,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 4,
    Baths: 3,
    sqft: 1200,
  },
];

// Card set 2
export const card2 = [
  {
    _id: "4",
    heading: "Luxury Villa with Sea View",
    Image: img5,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 5,
    Baths: 3,
    sqft: 1500,
  },
  {
    _id: "5",
    heading: "Modern Family Home",
    Image: img6,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 4,
    Baths: 2,
    sqft: 1300,
  },
  {
    _id: "6",
    heading: "Comfortable and Stylish Flat",
    Image: img7,
    Image1: icon,
    location: "Downtown, Dubai",
    Beds: 3,
    Baths: 2,
    sqft: 1100,
  },
];

// Popular city listings
export const list_places = [
  {
    _id: "1",
    name: "Lahore",
    Image: lahore,
    listings: "1000 listings",
  },
  {
    _id: "2",
    name: "Multan",
    Image: multan,
    listings: "190 listings",
  },
  {
    _id: "3",
    name: "Faisalabad",
    Image: fsd,
    listings: "1300 listings",
  },
  {
    _id: "4",
    name: "Bahawalpur",
    Image: bwp,
    listings: "100 listings",
  },
  {
    _id: "5",
    name: "Islamabad",
    Image: islamabad,
    listings: "900 listings",
  },
];

// Seller Images
export const Sellers = [
  {
    name: "Wade Warren",
    Image: seller3,
    description: "Sales Person",
  },
  {
    name: "Lexi Alexender",
    Image: seller4,
    description: "Commercial Broker",
  },
  {
    name: "Darlene Robertson",
    Image: seller5,
    description: "Reataler",
  },
];




export const blog_Cards = [
  {
    id:"1",
    Image:metro2,
    Title :"Green Lne Bus Karachi:Route,Stations,Timings,Ticket Price and More",
    Description:"The Green Line Bus Rapid Transit (BRT) project is a state-of-the-art mass transit system in Karachi designed to upgrade the...",
    Date:"4 May 2025",
  },
  {
    id:"2",
    Image:phone1,
    Title :"How to Quickly Check CNIC Number with Your Mobile Number in Pakistan",
    Description:"Are you in a situation where you need to check your or someone else's CNIC number but can't find the...",
    Date:"6 Jaunuary 2025",
  },
  {
    id:"3",
    Image:metro1,
    Title :"Metro Bus Islamabad:Route,Stations,Timings,Ticket Price and More",
    Description:"The Islamabad-Rawalpindi Metro Bus is a modern transportation system connecting Islamabad and Rawalpindi's twin cities. The project was initiated in...",
    Date:"8 September 2024",
  },

 {
    id:"4",
    Image:chair,
    Title :"Top 10 Marble Flooring For Pakistani Homes,Tyes, Prices and Features",
    Description:"Marble flooring is a popular choice for homes in Pakistan due to its elegance and durability. In this article, we will explore the top 10 marble  in...",
    Date:"7 October 2024",
  },
  {
    id:"5",
    Image:mobile,
    Title :"NADRA ID Card Tracking Made Easy: A Step-by-Step Guide",
    Description:"Getting your NADRA ID Card, also known as the Computerized National Identity Card (CNIC), is an important task for every...",
    Date:"4 march 2024",
  },
  {
    id:"6",
    Image:speedo,
    Title :"Speedo Bus Routes in Lahore (Updated 2023)",
    Description:"Lahore, the cultural capital of Pakistan, is known for its rich history, vibrant culture, and bustling streets. However, with the...",
    Date:"8 September 2024",
  }

]

export const lastes_articles = [

  {
    id:"1",
  Image:blog1,
    Title :"10 Most Beautiful Capitals in the World – Learn About Places to Visit And Interesting Facts",
    Description:"Embarking on a quest to find the most beautiful capital in the world  is like opening a book filled with...",
    Date:"4 march 2024",
  },
  {
    id:"2",
 Image:blog2,
    Title :"iPhone 15 PTA Tax; Learn All About it! (Updated September 2023)",
    Description:"If you are an Apple fan, you might wonder how much tax you will have to pay to get your...",
    Date:"24 November 2024",
  },
  {
    id:"3",
    Image:blog3,
    Title :"Best Parks in Karachi – Their Locations, Features and Much More",
    Description:"If you are looking for a place to relax, enjoy nature, and have fun, visit one of the many parks...",
    Date:"25 September 2024",
  },

 {
    id:"4",
    Image:blog4,
    Title :"Earthquake Safety Information – Everything From Preparing, Surviving and Recovering from an Earthquake",
    Description:"If you live in Pakistan, you know that earthquakes are a serious threat. According to the National Geophysical Data Center,...",
    Date:"25 September 2024",
  },
  {
    id:"5",
    Image:blog5,
    Title :"10 Best Restaurants in Karachi – Their Location, Speciality and Much More",
    Description:"Karachi is not just Pakistan’s “City of Lights”. It’s also a food lover’s paradise, where you can find some of..",
    Date:"8 September 2024",
  },
  {
    id:"6",
    Image:blog6,
    Title :"CSS Exam in Pakistan: Learn about Eligibility Criteria, Age Limit, Process, and Fee Structure",
    Description:"If you want to learn about the Central Superior Services (CSS) exam in Pakistan, you might be feeling a bit...",
    Date:"25 September 2024",
  }
]