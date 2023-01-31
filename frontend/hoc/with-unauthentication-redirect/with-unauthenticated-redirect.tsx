import {useAuth} from '@clubwoof-context'
import {useRouter} from 'next/router'
import {ComponentPropsWithRef, useEffect} from 'react'
import {NextComponentType} from 'next'
import {ROUTE_PATHS} from '@clubwoof-constants'

export function withUnauthenticatedRedirect<P>(WrapperComponent: React.FC<P>): {
  (props: ComponentPropsWithRef<NextComponentType> & P): JSX.Element | null
  displayName: string | undefined
} {
  const AuthenticatedCheck = (props: ComponentPropsWithRef<NextComponentType> & P) => {
    const router = useRouter()

    const {
      state: {isAuthenticated},
    } = useAuth()

    useEffect(() => {
      if (!isAuthenticated) {
        router.push(ROUTE_PATHS.HOME)
        return
      }
    }, [router.isReady])

    return <WrapperComponent {...props} />
  }

  AuthenticatedCheck.displayName = WrapperComponent.displayName
  return AuthenticatedCheck
}
