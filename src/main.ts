import { GameLoop } from './core/gameLoop';
import { loadGame, saveGame, calcOfflineProgress } from './core/saveManager';
import { tick } from './systems/game';
import { renderUI } from './ui/renderer';
import './style.css';

const app = document.getElementById('app')!;
const state = loadGame();

// 오프라인 진행 처리
const offlineSec = calcOfflineProgress(state);
if (offlineSec > 10) {
  tick(state, offlineSec);
}

function render() {
  renderUI(app, state, render);
}

// 게임 루프: 매 초 틱 + 렌더
const loop = new GameLoop((deltaSec) => {
  tick(state, deltaSec);
  render();
});

// 30초마다 자동 저장
setInterval(() => saveGame(state), 30000);

// 페이지 떠날 때 저장
window.addEventListener('beforeunload', () => saveGame(state));

// 시작
render();
loop.start();
