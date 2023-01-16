import {renderHook, waitFor} from '@testing-library/react'
import {Auth} from '@aws-amplify/auth'

import {mockCognitoUserAttributes} from '@clubwoof-test-utils'

import {AuthContext, CognitoUserAttributes, useAuth} from './auth.context'
import {initialState} from './auth-reducer'
import {ReactElement} from 'react'

interface CognitoUserMockType {
  attributes: CognitoUserAttributes
}

const cognitoUserMock: CognitoUserMockType = {attributes: mockCognitoUserAttributes}

const mockAddUserToState = jest.fn()
const state = initialState
const mockDispatch = jest.fn()

const wrapper = (props: {children: ReactElement}) => (
  <AuthContext.Provider
    value={{state, dispatch: mockDispatch, addUserToState: mockAddUserToState}}
  >
    {props.children}
  </AuthContext.Provider>
)

const renderUseAuth = (withoutProvider = false) =>
  renderHook(() => useAuth(), {
    wrapper: withoutProvider ? undefined : wrapper,
  })

describe('AuthContext', () => {
  beforeEach(() => {
    jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue(cognitoUserMock)
  })

  it('should throw an error is hook not wrapped in the correct provider', () => {
    try {
      renderUseAuth(true)
    } catch (e) {
      const error = e as Error
      expect(error.message).toBe('useAuth must be wrapped in an AuthProvider')
    }
  })

  it('should return an initial state object by default', () => {
    const {result} = renderUseAuth()
    expect(result.current.state).toEqual(initialState)
  })

  it('should return addUserToState function', () => {
    const {result} = renderUseAuth()
    expect(result.current.addUserToState).toBeTruthy()
  })

  it('should call Auth currentAuthenticatedUser function when calling addUserToState', async () => {
    const {result} = renderUseAuth()
    await result.current.addUserToState()
    expect(Auth.currentAuthenticatedUser).toBeCalled()
  })

  it('should call LOGIN_SUCCESS when successful login occurs', async () => {
    const {result} = renderUseAuth()
    await result.current.addUserToState()
    const {attributes} = cognitoUserMock
    await waitFor(() =>
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'LOGIN_SUCCESS',
        userConfig: expect.anything(),
        user: {
          email: attributes.email,
          familyName: attributes.family_name,
          givenName: attributes.given_name,
          numberOfDogs: attributes['custom:numberOfDogs'],
          picture: attributes.picture,
          phoneNumber: attributes.phone_number,
          address: attributes.address,
          isAdmin: attributes['custom:isAdmin'],
        },
      }),
    )
  })

  it('should call dispatch with LOGIN_FAILURE when error occurs', async () => {
    jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue(null)
    const {result} = renderUseAuth()
    await result.current.addUserToState()
    await waitFor(() =>
      expect(mockDispatch).toBeCalledWith({
        type: 'LOGIN_FAILURE',
        error: expect.anything(),
      }),
    )
  })
})
