export interface Spacing {
  spaceHalfx: string
  space1x: string
  space2x: string
  space3x: string
  space4x: string
  space5x: string
  space6x: string
  space7x: string
  space8x: string
  space9x: string
  space10x: string
}

export interface Fonts {
  headingFont: string
  bodyFont: string
}

export interface FontWeights {
  light: number
  book: number
  medium: number
  semibold: number
  bold: number
}

export interface FontSizes {
  s: string
  m: string
  l: string
  xl: string
  xxl: string
  xxxl: string
  xxxxl: string
}

export interface LineHeights {
  body: string
  heading: string
}

export interface Colors {
  darkBlue: string
  lightBlue: string
  green: string
  yellow: string
  pink: string
  pureWhite: string
  pureBlack: string
  purple: string
  turquoise: string
  red: string
  grey: string
}

export interface MediaQueries {
  xxxs: string
  xxs: string
  xs: string
  xsMax: string
  s: string
  m: string
  l: string
  xl: string
  mediumPhone: string
  mediumDesktop: string
}

export interface Breakpoint {
  min: number
  max: number
}

export interface Breakpoints {
  xxxs: Breakpoint
  xxs: Breakpoint
  xs: Breakpoint
  s: Breakpoint
  m: Breakpoint
  l: Breakpoint
  xl: Breakpoint
}
