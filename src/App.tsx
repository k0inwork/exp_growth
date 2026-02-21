import React, { useState, useMemo } from 'react';
import { GameEngine } from './core/skillGrowth.js';
import { loadSurvivalWorld } from './world/worldAdapter.js';
import ScenarioDisplay from './components/ScenarioDisplay.js';
import SkillDashboard from './components/SkillDashboard.js';
import LogViewer from './components/LogViewer.js';
import './index.css';
const App: React.FC = () => {
  const engine = useMemo(() => new GameEngine(loadSurvivalWorld()), []);
  const [gameState, setGameState] = useState(engine.getState());
  const handleAction = () => setGameState({ ...engine.getState() });
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4">
      <header className="max-w-6xl mx-auto mb-8"><h1>ASE: Survival RPG</h1></header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[500px]"><ScenarioDisplay engine={engine} onAction={handleAction} /></div>
        <div className="flex flex-col gap-6">
          <SkillDashboard state={gameState} />
          <LogViewer logs={gameState.logs} />
        </div>
      </main>
    </div>
  );
};
export default App;
