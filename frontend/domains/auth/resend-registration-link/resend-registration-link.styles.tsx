import styled from 'styled-components'
import {mediaQueries, spacing} from '@clubwoof-styles'

export const Content = styled.div`
  height: 100vh;
  width: 80%;
  margin-bottom: ${spacing.space10x};

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (${mediaQueries.l}) {
    width: 40%;
  }

  @media (${mediaQueries.xl}) {
    width: 30%;
  }
`
