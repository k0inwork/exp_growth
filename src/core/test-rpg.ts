import { GameEngine } from './skillGrowth.js';
import { loadSurvivalWorld } from '../world/worldAdapter.js';
const engine = new GameEngine(loadSurvivalWorld());
console.log('Room count:', Object.keys(engine.getState().rooms).length);
console.log(engine.take('Flare'));
console.log(engine.move('north'));
console.log('Tests finished.');
