// @flow
import type { Card, CardCollection } from './types';

const developer: Card = {
  id: '1',
  cardType: 'member',
  name: 'Developer',
  desc: '',
  avatarUrl: 'https://68.media.tumblr.com/avatar_1f7bdbbeb59c_128.png',
  prodPoint: 3,
  prodPointType: 'static',
  prodPointMultiplier: 1,
  agilityPoint: 1,
  agilityPointType: 'static',
  agilityPointMultiplier: 1
};

const tester: Card = {
  id: '2',
  cardType: 'member',
  name: 'Tester',
  desc: '',
  avatarUrl: 'https://68.media.tumblr.com/avatar_1a34fe6de498_128.png',
  prodPoint: 0,
  prodPointType: 'totalHeadCount',
  prodPointMultiplier: 2,
  agilityPoint: 1,
  agilityPointType: 'static',
  agilityPointMultiplier: 1
};

const businessAnalyst: Card = {
  id: '3',
  cardType: 'member',
  name: 'Business Analyst',
  desc: '',
  avatarUrl: 'https://68.media.tumblr.com/avatar_ec98529441c4_128.png',
  prodPoint: 0,
  prodPointType: 'totalHeadCount',
  prodPointMultiplier: 1.5,
  agilityPoint: 1,
  agilityPointType: 'static',
  agilityPointMultiplier: 1
};

const scrumMaster: Card = {
  id: '4',
  cardType: 'member',
  name: 'Scrum Master',
  desc: '',
  avatarUrl: 'https://68.media.tumblr.com/avatar_09404f3287c6_128.png',
  prodPoint: 0,
  prodPointType: 'totalHeadCount',
  prodPointMultiplier: 1,
  agilityPoint: 0,
  agilityPointType: 'totalHeadCount',
  agilityPointMultiplier: 1
};

const agileBootcampTraining: Card = {
  id: '5',
  cardType: 'practice',
  name: 'Agile Bootcamp Training',
  desc: '',
  avatarUrl: 'https://68.media.tumblr.com/avatar_09404f3287c6_128.png',
  prodPoint: 0,
  prodPointType: 'static',
  prodPointMultiplier: 1,
  agilityPoint: 0,
  agilityPointType: 'totalHeadCount',
  agilityPointMultiplier: 0.5
};

export const cards: Card[] = [
  developer,
  tester,
  businessAnalyst,
  scrumMaster,
  agileBootcampTraining
]

let idCount: number = 0;

export const getCards = (count: number): Card[] =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Card = cards[Math.floor(Math.random() * cards.length)];

    const custom: Card = {
      id: `card-${idCount++}`,
      cardType: random.cardType,
      name: random.name,
      desc: random.desc,
      avatarUrl: random.avatarUrl,
      prodPoint: random.prodPoint,
      prodPointType: random.prodPointType,
      prodPointMultiplier: random.prodPointMultiplier,
      agilityPoint: random.agilityPoint,
      agilityPointType: random.agilityPointType,
      agilityPointMultiplier: random.agilityPointMultiplier,
    };

    return custom;
  });
