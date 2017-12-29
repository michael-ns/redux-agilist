import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import Notifications, { success, error, warning, info, removeAll } from 'react-notification-system-redux';

import { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import GamePanel from '../containers/GamePanel'
import GameStats from '../containers/GameStats'
import BuffRow from '../containers/BuffRow'
import { cards, getCards } from '../card';
import { buffs, getBuffs } from '../buff';
import type { Card, Buff } from '../types';
import type { CardCollection } from '../types';
import { handCardPlay } from '../models/GameCalc';

const memberZone: string = 'memberZone';
const practiceZone: string = 'practiceZone';
const handZone: string = 'handZone';

const cardCollection: CardCollection = {
  [memberZone]: {
                  cards: getCards(0),
                  zoneName: 'Member',
                  isDropDisabled: false,
                  isDragDisabled: true,
                },
  [practiceZone]: {
                  cards: getCards(0),
                  zoneName: 'Practice',
                  isDropDisabled: false,
                  isDragDisabled: true,
                },
  [handZone]: {
                  cards: getCards(5),
                  zoneName: 'Hand',
                  isDropDisabled: true,
                  isDragDisabled: false,
                },
};

class Game extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      turn: 1,
      actionLeft: 1,
      productivityPoint: 0,
      agilityPoint: 0,
      productivityLevel: 1,
      agilityLevel: 1,
      productivityLevels: [3, 5, 8, 15],
      agilityLevels: [3, 5, 8, 13],
      buffs: getBuffs(0),
    };

    this.playCard = this.playCard.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  };

  playCard(card, members, practices) {
    this.setState(
      handCardPlay(members, practices, this.state)
    );

    //handle game end logic
    if (this.state.productivityLevel === 5) {
      this.context.store.dispatch(
        success(
          {
            title: 'You Win!!!',
            message: 'Refresh the page to start a new game',
            position: 'tc',
            autoDismiss: 0,
            action: {
              label: 'Sweeet bro!'
            }
          }
        )
      )
    }
  };

  handleEndTurn() {
    //issue one random event by end of turn
    const newBuff = getBuffs(1)[0];
    this.state.buffs.push(newBuff);
    this.context.store.dispatch(
      warning(
        {
          title: 'Something Happened...',
          message: newBuff.buffDesc,
          position: 'tc',
          autoDismiss: 6
        }
      )
    );

    //re-calculate game stats
    var members = cardCollection['memberZone'].cards;
    var practices = cardCollection['practiceZone'].cards;

    this.setState(
      handCardPlay(members, practices, this.state)
    );

    //deal one card to hand
    cardCollection[handZone].cards.push(getCards(1)[0]);

    //update turn count and action left
    this.setState({
      turn: this.state.turn + 1,
      actionLeft: this.state.agilityLevel,
    });
    console.log("=====" + this.state.turn);
    console.log("=====" + this.state.agilityLevel);
  };

  render() {
    const {notifications} = this.props;

    return (
      <div className="container game-root">
        <GamePanel cardCollection={cardCollection} playCard={this.playCard} gameState={this.state} />
        <BuffRow initial={this.state} />
        <GameStats initial={this.state} handleEndTurn={this.handleEndTurn} />
        <Notifications notifications={notifications} />
      </div>
    );
  }
}

Game.contextTypes = {
  store: PropTypes.object
};

Game.propTypes = {
  notifications: PropTypes.array
};

export default connect(
  state => ({ notifications: state.notifications })
)(Game);
