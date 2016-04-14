var Application = function (gallery) {
  this.gallery = gallery
  this.spinner = document.querySelector('.spinner')
  this.modal = new Modal()
  this.loading = false
  this.source = '500px'
  this.page = 0
  this.load()

  window.addEventListener('scroll', this.scroll.bind(this))
  document.addEventListener('click', this.click.bind(this))
}

Application.prototype.click = function (event) {
  var $target = event.target
  if ($target.className == 'gallery-image') {
    this.modal.show($target.dataset.large, $target.clientWidth, $target.clientHeight)
  }
}

Application.prototype.scroll = function () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  if (scrollTop + innerHeight >= document.body.clientHeight && !this.loading) {
    this.load()
  }
}

Application.prototype.loaded = function (photos) {
  this.spinner.style.display = 'none'
  this.loading = false
  this.gallery.append(photos)
}

Application.prototype.load = function () {
  this.spinner.style.display = 'block'
  this.loading = true
  getPhotos(this.page++, this.source).then(this.loaded.bind(this))
}
