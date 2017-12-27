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
    productivityLevel: this.props.initial.productivityLevel,
    agilityLevel: this.props.initial.agilityLevel,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      turn: nextProps.initial.turn,
      productivityPoint: nextProps.initial.productivityPoint,
      agilityPoint: nextProps.initial.agilityPoint,
      productivityLevel: nextProps.initial.productivityLevel,
      agilityLevel: nextProps.initial.agilityLevel,
    });
  }

  render() {
    const { turn, productivityPoint, agilityPoint, productivityLevel, agilityLevel } = this.state;

     return (
       <div className="row game-stats">
        <div className="col-md-4">
          <p>Productivity Point: {productivityPoint}</p>
          <p>Agility Point: {agilityPoint}</p>
        </div>
        <div className="col-md-4">
          <p>Productivity Level: {productivityLevel}</p>
          <p>Agile Maturity: {agilityLevel}</p>
        </div>
        <div className="col-md-4">
          <p>Turn: {turn}</p>
          <button type="button" className="btn btn-info">End Turn</button>
        </div>
       </div>
    );
  }
}
