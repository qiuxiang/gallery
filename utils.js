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
  page = page || 1
  source = source || '500px'
  return request('http://gallery-server.coding.io/?source=' + source + '&page=' + page)
}