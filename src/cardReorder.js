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
  const current: Card[] = [...cardCollection[source.droppableId]];
  const next: Card[] = [...cardCollection[destination.droppableId]];
  const target: Card = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Card[] = cardReorder(
      current,
      source.index,
      destination.index,
    );
    const result: CardCollection = {
      ...cardCollection,
      [source.droppableId]: reordered,
    };
    return {
      cardCollection: result,
      // not auto focusing in own list
      autoFocusCardId: null,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result: CardCollection = {
    ...cardCollection,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    cardCollection: result,
    autoFocusCardId: target.id,
  };
};
