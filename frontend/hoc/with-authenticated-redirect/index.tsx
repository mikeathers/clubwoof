import {useAuth} from '@clubwoof-context'
import {useRouter} from 'next/router'
import {ComponentPropsWithRef} from 'react'
import {NextComponentType} from 'next'

export function withAuthenticatedRedirect<P>(WrapperComponent: React.FC<P>): {
  (props: ComponentPropsWithRef<NextComponentType> & P): JSX.Element | null
  displayName: string | undefined
} {
  const AnonymousCheck = (props: ComponentPropsWithRef<NextComponentType> & P) => {
    const {
      state: {isAuthenticated, isAuthenticating},
    } = useAuth()
    const router = useRouter()

    if (isAuthenticated) {
      router.push('/dashboard')
      return null
    }

    return <WrapperComponent {...props} />
  }

  AnonymousCheck.displayName = WrapperComponent.displayName
  return AnonymousCheck
}
