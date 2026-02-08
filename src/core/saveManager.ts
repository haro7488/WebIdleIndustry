import { GameState } from '../types';
import { createInitialState } from '../systems/game';

const SAVE_KEY = 'WebIdleIndustry_save';

export function saveGame(state: GameState): void {
  state.lastSaveTime = Date.now();
  const json = JSON.stringify(state);
  localStorage.setItem(SAVE_KEY, btoa(json));
}

export function loadGame(): GameState {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return createInitialState();

  try {
    const json = atob(raw);
    const saved = JSON.parse(json) as GameState;
    // 기본값 병합 (새 필드가 추가된 경우 대비)
    const initial = createInitialState();
    return {
      ...initial,
      ...saved,
      resources: { ...initial.resources, ...saved.resources },
    };
  } catch {
    return createInitialState();
  }
}

export function deleteSave(): void {
  localStorage.removeItem(SAVE_KEY);
}

export function calcOfflineProgress(state: GameState): number {
  const now = Date.now();
  const elapsed = (now - state.lastSaveTime) / 1000;
  return Math.min(elapsed, 24 * 60 * 60); // 최대 24시간
}
