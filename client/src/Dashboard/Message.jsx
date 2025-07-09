import React from 'react';
import DashNavbar from './DashNavbar';
import DashSidebar from './DashSidebar';
import { CiSearch } from 'react-icons/ci';

const messages = [
  {
    id: 1,
    name: 'Cameron Williamson',
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    time: '2:40PM',
    message: "What's the progress on that task?",
    unread: false,
    active: true,
  },
  {
    id: 2,
    name: 'Craig Saris',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '2:40PM',
    message: "Can you send me the file?",
    unread: true,
    active: false,
  },
  {
    id: 3,
    name: 'Angel Calzoni',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    time: '2:40PM',
    message: "Let's schedule a call.",
    unread: true,
    active: false,
  },
  {
    id: 4,
    name: 'Maria Baptista',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    time: '2:40PM',
    message: "I'll update you by tomorrow.",
    unread: false,
    active: false,
  },
];

const Message = () => {
  return (
    <>
      <DashNavbar />
      <DashSidebar />

      <div className="flex bg-gray-200 min-h-screen relative gap-1 md:ml-40 mt-4 justify-center items-start">
        <div className="pt-7 mb-7 relative gap-1 flex flex-col md:flex-row items-start w-full">

          {/* Left Panel - Message List */}
          <div className="w-full md:w-[20rem] rounded-md h-[50vh] md:h-screen bg-white pt-3">
            {/* Header */}
            <div className="flex justify-between items-center px-4">
              <p className="text-2xl text-gray-600 font-bold">Message</p>
              <button className="bg-blue-400 text-white px-3 py-1 rounded-md text-sm">New +</button>
            </div>

            {/* Search bar */}
            <div className="bg-gray-100 flex items-center mx-4 rounded-md mt-6 h-12 px-4">
              <p className="text-sm text-gray-700 flex-1">Search Message</p>
              <CiSearch />
            </div>

            {/* Message Cards */}
            <div className="mt-4 space-y-4 px-3 pb-6 overflow-y-auto h-[calc(100%-7rem)]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-center p-3 rounded-xl 
                    ${msg.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                  <div className="relative">
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {msg.unread && !msg.active && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                        2
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className={`font-bold text-sm ${msg.active ? 'text-white' : 'text-gray-800'}`}>{msg.name}</h4>
                      <span className={`text-xs ${msg.active ? 'text-white/80' : 'text-gray-500'}`}>{msg.time}</span>
                    </div>
                    <p className={`text-sm mt-1 ${msg.active ? 'text-white/90' : 'text-gray-600'}`}>
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className="w-full md:w-[40rem] h-[50vh] md:h-screen rounded-md bg-white shadow-sm flex flex-col mt-4 md:mt-0">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <img 
                  src="https://randomuser.me/api/portraits/men/11.jpg" 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-bold">Cameron Williamson</h3>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">TODAY</div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Received message */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-sm">Hello! How are you?</p>
                  </div>
                </div>

                {/* Sent messages */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-sm">I need a photo of your house building front view, because it's not in the description</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-sm">In good and you? How can I help you? printing and industry</p>
                  </div>
                </div>

                {/* Received message */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-sm">Oke wait</p>
                  </div>
                </div>

                {/* Sent message */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs md:max-w-md">
                    <p className="text-sm">Oke thanks bro!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message input */}
            <div className="p-4 border-t">
              <div className="bg-gray-100 rounded-full p-2 px-4">
                <input 
                  type="text" 
                  placeholder="Write message down here ..." 
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;