import styled from 'styled-components'

import Image from 'next/image'

import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  mediaQueries,
  spacing,
} from '@clubwoof-styles'

export const Container = styled.div`
  height: 100%;
  padding: ${spacing.space5x} ${spacing.space3x};
  @media (${mediaQueries.s}) {
    padding: 0;
  }
`
export const DogImage = styled(Image)`
  z-index: 1;
`

export const LocaleSelect = styled.select`
  position: absolute;
  right: 100px;
  top: 150px;
`

export const Logo = styled(Image)`
  position: absolute;
  bottom: 0px;
  left: 10px;
`

export const HeadingContainer = styled.div`
  margin-bottom: ${spacing.space7x};
`

export const Heading = styled.h1`
  font-family: ${fonts.headingFont};
  font-size: ${fontSizes.xxxl};
  font-weight: ${fontWeights.medium};
  line-height: ${lineHeights.heading};
  color: ${colors.lightBlue};
  position: relative;
  display: inline-block;
`
export const SubHeading = styled.h2`
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.semibold};
  color: ${colors.darkBlue};

  @media (${mediaQueries.l}) {
    font-size: ${fontSizes.l};
  }
`

export const SubmitButton = styled.button`
  background: ${colors.lightBlue};
  border: none;
  width: 100%;
  margin-top: ${spacing.space2x};
  font-family: ${fonts.bodyFont};
  color: ${colors.pureWhite};
  border-radius: 10px;
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.bold};
  height: 38px;

  &:hover {
    filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.161));
  }

  &:focus-visible {
    outline: 2px solid ${colors.pink};
  }
`
export const Form = styled.form`
  width: 80%;
  margin: 0 auto;

  div:nth-child(5) {
    margin-bottom: 0;
  }
`

export const ErrorMessage = styled.p`
  color: ${colors.red};
  font-size: ${fontSizes.s};
  margin-top: ${spacing.space4x};
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
