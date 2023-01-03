import { useMediaQuery } from 'react-responsive'
import { mediaQueries } from '@clubwoof-styles'

interface MediaQueries {
  isPortrait: boolean
  isRetina: boolean
  isMobile: boolean
}
export const useMediaQueries = (): MediaQueries => {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  const isMobile = useMediaQuery({ query: mediaQueries.xxs })

  return { isPortrait, isRetina, isMobile }
}
