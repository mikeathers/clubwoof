import styled from 'styled-components'

import {colors, fontSizes, fontWeights, mediaQueries, spacing} from '@clubwoof-styles'

export const Content = styled.div`
  height: 100%;
  width: 80%;
  margin-bottom: ${spacing.space10x};
  padding: ${spacing.space10x};

  @media (${mediaQueries.l}) {
    width: 40%;
  }

  @media (${mediaQueries.xl}) {
    width: 30%;
  }
`

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

export const HeadingContainer = styled.div`
  margin: ${spacing.space1x} 0 ${spacing.space6x} 0;
`

export const Form = styled.form`
  @media (${mediaQueries.s}) {
    width: 400px;
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
