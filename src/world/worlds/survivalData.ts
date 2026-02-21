export const survivalData = {
  "rooms": {
    "start": { "id": "start", "name": "Crashed Plane", "description": "Wreckage.", "exits": { "north": "jungle" }, "items": [{ "id": "flare", "name": "Flare", "canPickUp": true, "canBurn": true }] },
    "jungle": { "id": "jungle", "name": "Jungle", "description": "Trees.", "exits": { "south": "start", "north": "cliff", "east": "swamp" }, "items": [] },
    "cliff": { "id": "cliff", "name": "Cliff", "description": "High.", "exits": { "south": "jungle", "west": "cave" }, "items": [] },
    "cave": { "id": "cave", "name": "Cave", "description": "Dark.", "exits": { "east": "cliff" }, "items": [] },
    "swamp": { "id": "swamp", "name": "Swamp", "description": "Wet.", "exits": { "west": "jungle", "north": "river" }, "items": [] },
    "river": { "id": "river", "name": "River", "description": "Water.", "exits": { "south": "swamp", "east": "grassland" }, "items": [] },
    "grassland": { "id": "grassland", "name": "Grass", "description": "Green.", "exits": { "west": "river", "north": "hut" }, "items": [] },
    "hut": { "id": "hut", "name": "Hut", "description": "Shelter.", "exits": { "south": "grassland", "east": "volcano" }, "items": [] },
    "volcano": { "id": "volcano", "name": "Volcano", "description": "Hot.", "exits": { "west": "hut", "south": "beach" }, "items": [] },
    "beach": { "id": "beach", "name": "Beach", "description": "Sand.", "exits": { "north": "volcano" }, "items": [] }
  }
};
