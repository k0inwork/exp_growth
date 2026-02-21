import React from 'react';
import type { GameState } from '../core/types.js';
const SkillDashboard: React.FC<{state: GameState}> = ({ state }) => (
  <div className="bg-gray-800 text-white p-2">
    <div>Loc: {state.rooms[state.currentRoomId]?.name}</div>
    <div>Inv: {state.inventory.map(i => i.name).join(', ')}</div>
  </div>
);
export default SkillDashboard;
