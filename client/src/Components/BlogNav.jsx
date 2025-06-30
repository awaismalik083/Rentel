import React from "react";
import { Link } from "react-router-dom";
import { asset } from "../assets/asset";

const BlogNav = () => {
  const links = [
    "Property & Construction Updates",
    "Lifestyle",
    "Architecture & Interior Design",
    "Law & Regulations",
    "Tips & Trend",
  ];

  return (
    <div className="flex justify-between mt-6">
      <div className="ml-20">
        <Link to='/'> <img className="w-[10rem] cursor-pointer" src={asset.logo} alt="" /></Link>
        
      </div>
      <div className="flex justify-center text-medium font-medium items-center mr-20">
        <nav>
          <ul className="flex gap-6">
            {links.map((text, idx) => (
              <li key={idx}>
                <Link
                  to="/"
                  className="relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:mt-[10px]  after:bg-rose-500 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BlogNav;
