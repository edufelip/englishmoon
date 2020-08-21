const inputsToBeMasked = document.querySelectorAll('.maskInput')

const masks = {
  birth (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
  },
  teleph (value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})/, '($1) ')
  }
}

inputsToBeMasked.forEach(element => {
  const field = element.dataset.js
  element.addEventListener('input', (e) => {
    e.target.value = masks[field](e.target.value)
  })
})
