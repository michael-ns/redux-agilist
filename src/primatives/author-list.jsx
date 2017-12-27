// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Author from '../primatives/author-item';
import { grid, colors } from '../constants';
import type { Quote } from '../types';
import type {
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? colors.blue.lighter : colors.blue.light)};
  display: flex;
  flex-direction: column;
  padding: ${grid}px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: ${grid}px 0;
`;

const DropZone = styled.div`
  display: flex;
  /*
    Needed to avoid growth in list due to lifting the first item
    Caused by display: inline-flex strangeness
  */
  align-items: start;

  /* stop the list collapsing when empty */
  min-width: 600px;

`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const Container = styled.div`
  /* flex child */
  flex-grow: 1;

  /* flex parent */
  /* needed to allow width to grow greater than body */
  display: inline-flex;
`;

type Props = {|
  quotes: Quote[],
  listId: string,
  listType?: string,
  internalScroll?: boolean,
  autoFocusQuoteId?: ?string,
|}

export default class AuthorList extends Component<Props> {
  renderBoard = (boardTitle: BoardTitle, dropProvided: DroppableProvided) => {
    const { listType, quotes } = this.props;
    console.log("hehe" + boardTitle + JSON.stringify(quotes[1]) );
//quotes[0].id + quotes[0].content + quotes[0].author
    return (
      <Container>
        <h4>{boardTitle} - {quotes.length}</h4>
        <DropZone innerRef={dropProvided.innerRef}>
          {quotes.map((quote: Quote) => (
            <Draggable key={quote.id} draggableId={quote.id} type={listType} author={quote.author.name}>
              {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                <div>
                  <Author
                    author={quote.author}
                    provided={dragProvided}
                    snapshot={dragSnapshot}
                    autoFocus={this.props.autoFocusQuoteId === quote.id}
                  />
                  {dragProvided.placeholder}
                </div>
            )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  }

  render() {
    const { listId, listType, listTitle, internalScroll } = this.props;

    return (
      <Droppable droppableId={listId} type={listType} direction="horizontal">
        {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
          <Wrapper isDraggingOver={dropSnapshot.isDraggingOver}>
            {internalScroll ? (
              <ScrollContainer>
                {this.renderBoard(listTitle, dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderBoard(listTitle, dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}
