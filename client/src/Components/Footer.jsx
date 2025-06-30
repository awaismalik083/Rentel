import React from 'react';
import { asset } from '../assets/asset'; // Adjust path as needed

const Footer = () => {
    return (
        <footer className="bg-[#111] text-white pt-10 pb-5 px-6 md:px-20">
            {/* Top CTA section */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-12">
                <div className="flex bg-[#fca5a5] p-5 rounded-lg items-center gap-4 w-full max-w-md">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="person" className="w-16 h-16 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold text-black">You need a house</h2>
                        <p className="text-sm text-black">Tell us your needs, we will give you thousands of suggestions for the dream home.</p>
                        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2">
                            <img src={asset.phone} alt="phone" className="w-4 h-4" />
                            Contact Seller
                        </button>
                    </div>
                </div>
                <div className="flex bg-[#fca5a5] p-5 rounded-lg items-center gap-4 w-full max-w-md">
                    <img src={asset.footer1} alt="house" className="w-16 h-16 rounded-lg" />
                    <div>
                        <h2 className="text-xl font-bold text-black">Sell your house</h2>
                        <p className="text-sm text-black">We will connect you to thousands of people who need to buy a home.</p>
                        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2">
                            <img src={asset.home} alt="home" className="w-4 h-4" />
                            Sell Property
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm border-t border-gray-700 pt-10">
                <div>
                    <h3 className="font-bold mb-3">Office Address</h3>
                    <p>Head office:<br /><span className="font-semibold">Jumeirah, Dubai, UAE</span></p>
                    <p className="mt-2">Branch:<br />Reem Island Addax tower Floor 45, offi in Abu Dhabi, UAE</p>
                    <p className="mt-2">AL SAADA Bakery, Defence Road, Abu Dhabi, UAE</p>
                </div>

                <div>
                    <h3 className="font-bold mb-3">Contact Seller</h3>
                    <div className="flex items-center mt-8 gap-3 mb-2">
                        <img
                            src={asset.seller1}
                            alt="Darrell Steward"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p>Darrell Steward</p>
                            <p className="text-red-400 font-semibold">+92555-55812</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-6 mt-7">
                        <img src={asset.phone} alt="phone" className="w-4 h-4" />
                        <p className="text-gray-300">(+971) 555-0124</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={asset.mail} alt="mail" className="w-4 h-4" />
                        <p className="text-gray-300">roomsforrentals@gmail.com</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-3">Our Company</h3>
                    <ul className="space-y-1 text-gray-400">
                        <li>Property For Sale</li>
                        <li>About Us</li>
                        <li>Our Agents</li>
                        <li>Terms Of Use</li>
                        <li>Privacy Policy</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-3">Newsletter</h3>
                    <p className="text-gray-400 text-sm mb-2">Sign up to receive the latest articles</p>
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3 py-2 rounded bg-white outline-none mb-2 text-black"
                    />
                    <button className="bg-gray-700 w-full py-2 rounded text-white hover:bg-gray-600">
                        Sign Up →
                    </button>
                    <label className="mt-2 inline-flex items-center gap-2 text-xs text-gray-500">
                        <input type="checkbox" className="form-checkbox" />
                        I have read and agree to the terms & conditions
                    </label>
                </div>
            </div>

            {/* Bottom bar - Fixed responsiveness */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5 gap-4">
                <div className="flex items-center order-1 md:order-none">
                    <img src={asset.logo} alt="logo" className="w-6 h-6" />
                    <img className="w-20" src={asset.logo7} alt="" />
                </div>
                <div className="flex flex-wrap justify-center gap-4 order-3 md:order-none w-full md:w-auto mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Home</a>
                    <a href="#" className="hover:text-white">Property</a>
                    <a href="#" className="hover:text-white">Page</a>
                    <a href="#" className="hover:text-white">Blog</a>
                    <a href="#" className="hover:text-white">Contact</a>
                </div>
                <div className="flex justify-center gap-4 order-2 md:order-none">
                    <a><img className="cursor-pointer w-5 h-5 hover:opacity-80" src={asset.fb} alt="Facebook" /></a>
                    <a><img className="cursor-pointer w-5 h-5 hover:opacity-80" src={asset.link} alt="LinkedIn" /></a>
                    <a><img className="cursor-pointer w-5 h-5 hover:opacity-80" src={asset.insta} alt="Instagram" /></a>
                    <a><img className="cursor-pointer w-5 h-5 hover:opacity-80" src={asset.twt} alt="Twitter" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;