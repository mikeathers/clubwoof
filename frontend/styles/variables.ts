import {
  Breakpoints,
  Colors,
  Fonts,
  FontSizes,
  FontWeights,
  LineHeights,
  MediaQueries,
  Spacing,
} from './types'

export const colors: Colors = {
  darkBlue: '#355070',
  lightBlue: '#00BBF9',
  green: '#06D6A0',
  yellow: '#FEE440',
  pink: '#F15BB5',
  purple: '#9B5ED5',
  turquoise: '#00F5D4',
  pureWhite: '#FFF',
  pureBlack: '#000',
  red: '#E42929',
  grey: '#E8E8E8',
}

const baseSpacing = 8
export const spacing: Spacing = {
  spaceHalfx: `${baseSpacing / 2}px`,
  space1x: `${baseSpacing}px`,
  space2x: `${baseSpacing * 2}px`,
  space3x: `${baseSpacing * 3}px`,
  space4x: `${baseSpacing * 4}px`,
  space5x: `${baseSpacing * 5}px`,
  space6x: `${baseSpacing * 6}px`,
  space7x: `${baseSpacing * 7}px`,
  space8x: `${baseSpacing * 8}px`,
  space9x: `${baseSpacing * 9}px`,
  space10x: `${baseSpacing * 10}px`,
}

export const fonts: Fonts = {
  headingFont: 'Nerko One',
  bodyFont: 'Open Sans',
}

export const fontSizes: FontSizes = {
  s: '14px',
  m: '16px',
  l: '18px',
  xl: '24px',
  xxl: '32px',
  xxxl: '62px',
  xxxxl: '72px',
}

export const fontWeights: FontWeights = {
  light: 200,
  book: 300,
  medium: 400,
  semibold: 600,
  bold: 700,
}

export const lineHeights: LineHeights = {
  messaging: '20px',
  body: '28px',
  heading: '62px',
}
const breakpoints: Breakpoints = {
  xxxs: {
    min: 375,
    max: 0,
  },
  xxs: {
    min: 0,
    max: 599,
  },
  xs: {
    min: 600,
    max: 767,
  },
  s: {
    min: 768,
    max: 1023,
  },
  m: {
    min: 1024,
    max: 1439,
  },
  l: {
    min: 1440,
    max: 1919,
  },
  xl: {
    min: 1920,
    max: Infinity,
  },
}

export const mediaQueries: MediaQueries = {
  xxxs: `(min-width: ${breakpoints.xxxs.min}px)`,
  xxs: `(max-width: ${breakpoints.xxs.max}px)`,
  xs: `(min-width: ${breakpoints.xs.min}px)`,
  xsMax: `(max-width: ${breakpoints.xs.max}px)`,
  s: `(min-width: ${breakpoints.s.min}px)`,
  m: `(min-width: ${breakpoints.m.min}px)`,
  l: `(min-width: ${breakpoints.l.min}px)`,
  xl: `(min-width: ${breakpoints.xl.min}px)`,
  mediumPhone: `(min-height: ${breakpoints.xxs.max}px)`,
  mediumDesktop: `(min-height: ${breakpoints.s.min}px) and (min-width: ${breakpoints.m.min}px)`,
}
