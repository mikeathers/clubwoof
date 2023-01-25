import styled, {css} from 'styled-components'

import {Colors, colors, mediaQueries, Spacing} from '@clubwoof-styles'

export interface ContentProps {
  paddingTop?: keyof Spacing
  width?: 's' | 'm' | 'l'
}

export interface ContainerProps {
  backgroundColor?: keyof Colors
}

export type BubblePositioning =
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'right'
  | 'left'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'

export interface BubbleProps {
  position: BubblePositioning
}

export const Container = styled.div<ContainerProps>`
  background-color: ${({backgroundColor}) =>
    backgroundColor ? colors[backgroundColor] : colors.pureWhite};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`

const topBubblePositioning = css`
  top: -200px;
  left: 0;

  @media (${mediaQueries.s}) {
    top: -300px;
    left: 0;
  }

  @media (${mediaQueries.m}) {
    top: -400px;
    left: 0;
  }

  @media (${mediaQueries.xl}) {
    top: -350px;
    left: 0;
  }
`

const rightBubblePositioning = css`
  display: none;

  @media (${mediaQueries.s}) {
    display: none;
  }

  @media (${mediaQueries.m}) {
    display: block;
    right: -500px;
    bottom: 0;
  }

  @media (${mediaQueries.xl}) {
    right: -350px;
    bottom: 0;
  }
`

export const Bubble = styled.div<BubbleProps>`
  position: absolute;
  height: 400px;
  width: 100%;
  z-index: 0;

  image {
    width: 100%;
    height: 100%;
  }

  ${({position}) => {
    switch (position) {
      case 'top':
        return topBubblePositioning
      case 'right':
        return rightBubblePositioning
      default:
    }
  }}

  @media (${mediaQueries.s}) {
    height: 500px;
    width: 500px;
  }

  @media (${mediaQueries.m}) {
    height: 600px;
    width: 600px;
  }

  @media (${mediaQueries.l}) {
    height: 650px;
    width: 650px;
  }

  @media (${mediaQueries.xl}) {
    height: 700px;
    width: 700px;
  }
`
