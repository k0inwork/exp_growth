import React, { useState } from 'react';
import { GameEngine } from '../core/skillGrowth.js';

const ScenarioDisplay: React.FC<{engine: GameEngine, onAction: ()=>void}> = ({ engine, onAction }) => {
  const [input, setInput] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd.startsWith('move ')) {
      engine.move(cmd.replace('move ', ''));
    } else if (cmd.startsWith('go ')) {
      engine.move(cmd.replace('go ', ''));
    } else if (cmd.startsWith('take ')) {
      engine.take(cmd.replace('take ', ''));
    } else if (cmd.startsWith('get ')) {
      engine.take(cmd.replace('get ', ''));
    } else if (cmd.startsWith('drop ')) {
      engine.drop(cmd.replace('drop ', ''));
    } else if (cmd.startsWith('kick ')) {
      engine.kick(cmd.replace('kick ', ''));
    } else if (cmd.startsWith('burn ')) {
      engine.burn(cmd.replace('burn ', ''));
    } else if (cmd.startsWith('throw ')) {
      const remaining = cmd.replace('throw ', '');
      if (remaining.includes(' at ')) {
        const [item, target] = remaining.split(' at ');
        engine.throw(item?.trim() || '', target?.trim());
      } else {
        engine.throw(remaining.trim());
      }
    } else if (cmd === 'look') {
      // Look logic handled by state update
    }

    setInput('');
    onAction();
  };

  return (
    <div className="bg-black text-white p-4 h-full font-mono border border-gray-700 rounded shadow-2xl flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 text-emerald-500">
        <p className="mb-2 italic">ASE Survival Interface Initialized...</p>
        <p className="mb-4">You are at the {engine.getState().rooms[engine.getState().currentRoomId]?.name}. {engine.getState().rooms[engine.getState().currentRoomId]?.description}</p>
        <p className="text-gray-400 text-xs">Commands: move [dir], take [item], drop [item], kick [target], throw [item] at [target], burn [target], look</p>
      </div>
      <form onSubmit={submit} className="flex border-t border-gray-800 pt-4">
        <span className="text-yellow-500 mr-2 font-bold">&gt;</span>
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          className="bg-transparent outline-none flex-1 text-white"
          autoFocus
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
};

export default ScenarioDisplay;
