import {renderHook} from '@testing-library/react'
import {useSafeAsync} from '@clubwoof-hooks'

const renderUseSafeAsync = () =>
  renderHook(() => useSafeAsync(), {
    wrapper: undefined,
  })

describe('useSafeAsync', () => {
  it('should return an error when no promise is received', () => {
    try {
      const {result} = renderUseSafeAsync()
      result.current.run(new Promise(() => {}))
    } catch (e) {
      expect((e as Error).message).toBe(
        "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
      )
    }
  })
})
