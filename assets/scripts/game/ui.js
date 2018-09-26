'use strict'

const store = require('../store')

const updateGameBoard = function (index) {
    $(`#${index}`).html(store.game.cells[index])
}

const refreshBoard = function () {
    for (let i = 0; i < store.game.cells.length; i++) {
        $(`#${i}`).html('')
        $(`#${i}`).css('background-color', 'black')
    }
}

const gameOver = function (gridLine) {
    console.log(`.${gridLine}`)
    $(`.${gridLine}`).css('background-color', 'red')
}

module.exports = {
    updateGameBoard,
    refreshBoard,
    gameOver
}