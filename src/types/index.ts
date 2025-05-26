
export interface Activity {
  id: string;
  action: string;
  time: string;
  emoji: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  xp: number;
  level: number;
  bio?: string;
  phone?: string;
  preferredProduce: string[];
}

export interface Produce {
  id: number;
  name: string;
  quantity: number;
  location: string;
  addedAt: string;
}

export interface Order {
  id: number;
  produceName: string;
  quantity: number;
  buyer: string;
  status: string;
  createdAt: string;
}
