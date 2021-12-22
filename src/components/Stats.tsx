import { useAppSelector } from '../store/hooks'
import { AIButton } from './AIButton'

export function Stats () {
  const score = useAppSelector(({cardSlice: toolkit}) => {
    return toolkit.scoreCount
  })
  return (
    <div className="stats">
      <h3>
        Score: {score}
      </h3>
      <AIButton />
    </div>
  )
}