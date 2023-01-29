import styled from 'styled-components'
import {mediaQueries, spacing} from '@clubwoof-styles'

export const DogImage = styled.div`
  width: 200px;
  height: 150px;
  position: relative;
  z-index: 1;
  margin-bottom: ${spacing.space5x};

  @media (${mediaQueries.s}) {
    width: 170px;
    height: 140px;
    margin-top: ${spacing.space6x};
  }
  @media (${mediaQueries.xl}) {
    margin-top: 0;
  }

  image {
    width: 100%;
    height: 100%;
  }
`
