import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-beautiful-dnd';
import AuthorList from '../primatives/author-list';
import QuoteList from '../primatives/quote-list';
// import CardCollection from '../primatives/card-collection';
// import Card from '../primatives/card-item';
import { colors, grid } from '../constants';
import { reorderQuoteMap } from '../reorder';
import type { ReorderQuoteMapResult } from '../reorder';
import type { QuoteMap } from '../types';
import { quotes, getQuotes } from '../data';
import type {
  DropResult,
  DragStart,
} from 'react-beautiful-dnd';

const publishOnDragStart = action('onDragStart');
const publishOnDragEnd = action('onDragEnd');

const Root = styled.div`
  background-color: ${colors.blue.deep};
  box-sizing: border-box;
  padding: ${grid * 2}px;
  min-height: 100vh;
  /* flexbox */
  display: flex;
  flex-direction: column;
`;

const isDraggingClassName = 'is-dragging';

type Props = {|
  initial: QuoteMap
|}

type State = ReorderQuoteMapResult;

const initialGameState = {
  turn: 1,
  handCount: 5,
  dealHand: 1,
  memberCount: 0,
  practiceCount: 0,
  prodPoint: 0,
  agilityPoint: 0,
  prodLevels: [{"1": "3"}, {"2": "5"}, {"3": "8"}],
  agilityLevels: [{"1": "3"}, {"2": "5"}, {"3": "8"}]
}

export default class QuoteApp extends Component<Props, State> {
  /* eslint-disable react/sort-comp */

  state: State = {
    quoteMap: this.props.initial,
    gameState: initialGameState,
    autoFocusQuoteId: null,
  };

  playCard(prodPointInc) {
    this.props.playCard(prodPointInc);
  }

  onDragStart = (initial: DragStart) => {
    publishOnDragStart(initial);
    // $ExpectError - body could be null?
    document.body.classList.add(isDraggingClassName);
  }

  onDragEnd = (result: DropResult) => {
    publishOnDragEnd(result);
    // $ExpectError - body could be null?
    document.body.classList.remove(isDraggingClassName);

    // // dropped outside the list
    if (!result.destination) {
      return;
    }

    this.setState(reorderQuoteMap({
      quoteMap: this.state.quoteMap,
      source: result.source,
      destination: result.destination,
    }));

    //update game stats at the end of this function
    this.playCard(3);
    console.log("play card with 3 plus prod point");
    console.log("source: " + JSON.stringify(result.source));
    console.log("destination: " + JSON.stringify(result.destination));
    this.getDraggedCard(result.destination);
  }

  getDraggedCard(cardLocation) {
    var draggedCard = JSON.stringify(this.state.quoteMap[cardLocation.droppableId][cardLocation.index].author.name);
    console.log("dragged card: " + draggedCard);
    // Object.keys(this.state.quoteMap).map((key: cardLocation.droppableId) => (
    //
    // )
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-expressions
    injectGlobal`
      body.${isDraggingClassName} {
        cursor: grabbing;
        user-select: none;
      }
    `;
  }

  render() {
    const { quoteMap, gameState, autoFocusQuoteId } = this.state;

     return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Root>
         {Object.keys(quoteMap).map((key: string) => (
          <AuthorList
            internalScroll
            key={key}
            listId={key}
            listType="wtf"
            listTitle={key}
            quotes={quoteMap[key]}
            autoFocusQuoteId={autoFocusQuoteId}
          />
        ))}
        </Root>
      </DragDropContext>
    );
  }
}

//
//
// <AuthorList
//   internalScroll
//   key="memberZone"
//   listId="memberZone"
//   listType="MEMBER"
//   listTitle="Member Zone"
//   quotes={getQuotes(2)}
//   autoFocusQuoteId={autoFocusQuoteId}
// />
// <AuthorList
//   internalScroll
//   key="practiceZone"
//   listId="practiceZone"
//   listType="PRACTICE"
//   listTitle="Practice Zone"
//   quotes={getQuotes(2)}
//   autoFocusQuoteId={autoFocusQuoteId}
// />
// <AuthorList
//   internalScroll
//   key="handZone"
//   listId="handZone"
//   listType="HAND"
//   listTitle="Hand Zone"
//   quotes={getQuotes(5)}
//   autoFocusQuoteId={autoFocusQuoteId}
// />
