'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const gameEvents = require('./game/events')
const authEvents = require('./auth/events')

$(() => {
    // hide pieces which should be hidden upon refresh
    $('#change-password').hide()
    $('#show-change-password').hide()
    $('#sign-out-form').hide()
    $('#sign-up-form').hide()
    $('#sign-out-button').hide()
    $('#new-game').hide()
    $('.game-board').hide()
    $('#get-games').hide()
    $('.display-games').hide()

    // add event handlers for user api use
    $('#sign-up-form').on('submit', authEvents.onSignUp)
    $('#sign-in-form').on('submit', authEvents.onSignIn)
    $('#sign-up-button').on('click', authEvents.onShowSignUp)
    $('#show-change-password').on('click', authEvents.onShowChangePassword)
    $('#change-password').on('submit', authEvents.onChangePassword)
    $('#sign-out-button').on('click', authEvents.onSignOut)

    // add event handlers gor game api use
    $('#get-games').on('click', gameEvents.onGetGames)

    // make moves if tiles are clicked on
    $('#0').on('click', gameEvents.onMakeMove)
    $('#1').on('click', gameEvents.onMakeMove)
    $('#2').on('click', gameEvents.onMakeMove)
    $('#3').on('click', gameEvents.onMakeMove)
    $('#4').on('click', gameEvents.onMakeMove)
    $('#5').on('click', gameEvents.onMakeMove)
    $('#6').on('click', gameEvents.onMakeMove)
    $('#7').on('click', gameEvents.onMakeMove)
    $('#8').on('click', gameEvents.onMakeMove)

    // create new game
    $('#new-game').on('click', gameEvents.onNewGame)
})
