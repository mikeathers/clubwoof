import styled from 'styled-components'
import {mediaQueries, spacing} from '@clubwoof-styles'

export const StyledContent = styled.div`
  width: 80%;
  margin: ${spacing.space10x} 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (${mediaQueries.l}) {
    width: 40%;
  }

  @media (${mediaQueries.xl}) {
    width: 30%;
    margin-top: 0;
  }
`
