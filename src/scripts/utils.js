function request(url) {
  return new Promise(function (resolve) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.send()
    xhr.addEventListener('load', function () {
      resolve(JSON.parse(this.response))
    })
  })
}

function getPhotos(page, source) {
  page = page || 0
  source = source || 'so'
  return request('http://gallery-server.7c00.cc/?source=' + source + '&page=' + page)
}
