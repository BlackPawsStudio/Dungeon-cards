import { Card, CardTypes, Coords, HealsByCard } from "../types";

const getAvailableCardsInfo = ([heroX, heroY]:Coords, cards:Card[]):Card[] => {
  const availableCards:Card[] = cards.filter(card => 
    (card.x === heroX && card.y + 1 === heroY) || 
    (card.x === heroX && card.y - 1 === heroY) || 
    (card.x + 1 === heroX && card.y === heroY) || 
    (card.x - 1 === heroX && card.y === heroY)
  )

  return availableCards
}

const findLowestCardByType = (availableCards:Card[], type:CardTypes):Card | null => {
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

const amountOfHealsOnCard = (currCard:Card, cards:Card[][]):HealsByCard => {
  const availableCards = getAvailableCardsInfo([currCard.x, currCard.y], cards.flat());
  
  const healsOnCard = availableCards.filter(el => el.type === 'heal').length
  
  return {id: currCard.id, amount: healsOnCard}
}

const countOptimalByHp = (availableCards:Card[], cards:Card[][], alternative:Card, hero:Card):Card => {
  const healsOnCards = availableCards.map(el => amountOfHealsOnCard(el, cards))
  healsOnCards.sort((a:HealsByCard, b:HealsByCard) => {
    if (a.amount > b.amount) {
      return -1
    } 
    return 1
  })
  
  if (healsOnCards[0].amount === 0) {
    return alternative
  } 
  
  const allVariantsByHP = healsOnCards.filter(el => el.amount === healsOnCards[0].amount)

  const optimalFoes = allVariantsByHP.map(variant => {
    return availableCards.find(card => card.id === variant.id) as Card
  }).sort((a:Card, b:Card) => {
    if (a.hp < b.hp) {
      return -1
    } 
    return 1
  })  
  
  console.log(JSON.stringify(optimalFoes) + '\n\r\n\r');

  const cardWithMoreHeals = optimalFoes[0]

  console.log(cardWithMoreHeals, ' | ', alternative);
  

  if (cardWithMoreHeals.hp < hero.hp) {
    return cardWithMoreHeals
  }
  return alternative
}

const countAlternative = (minFoe:Card, minHeal:Card, hero:Card):Card => {
  if (minHeal) {
    if (!minFoe) {
      return minHeal
    } 
    if (hero.hp > minFoe.hp * 2) {
      return minFoe
    } else {
      return minHeal
    }
  }   
  return minFoe
}

export const countCard = (hero:Card, cards:Card[][]):Card => {
  const availableCards = getAvailableCardsInfo([hero.x, hero.y], cards.flat());

  const minHeal = findLowestCardByType(availableCards, 'heal')
  const minFoe = findLowestCardByType(availableCards, 'foe')
  
  const alternative = countAlternative(minFoe as Card, minHeal as Card, hero)

  return countOptimalByHp(availableCards, cards, alternative, hero)
}