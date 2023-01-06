// @ts-ignore
function handler(event) {
  let request = event.request
  let uri = request.uri

  if (uri.endsWith('/')) {
    request.uri += 'index.html'
  } else if (!uri.includes('.')) {
    request.uri = `${uri}.html`
  }

  return request
}
