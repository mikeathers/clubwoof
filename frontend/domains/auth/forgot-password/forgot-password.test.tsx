import {fireEvent, render, waitFor} from '@testing-library/react'
import {Auth} from '@aws-amplify/auth'

import {ForgotPassword} from '@clubwoof-domains'
import {forgotPasswordPageI18nMock} from '@clubwoof-test-utils'

const renderComponent = () => render(<ForgotPassword i18n={forgotPasswordPageI18nMock} />)

describe('Resend Registration Link', () => {
  it('should call Auth service when form submitted', async () => {
    const {getByLabelText} = renderComponent()

    const emailInput = getByLabelText('Email address')

    fireEvent.change(emailInput, {target: {value: 'Johnsmith@gmail.com'}})

    const submitButton = getByLabelText('Submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(jest.spyOn(Auth, 'forgotPassword')).toHaveBeenCalled()
    })
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText(forgotPasswordPageI18nMock.validation.email)).toBeInTheDocument()
      })
    })

    it('should correct email validation if email field is not in correct format', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const emailInput = getByLabelText('Email address')

      fireEvent.change(emailInput, {target: {value: 'Johnsmith.com'}})

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(forgotPasswordPageI18nMock.validation.emailFormat),
        ).toBeInTheDocument()
      })
    })
  })
})
