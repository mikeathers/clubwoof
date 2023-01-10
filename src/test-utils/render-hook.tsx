/* eslint-disable */
// @ts-nocheck

import {render} from '@testing-library/react'

export function renderHook(renderCallback, options = {}) {
  const {initialProps, wrapper} = options
  let result
  result = React.createRef()

  function TestComponent({renderCallbackProps}) {
    const pendingResult = renderCallback(renderCallbackProps)

    React.useEffect(() => {
      result.current = pendingResult
    })

    return null
  }

  const {rerender: baseRerender, unmount} = render(
    <TestComponent renderCallbackProps={initialProps} />,
    {wrapper},
  )

  function rerender(rerenderCallbackProps) {
    return baseRerender(<TestComponent renderCallbackProps={rerenderCallbackProps} />)
  }

  return {result, rerender, unmount}
}
