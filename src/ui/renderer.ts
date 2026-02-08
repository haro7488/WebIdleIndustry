import { GameState, ResourceKey } from '../types';
import { BUILDINGS } from '../data/buildings';
import { getBuildingCost, canAfford, getProductionRates, buyBuilding } from '../systems/game';
import { saveGame, deleteSave } from '../core/saveManager';
import { formatNumber, formatTime, resourceName } from '../utils/format';

const RESOURCE_ICONS: Record<string, string> = {
  money: '$',
  ore: '#',
  metal: '=',
  goods: '*',
};

export function renderUI(app: HTMLElement, state: GameState, onUpdate: () => void): void {
  const rates = getProductionRates(state);

  app.innerHTML = `
    <div class="game">
      <header class="header">
        <h1>WebIdleIndustry</h1>
        <div class="playtime">${formatTime(state.totalTimePlayed)}</div>
      </header>

      <section class="resources">
        ${Object.entries(state.resources)
          .map(([key, val]) => {
            const rate = rates[key] ?? 0;
            const rateStr = rate > 0 ? `+${formatNumber(rate)}` : rate < 0 ? formatNumber(rate) : '0';
            return `
              <div class="resource-card">
                <span class="res-icon">${RESOURCE_ICONS[key] ?? '?'}</span>
                <span class="res-name">${resourceName(key)}</span>
                <span class="res-value">${formatNumber(val)}</span>
                <span class="res-rate">${rateStr}/s</span>
              </div>
            `;
          })
          .join('')}
      </section>

      <section class="buildings">
        <h2>건물</h2>
        ${BUILDINGS.map((data) => {
          const owned = state.buildings.find((b) => b.id === data.id)!.count;
          const costs = getBuildingCost(state, data.id);
          const affordable = canAfford(state, costs);
          const costStr = Object.entries(costs)
            .map(([r, a]) => `${resourceName(r)} ${formatNumber(a)}`)
            .join(', ');
          const prodStr = Object.entries(data.production)
            .map(([r, a]) => `+${a} ${resourceName(r)}`)
            .join(', ');
          const consStr = data.consumption
            ? Object.entries(data.consumption)
                .map(([r, a]) => `-${a} ${resourceName(r)}`)
                .join(', ')
            : '';

          return `
            <div class="building-card ${affordable ? '' : 'disabled'}">
              <div class="building-info">
                <div class="building-name">${data.name} <span class="building-count">x${owned}</span></div>
                <div class="building-desc">${data.description}</div>
                <div class="building-effect">${prodStr}${consStr ? ' / ' + consStr : ''} /s</div>
              </div>
              <button class="buy-btn" data-building="${data.id}" ${affordable ? '' : 'disabled'}>
                구매<br><small>${costStr}</small>
              </button>
            </div>
          `;
        }).join('')}
      </section>

      <section class="actions">
        <button class="save-btn" id="save-btn">저장</button>
        <button class="reset-btn" id="reset-btn">리셋</button>
      </section>
    </div>
  `;

  // 건물 구매 이벤트
  app.querySelectorAll('.buy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.building!;
      if (buyBuilding(state, id)) {
        onUpdate();
      }
    });
  });

  // 저장 버튼
  app.querySelector('#save-btn')?.addEventListener('click', () => {
    saveGame(state);
  });

  // 리셋 버튼
  app.querySelector('#reset-btn')?.addEventListener('click', () => {
    if (confirm('정말 모든 진행을 초기화하시겠습니까?')) {
      deleteSave();
      location.reload();
    }
  });
}
