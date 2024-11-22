import { User } from "@/interfaces/types";

export const dummyUsers: User[] = [
    { id: '1', name: 'abhay1', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '2', name: 'abhay2', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '3', name: 'abhay3', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '4', name: 'abhay4', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '5', name: 'abhay5', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '6', name: 'abhay6', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '7', name: 'abhay7', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: '8', name: 'abhay8', avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' }
]

// Dummy data for active chats
export const activeChats = [
    { id: 1, name: 'abhay1', lastMessage: 'Hey, how are you?', unread: 2, avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: 2, name: 'abhay2', lastMessage: 'See you tomorrow!', unread: 0, avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: 3, name: 'abhay3', lastMessage: 'Thanks for your help', unread: 1, avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
    { id: 4, name: 'abhay4', lastMessage: 'Can we schedule a call?', unread: 0, avatar: 'https://res.cloudinary.com/dwo5iefqt/image/upload/v1720761242/nt5thaifhuhgtnjgdv5c.png' },
]

// Dummy data for messages
export const messages = [
    { id: 1, sender: 'abhay1', content: 'Hey there!', timestamp: '10:00 AM' },
    { id: 2, sender: 'abhay2', content: 'Hi John! How are you?', timestamp: '10:02 AM' },
    { id: 3, sender: 'abhay1', content: 'I\'m doing great, thanks for asking. How about you?', timestamp: '10:05 AM' },
    { id: 4, sender: 'abhay4', content: 'I\'m good too. Just working on a new project.', timestamp: '10:08 AM' },
    { id: 5, sender: 'abhay1', content: 'That sounds interesting! What kind of project is it?', timestamp: '10:10 AM' },
]