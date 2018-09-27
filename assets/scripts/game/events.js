'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const logic = require('./logic')

const onNewGame = function(event) {
    event.preventDefault()
    // send new game request to api, get back id

    logic.storeNewGame()
    ui.refreshBoard()
    ui.clearDisplayMessage()
}

const onMakeMove = function(event) {
    event.preventDefault()
    ui.clearDisplayMessage()
    const index = event.currentTarget.id
    // auto new game when current game is over or there is no current game
    if (!('game' in store)) {
        onNewGame(event)
    } else if (store.game.over) {
        onNewGame(event)
    }
    const gameBoard = store.game.cells
    const char = store.currentTurn === 'player_x' ? 'x' : 'o'
    if (gameBoard[index] === '') {
        gameBoard[index] = char
        ui.updateGameBoard(index)
        store.currentTurn = store.currentTurn === 'player_x' ? 'player_o' : 'player_x'
        // send game update to server

        // check for game win
        const winReturn = logic.checkForWin(store.game)
        if (winReturn[0]) {
            // update the api with game over true

            store.game.over = true
            if (winReturn[1] !== '') {
                // console.log(`Player ${winReturn[1]} Won!\nThe winning line was ${winReturn[2]}`)
                ui.gameOverWin(winReturn[2])
                // update the api with game over true

            } else {
                console.log('Draw!')
                ui.gameOverDraw()
                // update the api with game over true

            }
        }
    } else {
       ui.spotTaken()
    }
}

module.exports = {
    onMakeMove,
    onNewGame
}