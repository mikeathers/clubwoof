import React from 'react'

type Status = 'idle' | 'pending' | 'rejected' | 'resolved'
type InitialState = {
  status?: Status
  error?: Error | null
  data?: Record<string, string> | null
}

type ActionTypes =
  | {status: 'idle'; data: null; error: null}
  | {status: 'pending'}
  | {status: 'resolved'; data: Record<string, string>}
  | {status: 'rejected'; error: Error}

interface UseSafeAsyncReturnValue<T> {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  setError: (newError: Error) => void
  error: Error | null | undefined
  status: Status | undefined
  data: Record<string, string> | null | undefined
  run: (promise: Promise<T>) => Promise<Error | T>
  resetAsyncState: () => void
}

const useSafeDispatch = (dispatch: React.Dispatch<ActionTypes>) => {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (action: ActionTypes) => {
      console.log(action)
      if (mounted.current) return dispatch(action)
      else return undefined
    },
    [dispatch],
  )
}

const defaultInitialState: InitialState = {
  status: 'idle',
  data: null,
  error: null,
}

export const useSafeAsync = <T>(
  initialState?: InitialState,
): UseSafeAsyncReturnValue<T> => {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const reducer = (state: InitialState, action: ActionTypes): InitialState => {
    return {
      ...state,
      ...action,
    }
  }

  const [{status, data, error}, setState] = React.useReducer(
    reducer,
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setError = React.useCallback(
    (newError: Error) => safeSetState({status: 'rejected', error: newError}),
    [safeSetState],
  )

  const resetAsyncState = React.useCallback(
    () => safeSetState({status: 'idle', data: null, error: null}),
    [safeSetState],
  )

  const run = React.useCallback(
    async (promise: Promise<T>) => {
      console.log(promise)
      if (!promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        )
      }
      safeSetState({status: 'pending'})
      return promise
        .then((promiseData) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          safeSetState({status: 'resolved', data: promiseData})
          return promiseData
        })
        .catch((promiseError) => {
          if (promiseError instanceof Error) {
            safeSetState({status: 'rejected', error: promiseError})
            return promiseError
          }

          if (typeof promiseError === 'object' && 'message' in promiseError) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const e = new Error(promiseError.message)
            safeSetState({
              status: 'rejected',
              error: e,
            })
            return e
          }

          safeSetState({
            status: 'rejected',
            error: new Error(JSON.stringify(promiseError)),
          })
          return new Error(JSON.stringify(promiseError))
        })
    },
    [safeSetState],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    resetAsyncState,
    setError,
    error,
    status,
    data,
    run,
  }
}
