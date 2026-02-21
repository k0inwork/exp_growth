export interface AtomicAction { id: string; description: string; embedding: number[]; timestamp: number; }
export interface Item { id: string; name: string; description: string; canPickUp: boolean; canBurn: boolean; isBurned?: boolean; }
export interface Room { id: string; name: string; description: string; exits: Record<string, string>; items: Item[]; }
export interface GameState { currentRoomId: string; inventory: Item[]; rooms: Record<string, Room>; logs: AtomicAction[]; }
export type ActionType = 'Move' | 'Throw' | 'Pick' | 'Attack' | 'Block' | 'Interact' | 'Work';
