import styled from 'styled-components'

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
  margin-bottom: ${spacing.space10x};
  @media (${mediaQueries.s}) {
    padding: 0;
  }
`
export const DogImage = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  z-index: 1;
  margin-bottom: ${spacing.space2x};
  margin-top: ${spacing.space3x};

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

export const Heading = styled.h1`
  font-family: ${fonts.headingFont};
  font-size: ${fontSizes.xxxl};
  font-weight: ${fontWeights.medium};
  line-height: ${lineHeights.heading};
  color: ${colors.lightBlue};
  position: relative;
  display: inline-block;
  margin: ${spacing.space2x};
`
export const SubHeading = styled.h2`
  font-size: ${fontSizes.m};
  font-weight: ${fontWeights.semibold};
  color: ${colors.darkBlue};
  margin: ${spacing.space2x};

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
