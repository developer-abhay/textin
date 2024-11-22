'use client'
import React, { useState } from 'react'
import { activeChats } from '@/data/users'
import { ListFilter, Search, SquarePen } from 'lucide-react'

const Sidebar = () => {
    const [selectedChat, setSelectedChat] = useState(activeChats[0]!)
    return (
        <div
            className='z-50 w-72 bg-white shadow-xl'
        >
            <div className='flex flex-col gap-2 p-2 py-3 border-b'>
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-semibold">Chats</h2>
                    <div className='flex gap-4'>
                        <SquarePen size={20} />
                        <ListFilter size={20} />
                    </div>
                </div>
                <div className='flex items-center gap-3 bg-gray-200 rounded-lg py-1 px-4'>
                    <Search size={16} />
                    <input type="text" placeholder='Search' className='bg-transparent w-[80%] outline-none' />
                </div>
            </div>

            <div className="overflow-y-auto">
                {activeChats.map((chat) => {
                    return <div
                        onClick={() => setSelectedChat(chat)}
                        className={`p-3 flex items-center cursor-pointer hover:bg-gray-100 ${selectedChat.id === chat.id ? 'bg-blue-100' : ''}`} key={chat.id}>
                        <img src={chat.avatar} alt={`${chat.name}'s avatar`} className="w-10 h-10 rounded-full mr-3" />
                        <div
                            className='flex flex-col w-full'
                        >
                            <div className="flex items-center justify-between ">
                                <h3 className="font-semibold">{chat.name}</h3>
                                {chat.unread > 0 && (
                                    <span className="flex items-center justify-center bg-blue-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                    </div>
                })}
            </div>
        </div >
    )
}

export default Sidebar
