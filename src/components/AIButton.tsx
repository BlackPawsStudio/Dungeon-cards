import { countCard } from '../ai/optimalCard';
import { move, enableAI, disableAI } from '../store/cardsSlice';
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect } from 'react';

export const AIButton = () => {
  const {cards, isGameOver, hero, isAIEnabled, botSpeed} = useAppSelector(({cardSlice: toolkit}) => {
    return {
      cards: toolkit.cards, 
      isGameOver: toolkit.isGameOver, 
      hero: toolkit.hero, 
      isAIEnabled: toolkit.isAIEnabled,
      botSpeed: toolkit.botSpeed,
    }
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
      
      dispatch(move([cardToPlay.x, cardToPlay.y]))
    }, botSpeed)
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