import {render} from '@testing-library/react'
import {useAuth} from '@clubwoof-context'
import {AppHome} from '@clubwoof-domains'
import {mockAuthState} from '@clubwoof-test-utils'
import mockRouter from 'next-router-mock'
import {ROUTE_PATHS} from '@clubwoof-constants'
import {mocked} from 'jest-mock'

jest.mock('@clubwoof-context', () => ({
  __esModule: true,
  ...jest.requireActual('@clubwoof-context'),
  useAuth: jest.fn(),
}))

const mockUseAuth = mocked(useAuth)
const renderComponent = () => render(<AppHome />)

describe('With unauthenticated redirect', () => {
  beforeEach(() => {
    mockRouter.push(ROUTE_PATHS.APP_HOME)
  })

  it('should route the user to the unauthenticated homepage when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      state: {...mockAuthState, isAuthenticated: false},
      dispatch: () => {},
      addUserToState: () => new Promise(() => {}),
    })
    renderComponent()
    expect(mockRouter.pathname).toBe(ROUTE_PATHS.HOME)
  })

  it('should keep the user on the current page when the user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      state: {...mockAuthState, isAuthenticated: true},
      dispatch: () => {},
      addUserToState: () => new Promise(() => {}),
    })
    renderComponent()
    expect(mockRouter.pathname).toBe(ROUTE_PATHS.APP_HOME)
  })
})
