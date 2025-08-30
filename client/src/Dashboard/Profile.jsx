
import DashNavbar from "./DashNavbar";
import DashSidebar from "./DashSidebar";
import { IoLocation, IoCall } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/DataContext";
// import axios from "axios";
// import { useAppContext } from "../Context/Context"; // ✅ Import context

const Profile = () => {
  const navigate = useNavigate();
  const {seller} = useContext(DataContext)
 
 

  return (
    <>
      <DashNavbar />
      <DashSidebar />
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4 gap-6">
        {seller && (
          <div className="bg-white w-full mt-10 lg:ml-[12rem] max-w-5xl rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/3">
              <img
                className="w-full overflow-y-hidden min-h-[300px] max-h-[370px] md:h-full object-cover"
                src={`http://localhost:3000${seller.image}`}
                alt="Profile"
              />
            </div>

            <div className="w-full md:w-2/3 p-6 flex flex-col justify-between gap-6">
              <div className="flex justify-end sm:gap-4 gap-2 relative z-10">
                <button
                  onClick={() => navigate("/editprofile")}
                  className="bg-rose-600 text-white cursor-pointer px-4 py-2 rounded-md text-sm hover:bg-rose-700"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/setting")}
                  className="bg-gray-600 cursor-pointer text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700"
                >
                  Settings
                </button>
              </div>

              <div className="sm:ml-3 mt-[-5rem]">
                <h1 className="text-6xl font-bold text-gray-800">
                  {seller.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Joined since{" "}
                  {seller.date
                    ? new Date(seller.date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <IoLocation className="text-xl mt-1 text-gray-600" />
                  <div>
                    <h2 className="text-base font-medium text-gray-700">
                      {seller.address || "N/A"}
                    </h2>
                    <p className="text-xs text-gray-400">Address</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IoCall className="text-xl mt-1 text-gray-600" />
                  <div>
                    <h2 className="text-base font-medium text-gray-700">
                      {seller.phone || "N/A"}
                    </h2>
                    <p className="text-xs text-gray-400">Phone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
