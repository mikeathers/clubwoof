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
  darkBlue: '#031D25',
  lightBlue: '#00A8DE',
  lightGreen: '#06D6A0',
  lightYellow: '#FFD166',
  lightPink: '#EF476F',
  pureWhite: '#fff',
  pureBlack: '#000',
  focusYellow: '#EBC160',
}

const baseSpacing = 8
export const spacing: Spacing = {
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
  l: '22px',
  xl: '28px',
  xxl: '32px',
  xxxl: '52px',
  xxxxl: '62px',
}

export const fontWeights: FontWeights = {
  light: 200,
  book: 300,
  medium: 400,
  semibold: 600,
  bold: 700,
}

export const lineHeights: LineHeights = {
  display: 1.35,
  body: 1.55,
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
