// @flow
import type { Card, CardCollection } from './types';
import type { DraggableLocation } from '../../src/types';

// a little function to help us with reordering the result
const cardReorder = (
  list: any[],
  startIndex: number,
  endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("within cardReorder ====" + JSON.stringify(result));
  return result;
};

export default cardReorder;

type ReorderCardCollectionArgs = {|
  cardCollection: CardCollection,
  source: DraggableLocation,
  destination: DraggableLocation,
|}

export type ReorderCardCollectionResult = {|
  cardCollection: CardCollection,
  autoFocusCardId: ?string,
|}

export const reorderCardCollection = ({
  cardCollection,
  source,
  destination,
}: ReorderCardCollectionArgs): ReorderCardCollectionResult => {
  const current: Card[] = [...cardCollection[source.droppableId].cards];
  const next: Card[] = [...cardCollection[destination.droppableId].cards];
  const target: Card = current[source.index];

  console.log("current ====" + JSON.stringify(current));
  console.log("next ====" + JSON.stringify(next));
  console.log("target ====" + JSON.stringify(target));

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Card[] = cardReorder(
      current,
      source.index,
      destination.index,
    );
    const newCardCollection = cardCollection;
    newCardCollection[source.droppableId].cards = reordered;

    // const result: CardCollection = {
    //   // ...cardCollection,
    //   // [source.droppableId]: reordered,
    //   ...cardCollection,
    //   [source.droppableId]: reordered,
    // };
    // console.log("within reorder ====" + JSON.stringify(newCardCollection));
    return {
      cardCollection: newCardCollection,
      // not auto focusing in own list
      autoFocusCardId: null,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const newCardCollection = cardCollection;
  newCardCollection[source.droppableId].cards = current;
  newCardCollection[destination.droppableId].cards = next;

  // const result: CardCollection = {
  //   ...cardCollection,
  //   [source.droppableId.cards]: current,
  //   [destination.droppableId.cards]: next,
  // };

  return {
    cardCollection: newCardCollection,
    autoFocusCardId: target.id,
  };
};
