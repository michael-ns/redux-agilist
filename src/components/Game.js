import React from 'react'
import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import GamePanel from '../containers/GamePanel'
import GameStats from '../containers/GameStats'
import { cards, getCards } from '../card';
import type { Card } from '../types';
import type { CardCollection } from '../types';
import { handCardPlay } from '../models/GameCalc';

const memberZone: string = 'memberZone';
const practiceZone: string = 'practiceZone';
const handZone: string = 'handZone';

// const cardCollection: CardCollection = {
//   [memberZone]: getCards(0),
//   [practiceZone]: getCards(0),
//   [handZone]: getCards(5),
// };

const cardCollection: CardCollection = {
  [memberZone]: {
                  cards: getCards(0),
                  zoneName: 'Members',
                  isDropDisabled: false,
                  isDragDisabled: true,
                },
  [practiceZone]: {
                  cards: getCards(0),
                  zoneName: 'Practices',
                  isDropDisabled: false,
                  isDragDisabled: true,
                },
  [handZone]: {
                  cards: getCards(2),
                  zoneName: 'Hand',
                  isDropDisabled: true,
                  isDragDisabled: false,
                },
};

export default class Game extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      turn: 1,
      productivityPoint: 0,
      agilityPoint: 0,
      productivityLevel: 1,
      agilityLevel: 1,
      productivityLevels: [3, 5, 8],
      agilityLevels: [3, 5, 8],
    };

    this.playCard = this.playCard.bind(this);
  };

  playCard(card, members) {
    this.setState(
      handCardPlay(card, members, this.state)
    )
  };

  render() {
    return (
      <div className="container game-root">
        <GamePanel cardCollection={cardCollection} playCard={this.playCard} gameState={this.state} />
        <GameStats initial={this.state} />
      </div>
    );
  }
}
