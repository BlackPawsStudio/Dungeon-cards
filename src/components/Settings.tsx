import { changeSpeed } from "../store/cardsSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"

export const Settings = () => {
  const {botSpeed} = useAppSelector(({cardSlice: toolkit}) => {
    return {botSpeed: toolkit.botSpeed}
  })
  const dispatch = useAppDispatch()
  const inputChange = ({target}:{target:HTMLInputElement}) => {
    dispatch(changeSpeed(target.value))
  }
  return (
    <div className="settings">
      <input 
        className="settings__input" 
        type="range" 
        min="0" 
        max="1000" 
        defaultValue={1} 
        onChange={inputChange}/>
        <p className="setting__text">AI speed: {Math.trunc((1000 - botSpeed) / 100)}</p>
    </div>
  )
} 