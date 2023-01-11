import React from 'react'
import styled, {css} from 'styled-components'
import {colors, fontSizes, lineHeights, spacing} from '@clubwoof-styles'

export interface StyledTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withoutBorder?: boolean
  icon: JSX.Element
}

interface TextInputContainerProps {
  error: boolean
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
  padding: ${spacing.space1x} 0 ${spacing.space1x} ${spacing.space5x};

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

  p {
    padding-left: ${({error}) => error && spacing.space2x};
    padding-top: ${({error}) => error && spacing.spaceHalfx};
  }
`
export const TextInput = styled.input<StyledTextInputProps>`
  width: 100%;
  ${(props) => (props.withoutBorder ? withoutBorder : withBorder)}
`

export const Icon = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
`
export const ErrorContainer = styled.div`
  height: 24px;
`
