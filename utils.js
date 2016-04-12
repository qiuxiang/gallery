function request(url) {
  return new Promise(function (resolve) {
    var cacheKey = 'cache_' + url
    var cache = localStorage[cacheKey];

    if (typeof cache != 'undefined') {
      cache = JSON.parse(cache)
    }

    if (cache && Date.now() - cache.time < 3600000) {
      resolve(cache.data)
    } else {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.send()
      xhr.addEventListener('load', function () {
        var data = JSON.parse(this.response)
        localStorage[cacheKey] = JSON.stringify({
          time: Date.now(),
          data: data
        })
        resolve(data)
      })
    }
  })
}

function getPhotos(page, source) {
  page = page || 1
  source = source || '500px'
  return request('http://gallery-server-ba040.coding.io/?source=' + source + '&page=' + page)
}