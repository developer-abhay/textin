"use client";
import { activeChats, messages } from "@/data/users";
import { Phone, Send, Video } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// const bgImages = {
//     1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcDU5ZAdnOvWUwgohVR9HIYqfP9HnkPxZ4_PUqPirRUYtJbosmWlVLZRsujiEaGXOBct4&usqp=CAU",
//     2: "https://static.vecteezy.com/system/resources/thumbnails/000/337/997/small_2x/geometric-retro-pattern-background.png",
//     3: "https://marketplace.canva.com/EAFZ0dYXrTM/1/0/1600w/canva-pink-lilac-violet-cool-90s-y2k-retro-graphic-pattern-linktree-background-78G8Uaj1aNo.jpg",
//     4: "https://img.freepik.com/premium-vector/sprinkle-vector-pattern-background_322958-5718.jpg?semt=ais_hybrid",
// };

const ChatScreen = () => {
  const [selectedChat, setSelectedChat] = useState(activeChats[0]!);
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex items-center justify-between border-b bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Image
            src={selectedChat.avatar}
            alt={`${selectedChat.name}'s avatar`}
            className="mr-3 h-10 w-10 rounded-full"
            width={40}
            height={40}
          />
          <h2 className="text-xl font-semibold">{selectedChat.name}</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-blue-500"
            aria-label="Start phone call"
          >
            <Phone className="h-6 w-6" />
          </button>
          <button
            className="text-gray-600 hover:text-blue-500"
            aria-label="Start video call"
          >
            <Video className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div
        className={`flex-1 space-y-4 overflow-y-auto bg-[url(https://img.freepik.com/premium-vector/sprinkle-vector-pattern-background_322958-5718.jpg?semt=ais_hybrid)] p-4`}
      >
        {/* <div className={`flex-1 overflow-y-auto p-4 space-y-4 `}> */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "abhay1" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`max-w-xs rounded-lg p-3 md:max-w-md lg:max-w-lg xl:max-w-xl ${message.sender === "abhay1"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
                }`}
            >
              <p>{message.content}</p>
              <p className="mt-1 text-xs opacity-75">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t bg-white p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
