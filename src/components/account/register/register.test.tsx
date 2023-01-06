import {fireEvent, render, waitFor} from '@testing-library/react'
import {useMediaQueries} from '@clubwoof-hooks'
import {mocked} from 'jest-mock'
import {Auth} from '@aws-amplify/auth'
import {Register} from './register.component'

const mockUseMediaQueries = mocked(useMediaQueries)
const mockAwsAuth = mocked(Auth)

jest.mock('@aws-amplify/auth')
jest.mock('@clubwoof-hooks', () => ({
  __esModule: true,
  ...jest.requireActual('@clubwoof-hooks'),
  useMediaQueries: jest.fn(),
}))

describe('Register Page', () => {
  beforeEach(() => {
    mockUseMediaQueries.mockReturnValue({
      isMobile: false,
      isRetina: false,
      isPortrait: false,
    })
  })

  it('should render a page with a title', () => {
    const {getByText} = render(<Register />)
    expect(getByText("Hello Hooman, it's nice to meet you!")).toBeInTheDocument()
  })

  it('should render a logo on desktop', () => {
    const {getByAltText} = render(<Register />)

    expect(getByAltText('logo')).toBeInTheDocument()
  })

  it('should not render a logo on mobile', () => {
    mockUseMediaQueries.mockReturnValue({
      isMobile: true,
      isRetina: false,
      isPortrait: false,
    })

    const {queryByAltText} = render(<Register />)

    expect(queryByAltText('logo')).not.toBeInTheDocument()
  })

  it('should change focus to next input when pressing enter', () => {
    const {getByLabelText, getByText} = render(<Register />)

    getByLabelText('First name').focus()
    fireEvent.change(getByLabelText('First name'), {target: {value: 'Joe'}})
    fireEvent.keyDown(getByLabelText('First name'), {key: 'Enter', code: 'Enter'})

    expect(getByLabelText('Last name')).toHaveFocus()

    fireEvent.change(getByLabelText('Last name'), {target: {value: 'Joe'}})
    fireEvent.keyDown(getByLabelText('Last name'), {key: 'Enter', code: 'Enter'})

    expect(getByLabelText('Email')).toHaveFocus()

    fireEvent.change(getByLabelText('Email'), {target: {value: 'Joe@bloggs.com'}})
    fireEvent.keyDown(getByLabelText('Email'), {key: 'Enter', code: 'Enter'})

    expect(getByLabelText('Password')).toHaveFocus()

    fireEvent.change(getByLabelText('Password'), {target: {value: 'somePassword'}})
    fireEvent.keyDown(getByLabelText('Password'), {key: 'Enter', code: 'Enter'})

    fireEvent.change(getByLabelText('Confirm password'), {
      target: {value: 'somePassword'},
    })
    fireEvent.keyDown(getByLabelText('Confirm password'), {key: 'Enter', code: 'Enter'})

    expect(getByText('Get started!')).toHaveFocus()
  })

  it('should call signUp when form data is correct', () => {
    const {getByLabelText} = render(<Register />)

    fireEvent.change(getByLabelText('First name'), {target: {value: 'Joe'}})
    fireEvent.keyDown(getByLabelText('First name'), {key: 'Enter', code: 'Enter'})

    fireEvent.change(getByLabelText('Last name'), {target: {value: 'Joe'}})
    fireEvent.keyDown(getByLabelText('Last name'), {key: 'Enter', code: 'Enter'})

    fireEvent.change(getByLabelText('Email'), {target: {value: 'Joe@bloggs.com'}})
    fireEvent.keyDown(getByLabelText('Email'), {key: 'Enter', code: 'Enter'})

    fireEvent.change(getByLabelText('Password'), {target: {value: 'somePassword1!'}})
    fireEvent.keyDown(getByLabelText('Password'), {key: 'Enter', code: 'Enter'})

    fireEvent.change(getByLabelText('Confirm password'), {
      target: {value: 'somePassword1!'},
    })
    fireEvent.keyDown(getByLabelText('Confirm password'), {key: 'Enter', code: 'Enter'})

    const submitButton = getByLabelText('Submit')
    fireEvent.click(submitButton)

    expect(mockAwsAuth.signUp).toHaveBeenCalled()
  })

  describe('Form Validation', () => {
    it('should show validation errors when form is submitted with no data', async () => {
      const {getByLabelText, getByText} = render(<Register />)

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText('First name is required.')).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText('Last name is required.')).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText('Email is required.')).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText('Password is required.')).toBeInTheDocument()
      })
      await waitFor(() => {
        expect(getByText('Confirm password is required.')).toBeInTheDocument()
      })
    })

    it('should correct email validation if email field is not in correct format', async () => {
      const {getByLabelText, getByText} = render(<Register />)

      fireEvent.change(getByLabelText('Email'), {target: {value: 'Johnsmith.com'}})

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(
          getByText('Please enter a valid email address e.g. joe@gmail.com.'),
        ).toBeInTheDocument()
      })
    })

    it('should validate that password and confirm password match', async () => {
      const {getByLabelText, getByText} = render(<Register />)

      fireEvent.change(getByLabelText('Password'), {target: {value: 'Password1$'}})
      fireEvent.change(getByLabelText('Confirm password'), {
        target: {value: 'Password1$%'},
      })

      const submitButton = getByLabelText('Submit')
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(getByText('Passwords do not match.')).toBeInTheDocument()
      })
    })

    it.each`
      password                | validationMessage
      ${'pass'}               | ${'Password length should be at least 4 characters.'}
      ${'passwordpassword12'} | ${'Password cannot exceed more than 12 characters.'}
      ${'password'}           | ${'Password must contain at least one lowercase and uppercase character, a number and a special character.'}
      ${'password123'}        | ${'Password must contain at least one lowercase and uppercase character, a number and a special character.'}
      ${'Password123'}        | ${'Password must contain at least one lowercase and uppercase character, a number and a special character.'}
      ${'password123!'}       | ${'Password must contain at least one lowercase and uppercase character, a number and a special character.'}
    `(
      'should validate password for: `$password`',
      async ({password, validationMessage}) => {
        const {getByLabelText, getByText} = render(<Register />)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        fireEvent.change(getByLabelText('Password'), {target: {value: password}})

        const submitButton = getByLabelText('Submit')
        fireEvent.click(submitButton)

        await waitFor(() => {
          expect(getByText(validationMessage)).toBeInTheDocument()
        })
      },
    )
  })
})
