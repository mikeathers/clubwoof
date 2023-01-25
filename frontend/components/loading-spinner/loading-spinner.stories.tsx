import {LoadingSpinner} from './loading-spinner.component'
import {StoryFn} from '@storybook/react'

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  decorators: [
    (Story: StoryFn) => (
      <div style={{margin: '50px'}}>
        <Story />
      </div>
    ),
  ],
}

export const Base: StoryFn = () => <LoadingSpinner />
