export interface Contact {
  id: number;
  name: string;
  image: string;
}

export interface Message {
  id: number;
  author: string;
  authorId: number;
  timestamp: string;
  content: string;
}