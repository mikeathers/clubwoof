import React, {Component, ReactNode} from 'react'
import {ErrorBoundaryComponent} from './error-boundary.component'

interface ErrorBoundaryProps {
  children: ReactNode | ReactNode[]
  i18n: i18nErrorPage
}
interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error: unknown) {
    console.log('GetDerivedStateFromError:', error)

    return {hasError: true}
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.log('Unexpected error occurred!', error, errorInfo)
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
  }

  onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch((error) => {
      this.setState(ErrorBoundary.getDerivedStateFromError(error))
    })
  }

  render() {
    const {hasError} = this.state
    const {children, i18n} = this.props
    if (hasError) {
      return <ErrorBoundaryComponent i18n={i18n} />
    }

    return children
  }
}
