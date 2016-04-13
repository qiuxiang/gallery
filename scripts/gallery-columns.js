/**
 * 瀑布流布局
 * 
 * @param {string} selector
 * @param {int} [col=5]
 * @constructor
 */
var GalleryColumns = function (selector, col) {
  this.element = document.querySelector(selector)
  this.col = col || 5
  this.init()
}

GalleryColumns.prototype.init = function () {
  var width = this.element.clientWidth / this.col
  var html = ''
  for (var i = 0; i < this.col; i += 1) {
    html += '<div class="gallery-column" style="width: ' + width + 'px"></div>'
  }
  this.element.innerHTML = html
  this.columns = this.element.querySelectorAll('.gallery-column')
}

/**
 * @param {Array} photos
 */
GalleryColumns.prototype.append = function (photos) {
  photos.forEach((function (photo) {
    var item = document.createElement('div')
    item.className = 'gallery-item'
    item.innerHTML =
      '<div class="gallery-photo">' +
        '<img class="gallery-image" data-large="' + photo.image.large + '" src="' + photo.image.small + '">' +
      '</div>' +
      '<div class="gallery-photo-info">' +
        '<div class="gallery-photo-name">' + photo.name + '</div>' +
        '<div class="gallery-photo-description">' + photo.description + '</div>' +
      '</div>'
    this.getMinColumn().appendChild(item)
    item.querySelector('.gallery-photo').style.height = parseInt(item.clientWidth / photo.aspect_ratio) + 'px'
  }).bind(this))
}

GalleryColumns.prototype.getMinColumn = function () {
  var min = this.columns[0]
  for (var i = 1; i < this.columns.length; i += 1) {
    if (this.columns[i].clientHeight < min.clientHeight) {
      min = this.columns[i]
    }
  }
  return min
}
