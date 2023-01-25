import {fireEvent, render, waitFor} from '@testing-library/react'
import {Auth} from '@aws-amplify/auth'

import {ResendRegistrationLink} from '@clubwoof-domains'
import {resendRegistrationLinkPageI18nMock} from '@clubwoof-test-utils'

const renderComponent = () =>
  render(<ResendRegistrationLink i18n={resendRegistrationLinkPageI18nMock} />)

describe('Resend Registration Link', () => {
  it('should call Auth service when form submitted', async () => {
    const {getByLabelText} = renderComponent()

    const emailInput = getByLabelText('Email address')

    fireEvent.change(emailInput, {target: {value: 'Johnsmith@gmail.com'}})

    const submitButton = getByLabelText('Submit')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(jest.spyOn(Auth, 'resendSignUp')).toHaveBeenCalled()
    })
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(resendRegistrationLinkPageI18nMock.validation.email),
        ).toBeInTheDocument()
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
          getByText(resendRegistrationLinkPageI18nMock.validation.emailFormat),
        ).toBeInTheDocument()
      })
    })
  })
})
