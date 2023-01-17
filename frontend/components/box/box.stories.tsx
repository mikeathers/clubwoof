import {Box, BoxProps} from '@clubwoof-components'
import {StoryFn} from '@storybook/react'
import styled from 'styled-components'
import {colors} from '@clubwoof-styles'

export default {
  title: 'Components/Box',
  component: Box,
  decorates: [
    (Story: React.FC) => (
      <div style={{width: '30%'}}>
        <Story />
      </div>
    ),
  ],
}

const VisualBoxOne = styled.div`
  width: 200px;
  height: 100px;
  background-color: ${colors.turquoise};
  margin: 10px;
`

const VisualBoxTwo = styled(VisualBoxOne)`
  background-color: ${colors.yellow};
`

const VisualBoxThree = styled(VisualBoxOne)`
  background-color: ${colors.pink};
`

export const Base: StoryFn<BoxProps> = () => (
  <Box padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const RowCenterAligned: StoryFn<BoxProps> = () => (
  <Box centerContent padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const ColumnCenterAligned: StoryFn<BoxProps> = () => (
  <Box centerContent direction={'column'} padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const RowLeftAligned: StoryFn<BoxProps> = () => (
  <Box leftAlign padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const ColumnLeftAligned: StoryFn<BoxProps> = () => (
  <Box leftAlign direction={'column'} padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const RowRightAlign: StoryFn<BoxProps> = () => (
  <Box rightAlign padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)

export const ColumnRightAlign: StoryFn<BoxProps> = () => (
  <Box rightAlign direction={'column'} padding={'space5x'}>
    <VisualBoxOne />
    <VisualBoxTwo />
    <VisualBoxThree />
  </Box>
)
