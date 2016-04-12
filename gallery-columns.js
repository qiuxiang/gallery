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

  this.modal = document.createElement('div')
  this.modal.className = 'gallery-modal'
  this.modal.innerHTML = '<div class="gallery-modal-image-wrapper"><img class="gallery-modal-image"></div>'
  this.modal.addEventListener('click', (function (event) {
    if (event.target == this.modal) {
      this.modal.classList.remove('active')
    }
  }).bind(this))
  document.body.appendChild(this.modal)
  this.image = document.querySelector('.gallery-modal-image')
  this.imageWrapper = document.querySelector('.gallery-modal-image-wrapper')
}

GalleryColumns.prototype.showImage = function (photo) {
  var windowAspectRatio = innerWidth / innerHeight
  if (windowAspectRatio > photo.aspect_ratio) {
    this.imageWrapper.style.width = (innerHeight - 80) * photo.aspect_ratio + 'px'
  } else {
    this.imageWrapper.style.width = (innerWidth - 80) + 'px'
  }

  console.log(photo.aspect_ratio)
  this.modal.classList.add('active')
  this.image.src = photo.image.large
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
    item.querySelector('.gallery-image').addEventListener('click', (function () {
      this.showImage(photo)
    }).bind(this))
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
