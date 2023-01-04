import styled, { css } from 'styled-components'
import Image from 'next/image'

import { Colors, colors, mediaQueries, Spacing } from '@clubwoof-styles'

export interface ContentProps {
  paddingTop?: keyof Spacing
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
  width: 100%;
  margin: 0 auto;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? colors[backgroundColor] : colors.pureWhite};
  height: 100%;
`

export const Content = styled.div<ContentProps>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  @media (${mediaQueries.s}) {
    width: 80%;
  }

  @media (${mediaQueries.l}) {
    width: 30%;
  }
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
    right: -400px;
    bottom: 0;
  }

  @media (${mediaQueries.xl}) {
    right: -350px;
    bottom: 0px;
  }
`

export const Bubble = styled(Image)<BubbleProps>`
  position: absolute;
  height: 400px !important;
  width: 400px !important;

  ${({ position }) => {
    switch (position) {
      case 'top':
        return topBubblePositioning
      case 'right':
        return rightBubblePositioning
    }
  }}

  @media (${mediaQueries.s}) {
    height: 500px !important;
    width: 500px !important;
  }

  @media (${mediaQueries.m}) {
    height: 600px !important;
    width: 600px !important;
  }

  @media (${mediaQueries.l}) {
    height: 650px !important;
    width: 650px !important;
  }

  @media (${mediaQueries.xl}) {
    height: 700px !important;
    width: 700px !important;
  }
`
