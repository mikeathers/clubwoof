import {fireEvent, render, waitFor} from '@testing-library/react'
import {Auth} from '@aws-amplify/auth'

import {Register} from './register.container'
import {registerPageI18nMock} from '@clubwoof-test-utils'

jest.mock('next/router', () => require('next-router-mock'))

const defaultProps = {
  i18n: registerPageI18nMock,
}

const renderComponent = (props = defaultProps) => render(<Register {...props} />)

const getInputs = (
  getByLabelText: (arg: string) => Element | Node | Document | Window,
): {
  firstNameInput: Element | Node | Document | Window
  lastNameInput: Element | Node | Document | Window
  emailInput: Element | Node | Document | Window
  passwordInput: Element | Node | Document | Window
  confirmPasswordInput: Element | Node | Document | Window
} => {
  const firstNameInput = getByLabelText(registerPageI18nMock.inputs.firstName)
  const lastNameInput = getByLabelText(registerPageI18nMock.inputs.lastName)
  const emailInput = getByLabelText(registerPageI18nMock.inputs.email)
  const passwordInput = getByLabelText(registerPageI18nMock.inputs.password)
  const confirmPasswordInput = getByLabelText(registerPageI18nMock.inputs.confirmPassword)

  return {firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput}
}

const fillInFormAndSubmit = (
  getByLabelText: (arg: string) => Element | Node | Document | Window,
) => {
  const {firstNameInput, lastNameInput, emailInput, passwordInput, confirmPasswordInput} =
    getInputs(getByLabelText)
  fireEvent.change(firstNameInput, {target: {value: 'Joe'}})
  fireEvent.change(lastNameInput, {target: {value: 'Bloggs'}})
  fireEvent.change(emailInput, {target: {value: 'joe@bloggs.com'}})
  fireEvent.change(passwordInput, {target: {value: 'Password1!'}})
  fireEvent.change(confirmPasswordInput, {
    target: {value: 'Password1!'},
  })
  const submitButton = getByLabelText('Submit')

  fireEvent.click(submitButton)
}

describe('Register Page', () => {
  beforeEach(() => {
    jest.spyOn(Auth, 'signUp').mockResolvedValue({
      user: expect.anything(),
      userConfirmed: false,
      userSub: '0000',
      codeDeliveryDetails: expect.anything(),
    })
  })

  it('should render a page with a title', () => {
    const {getByText} = renderComponent()
    expect(getByText(registerPageI18nMock.heading)).toBeInTheDocument()
  })

  it('should change focus to next input when pressing enter', () => {
    const {getByLabelText, getByText} = renderComponent()

    const {
      firstNameInput,
      lastNameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput,
    } = getInputs(getByLabelText)

    getByLabelText('First name').focus()
    fireEvent.change(firstNameInput, {target: {value: 'Joe'}})
    fireEvent.keyDown(firstNameInput, {key: 'Enter', code: 'Enter'})

    expect(lastNameInput).toHaveFocus()

    fireEvent.change(lastNameInput, {target: {value: 'Bloggs'}})
    fireEvent.keyDown(lastNameInput, {key: 'Enter', code: 'Enter'})

    expect(emailInput).toHaveFocus()

    fireEvent.change(emailInput, {target: {value: 'Joe@bloggs.com'}})
    fireEvent.keyDown(emailInput, {key: 'Enter', code: 'Enter'})

    expect(passwordInput).toHaveFocus()

    fireEvent.change(passwordInput, {target: {value: 'somePassword'}})
    fireEvent.keyDown(passwordInput, {key: 'Enter', code: 'Enter'})

    fireEvent.change(confirmPasswordInput, {
      target: {value: 'somePassword'},
    })
    fireEvent.keyDown(confirmPasswordInput, {key: 'Enter', code: 'Enter'})

    expect(getByText('Get started!')).toHaveFocus()
  })

  it('should call signUp when form data is correct', async () => {
    const {getByLabelText} = renderComponent()

    fillInFormAndSubmit(getByLabelText)

    await waitFor(() => expect(Auth.signUp).toHaveBeenCalled())
  })

  it('should show registration complete when sign up successful ', async () => {
    const {getByLabelText, getByText} = renderComponent()

    fillInFormAndSubmit(getByLabelText)

    await waitFor(() =>
      expect(getByText(registerPageI18nMock.registrationSuccessful)).toBeInTheDocument(),
    )
  })

  it('should show an error message when sign up is unsuccessful ', async () => {
    jest.spyOn(Auth, 'signUp').mockRejectedValue(new Error())

    const {getByLabelText, getByText} = renderComponent()

    fillInFormAndSubmit(getByLabelText)

    await waitFor(() =>
      expect(getByText(registerPageI18nMock.terribleError)).toBeInTheDocument(),
    )
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText(registerPageI18nMock.validation.firstName)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText(registerPageI18nMock.validation.lastName)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText(registerPageI18nMock.validation.email)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText(registerPageI18nMock.validation.password)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(
          getByText(registerPageI18nMock.validation.confirmPassword),
        ).toBeInTheDocument()
      })
    })

    it('should correct email validation if email field is not in correct format', async () => {
      const {getByLabelText, getByText} = renderComponent()
      const {emailInput} = getInputs(getByLabelText)

      fireEvent.change(emailInput, {target: {value: 'Johnsmith.com'}})

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText(registerPageI18nMock.validation.emailFormat)).toBeInTheDocument()
      })
    })

    it('should validate that password and confirm password match', async () => {
      const {getByLabelText, getByText} = renderComponent()
      const {passwordInput, confirmPasswordInput} = getInputs(getByLabelText)

      fireEvent.change(passwordInput, {target: {value: 'Password1$'}})
      fireEvent.change(confirmPasswordInput, {
        target: {value: 'Password1$%'},
      })

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText(registerPageI18nMock.validation.passwordsDoNotMatch),
        ).toBeInTheDocument()
      })
    })

    it.each`
      password                | validationMessage
      ${'pass'}               | ${registerPageI18nMock.validation.passwordTooShort}
      ${'passwordpassword12'} | ${registerPageI18nMock.validation.passwordTooLong}
      ${'password'}           | ${registerPageI18nMock.validation.passwordFormat}
      ${'password123'}        | ${registerPageI18nMock.validation.passwordFormat}
      ${'Password123'}        | ${registerPageI18nMock.validation.passwordFormat}
      ${'password123!'}       | ${registerPageI18nMock.validation.passwordFormat}
    `(
      'should validate password for: `$password`',
      async ({password, validationMessage}) => {
        const {getByLabelText, getByText} = renderComponent()
        const {passwordInput} = getInputs(getByLabelText)

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
