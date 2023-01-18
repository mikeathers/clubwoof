import {LoginComponent} from './login.component'
import {StoryFn} from '@storybook/react'
import {loginPageI18nMock} from '@clubwoof-test-utils'
import {noop} from '@babel/types'

export default {
  title: 'Domains/Auth/Login',
  component: LoginComponent,
}

export const Base: StoryFn = () => (
  <LoginComponent
    i18n={loginPageI18nMock}
    error={''}
    loginUser={() => noop}
    isLoading={false}
    resetState={noop}
  />
)
