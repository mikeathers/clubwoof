import {fireEvent, render, waitFor} from '@testing-library/react'
import {CompleteForgotPassword} from '@clubwoof-domains'
import {completeForgotPasswordPageI18nMock} from '@clubwoof-test-utils'
import {Auth} from '@aws-amplify/auth'
import mockRouter from 'next-router-mock'
import {mocked} from 'jest-mock'
import {logUserIn} from '@clubwoof-utils'
import {AuthProvider} from '@clubwoof-context'

jest.mock('@clubwoof-utils', () => ({
  __esModule: true,
  ...jest.requireActual('@clubwoof-utils'),
  logUserIn: jest.fn(),
}))

const mockLogUserIn = mocked(logUserIn)

const renderComponent = () =>
  render(
    <AuthProvider>
      <CompleteForgotPassword i18n={completeForgotPasswordPageI18nMock} />
    </AuthProvider>,
  )

describe('Complete forgot password', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter.isReady = true
    mockRouter.push('/auth/complete-forgot-password?code=1111&email=test@test.com')
    jest.spyOn(Auth, 'forgotPasswordSubmit').mockResolvedValue(expect.anything())
  })

  it('should push user to resend-confirmation-email route if no query params are found', async () => {
    mockRouter.push('/auth/complete-forgot-password')
    renderComponent()
    await waitFor(() => expect(mockRouter.pathname).toEqual('/auth/forgot-password'))
  })

  it('should call logUserIn when form submitted', async () => {
    const {getByLabelText, debug} = renderComponent()

    const passwordInput = getByLabelText('New password')
    const confirmPasswordInput = getByLabelText('Confirm new password')

    fireEvent.change(passwordInput, {target: {value: 'Password1!'}})
    fireEvent.change(confirmPasswordInput, {target: {value: 'Password1!'}})

    const submitButton = getByLabelText('Submit')
    fireEvent.click(submitButton)

    debug(undefined, 100000000)

    await waitFor(() => {
      expect(mockLogUserIn).toHaveBeenCalled()
    })
  })

  it('should call Auth service when form submitted', async () => {
    const {getByLabelText} = renderComponent()

    const passwordInput = getByLabelText('New password')
    const confirmPasswordInput = getByLabelText('Confirm new password')

    fireEvent.change(passwordInput, {target: {value: 'Password1!'}})
    fireEvent.change(confirmPasswordInput, {target: {value: 'Password1!'}})

    const submitButton = getByLabelText('Submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(jest.spyOn(Auth, 'forgotPasswordSubmit')).toHaveBeenCalled()
    })
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(completeForgotPasswordPageI18nMock.validation.password),
        ).toBeInTheDocument()
      })
    })

    it('should validate that password and confirm password match', async () => {
      const {getByLabelText, getByText} = renderComponent()
      const passwordInput = getByLabelText('New password')
      const confirmPasswordInput = getByLabelText('Confirm new password')

      fireEvent.change(passwordInput, {target: {value: 'Password1!'}})
      fireEvent.change(confirmPasswordInput, {target: {value: 'Password1!&'}})

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(completeForgotPasswordPageI18nMock.validation.passwordsDoNotMatch),
        ).toBeInTheDocument()
      })
    })

    it.each`
      password                | validationMessage
      ${'pass'}               | ${completeForgotPasswordPageI18nMock.validation.passwordTooShort}
      ${'passwordpassword12'} | ${completeForgotPasswordPageI18nMock.validation.passwordTooLong}
      ${'password'}           | ${completeForgotPasswordPageI18nMock.validation.passwordFormat}
      ${'password123'}        | ${completeForgotPasswordPageI18nMock.validation.passwordFormat}
      ${'Password123'}        | ${completeForgotPasswordPageI18nMock.validation.passwordFormat}
      ${'password123!'}       | ${completeForgotPasswordPageI18nMock.validation.passwordFormat}
    `(
      'should validate password for: `$password`',
      async ({password, validationMessage}) => {
        const {getByLabelText, getByText} = renderComponent()
        const passwordInput = getByLabelText('New password')

        fireEvent.change(passwordInput, {target: {value: password}})

        const submitButton = getByLabelText('Submit')
        fireEvent.click(submitButton)

        await waitFor(() => {
          expect(getByText(validationMessage)).toBeInTheDocument()
        })
      },
    )
  })
})
