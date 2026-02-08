import { BuildingData } from '../types';

export const BUILDINGS: BuildingData[] = [
  {
    id: 'mine',
    name: '광산',
    description: '광석을 채굴합니다',
    baseCost: { money: 10 },
    costMultiplier: 1.15,
    production: { ore: 1 },
  },
  {
    id: 'smelter',
    name: '제련소',
    description: '광석을 금속으로 제련합니다',
    baseCost: { money: 50 },
    costMultiplier: 1.18,
    production: { metal: 1 },
    consumption: { ore: 2 },
  },
  {
    id: 'factory',
    name: '공장',
    description: '금속으로 상품을 생산합니다',
    baseCost: { money: 200 },
    costMultiplier: 1.2,
    production: { goods: 1 },
    consumption: { metal: 2 },
  },
  {
    id: 'market',
    name: '시장',
    description: '상품을 판매하여 수익을 얻습니다',
    baseCost: { money: 500 },
    costMultiplier: 1.22,
    production: { money: 10 },
    consumption: { goods: 2 },
  },
];
