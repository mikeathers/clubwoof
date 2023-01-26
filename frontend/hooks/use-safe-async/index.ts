import React from 'react'

type Status = 'idle' | 'pending' | 'rejected' | 'resolved'
type InitialState<T> = {
  status?: Status
  error?: Error | null
  data?: Record<string, string> | null | T
}

type ActionTypes<T> =
  | {status: 'idle'; data: null; error: null}
  | {status: 'pending'}
  | {status: 'resolved'; data: Record<string, string> | T}
  | {status: 'rejected'; error: Error}

interface UseSafeAsyncReturnValue<T> {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  setError: (newError: Error) => void
  error: Error | null | undefined
  status: Status | undefined
  data: Record<string, string> | null | undefined | T
  run: (promise: Promise<T>) => Promise<Error | T>
  resetAsyncState: () => void
}

const useSafeDispatch = <T>(dispatch: React.Dispatch<ActionTypes<T>>) => {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (action: ActionTypes<T>) => {
      console.log(action)
      if (mounted.current) {
        console.log('ehy')
        return dispatch(action)
      } else return undefined
    },
    [dispatch],
  )
}

export const useSafeAsync = <T>(
  initialState?: InitialState<T>,
): UseSafeAsyncReturnValue<T> => {
  const defaultInitialState: InitialState<T> = {
    status: 'idle',
    data: null,
    error: null,
  }

  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })

  const reducer = (state: InitialState<T>, action: ActionTypes<T>): InitialState<T> => {
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

  //ts-ignore
  //@typescript-eslint/no-explicit-any
  const errorHasMessage = (obj: any): obj is Error => {
    return typeof obj === 'object' && 'message' in obj
  }

  const run = React.useCallback(
    async (promise: Promise<T>) => {
      if (!promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        )
      }
      safeSetState({status: 'pending'})
      return promise
        .then((promiseData) => {
          safeSetState({status: 'resolved', data: promiseData})
          return promiseData
        })
        .catch((promiseError) => {
          if (promiseError instanceof Error) {
            safeSetState({status: 'rejected', error: promiseError})
            return promiseError
          }

          if (errorHasMessage(promiseError)) {
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
