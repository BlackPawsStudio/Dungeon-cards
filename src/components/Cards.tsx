import { Card } from '../types';
import { initFill, move } from '../store/cardsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useEffect } from 'react';

import '../assets/styles/cards.css'

import { images } from '../images';

export function CardsPlace() {
  const {cards, isGameOver} = useAppSelector(({cardSlice: toolkit}) => {
    return {cards: toolkit.cards.flat(), isGameOver: toolkit.isGameOver}
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isGameOver) dispatch(initFill())
  }, [isGameOver])
  
  return (
    <div className='cards-place'>
      {cards.map((el:Card) => 
        <Cards desc={el} key={el.id}/>
      )}
    </div>
  )
}

export function Cards(props:{desc:Card}) {
  const dispatch = useAppDispatch()
  const character = props.desc;

  const image = images[character.type][character.type === 'hero' ? 0 : character.hp]

  return (
    <div 
      className={`card card-${character.type}`} 
      onClick={() => {dispatch(move([character.x, character.y]))}}>
      <img 
        src = {image}
        alt={character.type} 
        className='card-image'/>
      <p className='card-text'> {character.hp}{character.type === 'hero' ? '/10' : ''}</p>
    </div>
  )
}