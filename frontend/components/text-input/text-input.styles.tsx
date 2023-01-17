import React from 'react'
import styled, {css} from 'styled-components'
import {Colors, colors, fontSizes, lineHeights, spacing} from '@clubwoof-styles'

export interface StyledTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withBorder?: boolean
  icon?: JSX.Element
  color?: keyof Colors
}

interface TextInputContainerProps {
  error: boolean
}

interface ErrorContainerProps {
  icon?: JSX.Element
}

interface IconProps {
  color?: keyof Colors
}

const withBorder = css`
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  -webkit-appearance: none;
  background: transparent;
  color: inherit;
  width: 100%;
  font-weight: 600;
  margin: 0;
  border: 1px solid rgba(0, 0, 0, 0.33);
  border-radius: 4px;
  padding: 11px 11px 11px 48px;
  outline: none;

  &:focus {
    box-shadow: none;
    border: 1px solid ${colors.pink};
  }
`

const withoutBorder = css`
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  &:focus {
    box-shadow: none;
    border-bottom: 1px solid ${colors.pink};
  }
`

export const TextInputContainer = styled.div<TextInputContainerProps>`
  position: relative;
  width: 100%;
  font-size: ${fontSizes.m};
  line-height: ${lineHeights.body};
  margin-bottom: ${spacing.space3x};
`
export const TextInput = styled.input<StyledTextInputProps>`
  width: 100%;
  background-color: transparent;
  ${(props) => (props.withBorder ? withBorder : withoutBorder)}
  padding: ${({icon, withBorder}) => {
    if (!icon && !withBorder) {
      return `${spacing.space1x} 0 ${spacing.space1x} ${spacing.space1x}`
    }
    if (!icon && withBorder) {
      return `${spacing.space1x} 0 ${spacing.space1x} ${spacing.space1x}`
    }
    if (icon) {
      return `${spacing.space1x} 0 ${spacing.space1x} ${spacing.space5x}`
    }
  }};

  color: ${({color}) => (color ? colors[color] : colors.darkBlue)};

  &::placeholder {
    color: ${({color}) => (color ? colors[color] : colors.darkBlue)};
  }
`

export const Icon = styled.div<IconProps>`
  position: absolute;
  left: 12px;
  top: 8px;
  color: ${({color}) => (color ? colors[color] : colors.darkBlue)};
`
export const ErrorContainer = styled.div<ErrorContainerProps>`
  height: 24px;

  p {
    ${({icon}) => {
      if (icon) {
        return errorStylesWithIcon
      }
      return errorStylesWithoutIcon
    }}
  }
`
const errorStylesWithIcon = css`
  padding-left: ${spacing.space2x};
  padding-top: ${spacing.spaceHalfx};
`

const errorStylesWithoutIcon = css`
  padding-left: ${spacing.space1x};
  padding-top: ${spacing.spaceHalfx};
`
