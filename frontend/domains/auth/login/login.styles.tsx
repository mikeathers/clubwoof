import styled from 'styled-components'
import {mediaQueries, spacing} from '@clubwoof-styles'

export const DogImage = styled.div`
  width: 120px;
  height: 160px;
  position: relative;
  z-index: 1;
  margin-bottom: ${spacing.space5x};

  @media (${mediaQueries.s}) {
    width: 150px;
    height: 180px;
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

export const Form = styled.form``
