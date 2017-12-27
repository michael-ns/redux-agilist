// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardItem from '../primatives/card-item';
import { grid, colors } from '../constants';
import type { Card } from '../types';
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
  min-width: 800px;

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
  listId: string,
  cards: Card[],
  listType?: string,
  internalScroll?: boolean,
  autoFocusCardId?: ?string,
|}

export default class CardList extends Component<Props> {
  renderCards = (boardTitle: BoardTitle, dropProvided: DroppableProvided) => {
    const { listType, cards } = this.props;

    return (
      <Container>
        <h4>{boardTitle} - {cards.length}</h4>
        <DropZone innerRef={dropProvided.innerRef}>
          {cards.map((card: Card) => (
            <Draggable key={card.id} draggableId={card.id} type={listType}>
              {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => (
                <div>
                  <CardItem
                    key={card.id}
                    card={card}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                    snapshot={dragSnapshot}
                    autoFocus={this.props.autoFocusCardId === card.id}
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
    const { listId, listType, listTitle, internalScroll, isDropDisabled } = this.props;

    return (
      <Droppable droppableId={listId} type={listType} direction="horizontal">
        {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
          <Wrapper isDraggingOver={dropSnapshot.isDraggingOver}>
            {internalScroll ? (
              <ScrollContainer>
                {this.renderCards(listTitle, dropProvided)}
              </ScrollContainer>
            ) : (
              this.renderCards(listTitle, dropProvided)
            )}
          </Wrapper>
        )}
      </Droppable>
    );
  }
}

//
//   render() {
//     const {
//       ignoreContainerClipping,
//       internalScroll,
//       isDropDisabled,
//       listId,
//       listType,
//       style,
//     } = this.props;
//
//     return (
//       <Droppable
//         droppableId={listId}
//         ignoreContainerClipping={ignoreContainerClipping}
//         isDropDisabled={isDropDisabled}
//         type={listType}
//       >
//         {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
//           <Wrapper
//             style={style}
//             isDraggingOver={dropSnapshot.isDraggingOver}
//             isDropDisabled={isDropDisabled}
//           >
//             {internalScroll ? (
//               <ScrollContainer>
//                 {this.renderCards(dropProvided)}
//               </ScrollContainer>
//             ) : (
//               this.renderCards(dropProvided)
//             )}
//           </Wrapper>
//         )}
//       </Droppable>
//     );
//   }
// }
