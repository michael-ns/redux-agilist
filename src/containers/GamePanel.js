import React, { Component } from 'react';
import {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Notifications, { success } from 'react-notification-system-redux';
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
import { cardPlayRule } from '../models/CardPlayRule';

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

class GameBoard extends Component<Props, State> {
  /* eslint-disable react/sort-comp */
  constructor(props) {
    super(props);
    this.state = {
      cardCollection: this.props.cardCollection,
      gameState: this.props.gameState,
      autoFocusCardId: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.context.store.dispatch(
      success(notificationOpts)
    );
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

    // check game rule to see whether this is a valid card play
    var draggedCard = this.state.cardCollection[result.destination.droppableId].cards[result.destination.index];
    var ruleCheck = cardPlayRule(draggedCard, this.state.gameState, this.state.cardCollection);

    if (ruleCheck != "success") {
      console.log("=====" + ruleCheck);
      this.handleClick();
      return;
    }

    // console.log("source ====" + JSON.stringify(result.source));
    // console.log("destination ====" + JSON.stringify(result.destination));

    this.setState(reorderCardCollection({
      cardCollection: this.state.cardCollection,
      source: result.source,
      destination: result.destination,
    }));

    //update game stats at the end of this function
    // console.log("====" + JSON.stringify(result.destination));
    var members = this.state.cardCollection['memberZone'].cards;
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
            listTitle={cardCollection[key].zoneName}
            cards={cardCollection[key].cards}
            autoFocusCardId={autoFocusCardId}
            isDropDisabled={cardCollection[key].isDropDisabled}
            isDragDisabled={cardCollection[key].isDragDisabled}
          />
        ))}
        </Root>
      </DragDropContext>
    );
  }
}

GameBoard.contextTypes = {
  store: PropTypes.object
};

export default GameBoard;
