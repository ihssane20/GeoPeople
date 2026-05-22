import { Card } from "../models/card";

const cards: Card[] = [
  {
    id: "42-350-19",
    personId: 42,
    personName: "Douglas Adams",
    placeId: 350,
    placeName: "Cambridge",
    relationName: "lieu de naissance",
    latitude: 52.208057,
    longitude: 0.1225,
    zone: true,
    power: 50
  },
  {
    id: "535-123-19",
    personId: 535,
    personName: "Victor Hugo",
    placeId: 123,
    placeName: "Besancon",
    relationName: "lieu de naissance",
    latitude: 47.2348,
    longitude: 6.02918,
    zone: false,
    power: 100
  },
  {
    id: "7-456-19",
    personId: 7,
    personName: "Marie Curie",
    placeId: 456,
    placeName: "Paris",
    relationName: "lieu de décès",
    latitude: 48.8566,
    longitude: 2.3522,
    zone: true,
    power: 90
  },
  {
    id: "12-789-19",
    personId: 12,
    personName: "Napoléon Bonaparte",
    placeId: 789,
    placeName: "Ajaccio",
    relationName: "lieu de naissance",
    latitude: 41.9192,
    longitude: 8.7386,
    zone: false,
    power: 95
  },
  {
    id: "99-234-19",
    personId: 99,
    personName: "Albert Camus",
    placeId: 234,
    placeName: "Mondovi",
    relationName: "lieu de naissance",
    latitude: 36.4627,
    longitude: 7.4331,
    zone: false,
    power: 70
  }
];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getAllCards(): Card[] {
  return cards;
}

export function getCardById(id: string): Card | undefined {
  return cards.find(c => c.id === id);
}

export function getCardsNearby(lat: number, lon: number, radiusKm: number = 20): Card[] {
  return cards.filter(card => {
    const dist = haversine(lat, lon, card.latitude, card.longitude);
    return dist <= radiusKm * 1000;
  });
}
