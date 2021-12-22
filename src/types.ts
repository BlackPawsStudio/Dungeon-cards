export interface Card {
  id: number,
  x: number,
  y: number,
  type: CardTypes,
  hp: number
}

export interface State {
  isAIEnabled: boolean,
  cards: Card[][],
  scoreCount: number,
  hero: Card,
  isGameOver: boolean
}

export type Coords = [number, number]

export type CardTypes = 'hero' | 'foe' | 'heal'

export type Images = {
  [key in CardTypes]: {
    [key: number]: string 
  }
}

export interface HealsByCard {
  id: number,
  amount: number 
}