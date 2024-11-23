"use client";
import React, { useState } from "react";
import { activeChats } from "@/data/users";
import { ListFilter, Search, SquarePen } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const [selectedChat, setSelectedChat] = useState(activeChats[0]!);
  return (
    <div className="z-50 w-72 bg-white shadow-xl">
      <div className="flex flex-col gap-2 border-b p-2 py-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-semibold">Chats</h2>
          <div className="flex gap-4">
            <SquarePen size={20} />
            <ListFilter size={20} />
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-gray-200 px-4 py-1">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search"
            className="w-[80%] bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto">
        {activeChats.map((chat) => {
          return (
            <div
              onClick={() => setSelectedChat(chat)}
              className={`flex cursor-pointer items-center p-3 hover:bg-gray-100 ${selectedChat.id === chat.id ? "bg-blue-100" : ""}`}
              key={chat.id}
            >
              <Image
                src={chat.avatar}
                alt={`${chat.name}'s avatar`}
                className="mr-3 h-10 w-10 rounded-full"
                width={40}
                height={40}
              />
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{chat.name}</h3>
                  {chat.unread > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-gray-600">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
