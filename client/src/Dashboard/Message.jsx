import React, { useState } from 'react';
import DashNavbar from './DashNavbar';
import DashSidebar from './DashSidebar';
import { CiSearch } from 'react-icons/ci';
import { FiChevronLeft } from 'react-icons/fi';
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';

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
  const [activeChat, setActiveChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <>
      <DashNavbar />
      <DashSidebar />

      <div className="flex bg-gray-100 min-h-screen relative md:ml-40 pt-12 md:pt-0">
        {/* Mobile: Show either list or chat based on state */}
        {showChat ? (
          /* Mobile Chat View */
          <div className="w-full md:hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
              <button onClick={handleBackToList} className="mr-2">
                <FiChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-3 flex-1">
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
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {/* Received message */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
                    <p className="text-sm">Hello! How are you? 😊</p>
                  </div>
                </div>

                {/* Sent messages */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">I'm good and you?</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">How can I help you? printing and industry</p>
                  </div>
                </div>

                {/* Received message */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
                    <p className="text-sm">It is a man.</p>
                  </div>
                </div>

                {/* Sent message */}
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">I need a photo of your house building front view, because it's not in the description</p>
                  </div>
                </div>

                {/* Received message */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
                    <p className="text-sm">It is a man.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message input */}
            <div className="p-3 bg-white border-t sticky bottom-0">
              <div className="flex items-center gap-2">
                <button className="text-gray-500">
                  <BsEmojiSmile size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Write message down here ..." 
                  className="bg-gray-100 rounded-full py-2 px-4 w-full outline-none text-sm"
                />
                <button className="text-blue-500">
                  <IoSend size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Mobile Message List View */
          <div className="w-full md:hidden bg-white">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <p className="text-xl font-bold">Message</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">New +</button>
            </div>

            {/* Search bar */}
            <div className="bg-gray-100 flex items-center mx-4 my-3 rounded-md h-12 px-4">
              <CiSearch className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search Message" 
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>

            {/* Message Cards */}
            <div className="pb-20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-center p-3 border-b ${msg.unread ? 'bg-blue-50' : 'bg-white'}`}
                  onClick={() => handleChatSelect(msg.id)}
                >
                  <div className="relative">
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {msg.unread && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                        2
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm">{msg.name}</h4>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 truncate">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop View (always shows both panels) */}
        <div className="hidden md:flex w-full gap-4 p-4">
          {/* Left Panel - Message List */}
          <div className="w-[350px] rounded-lg h-[calc(100vh-2rem)] bg-white shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <p className="text-xl font-bold">Message</p>
              <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">New +</button>
            </div>

            {/* Search bar */}
            <div className="bg-gray-100 flex items-center mx-4 my-3 rounded-md h-12 px-4">
              <CiSearch className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search Message" 
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>

            {/* Message Cards */}
            <div className="overflow-y-auto h-[calc(100%-7.5rem)]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-center p-3 cursor-pointer hover:bg-gray-50 ${
                    msg.id === activeChat ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setActiveChat(msg.id)}
                >
                  <div className="relative">
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {msg.unread && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex justify-center items-center">
                        2
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm">{msg.name}</h4>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-600 truncate">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className="flex-1 rounded-lg bg-white shadow-sm flex flex-col">
            {activeChat ? (
              <>
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
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {/* Received message */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 max-w-[70%] shadow-sm">
                        <p className="text-sm">Hello! How are you? 😊</p>
                      </div>
                    </div>

                    {/* Sent messages */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
                        <p className="text-sm">I'm good and you?</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
                        <p className="text-sm">How can I help you? printing and industry</p>
                      </div>
                    </div>

                    {/* Received message */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 max-w-[70%] shadow-sm">
                        <p className="text-sm">It is a man.</p>
                      </div>
                    </div>

                    {/* Sent message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[70%]">
                        <p className="text-sm">I need a photo of your house building front view, because it's not in the description</p>
                      </div>
                    </div>

                    {/* Received message */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 max-w-[70%] shadow-sm">
                        <p className="text-sm">It is a man.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message input */}
                <div className="p-3 bg-white border-t">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500">
                      <BsEmojiSmile size={20} />
                    </button>
                    <input 
                      type="text" 
                      placeholder="Write message down here ..." 
                      className="bg-gray-100 rounded-full py-2 px-4 w-full outline-none text-sm"
                    />
                    <button className="text-blue-500">
                      <IoSend size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Select a chat</h3>
                  <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;