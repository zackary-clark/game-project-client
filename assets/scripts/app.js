'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const gameEvents = require('./game/events')
const authEvents = require('./auth/events')

$(() => {
    // hide pieces which should be hidden upon refresh
    $('#show-change-password').hide()
    $('#sign-up-form').hide()
    $('#sign-out-button').hide()
    $('#new-game').hide()
    $('.game-board').hide()
    $('#get-games-dropdown').hide()
    $('.table-container').hide()
    $('.navbar-toggler').css('visibility', 'hidden')

    // add event handlers for user api use
    $('#sign-up-form').on('submit', authEvents.onSignUp)
    $('#sign-in-form').on('submit', authEvents.onSignIn)
    $('#sign-up-button').on('click', authEvents.onShowSignUp)
    //$('#show-change-password').on('click', authEvents.onShowChangePassword)
    //$('#cancel-change-password').on('click', authEvents.onHideChangePassword)
    $('#change-password').on('submit', authEvents.onChangePassword)
    $('#sign-out-button').on('click', authEvents.onSignOut)

    // add event handlers for game api use
    $('#get-all-games').on('click', gameEvents.onGetAllGames)
    $('#get-complete-games').on('click', gameEvents.onGetCompleteGames)
    $('#get-incomplete-games').on('click', gameEvents.onGetIncompleteGames)

    // add event handlers to page buttons
    $('.games-page-buttons').on('click', gameEvents.onPageButtonClick)

    // add event handlers to mini-boards
    $('.game-table').on('click', gameEvents.onMiniGames)

    // make moves if tiles are clicked on
    $('.game-board').on('click', gameEvents.onBoardClick)
    $('#ai-move-button').on('click', gameEvents.onAIClick)

    // create new game
    $('#new-game').on('click', gameEvents.onNewGame)
})
