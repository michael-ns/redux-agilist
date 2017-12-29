// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { borderRadius, colors, grid } from '../constants';
import type { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import type { Card } from '../types';

type HTMLElement = any;

const Container = styled.a`
border-radius: ${borderRadius}px;
border: 1px solid grey;
background-color: ${({ isDragging }) => (isDragging ? colors.green : colors.white)};

/* cursor: grabbing is handled by app */
cursor: grab;
box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px ${colors.shadow}` : 'none')};
padding: ${grid}px;
min-height: 40px;
margin-bottom: ${grid}px;
user-select: none;
transition: background-color 0.1s ease;

/* anchor overrides */
color: ${colors.black};

&:hover {
  color: ${colors.black};
  text-decoration: none;
}
&:focus {
  outline: 2px solid ${colors.purple};
  box-shadow: none;
}

/* flexbox */
display: flex;
align-items: center;

margin-left: 10px;
margin-right: 10px;
`;

const Avatar = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
margin-right: ${grid}px;
flex-shrink: 0;
flex-grow: 0;
`;

const Content = styled.div`
/* flex child */
flex-grow: 1;

/* Needed to wrap text in ie11 */
/* https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox */
flex-basis: 100%

/* flex parent */
display: flex;
flex-direction: column;

min-height: 300 px;
min-width: 150 px;
`;

const PointInfo = styled.div`
  font-size: 10pt;
  font-weight: bold;
`;

const BlockQuote = styled.div`
&::before {
  content: open-quote;
}

&::after {
  content: close-quote;
}
`;

const Footer = styled.div`
display: flex;
margin-top: ${grid}px;
`;

const QuoteId = styled.small`
flex-grow: 0;
margin: 0;
`;

const Attribution = styled.small`
margin: 0;
margin-left: ${grid}px;
text-align: right;
flex-grow: 1;
`;

type Props = {|
  card: Card,
  provided: DraggableProvided,
  snapshot: DraggableStateSnapshot,
  autoFocus?: boolean,
  isDragging: boolean,
|}

export default class CardItem extends Component<Props> {
  componentDidMount() {
    if (!this.props.autoFocus) {
      return;
    }

    // eslint-disable-next-line react/no-find-dom-node
    const node: HTMLElement = ReactDOM.findDOMNode(this);
    node.focus();
  }

  cardProdInfo(card) {
    var cardProdInfo = '';
    if (card.prodPointType === 'static') {
      cardProdInfo = card.prodPoint;
    } else {
      cardProdInfo = "HC X " + card.prodPointMultiplier;
    }
    return cardProdInfo;
  }

  cardAgilityInfo(card) {
    var cardAgilityInfo = '';
    if (card.agilityPointType === 'static') {
      cardAgilityInfo = card.agilityPoint;
    } else {
      cardAgilityInfo = "HC X " + card.agilityPointMultiplier;
    }
    return cardAgilityInfo;
  }

  render() {
    const { card, isDragging, provided, snapshot } = this.props;

    var productivityStyle = {
      color: 'LightSalmon'
    };

    var agilityStyle = {
      color: 'LimeGreen'
    };

    return (
      <Container className="card-item"
        isDragging={isDragging}
        innerRef={provided.innerRef}
        style={provided.draggableStyle}
        {...provided.dragHandleProps}
      >
        <Avatar src={card.avatarUrl} alt={card.name} />
        <Content classname="card-info">
          <PointInfo style={productivityStyle}>Prod: { this.cardProdInfo(card) }</PointInfo>
          <PointInfo style={agilityStyle}>Agil: { this.cardAgilityInfo(card) }</PointInfo>
          <Footer>
            <QuoteId></QuoteId>
            <Attribution>{card.name}</Attribution>
          </Footer>
        </Content>
      </Container>
    );
  }
}
