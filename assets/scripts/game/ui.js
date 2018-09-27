'use strict'

const store = require('../store')

const updateGameBoard = function (index) {
    $(`#${index}`).html(store.game.cells[index])
}

const refreshBoard = function () {
    for (let i = 0; i < store.game.cells.length; i++) {
        $(`#${i}`).html('')
        $(`#${i}`).css('background-color', '#444444')
    }
}

const gameOverWin = function (gridLine) {
    $(`.${gridLine}`).css('background-color', 'red')
}

const gameOverDraw = function () {
    $('.display-message').text('Draw!')
    $('.display-message').css('color', 'red')
}

const spotTaken = function () {
    $('.display-message').text('That spot is Taken! Choose a new one!')
    $('.display-message').css('color', 'red')
}

const clearDisplayMessage = function () {
    $('.display-message').text('')
}

module.exports = {
    updateGameBoard,
    refreshBoard,
    gameOverWin,
    spotTaken,
    clearDisplayMessage,
    gameOverDraw
}