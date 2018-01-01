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
      productivityLevels: this.props.initial.productivityLevels,
      agilityLevels: this.props.initial.agilityLevels,
    };

    this.handleEndTurn = this.handleEndTurn.bind(this);
    this.shuffleHand = this.shuffleHand.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      turn: nextProps.initial.turn,
      actionLeft: nextProps.initial.actionLeft,
      productivityPoint: nextProps.initial.productivityPoint,
      agilityPoint: nextProps.initial.agilityPoint,
      productivityLevel: nextProps.initial.productivityLevel,
      agilityLevel: nextProps.initial.agilityLevel,
      productivityLevels: nextProps.initial.productivityLevels,
      agilityLevels: nextProps.initial.agilityLevels,
    });
  }

  handleEndTurn() {
    this.props.handleEndTurn();
  }

  shuffleHand = () => {
    this.props.shuffleHand();
  }

  render() {
    const { turn, actionLeft, productivityPoint, agilityPoint, productivityLevel, agilityLevel, productivityLevels, agilityLevels } = this.state;

    var gameDashboardStyle = {
      margin: '20px',
      padding: '20px',
      backgroundColor: 'Ivory',
      border: '1px solid Orange',
      borderRadius: '25px'
    };

    var prodBarStyle = {
      width: (productivityPoint/productivityLevels[productivityLevels.length-1]*100).toString() + '%'
    };

    var agilBarStyle = {
      width: (agilityPoint/agilityLevels[agilityLevels.length-1]*100).toString() + '%'
    };

    var productivityStyle = {
      color: 'LightSalmon'
    };

    var agilityStyle = {
      color: 'LimeGreen'
    };

    var infoStyle = {
      fontSize: '12px'
    };

    var shuffleStyle = {
      marginBottom: '15px'
    };

     return (
       <div className="row game-dashboard" style={gameDashboardStyle}>
         <div className="col-md-5 productivity">
           <div className="progress">
             <div className="progress-bar bg-warning"
                  role="progressbar"
                  style={prodBarStyle}
                  aria-valuenow={productivityPoint/productivityLevels[productivityLevels.length-1]*100}
                  aria-valuemin="0"
                  aria-valuemax="100">{productivityPoint}/{productivityLevels[productivityLevels.length-1]}</div>
           </div>
           <p style={productivityStyle}>Productivity Point: {productivityPoint}</p>
           <p style={productivityStyle}>Productivity Level: {productivityLevel}</p>
           <p style={productivityStyle}>({productivityLevels[productivityLevel-1]-productivityPoint} more points to next level)</p>
           <p style={infoStyle}>* Team max head count scales with Productivity Level</p>
         </div>
         <div className="col-md-5 agility">
           <div className="progress">
             <div className="progress-bar bg-success"
                  role="progressbar"
                  style={agilBarStyle}
                  aria-valuenow={agilityPoint/agilityLevels[agilityLevels.length-1]*100}
                  aria-valuemin="0"
                  aria-valuemax="100">{agilityPoint}/{agilityLevels[agilityLevels.length-1]}</div>
           </div>
           <p style={agilityStyle}>Agility Point: {agilityPoint}</p>
           <p style={agilityStyle}>Agile Maturity: {agilityLevel}</p>
           <p style={agilityStyle}>({agilityLevels[agilityLevel-1]-agilityPoint} more points to next level)</p>
           <p style={infoStyle}>* Number of cards can be played each turn scales with Agile Maturity</p>
         </div>
         <div className="col-md-2 agility">
           <p>Turn: {turn}</p>
           <p style={agilityStyle}>Action Left: {actionLeft}</p>
           <button type="button" className="btn btn-warning" style={shuffleStyle} onClick={this.shuffleHand}>Shuffle Hand</button>
           <button type="button" className="btn btn-info" onClick={this.handleEndTurn}>End Turn</button>
         </div>
       </div>
    );
  }
}
