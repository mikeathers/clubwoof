import styled from 'styled-components'
import {mediaQueries} from '@clubwoof-styles'

export const Content = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 200px 0 100px 0;

  @media (${mediaQueries.l}) {
    width: 40%;
  }

  @media (${mediaQueries.xl}) {
    width: 30%;
  }
`
