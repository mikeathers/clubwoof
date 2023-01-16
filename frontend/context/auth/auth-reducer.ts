import {CognitoUser} from '@aws-amplify/auth'

export interface AuthState {
  isLoading: boolean
  error: Error | undefined
  isAuthenticated: boolean
  isAuthenticating: boolean
  user: User | undefined
  userConfig: CognitoUser | undefined
}

export type AuthReducerAction =
  | {type: 'IS_LOGGING_IN'}
  | {type: 'LOGIN_SUCCESS'; user: User; userConfig: CognitoUser}
  | {type: 'LOGIN_FAILURE'; error: Error | undefined}
  | {type: 'LOGOUT_SUCCESS'}

export const initialState: AuthState = {
  isLoading: true,
  error: undefined,
  isAuthenticated: false,
  isAuthenticating: true,
  user: undefined,
  userConfig: undefined,
}

export const authReducer = (state: AuthState, action: AuthReducerAction): AuthState => {
  switch (action.type) {
    case 'IS_LOGGING_IN': {
      return initialState
    }
    case 'LOGIN_SUCCESS': {
      return {
        isLoading: false,
        error: undefined,
        isAuthenticated: true,
        isAuthenticating: false,
        user: action.user,
        userConfig: action.userConfig,
      }
    }
    case 'LOGIN_FAILURE': {
      return {
        ...initialState,
        isLoading: false,
        error: action.error,
        isAuthenticating: false,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${JSON.stringify(action)}`)
    }
  }
}
