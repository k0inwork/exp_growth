import type { GameState, AtomicAction, ActionType, Item, Room } from './types.js';
export class GameEngine {
  private state: GameState;
  constructor(initialState: GameState) { this.state = initialState; }
  getState(): GameState { return this.state; }
  private logAction(type: ActionType, description: string) {
    this.state.logs.push({ id: `${type}_${Date.now()}`, description, embedding: Array.from({length:10}, ()=>Math.random()), timestamp: Date.now() });
  }
  move(direction: string): string {
    const nextRoomId = this.state.rooms[this.state.currentRoomId]?.exits[direction];
    if (nextRoomId && this.state.rooms[nextRoomId]) {
      this.state.currentRoomId = nextRoomId;
      this.logAction('Move', `Moved ${direction} to ${this.state.rooms[nextRoomId].name}`);
      return `Moved ${direction}.`;
    }
    return "Can't go that way.";
  }
  take(itemName: string): string {
    const currentRoom = this.state.rooms[this.state.currentRoomId];
    const itemIndex = currentRoom?.items.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (itemIndex !== undefined && itemIndex !== -1) {
      const item = currentRoom!.items.splice(itemIndex, 1)[0]!;
      this.state.inventory.push(item);
      this.logAction('Pick', `Picked up ${item.name}`);
      return `Took ${item.name}.`;
    }
    return `No ${itemName} here.`;
  }
  drop(itemName: string): string {
    const itemIndex = this.state.inventory.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (itemIndex !== -1) {
      const item = this.state.inventory.splice(itemIndex, 1)[0]!;
      this.state.rooms[this.state.currentRoomId]!.items.push(item);
      this.logAction('Interact', `Dropped ${item.name}`);
      return `Dropped ${item.name}.`;
    }
    return `No ${itemName} in inventory.`;
  }
  kick(targetName: string): string {
    this.logAction('Attack', `Kicked ${targetName}`);
    return `Kicked ${targetName}.`;
  }
  throw(itemName: string, targetName?: string): string {
    const itemIndex = this.state.inventory.findIndex(i => i.name.toLowerCase() === itemName.toLowerCase());
    if (itemIndex !== -1) {
      const item = this.state.inventory.splice(itemIndex, 1)[0]!;
      this.state.rooms[this.state.currentRoomId]!.items.push(item);
      this.logAction('Throw', `Threw ${item.name}`);
      return `Threw ${item.name}.`;
    }
    return `No ${itemName} to throw.`;
  }
  burn(targetName: string): string {
    const item = this.state.rooms[this.state.currentRoomId]?.items.find(i => i.name.toLowerCase() === targetName.toLowerCase()) ||
                 this.state.inventory.find(i => i.name.toLowerCase() === targetName.toLowerCase());
    if (item && item.canBurn) {
      item.isBurned = true;
      this.logAction('Interact', `Burned ${item.name}`);
      return `Burned ${item.name}.`;
    }
    return `Can't burn ${targetName}.`;
  }
}
