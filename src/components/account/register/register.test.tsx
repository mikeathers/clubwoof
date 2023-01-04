import { Register } from './register.component'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Register Page', () => {
  it('should render a page', () => {
    const { getByText } = render(<Register />)
    expect(getByText("Hello Hooman, it's nice to meet you!")).toBeInTheDocument()
  })
})
