import { createSlice } from "@reduxjs/toolkit";
import { Card, State } from "../types";
import { isAvailable, shiftCards, getRandomCard, countHpChange } from "./cardsFunctions";

const defaultHero:Card = {
  id: 4,
  x: 1,
  y: 1,
  type: 'hero',
  hp: 10
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    isAIEnabled: false,
    cards: Array(3).fill([]),
    scoreCount: 0,
    hero: defaultHero,
    isGameOver: true
  },
  reducers: {
    initFill(state:State) {
      let idCounter = -1
      state.isAIEnabled = false
      state.scoreCount = 0
      state.hero = defaultHero
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          state.cards[i][j] = getRandomCard(++idCounter, [i, j], 3);
        }
      }
      state.cards[state.hero.x][state.hero.y] = state.hero
      state.isGameOver = false
    }, 
    move(state:State, { payload: [x, y] }) {
      const clickedCard = state.cards[x][y]

      if (isAvailable([x, y], [state.hero.x, state.hero.y])) { 
        const hpChange =  countHpChange(clickedCard);

        state.hero.hp = Math.min(state.hero.hp + hpChange, 10)
  
        if (state.hero.hp <= 0) {
          alert(`Game over! Your score ${state.scoreCount}`)
          state.isAIEnabled = false
          state.isGameOver = true
        }

        if (hpChange < 0 && state.hero.hp > 0) {
          state.scoreCount++
        }
        
        state.cards = shiftCards(state.cards, state.hero, clickedCard); 

        state.hero = state.cards.flat().find((el:Card) => el.type === 'hero') as Card        
      }
    },
    enableAI(state:State) {
      state.isAIEnabled = true
    },
    disableAI(state:State) {
      state.isAIEnabled = false
    }
  }
})

export default cardsSlice.reducer
export const {initFill, move, enableAI, disableAI} = cardsSlice.actions