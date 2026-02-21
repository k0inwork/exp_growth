import { GameState, Room } from '../core/types.js';
import { survivalData } from './worlds/survivalData.js';
export function loadSurvivalWorld(): GameState {
  return { currentRoomId: 'start', inventory: [], logs: [], rooms: survivalData.rooms as Record<string, Room> };
}
