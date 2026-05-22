import { Player } from "../models/player";
import { v4 as uuidv4 } from "uuid";

const players: Map<string, Player> = new Map();

export function registerPlayer(name: string): Player {
  const id = uuidv4();
  const player: Player = {
    id,
    name,
    latitude: 0,
    longitude: 0,
    lastSeen: new Date().toISOString(),
    inventory: [],
    score: 0
  };
  players.set(id, player);
  return player;
}

export function getPlayer(id: string): Player | undefined {
  return players.get(id);
}

export function updatePlayerLocation(id: string, lat: number, lon: number): Player | undefined {
  const player = players.get(id);
  if (!player) return undefined;
  player.latitude = lat;
  player.longitude = lon;
  player.lastSeen = new Date().toISOString();
  return player;
}

export function addCardToInventory(playerId: string, cardId: string ): Player | undefined {
  const player = players.get(playerId);
  if (!player) return undefined;
  if (!player.inventory.includes(cardId)) {
    const card = getCardById(cardId);
    if (!card) return undefined;
    player.inventory.push(cardId);
    player.score += card.power;
  }
  return player;
}

export function getPlayerInventory(playerId: string): string[] {
  const player = players.get(playerId);
  return player?.inventory ?? [];
}
