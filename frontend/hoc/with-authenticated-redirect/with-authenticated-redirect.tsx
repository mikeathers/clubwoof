import {useAuth} from '@clubwoof-context'
import {useRouter} from 'next/router'
import {ComponentPropsWithRef, useEffect} from 'react'
import {NextComponentType} from 'next'
import {ROUTE_PATHS} from '@clubwoof-constants'

export function withAuthenticatedRedirect<P>(WrapperComponent: React.FC<P>): {
  (props: ComponentPropsWithRef<NextComponentType> & P): JSX.Element | null
  displayName: string | undefined
} {
  const AnonymousCheck = (props: ComponentPropsWithRef<NextComponentType> & P) => {
    const {
      state: {isAuthenticated},
    } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (isAuthenticated) {
        router.push(ROUTE_PATHS.APP_HOME)
        return
      }
    }, [router.isReady])

    return <WrapperComponent {...props} />
  }

  AnonymousCheck.displayName = WrapperComponent.displayName
  return AnonymousCheck
}
