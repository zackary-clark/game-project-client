'use strict'

const store = require('../store.js')

const signUpSuccess = function(data) {
    $('.display-message').html(`Successfully Registered!<br>Email: ${data.user.email}<br>ID: ${data.user.id}`)
    $('.display-message').css('color', 'green')
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#sign-up-button').show()
    $('.table-container').hide()
}

const signInSuccess = function(data) {
    $('.display-message').text('')
    $('#current-user').text(`${data.user.email}`)
    store.user = data.user
    $('#sign-up-form').hide()
    $('#sign-in-form').hide()
    $('#sign-up-button').hide()
    $('#show-change-password').show()
    $('#sign-out-button').show()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#new-game').show()
    $('#get-games-dropdown').show()
    $('.table-container').hide()
}

const changePasswordSuccess = function() {
    $('.display-message').text('Successfully Changed Password!')
    $('.display-message').css('color', 'green')
    $('#change-password').trigger('reset')
    $('#change-password-modal').modal('hide')
}

const showChangePassword = function() {
    $('#show-change-password').hide()
    $('#change-password').show()
    $('.game-board').hide()
    $('#new-game').hide()
    $('#get-games-dropdown').hide()
    $('.table-container').hide()
}

const hideChangePassword = function () {
    $('#show-change-password').show()
    $('#change-password').hide()
    $('#new-game').show()
    $('#get-games-dropdown').show()
}

const showSignUp = function() {
    $('#sign-up-button').hide()
    $('#sign-up-form').show()
    $('#sign-in-form').show()
    $('.table-container').hide()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
}

const signOutSuccess = function() {
    clearDisplayMessage()
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#current-user').text('')
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#change-password').trigger('reset')
    $('#show-change-password').hide()
    $('#sign-out-button').hide()
    $('.game-board').hide()
    $('#new-game').hide()
    $('#sign-up-button').show()
    $('#get-games-dropdown').hide()
    $('.table-container').hide()
    $('.game-table').html('')
    $('.table-container').hide()
}

const failure = function() {
    $('.display-message').text('Authentication Request Failed!')
    $('.display-message').css('color', 'red')
}

const clearDisplayMessage = function () {
    $('.display-message').text('')
}

module.exports = {
    signUpSuccess,
    signInSuccess,
    failure,
    changePasswordSuccess,
    signOutSuccess,
    showSignUp,
    showChangePassword,
    clearDisplayMessage,
    hideChangePassword
}
