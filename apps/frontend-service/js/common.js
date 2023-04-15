import * as utils from './utils.js'

$(document).ready(async () => {
  // Conditionally display the "Admin" link
  if (utils.shouldDisplayFeatures()) $('#admin-item').show()
  else $('#admin-item').hide()

  $('#logout-item').on('click', async function (event) {
    event.preventDefault()
    localStorage.clear()
    location.pathname = 'login'
  })
})
