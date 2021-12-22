import { countCard } from '../AI/aiFunctions';
import { move, enableAI } from '../store/cardsSlice';
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
      if (cardToPlay)      
        dispatch(move([cardToPlay.x, cardToPlay.y]))
      else
        console.log('pizda');
        
    }, 10)
  }

  const startPlaying = async () => {
    dispatch(enableAI())

    aiMove()
  }

  return (
    <>
      <button 
        className="ai-button"
        onClick={() => {startPlaying()}}
        disabled={isAIEnabled}>
        Enable auto play
      </button>
    </>
  )
} 