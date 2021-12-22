import { Card, CardTypes, Coords, HealsByCard } from "../types";

export const getAvailableInfo = ([heroX, heroY]:Coords, cards:Card[]):Card[] => {
  return cards.filter(card => 
    (card.x === heroX && card.y + 1 === heroY) || 
    (card.x === heroX && card.y - 1 === heroY) || 
    (card.x + 1 === heroX && card.y === heroY) || 
    (card.x - 1 === heroX && card.y === heroY)
  )
}

export const findLowestCard = (availableCards:Card[], type:CardTypes):Card | null => {
  const cardsOfType = availableCards.filter(card => card.type === type)
  if (cardsOfType) {
    cardsOfType.sort((a:Card, b:Card) => {///////////////////////////////// 
      if (a.hp < b.hp) {
        return -1
      } 
      return 1
    })
    return cardsOfType[0]
  } else {
    return null
  }
}

export const findAmountOfHeals = (currCard:Card, cards:Card[][]):HealsByCard => {
  const availableCards = getAvailableInfo([currCard.x, currCard.y], cards.flat());
  
  const healsOnCard = availableCards.filter(el => el.type === 'heal').length
  
  return {id: currCard.id, amount: healsOnCard}
}