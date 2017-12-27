// @flow
import type { DraggableId, DraggableLocation } from 'react-beautiful-dnd';

export type Author = {|
  id: string,
  name: string,
  avatarUrl: string,
  url: string,
|}

export type Quote = {|
  id: string,
  content: string,
  author: Author
|}

export type Dragging = {|
  id: DraggableId,
  location: DraggableLocation,
|}

export type QuoteMap = {
  [key: string]: Quote[]
}

export type Card = {|
  id: string,
  cardType: string,
  name: string,
  desc: string,
  avatarUrl: string,
  prodPoint: number,
  prodPointType: string,
  prodPointMultiplier: number,
  agilityPoint: number,
  agilityPointType: string,
  agilityPointMultiplier: number
|}

// export type CardCollection = {
//   [key: string]: Card[]
// }
//
export type CardCollection = {
  [key: string]: {
    cards: Card[],
    zoneName: string,
    isDropDisabled: boolean,
    isDragDisabled: boolean,
  }
}
