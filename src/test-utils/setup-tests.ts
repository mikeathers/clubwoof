/* eslint-disable class-methods-use-this */
// jest.mock('@aws-amplify/auth');

import {Auth} from '@aws-amplify/auth'
import {dev} from '@clubwoof-constants'

export const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
}
// eslint-disable-next-line
window.localStorage.__proto__ = localStorageMock

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
//
// global.IntersectionObserver = class IntersectionObserver {
//   constructor() {
//     this.root = null
//     this.rootMargin = ''
//     this.thresholds = []
//   }
//
//   readonly root: Element | null
//
//   readonly rootMargin: string
//
//   readonly thresholds: ReadonlyArray<number>
//
//   disconnect() {
//     return null
//   }
//
//   observe() {
//     return null
//   }
//
//   takeRecords(): IntersectionObserverEntry[] {
//     return []
//   }
//
//   unobserve() {
//     return null
//   }
// }
