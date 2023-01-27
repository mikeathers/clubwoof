import styled from 'styled-components'

import {colors, fontSizes, fontWeights, mediaQueries, spacing} from '@clubwoof-styles'

export const DogImage = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  z-index: 1;
  margin-bottom: ${spacing.space2x};

  @media (${mediaQueries.s}) {
    width: 180px;
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
export const ErrorMessage = styled.p`
  color: ${colors.red};
  font-size: ${fontSizes.s};
  margin: ${spacing.space1x} 0;
`

export const LinkText = styled.p`
  font-size: ${fontSizes.s};
  margin-top: ${spacing.space2x};

  & > a {
    font-weight: ${fontWeights.bold};
    color: ${colors.pink};
    text-decoration: none;
  }
`
