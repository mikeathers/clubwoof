import {StoryFn} from '@storybook/react'
import {errorPageI18nMock} from '@clubwoof-test-utils'
import {ErrorBoundaryComponent} from './error-boundary.component'

export default {
  title: 'Components/ErrorPage',
  component: ErrorBoundaryComponent,
}

export const Base: StoryFn = () => {
  return <ErrorBoundaryComponent i18n={errorPageI18nMock} />
}
