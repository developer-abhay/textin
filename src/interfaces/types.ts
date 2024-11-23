export interface Chat {
  id: string;
  lastMessage: { content: string; timeStamp: string };
  members: string[];
  groupChat: { avatar: string; name: string };
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
