import {Login} from '@clubwoof-domains'
import {StoryFn} from '@storybook/react'
import {loginPageI18nMock} from '@clubwoof-test-utils'

export default {
  title: 'Domains/Login',
  component: Login,
}

export const Base: StoryFn = () => <Login i18n={loginPageI18nMock} />
