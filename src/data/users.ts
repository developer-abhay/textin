import { User } from "@/interfaces/types";

export const dummyUsers: User[] = [
    { id: '1', name: 'abhay1', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '2', name: 'abhay2', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '3', name: 'abhay3', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '4', name: 'abhay4', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '5', name: 'abhay5', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '6', name: 'abhay6', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '7', name: 'abhay7', avatar: '/placeholder.svg?height=40&width=40' },
    { id: '8', name: 'abhay8', avatar: '/placeholder.svg?height=40&width=40' }
]

// Dummy data for active chats
export const activeChats = [
    { id: 1, name: 'abhay1', lastMessage: 'Hey, how are you?', unread: 2, avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'abhay2', lastMessage: 'See you tomorrow!', unread: 0, avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'abhay3', lastMessage: 'Thanks for your help', unread: 1, avatar: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'abhay4', lastMessage: 'Can we schedule a call?', unread: 0, avatar: '/placeholder.svg?height=40&width=40' },
]

// Dummy data for messages
export const messages = [
    { id: 1, sender: 'abhay1', content: 'Hey there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'abhay2', content: 'Hi John! How are you?', timestamp: '10:02 AM' },
    { id: 3, sender: 'abhay3', content: 'I\'m doing great, thanks for asking. How about you?', timestamp: '10:05 AM' },
    { id: 4, sender: 'abhay4', content: 'I\'m good too. Just working on a new project.', timestamp: '10:08 AM' },
    { id: 5, sender: 'abhay5', content: 'That sounds interesting! What kind of project is it?', timestamp: '10:10 AM' },
]