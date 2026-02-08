export interface ResourceState {
  money: number;
  ore: number;
  metal: number;
  goods: number;
}

export interface BuildingState {
  id: string;
  count: number;
}

export interface GameState {
  resources: ResourceState;
  buildings: BuildingState[];
  totalTimePlayed: number;
  lastSaveTime: number;
  saveVersion: number;
}

export interface BuildingData {
  id: string;
  name: string;
  description: string;
  baseCost: Record<string, number>;
  costMultiplier: number;
  production: Record<string, number>;
  consumption?: Record<string, number>;
  unlockCondition?: () => boolean;
}

export type ResourceKey = keyof ResourceState;
