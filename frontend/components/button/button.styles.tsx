import styled, {css} from 'styled-components'
import {colors, fonts, fontSizes, fontWeights, spacing} from '@clubwoof-styles'
import React from 'react'

export interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  secondary?: boolean
  pink?: boolean
  isLoading?: boolean
}

const primaryStyles = css`
  background: ${colors.lightBlue};
  color: ${colors.pureWhite};
`

const secondaryStyles = css`
  border: 1px solid ${colors.lightBlue};
  color: ${colors.lightBlue};
`

const primaryPinkStyles = css`
  background: ${colors.pink};
  color: ${colors.pureWhite};
`

const secondaryPinkStyles = css`
  border: 1px solid ${colors.pink};
  color: ${colors.pink};
`
const isLoadingStyles = css`
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
`

export const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  width: 100%;
  margin-top: ${spacing.space2x};
  font-family: ${fonts.bodyFont};
  border-radius: 10px;
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.bold};
  height: 42px;
  cursor: pointer;
  background-color: transparent;

  ${({isLoading}) => isLoading && isLoadingStyles}

  ${({primary, secondary, pink}) => {
    if (primary) {
      if (pink) return primaryPinkStyles
      return primaryStyles
    }
    if (secondary) {
      if (pink) return secondaryPinkStyles
      return secondaryStyles
    }

    if (!primary && !secondary && !pink) return primaryStyles
  }}

  &:hover {
    filter: ${({isLoading}) =>
      !isLoading && 'drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.161))'};
  }

  &:focus-visible {
    outline: 2px solid ${colors.pink};
  }
`
