export type Player = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  lastSeen: string;
  inventory: string[]; // card IDs
  score: number;
};
