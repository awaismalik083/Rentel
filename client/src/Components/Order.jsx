import React from 'react';
import DashSidebar from '../Dashboard/DashSidebar';
import DashNavbar from '../Dashboard/DashNavbar';
import { asset } from '../assets/asset';
import { SlCalender } from 'react-icons/sl';

const Order = () => {
  const order_list = [
    {
      id: "1234321",
      location: "Star Sun Hotel & Apartments",
      rooms: "1",
      date: "15 Jan 2023",
      status: "Paid Off",
    },
  ];

  const order_history = [
    {
      id: "1234321",
      location: "Star Sun Hotel & Apartments",
      rooms: "1",
      date: "15 Jan 2023",
      status: "Success",
      cancel: "Canceled"
    },
    {
      id: "1234322",
      location: "Ocean View Resort",
      rooms: "2",
      date: "22 Feb 2023",
      status: "Success",
      cancel: "Canceled"
    },
  ];

  return (
    <>
      <DashNavbar />
      <DashSidebar />

      <div className="ml-0 md:ml-[10rem] px-4 sm:px-6 mt-4">
        {/* My Orders Section */}
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold relative left-7 text-gray-600 mb-4 self-start">
            My Orders
          </h1>

          {order_list.map((order, index) => (
            <div
              key={index}
              className="w-full max-w-5xl rounded-xl bg-gray-100 px-4 py-6 mb-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <img
                  className="w-full md:w-[15rem] rounded-xl object-cover"
                  src={asset.sg}
                  alt="hotel"
                />
                <div className="mt-4 md:mt-0 md:ml-8 flex flex-col gap-1">
                  <p className="text-gray-800 text-sm">Order ID: {order.id}</p>
                  <h1 className="font-bold text-md text-gray-900">
                    {order.location}
                  </h1>
                  <p className="text-gray-800 text-sm">
                    {order.rooms} Room{order.rooms > 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <SlCalender className="text-sm" />
                    <p className="text-gray-800 text-sm">{order.date}</p>
                  </div>
                  <div className="bg-blue-200 mt-2 w-fit px-4 py-1 text-blue-500 text-sm text-center rounded-2xl">
                    {order.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order History Section */}
        <div className="flex flex-col items-center mt-8">
          <h1 className="text-2xl font-bold  relative left-7 text-gray-600 mb-4 self-start">
            Order History
          </h1>

          {order_history.map((order, index) => (
            <div
              key={index}
              className="w-full max-w-5xl rounded-xl bg-gray-100 px-4 py-6 mb-4 shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <img
                  className="w-full md:w-[15rem] rounded-xl object-cover"
                  src={asset.lg}
                  alt="hotel"
                />
                <div className="mt-4 md:mt-0 md:ml-8 flex flex-col gap-1">
                  <p className="text-gray-800 text-sm">Order ID: {order.id}</p>
                  <h1 className="font-bold text-md text-gray-900">
                    {order.location}
                  </h1>
                  <p className="text-gray-800 text-sm">
                    {order.rooms} Room{order.rooms > 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <SlCalender className="text-sm" />
                    <p className="text-gray-800 text-sm">{order.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="bg-green-200 px-4 py-1 text-green-500 text-sm text-center rounded-2xl">
                      {order.status}
                    </div>
                    <div className="bg-red-200 px-4 py-1 text-red-500 text-sm text-center rounded-2xl">
                      {order.cancel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;
