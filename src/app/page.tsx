'use client'
import { activeChats, messages } from "@/data/users";
import { Menu, Phone, Send, Video } from "lucide-react";
import { useState } from "react";

const bgImages = {
  1: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDU5ZAdnOvWUwgohVR9HIYqfP9HnkPxZ4_PUqPirRUYtJbosmWlVLZRsujiEaGXOBct4&usqp=CAU',
  2: 'https://static.vecteezy.com/system/resources/thumbnails/000/337/997/small_2x/geometric-retro-pattern-background.png',
  3: 'https://marketplace.canva.com/EAFZ0dYXrTM/1/0/1600w/canva-pink-lilac-violet-cool-90s-y2k-retro-graphic-pattern-linktree-background-78G8Uaj1aNo.jpg',
  4: 'https://img.freepik.com/premium-vector/sprinkle-vector-pattern-background_322958-5718.jpg?semt=ais_hybrid'
}

export default function page() {
  const [selectedChat, setSelectedChat] = useState(activeChats[0]!)
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={selectedChat.avatar} alt={`${selectedChat.name}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
          <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-500" aria-label="Start phone call">
            <Phone className="h-6 w-6" />
          </button>
          <button className="text-gray-600 hover:text-blue-500" aria-label="Start video call">
            <Video className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-[url(https://img.freepik.com/premium-vector/sprinkle-vector-pattern-background_322958-5718.jpg?semt=ais_hybrid)]`}>
        {/* <div className={`flex-1 overflow-y-auto p-4 space-y-4 `}> */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'abhay1' ? 'justify-end' : 'justify-start'
              }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${message.sender === 'abhay1'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
                }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
