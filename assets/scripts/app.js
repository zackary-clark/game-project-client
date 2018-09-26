'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const gameEvents = require('./game/events')

$(() => {
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
