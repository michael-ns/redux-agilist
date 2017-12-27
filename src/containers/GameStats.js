import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { action } from '@storybook/addon-actions';
const publishOnDragStart = action('onDragStart');
const publishOnDragEnd = action('onDragEnd');

export default class GameStats extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  constructor(props) {
    super(props);
    this.state = {
      turn: this.props.initial.turn,
      actionLeft: this.props.initial.actionLeft,
      productivityPoint: this.props.initial.productivityPoint,
      agilityPoint: this.props.initial.agilityPoint,
      productivityLevel: this.props.initial.productivityLevel,
      agilityLevel: this.props.initial.agilityLevel,
    };

    this.handleEndTurn = this.handleEndTurn.bind(this);
  }
  //
  // state: State = {
  //   turn: this.props.initial.turn,
  //   actionLeft: this.props.initial.actionLeft,
  //   productivityPoint: this.props.initial.productivityPoint,
  //   agilityPoint: this.props.initial.agilityPoint,
  //   productivityLevel: this.props.initial.productivityLevel,
  //   agilityLevel: this.props.initial.agilityLevel,
  // };

  componentWillReceiveProps(nextProps) {
    this.setState({
      turn: nextProps.initial.turn,
      actionLeft: nextProps.initial.actionLeft,
      productivityPoint: nextProps.initial.productivityPoint,
      agilityPoint: nextProps.initial.agilityPoint,
      productivityLevel: nextProps.initial.productivityLevel,
      agilityLevel: nextProps.initial.agilityLevel,
    });
  }
  
  handleEndTurn() {
    this.props.handleEndTurn();
  }

  render() {
    const { turn, actionLeft, productivityPoint, agilityPoint, productivityLevel, agilityLevel } = this.state;

    var productivityStyle = {
      color: 'orange'
    };

    var agilityStyle = {
      color: 'LimeGreen'
    };

     return (
       <div className="row game-stats">
        <div className="col-md-4">
          <p style={productivityStyle}>Productivity Point: {productivityPoint}</p>
          <p style={agilityStyle}>Agility Point: {agilityPoint}</p>
        </div>
        <div className="col-md-4">
          <p style={productivityStyle}>Productivity Level: {productivityLevel}</p>
          <p style={agilityStyle}>Agile Maturity: {agilityLevel}</p>
        </div>
        <div className="col-md-4">
          <p>Turn: {turn}</p>
          <p style={agilityStyle}>Action Left: {actionLeft}</p>
          <button type="button" className="btn btn-info" onClick={this.handleEndTurn}>End Turn</button>
        </div>
       </div>
    );
  }
}
