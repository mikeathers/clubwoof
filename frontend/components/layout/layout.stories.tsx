import {Layout, LayoutProps, Text} from '@clubwoof-components'
import {StoryFn} from '@storybook/react'

export default {
  title: 'Components/Layout',
  component: Layout,
}

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
