/**
 * 木桶布局
 * 
 * @param {string} selector
 * @param {int} [minHeight=300]
 * @constructor
 */
var GalleryColumns = function (selector, minHeight) {
  minHeight = minHeight || 300
  this.element = document.querySelector(selector)
  this.minAspectRatio = this.element.clientWidth / minHeight
  this.padding = 8
  this.photos = []
}

/**
 * @param {Array} photos
 */
GalleryColumns.prototype.append = function (photos) {
  var self = this

  this.getRows(photos).forEach(function (row) {
    var totalWidth = self.element.clientWidth - (row.photos.length - 1) * self.padding
    var $row = document.createElement('div')

    $row.className = 'gallery-row'
    $row.style.height = parseInt(totalWidth / row.aspectRatio) + 'px'
    $row.innerHTML = row.photos.reduce(function (html, photo) {
      html +=
        '<div class="gallery-item-wrapper">' +
          '<div class="gallery-item">' +
            '<img ' +
              'title="' + photo.name + '" ' +
              'class="gallery-image" data-large="' + photo.image.large + '" ' +
              'src="' + photo.image.small + '">' +
          '</div>' +
        '</div>'
      return html
    }, '')

    self.element.appendChild($row)
  })
}

/**
 * 计算布局
 *
 * @param {Array} photos
 * @returns {Array}
 */
GalleryColumns.prototype.getRows = function (photos) {
  // 合并上次剩下的相片
  photos = this.photos.concat(photos)

  var aspectRatio = 0
  var rows = []
  var _photos = []

  for (var i = 0; i < photos.length; i += 1) {
    _photos.push(photos[i])
    aspectRatio += photos[i].width / photos[i].height

    if (aspectRatio > this.minAspectRatio) {
      rows.push({
        aspectRatio: aspectRatio,
        photos: _photos
      })
      _photos = []
      aspectRatio = 0
    }
  }

  // 剩下的相片留到下一次
  this.photos = _photos
  return rows
}
