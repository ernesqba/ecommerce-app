import * as service from './service.js'
import * as utils from './utils.js'

if (utils.getUserToken()) location.href = 'home'

$(document).ready(function () {
  if (location.href.includes('success=true')) {
    $('#message').text('User created').removeClass('d-none')
    setTimeout(() => {
      $('#message').addClass('d-none')
    }, 5000)
  }

  // Handle form submission
  $('#login-form').on('submit', async function (event) {
    event.preventDefault()

    // Get the form data
    const email = $('#email').val()
    const password = $('#password').val()

    // Communicate with the backend
    try {
      const data = await service.login(email, password)

      localStorage.setItem('session', JSON.stringify(data))
      location.href = 'home'
    } catch (error) {
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
      console.error('Error logging in:', error)
    }
  })

  $('#signup-form').on('submit', async function (event) {
    event.preventDefault()

    // Get the form data
    const email = $('#signup-email').val()
    const password = $('#signup-password').val()

    // Communicate with the backend
    try {
      await service.signup(email, password)
      location.href = 'login?success=true';
    } catch (error) {
      $('#error-message')
        .text(error.message) // Update the error message text
        .removeClass('d-none')
      setTimeout(() => {
        $('#error-message').addClass('d-none')
      }, 5000)
      console.error('Error logging in:', error)
    }
  })
})
