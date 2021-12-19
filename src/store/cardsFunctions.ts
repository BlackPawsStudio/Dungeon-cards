import { Card, Coords } from "../types";

export const isAvailable = ([clickedX, clickedY]:Coords, [heroX, heroY]:Coords):boolean => {
  if (heroX === clickedX && heroY === clickedY) {
    alert('It\'s you dum!')
    return false
  }
  return ((heroX + 1 === clickedX || 
        heroX - 1 === clickedX) && heroY === clickedY) ||
        ((heroY + 1 === clickedY ||
        heroY - 1 === clickedY) && heroX === clickedX)
}

export const shiftCards = (cards:Card[][], hero:Card, clickedCard:Card) => {
  const newCards:Card[][] = cards.concat()

  const rowType = hero.x === clickedCard.x ? 'x' : 'y';
  const swapRowType = rowType === 'x' ? 'y' : 'x';
  
  const row = newCards.flat().filter(el => el[rowType] === hero[rowType]);
  
  const lastRowEl = row[clickedCard[swapRowType] < hero[swapRowType] ? row.length - 1 : 0]
  
  newCards[clickedCard.x][clickedCard.y].type = hero.type;
  newCards[clickedCard.x][clickedCard.y].hp = hero.hp
  
  if (lastRowEl.type !== 'hero') {
    newCards[hero.x][hero.y].type = lastRowEl.type;
    newCards[hero.x][hero.y].hp = lastRowEl.hp
  }
  
  const newCard = getRandomCard(lastRowEl.id, [lastRowEl.x, lastRowEl.y], 2)
  
  lastRowEl.type = newCard.type;
  lastRowEl.hp = newCard.hp;
  
  return newCards
}

export const getRandomCard = (id:number, [x, y]:[number, number], range:number):Card => {
  const chance = Math.random() * 8;
  return { 
    id: id,
    x: x,
    y: y,
    type: chance > range ? 'foe' : 'heal',
    hp: chance > range ? Math.trunc(Math.random() * (4 - 1) + 1) : 
    Math.trunc(Math.random() * (9 - 5) + 5)
  }
}

export const countHpChange = (clickedCard:Card) => (clickedCard.type === 'foe' ? -1 : 1) * clickedCard.hp