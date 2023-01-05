import { act, fireEvent, render } from '@testing-library/react'
import { Register } from './register.component'
import '@testing-library/jest-dom'

describe('Register Page', () => {
  it('should render a page', () => {
    const { getByText } = render(<Register />)
    expect(getByText("Hello Hooman, it's nice to meet you!")).toBeInTheDocument()
  })

  it('should change focus to next input when pressing enter', () => {
    const { getByLabelText, getByText } = render(<Register />)
    const inputOne = getByLabelText('First name')
    const inputTwo = getByLabelText('Last name')
    const inputThree = getByLabelText('Email')
    const inputFour = getByLabelText('Password')
    const button = getByText('Get started!')

    act(() => {
      inputOne.focus()
      fireEvent.change(inputOne, { target: { value: 'Joe' } })
      fireEvent.keyDown(inputOne, { key: 'Enter', code: 'Enter' })

      expect(inputTwo).toHaveFocus()

      fireEvent.change(inputTwo, { target: { value: 'Joe' } })
      fireEvent.keyDown(inputTwo, { key: 'Enter', code: 'Enter' })

      expect(inputThree).toHaveFocus()

      fireEvent.change(inputThree, { target: { value: 'Joe@bloggs.com' } })
      fireEvent.keyDown(inputThree, { key: 'Enter', code: 'Enter' })

      expect(inputFour).toHaveFocus()

      fireEvent.change(inputFour, { target: { value: 'somePassword' } })
      fireEvent.keyDown(inputFour, { key: 'Enter', code: 'Enter' })

      expect(button).toHaveFocus()
    })
  })
})
