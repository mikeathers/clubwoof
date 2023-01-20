import {render, waitFor} from '@testing-library/react'
import {CompleteRegistration} from '@clubwoof-domains'
import {completeRegistrationPageI18nMock, localStorageMock} from '@clubwoof-test-utils'
import mockRouter from 'next-router-mock'
import {AuthProvider} from '@clubwoof-context'
import {Auth} from '@aws-amplify/auth'
import {isCognitoError, logUserIn} from '@clubwoof-utils'
import {mocked} from 'jest-mock'
import {TEMP_PWD_LOCALSTORAGE_KEY} from '@clubwoof-constants'

const mockLogUserIn = mocked(logUserIn)
const mockIsCognitoError = mocked(isCognitoError)

jest.mock('@clubwoof-utils')
jest.mock('next/router', () => require('next-router-mock'))

const renderComponent = () =>
  render(
    <AuthProvider>
      <CompleteRegistration i18n={completeRegistrationPageI18nMock} />
    </AuthProvider>,
  )

describe('Complete Registration', () => {
  beforeEach(() => {
    localStorageMock.setItem(TEMP_PWD_LOCALSTORAGE_KEY, 'password')
    mockRouter.push('/auth/complete-registration?code=1111&email=test@test.com')
    jest.spyOn(Auth, 'confirmSignUp').mockResolvedValue({})
  })

  it('should render a success message if account can be confirm and user logged in', async () => {
    mockLogUserIn.mockResolvedValue(expect.anything())
    const {getByText} = renderComponent()
    await waitFor(() =>
      expect(
        getByText(completeRegistrationPageI18nMock.thanksForRegistering),
      ).toBeInTheDocument(),
    )
  })

  it('should call Auth confirmSignUp if correct query params are found', async () => {
    mockLogUserIn.mockResolvedValue(expect.anything())
    renderComponent()
    await waitFor(() => expect(jest.spyOn(Auth, 'confirmSignUp')).toHaveBeenCalled())
  })

  it('should push user to login route if account has already been confirmed', async () => {
    mockIsCognitoError.mockReturnValue(true)
    jest
      .spyOn(Auth, 'confirmSignUp')
      .mockRejectedValue({message: 'Current status is CONFIRMED'})
    renderComponent()
    await waitFor(() => expect(mockRouter.pathname).toBe('/auth/login'))
  })

  it('should not call logInUser function if password not found in local storage', async () => {
    renderComponent()
    localStorageMock.removeItem(TEMP_PWD_LOCALSTORAGE_KEY)
    await waitFor(() => expect(mockLogUserIn).not.toHaveBeenCalled())
  })

  it('should push user to login route when no password found in local storage', async () => {
    renderComponent()
    localStorageMock.removeItem(TEMP_PWD_LOCALSTORAGE_KEY)
    await waitFor(() => expect(mockRouter.pathname).toBe('/auth/login'))
  })

  it('should push user to resend-confirmation-email route if no query params are found', async () => {
    mockRouter.push('/auth/complete-registration')
    mockRouter.isReady = true
    renderComponent()
    await waitFor(() =>
      expect(mockRouter.pathname).toEqual('/auth/resend-confirmation-email'),
    )
  })
})
