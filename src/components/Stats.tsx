import { useAppSelector } from '../store/hooks'

export function Stats () {
  const score = useAppSelector(({cardSlice: toolkit}) => {
    return toolkit.scoreCount
  })
  return (
    <h3 className="stats">
      Score: {score}
    </h3>
  )
}