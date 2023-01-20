import styled, {keyframes} from 'styled-components'

const spinnerRotation = keyframes`
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
`

const foregroundDash = keyframes`
 0%,3% { stroke-dashoffset: -69; }

 47%,53% { stroke-dashoffset: 0; }

 97%,100% { stroke-dashoffset: 69; }
`
export interface StyledLoadingSpinnerProps {
  height?: number
}

export const Container = styled.div<StyledLoadingSpinnerProps>`
  height: ${({height}) => (height ? `${height}px` : '24px')};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledLoadingSpinner = styled.svg`
  stroke-width: 3;
  fill: none;
  animation: ${spinnerRotation} 2s linear infinite;
  padding: 8px;
`

export const StyledCircle = styled.circle`
  @media all and (-ms-high-contrast: none) {
    stroke-dashoffset: -40;
  }
`

export const StyledPath = styled.path`
  stroke-dasharray: 69;
  stroke-dashoffset: -69;
  animation: ${foregroundDash} 1600ms 50ms cubic-bezier(0.77, 0, 0.175, 1) infinite;
  transform-origin: 50%;
`
