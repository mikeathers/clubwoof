/* eslint-disable */
// jest.mock('@aws-amplify/auth');
// import {jest} from '@jest/globals'

import {Auth} from '@aws-amplify/auth'
import {dev} from '@clubwoof-constants'

jest.mock('next/router', () => require('next-router-mock'))

// global.jest = jest

export const localStorageMock: {
  getItem: (key: string) => string
  setItem: (key: string, value: string) => void
  clear: () => void
  removeItem: (key: string) => void
} = (function () {
  let store: Record<string, string> = {}
  return {
    getItem: function (key: string) {
      return store[key]
    },
    setItem: function (key: string, value: string) {
      store[key] = value.toString()
    },
    clear: function () {
      store = {}
    },
    removeItem: function (key: string) {
      delete store[key]
    },
  }
})()
// eslint-disable-next-line
window.localStorage.__proto__ = localStorageMock
Object.defineProperty(window, 'localStorage', {value: localStorageMock})

Auth.configure({
  mandatorySignIn: false,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  region: dev.REGION,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  userPoolId: dev.USER_POOL_ID,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  identityPoolId: dev.IDENTITY_POOL_ID,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  userPoolWebClientId: dev.USER_POOL_WEB_CLIENT_ID,
})

// window.scrollTo = jest.fn()
// ;(window.IntersectionObserver as jest.Mock) = jest.fn(() => ({
//   observe: jest.fn(),
// }))

global.IntersectionObserver = class IntersectionObserver {
  constructor() {
    this.root = null
    this.rootMargin = ''
    this.thresholds = []
  }

  readonly root: Element | null

  readonly rootMargin: string

  readonly thresholds: ReadonlyArray<number>

  disconnect() {
    return null
  }

  observe() {
    return null
  }

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }

  unobserve() {
    return null
  }
}
