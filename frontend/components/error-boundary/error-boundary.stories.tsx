import {ErrorPage} from './error-page'
import {StoryFn} from '@storybook/react'

export default {
  title: 'Components/ErrorPage',
  component: ErrorPage,
}

export const Base: StoryFn = () => {
  return <ErrorPage />
}
