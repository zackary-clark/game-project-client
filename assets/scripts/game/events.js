'use strict'

const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const logic = require('./logic')

const onNewGame = function(event) {
    event.preventDefault()
    api.newGame()
        .then(ui.refreshBoard)
        .catch(ui.failure)
}

const onGetGames = function (event) {
    event.preventDefault()
    api.getGames()
        .then(ui.showGetGames)
        .catch(ui.failure)
}

const onMakeMove = function(event) {
    event.preventDefault()
    ui.clearDisplayMessage()
    const index = event.currentTarget.id
    if (!('game' in store)) {
        ui.startNewGame()
        return
    } else if (store.game.over) {
        ui.startNewGame()
        return
    }
    const gameBoard = store.gameBoard
    const char = store.currentTurn === 'player_x' ? 'x' : 'o'
    if (gameBoard[index] === '') {
        gameBoard[index] = char
        store.currentTurn = store.currentTurn === 'player_x' ? 'player_o' : 'player_x'
        const winReturn = logic.checkForWin(gameBoard)
        if (winReturn[0]) {
            api.updateGame(index, char, true)
                .then(ui.updateGameBoard)
                .catch(ui.updateGameBoardFailure)
            store.game.over = true
            if (winReturn[1] !== '') {
                // console.log(`Player ${winReturn[1]} Won!\nThe winning line was ${winReturn[2]}`)
                ui.gameOverWin(winReturn[2])
            } else {
                ui.gameOverDraw()
            }
        } else {
            api.updateGame(index, char)
                .then(ui.updateGameBoard)
                .catch(ui.updateGameBoardFailure)
        }
    } else {
       ui.spotTaken()
    }
}

module.exports = {
    onMakeMove,
    onNewGame,
    onGetGames
}