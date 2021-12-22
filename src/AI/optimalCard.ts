import { Card, HealsByCard } from "../types";
import { findAmountOfHeals, findLowestCard, getAvailableInfo,  } from "./aiFunctions";

const countAlternative = (minFoe:Card | null, minHeal:Card | null, hero:Card):Card => {
  if (minHeal) {                      //  Check if the are any heal cards
    if (!minFoe) {                    //  Pick lowest heal if there're no foes
      return minHeal
    } 
    if (hero.hp > minFoe.hp * 2) {    //  Check if it's needed to heal
      return minFoe
    }
    return minHeal
  } 
  return minFoe as Card
}

const countOptimalByHp = (availableCards:Card[], cards:Card[][], alternative:Card, hero:Card):Card => {
  const healsOnCards = availableCards.map(el => findAmountOfHeals(el, cards))
  healsOnCards.sort((a:HealsByCard, b:HealsByCard) => {
    if (a.amount > b.amount) {
      return -1
    } 
    return 1
  })
  
  if (healsOnCards[0].amount === 0) { //  Skip counting heals if there are no any
    return alternative
  } 
  
  const allOptimalCards = healsOnCards
    .filter(el => el.amount === healsOnCards[0].amount)
    .map(variant => availableCards
      .find(card => card.id === variant.id) as Card)

  const optimalCard = allOptimalCards.sort((a:Card, b:Card) => {
    if (a.hp < b.hp) {
      return -1
    } 
    return 1
  })[0]
  
  if (optimalCard.hp < hero.hp) {
    return optimalCard
  }
  return alternative
}

export const countCard = (hero:Card, cards:Card[][]):Card => {
  const availableCards = getAvailableInfo([hero.x, hero.y], cards.flat());

  const minHeal = findLowestCard(availableCards, 'heal')
  const minFoe = findLowestCard(availableCards, 'foe')
  
  const alternative = countAlternative(minFoe, minHeal, hero)

  return countOptimalByHp(availableCards, cards, alternative, hero)
}