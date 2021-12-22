import { countCard } from '../AI/aiFunctions';
import { move, enableAI, disableAI } from '../store/cardsSlice';
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect } from 'react';

export const AIButton = () => {
  const {cards, isGameOver, hero, isAIEnabled} = useAppSelector(({cardSlice: toolkit}) => {
    return {cards: toolkit.cards, isGameOver: toolkit.isGameOver, hero: toolkit.hero, isAIEnabled: toolkit.isAIEnabled}
  })
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isGameOver && isAIEnabled) {
      aiMove()
    }
  }, [cards])

  const aiMove = () => {
    setTimeout(() => {
      const cardToPlay = countCard(hero, cards);
      console.log(cardToPlay);
      
      dispatch(move([cardToPlay.x, cardToPlay.y]))
    }, 1000)
  }

  const startPlaying = async () => {
    isAIEnabled ? dispatch(disableAI()) : dispatch(enableAI())

    aiMove()
  }

  return (
    <>
      <button 
        className={`ai-button ${isAIEnabled ? 'ai-active' : ''}`}
        onClick={() => {startPlaying()}}>
        {isAIEnabled ? 'Disable auto play' : 'Enable auto play'}
      </button>
    </>
  )
} 