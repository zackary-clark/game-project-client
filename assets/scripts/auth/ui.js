'use strict'

const store = require('../store.js')

const signUpSuccess = function(data) {
    $('.display-message').text(`Successfully Registered!\nEmail: ${data.user.email}\nID: ${data.user.id}`)
    $('.display-message').css('color', 'green')
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
}

const signInSuccess = function(data) {
    $('.display-message').text(`Successfully Signed In!\nID: ${data.user.id}`)
    $('.display-message').css('color', 'green')
    store.user = data.user
    store.userToken = data.user.token
    $('#sign-up-form').hide()
    $('#sign-in-form').hide()
    $('#sign-up-button').hide()
    $('#show-change-password').show()
    $('#sign-out-button').show()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('.game-board').show()
    $('#new-game').show()
}

const changePasswordSuccess = function() {
    $('.display-message').text('Successfully Changed Password!')
    $('.display-message').css('color', 'green')
    $('#sign-up-form').hide()
    $('#sign-in-form').hide()
    $('#show-change-password').show()
    $('#change-password').hide()
    $('#sign-out-button').show()
    $('#change-password').trigger('reset')
    $('.game-board').show()
    $('#new-game').show()
}

const showChangePassword = function() {
    $('#show-change-password').hide()
    $('#change-password').show()
    $('.game-board').hide()
    $('#new-game').hide()
}

const showSignUp = function() {
    $('#sign-up-button').hide()
    $('#sign-up-form').show()
    $('#sign-in-form').hide()
}

const signOutSuccess = function() {
    $('.display-message').text('Successfully Logged Out!')
    $('.display-message').css('color', 'green')
    $('#sign-up-form').hide()
    $('#sign-in-form').show()
    $('#sign-up-form').trigger('reset')
    $('#sign-in-form').trigger('reset')
    $('#show-change-password').hide()
    $('#change-password').hide()
    $('#sign-out-button').hide()
    $('.game-board').hide()
    $('#new-game').hide()
    $('#sign-up-button').show()
}

const failure = function() {
    $('.display-message').text('Authentication Request Failed!')
    $('.display-message').css('color', 'red')
}

module.exports = {
    signUpSuccess,
    signInSuccess,
    failure,
    changePasswordSuccess,
    signOutSuccess,
    showChangePassword
}
