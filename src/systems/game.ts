import { GameState, ResourceKey, BuildingState } from '../types';
import { BUILDINGS } from '../data/buildings';

export function createInitialState(): GameState {
  return {
    resources: { money: 20, ore: 0, metal: 0, goods: 0 },
    buildings: BUILDINGS.map((b) => ({ id: b.id, count: 0 })),
    totalTimePlayed: 0,
    lastSaveTime: Date.now(),
    saveVersion: 1,
  };
}

function getBuildingState(state: GameState, id: string): BuildingState {
  return state.buildings.find((b) => b.id === id)!;
}

export function getBuildingCost(state: GameState, buildingId: string): Record<string, number> {
  const data = BUILDINGS.find((b) => b.id === buildingId)!;
  const owned = getBuildingState(state, buildingId).count;
  const costs: Record<string, number> = {};
  for (const [res, base] of Object.entries(data.baseCost)) {
    costs[res] = Math.floor(base * Math.pow(data.costMultiplier, owned));
  }
  return costs;
}

export function canAfford(state: GameState, costs: Record<string, number>): boolean {
  for (const [res, amount] of Object.entries(costs)) {
    if (state.resources[res as ResourceKey] < amount) return false;
  }
  return true;
}

export function buyBuilding(state: GameState, buildingId: string): boolean {
  const costs = getBuildingCost(state, buildingId);
  if (!canAfford(state, costs)) return false;

  for (const [res, amount] of Object.entries(costs)) {
    state.resources[res as ResourceKey] -= amount;
  }
  getBuildingState(state, buildingId).count += 1;
  return true;
}

export function getProductionRates(state: GameState): Record<string, number> {
  const rates: Record<string, number> = {};
  for (const key of Object.keys(state.resources)) {
    rates[key] = 0;
  }

  for (const buildingState of state.buildings) {
    const data = BUILDINGS.find((b) => b.id === buildingState.id)!;
    const count = buildingState.count;
    if (count === 0) continue;

    // 소비할 자원이 충분한지 확인
    if (data.consumption) {
      let canProduce = true;
      for (const [res, amount] of Object.entries(data.consumption)) {
        const needed = amount * count;
        if (state.resources[res as ResourceKey] + (rates[res] ?? 0) < needed * 0.1) {
          canProduce = false;
          break;
        }
      }
      if (!canProduce) continue;
    }

    for (const [res, amount] of Object.entries(data.production)) {
      rates[res] = (rates[res] ?? 0) + amount * count;
    }
    if (data.consumption) {
      for (const [res, amount] of Object.entries(data.consumption)) {
        rates[res] = (rates[res] ?? 0) - amount * count;
      }
    }
  }

  return rates;
}

export function tick(state: GameState, deltaSec: number): void {
  const rates = getProductionRates(state);
  for (const [res, rate] of Object.entries(rates)) {
    const key = res as ResourceKey;
    state.resources[key] = Math.max(0, state.resources[key] + rate * deltaSec);
  }
  state.totalTimePlayed += deltaSec;
}
