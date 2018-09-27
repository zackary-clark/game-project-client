'use strict'

const store = require('../store')
const logic = require('./logic')

const updateGameBoard = function (data) {
    for (let i = 0; i < data.game.cells.length; i++) {
        $(`#${i}`).html(`${data.game.cells[i]}`)
    }
    store.game = data.game
}

const updateGameBoardFailure = function (data) {
    $('.display-message').text('Game API Request Failed!')
    $('.display-message').css('color', 'red')
    store.gameBoard = store.game.cells
}

const refreshBoard = function (data) {
    logic.storeNewGame(data)
    for (let i = 0; i < store.game.cells.length; i++) {
        $(`#${i}`).html('')
        $(`#${i}`).css('background-color', '343a40')
    }
    $('.game-board').show()
    clearDisplayMessage()
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

const startNewGame = function () {
    $('.display-message').text('Start New Game!')
    $('.display-message').css('color', 'red')
    $('.display-games').hide()
}

const clearDisplayMessage = function () {
    $('.display-message').text('')
}

const hideGameBoard = function () {
    $('.game-board').hide()
}

const showGetGames = function (data) {
    $('.display-games').show()
    $('.display-games').html('Played Games')
    $('.display-games').css('color', 'white')
    data.games.forEach(game => {
        const gameHTML = (`
        <h4>ID: ${game.id}</h4>
        <p>Board: ${game.cells.toString()}</p>
        <p>Over? ${game.over}</p>
        <br>
      `)
      $('.display-games').append(gameHTML)
    })
}

const failure = function() {
    $('.display-message').text('Game API Request Failed!')
    $('.display-message').css('color', 'red')
}

module.exports = {
    updateGameBoard,
    refreshBoard,
    gameOverWin,
    spotTaken,
    clearDisplayMessage,
    gameOverDraw,
    hideGameBoard,
    showGetGames,
    failure,
    updateGameBoardFailure,
    startNewGame
}