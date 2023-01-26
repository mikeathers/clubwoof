import {Layout, LayoutProps, Text} from '@clubwoof-components'
import {StoryFn} from '@storybook/react'

export default {
  title: 'Components/Layout',
  component: Layout,
}

const dummyText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const Base: StoryFn<LayoutProps> = () => (
  <Layout>
    <Text element={'h1'}>Layout Component</Text>
  </Layout>
)

export const WithTopBubbles: StoryFn<LayoutProps> = () => (
  <Layout bubbleOnePositioning={'top'}>
    <Text element={'h1'}>Layout Component</Text>
  </Layout>
)

export const WithRightBubbles: StoryFn<LayoutProps> = () => (
  <Layout bubbleTwoPositioning={'right'}>
    <Text element={'h1'}>Layout Component</Text>
  </Layout>
)

export const WithBothBubbles: StoryFn<LayoutProps> = () => (
  <Layout bubbleOnePositioning={'top'} bubbleTwoPositioning={'right'}>
    <Text element={'h1'}>Layout Component</Text>
  </Layout>
)

export const WithBackgroundColour: StoryFn<LayoutProps> = () => (
  <Layout backgroundColor={'pink'} width={'m'} languageSelectionTextColour={'pureWhite'}>
    <Text element={'h1'} color={'pureWhite'}>
      Layout Component
    </Text>
  </Layout>
)
