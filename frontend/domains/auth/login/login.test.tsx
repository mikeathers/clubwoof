import {fireEvent, render, waitFor} from '@testing-library/react'
import {loginPageI18nMock} from '@clubwoof-test-utils'
import {AuthProvider} from '@clubwoof-context'
import {Login} from '@clubwoof-domains'
import {Auth} from '@aws-amplify/auth'

const defaultProps = {
  i18n: loginPageI18nMock,
}

const renderComponent = (props = defaultProps) =>
  render(
    <AuthProvider>
      <Login {...props} />
    </AuthProvider>,
  )

const getInputs = (
  getByLabelText: (arg: string) => Element | Node | Document | Window,
): {
  emailInput: Element | Node | Document | Window
  passwordInput: Element | Node | Document | Window
} => {
  const emailInput = getByLabelText(loginPageI18nMock.inputs.email)
  const passwordInput = getByLabelText(loginPageI18nMock.inputs.password)

  return {emailInput, passwordInput}
}

const fillInFormAndSubmit = (
  getByLabelText: (arg: string) => Element | Node | Document | Window,
) => {
  const {emailInput, passwordInput} = getInputs(getByLabelText)

  fireEvent.change(emailInput, {target: {value: 'joe@bloggs.com'}})
  fireEvent.change(passwordInput, {target: {value: 'Password1!'}})

  const submitButton = getByLabelText('Submit')

  fireEvent.click(submitButton)
}

describe('Login', () => {
  beforeEach(() => {
    jest.spyOn(Auth, 'signIn').mockResolvedValue({
      user: expect.anything(),
      userConfirmed: false,
      userSub: '0000',
      codeDeliveryDetails: expect.anything(),
    })
  })

  it('should render a login page', () => {
    const {getByText} = renderComponent()
    expect(getByText(loginPageI18nMock.heading)).toBeInTheDocument()
  })

  it('should change focus to next input when pressing enter', () => {
    const {getByLabelText, getByText} = renderComponent()

    const {emailInput, passwordInput} = getInputs(getByLabelText)

    fireEvent.change(emailInput, {target: {value: 'Joe@bloggs.com'}})
    fireEvent.keyDown(emailInput, {key: 'Enter', code: 'Enter'})

    expect(passwordInput).toHaveFocus()

    fireEvent.change(passwordInput, {target: {value: 'somePassword'}})
    fireEvent.keyDown(passwordInput, {key: 'Enter', code: 'Enter'})

    expect(getByText("Let's go!")).toHaveFocus()
  })

  it('should call login when form data is correct', async () => {
    const {getByLabelText} = renderComponent()

    fillInFormAndSubmit(getByLabelText)

    await waitFor(() => expect(Auth.signIn).toHaveBeenCalled())
  })

  it('should show an error message when sign up is unsuccessful ', async () => {
    jest.spyOn(Auth, 'signIn').mockRejectedValue(new Error('Something went wrong'))

    const {getByLabelText, getByText} = renderComponent()

    fillInFormAndSubmit(getByLabelText)

    await waitFor(() => expect(getByText('Something went wrong')).toBeInTheDocument())
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText(loginPageI18nMock.validation.email)).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText(loginPageI18nMock.validation.password)).toBeInTheDocument()
      })
    })

    it('should correct email validation if email field is not in correct format', async () => {
      const {getByLabelText, getByText} = renderComponent()

      const {emailInput} = getInputs(getByLabelText)

      fireEvent.change(emailInput, {target: {value: 'Johnsmith.com'}})

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText(loginPageI18nMock.validation.emailFormat)).toBeInTheDocument()
      })
    })
  })
})
