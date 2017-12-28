// @flow
import type { Buff } from './types';

const unclearRequirement: Buff = {
  id: '1',
  buffName: 'Unclear Requirement',
  buffType: 'productivityPercentage',
  buffTypeText: 'Productivity reduces by',
  buffValue: -0.3,
  buffValueText: '30%',
  buffDesc: 'Due to unclear requirement, team struggle to identify what the Product Owner is expecting',
  buffIconUrl: 'https://educationalresearchtechniques.files.wordpress.com/2017/10/13.png',
};

const teamBuildingEvent: Buff = {
  id: '2',
  buffName: 'Team Building Event',
  buffType: 'agilityStatic',
  buffTypeText: 'Agility increases by',
  buffValue: 3,
  buffValueText: '3 points',
  buffDesc: 'All team members had a good time and they are better at working as a team!',
  buffIconUrl: 'https://devoralive.com/wp-content/uploads/2016/05/teamwork.png',
};

export const buffs: Buff[] = [
  unclearRequirement,
  teamBuildingEvent
]

let idCount: number = 0;

export const getBuffs = (count: number): Buff[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Buff = buffs[Math.floor(Math.random() * buffs.length)];

    const custom: Buff = {
      id: `buff-${idCount++}`,
      buffName: random.buffName,
      buffType: random.buffType,
      buffTypeText: random.buffTypeText,
      buffValue: random.buffValue,
      buffValueText: random.buffValueText,
      buffDesc: random.buffDesc,
      buffIconUrl: random.buffIconUrl,
    };

    return custom;
  });
