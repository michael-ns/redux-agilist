import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { action } from '@storybook/addon-actions';
import { DragDropContext } from 'react-beautiful-dnd';
import CardList from '../primatives/card-list';
import Card from '../primatives/card-item';
import { colors, grid } from '../constants';
import { reorderCardCollection } from '../cardReorder';
import type { ReorderCardCollectionResult } from '../cardReorder';
import type { CardCollection } from '../types';
import { cards, getCards } from '../card';
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
  min-height: 50vh;
  /* flexbox */
  display: flex;
  flex-direction: column;
`;

const isDraggingClassName = 'is-dragging';

type Props = {|
  initial: CardCollection
|}

type State = ReorderCardCollectionResult;

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

export default class GameBoard extends Component<Props, State> {
  /* eslint-disable react/sort-comp */

  state: State = {
    cardCollection: this.props.initial,
    gameState: initialGameState,
    autoFocusCardId: null,
  };

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

    this.setState(reorderCardCollection({
      cardCollection: this.state.cardCollection,
      source: result.source,
      destination: result.destination,
    }));

    //update game stats at the end of this function
    console.log("====" + JSON.stringify(result.destination));
    var draggedCard = this.state.cardCollection[result.destination.droppableId][result.destination.index];
    var members = this.state.cardCollection['memberZone'];
    this.props.playCard(draggedCard, members);
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
    const { cardCollection, gameState, autoFocusCardId } = this.state;

     return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Root>
         {Object.keys(cardCollection).map((key: string) => (
          <CardList
            internalScroll
            key={key}
            listId={key}
            listType="wtf"
            listTitle={key}
            cards={cardCollection[key]}
            autoFocusCardId={autoFocusCardId}
          />
        ))}
        </Root>
      </DragDropContext>
    );
  }
}
