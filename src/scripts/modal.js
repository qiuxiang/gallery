/**
 * @constructor
 */
var Modal = function () {
  var self = this

  this.$modal = document.createElement('div')
  this.$modal.className = 'modal'
  this.$modal.innerHTML =
    '<div class="spinner">' +
      '<div class="double-bounce1"></div>' +
        '<div class="double-bounce2"></div>' +
      '</div>' +
    '<div class="modal-container"><img class="modal-image"></div>'

  this.$modal.addEventListener('click', function (event) {
    if (event.target == self.$modal) {
      self.$modal.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  })

  this.$container = this.$modal.querySelector('.modal-container')
  this.$spinner = this.$modal.querySelector('.spinner')

  this.$image = this.$modal.querySelector('.modal-image')
  this.$image.addEventListener('load', function () {
    self.$spinner.style.zIndex = -1
  })

  document.body.appendChild(this.$modal)
}

/**
 * @param {string} url
 * @param {int} width
 * @param {int} height
 */
Modal.prototype.show = function (url, width, height) {
  document.body.style.overflow = 'hidden'
  this.$modal.classList.add('active')

  if (this.$image.src != url) {
    var imageAspectRatio = width / height
    var windowAspectRatio = innerWidth / innerHeight

    if (windowAspectRatio > imageAspectRatio) {
      this.$container.style.width = parseInt((innerHeight - 100) * imageAspectRatio) + 'px'
    } else {
      this.$container.style.width = (innerWidth - 100) + 'px'
      this.$container.style.marginTop = (innerHeight - (innerWidth - 100) / imageAspectRatio) / 2 + 'px'
    }

    this.$image.src = url
    this.$spinner.style.zIndex = 1
  }
}
