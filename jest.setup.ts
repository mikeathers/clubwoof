import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('next/router', () => require('next-router-mock'))

export {}
