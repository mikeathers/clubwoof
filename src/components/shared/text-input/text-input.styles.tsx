import React from 'react'
import styled, { css } from 'styled-components'
import { colors, fontSizes, lineHeights, spacing } from '@clubwoof-styles'

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withoutBorder?: boolean
  icon: JSX.Element
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
  margin-bottom: ${spacing.space3x};
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

export const TextInputContainer = styled.div`
  position: relative;
  width: 100%;
  font-size: ${fontSizes.m};
  line-height: ${lineHeights.body};
`
export const TextInput = styled.input<TextInputProps>`
  width: 100%;
  ${(props) => (props.withoutBorder ? withoutBorder : withBorder)}
`

export const Icon = styled.div`
  position: absolute;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-packjustify: center;
  -webkit-justify: center;
  -ms-flex-packjustify: center;
  justify: center;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  pointer-events: none;
  left: 12px;
`
