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
import { cards, getCards } from '../card';
import type { Card } from '../types';
import type { CardCollection } from '../types';
import { handCardPlay } from '../models/GameCalc';

const notificationOpts = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Hey, it\'s good to see you!',
  message: 'Now you can see how easy it is to use notifications in React!',
  position: 'tc',
  autoDismiss: 2,
  action: {
    label: 'Click me!!',
    callback: () => alert('clicked!')
  }
};

const memberZone: string = 'memberZone';
const practiceZone: string = 'practiceZone';
const handZone: string = 'handZone';

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
      productivityPoint: 0,
      agilityPoint: 0,
      productivityLevel: 1,
      agilityLevel: 1,
      productivityLevels: [3, 5, 8, 13],
      agilityLevels: [3, 5, 8, 13],
    };

    this.playCard = this.playCard.bind(this);
    //notification
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  };

  //=============== below are for notification

    dispatchNotification(fn, timeout) {
      setTimeout(() => {
        this.context.store.dispatch(fn(notificationOpts));
      }, timeout);
    }

    handleClick() {
      console.log("====WTF!");
      this.dispatchNotification(success, 250);
      this.dispatchNotification(error, 500);
      this.dispatchNotification(warning, 750);
      this.dispatchNotification(info, 1000);
    }

    handleRemoveAll() {
      this.context.store.dispatch(removeAll());
    }

  //=============== above are for notification

  playCard(card, members) {
    this.setState(
      handCardPlay(card, members, this.state)
    )
  };

  render() {
    const {notifications} = this.props;

    return (
      <div className="container game-root">
        <GamePanel cardCollection={cardCollection} playCard={this.playCard} gameState={this.state} handleNotification={this.handleClick} />
        <GameStats initial={this.state} />
        <button onClick={this.handleClick}>Spawn some notifications!!!</button>
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
