/**
 * 瀑布流布局
 * 
 * @param selector
 * @param col
 * @constructor
 */
var GalleryColumns = function (selector, col) {
  this.element = document.querySelector(selector)
  this.col = col || 5
  this.initColumns()
  this.initModal()
}

GalleryColumns.prototype.initColumns = function () {
  var width = this.element.clientWidth / this.col
  var html = ''
  for (var i = 0; i < this.col; i += 1) {
    html += '<div class="gallery-column" style="width: ' + width + 'px"></div>'
  }
  this.element.innerHTML = html
  this.columns = this.element.querySelectorAll('.gallery-column')
}

GalleryColumns.prototype.initModal = function () {
  this.modal = document.createElement('div')
  this.modal.className = 'gallery-modal'
  this.modal.innerHTML =
    '<div class="gallery-modal-spinner spinner">' +
      '<div class="double-bounce1"></div>' +
      '<div class="double-bounce2"></div>' +
    '</div>' +
    '<div class="gallery-modal-image-wrapper"><img class="gallery-modal-image"></div>'
  document.body.appendChild(this.modal)

  this.modal.addEventListener('click', (function (event) {
    if (event.target == this.modal) {
      this.modal.classList.remove('active')
    }
  }).bind(this))

  this.imageWrapper = document.querySelector('.gallery-modal-image-wrapper')
  this.spinner = document.querySelector('.gallery-modal-spinner')

  this.image = document.querySelector('.gallery-modal-image')
  this.image.addEventListener('load', (function () {
    this.spinner.style.zIndex = -1
  }).bind(this))
}

GalleryColumns.prototype.showImage = function (photo) {
  this.modal.classList.add('active')

  if (this.image.src != photo.image.large) {
    var windowAspectRatio = innerWidth / innerHeight
    
    if (windowAspectRatio > photo.aspect_ratio) {
      this.imageWrapper.style.width = (innerHeight - 100) * photo.aspect_ratio + 'px'
    } else {
      this.imageWrapper.style.width = (innerWidth - 100) + 'px'
      this.imageWrapper.style.marginTop = (innerHeight - (innerWidth - 100) / photo.aspect_ratio) / 2 + 'px'
    }

    this.image.src = photo.image.large
    this.spinner.style.zIndex = 1
  }
}

GalleryColumns.prototype.append = function (photos) {
  photos.forEach((function (photo) {
    var item = document.createElement('div')
    item.className = 'gallery-item'
    item.innerHTML =
      '<div class="gallery-photo">' +
        '<img class="gallery-image" src="' + photo.image.small + '">' +
      '</div>' +
      '<div class="gallery-photo-info">' +
        '<div class="gallery-photo-name">' + photo.name + '</div>' +
        '<div class="gallery-photo-description">' + photo.description + '</div>' +
      '</div>'
    this.getMinColumn().appendChild(item)
    item.querySelector('.gallery-photo').style.height = parseInt(item.clientWidth / photo.aspect_ratio) + 'px'
    item.querySelector('.gallery-image').addEventListener('click', this.showImage.bind(this, photo))
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
