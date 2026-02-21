import React from 'react';
import type { AtomicAction } from '../core/types.js';
const LogViewer: React.FC<{logs: AtomicAction[]}> = ({ logs }) => (
  <div className="bg-gray-900 text-green-400 p-2 overflow-y-auto h-32">
    {logs.map(l => <div key={l.id}>{l.description}</div>)}
  </div>
);
export default LogViewer;
