import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { action } from '@storybook/addon-actions';
const publishOnDragStart = action('onDragStart');
const publishOnDragEnd = action('onDragEnd');

export default class GameStats extends Component<Props, State> {
  /* eslint-disable react/sort-comp */

  state: State = {
    turn: this.props.initial.turn,
    productivityPoint: this.props.initial.productivityPoint,
    agilityPoint: this.props.initial.agilityPoint,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      turn: nextProps.initial.turn,
      productivityPoint: nextProps.initial.productivityPoint,
      agilityPoint: nextProps.initial.agilityPoint,
    });
  }

  render() {
    const { turn, productivityPoint, agilityPoint } = this.state;

     return (
       <div>
        <p>Turn - {turn}</p>
        <p>Productivity Point - {productivityPoint}</p>
        <p>Agility Point - {agilityPoint}</p>
       </div>
    );
  }
}
