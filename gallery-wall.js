var GalleryWall = function (selector, photos) {
  this.element = document.querySelector(selector)
  this.photos = photos.slice(0, 6)
  this.init()
  this.setSizes()
}

GalleryWall.prototype.init = function () {
  this.element.classList.add('gallery-' + this.photos.length)
  this.element.innerHTML = this.photos.reduce(function (html, item) {
    html +=
      '<div class="gallery-item" style="background-image: url(' + item.image.large + ')">' +
        '<div class="gallery-photo-info">' +
          '<div class="gallery-photo-name">' + item.name + '</div>' +
          '<div class="gallery-photo-description">' + item.description + '</div>' +
        '</div>' +
      '</div>'
    return html
  }, '')
}

GalleryWall.prototype.setSizes = function () {
  var items = this.element.querySelectorAll('.gallery-item')
  this['sizes' + this.photos.length]().forEach(function (size, i) {
    items[i].style.width = size.width + 'px'
    items[i].style.height = size.height + 'px'
    if (size.right) {
      items[i].style.float = 'right'
    }
  })
}

GalleryWall.prototype.sizes1 = function () {
  return [
    {
      width: this.element.clientWidth,
      height: this.element.clientHeight
    }
  ]
}

GalleryWall.prototype.sizes2 = function () {
  return [
    {
      width: this.element.clientWidth / 2,
      height: this.element.clientHeight
    },
    {
      width: this.element.clientWidth / 2,
      height: this.element.clientHeight
    }
  ]
}

GalleryWall.prototype.sizes3 = function () {
  var side = this.element.clientHeight / 2
  
  return [
    {
      width: this.element.clientWidth - side,
      height: this.element.clientHeight
    },
    {
      width: side,
      height: side
    },
    {
      width: side,
      height: side
    }
  ]
}

GalleryWall.prototype.sizes4 = function () {
  var width = this.element.clientWidth / 2;
  var height = this.element.clientHeight / 2;

  return [
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    }
  ]
}

GalleryWall.prototype.sizes5 = function () {
  var sizes = [
    {
      width: this.element.clientWidth * 2 / 3,
      height: this.element.clientHeight * 2 / 3
    },
    {
      right: true,
      width: this.element.clientWidth / 3,
      height: this.element.clientWidth / 3
    },
    {
      right: true,
      width: this.element.clientWidth / 3,
      height: this.element.clientHeight - this.element.clientWidth / 3
    },
    {
      width: this.element.clientWidth / 3,
      height: this.element.clientHeight / 3
    },
    {
      width: this.element.clientWidth / 3,
      height: this.element.clientHeight / 3
    }
  ]
  
  if (this.element.clientWidth > this.element.clientHeight * 2) {
    sizes.push(sizes.splice(2, 1)[0])
  }
  
  return sizes
}

GalleryWall.prototype.sizes6 = function () {
  var width = this.element.clientWidth / 3
  var height = this.element.clientHeight / 3

  return [
    {
      width: width * 2,
      height: Math.floor(height * 2)
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    },
    {
      width: width,
      height: height
    }
  ]
}
