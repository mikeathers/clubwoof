function handler(event) {
  var request = event.request
  var uri = request.uri
  var hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/

  if (uri && !uri.match(hasExtension)) {
    request.uri = `${uri}.html`
  }

  return request
}
