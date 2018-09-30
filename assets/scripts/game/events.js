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

const onGetAllGames = function (event) {
    event.preventDefault()
    api.getAllGames()
        .then(ui.showGames)
        .catch(ui.failure)
}

const onGetCompleteGames = function (event) {
    event.preventDefault()
    api.getCompleteGames()
        .then(ui.showGames)
        .catch(ui.failure)
}

const onGetIncompleteGames = function (event) {
    event.preventDefault()
    api.getIncompleteGames()
        .then(ui.showGames)
        .catch(ui.failure)
}

const onPageButtonClick = function (event) {
    event.preventDefault()
    ui.showPage(event.target.innerHTML)
}

const onMakeMove = function(event) {
    event.preventDefault()
    ui.clearDisplayMessage()
    const index = parseInt(event.target.id, 10)
    if (!('game' in store)) {
        ui.startNewGame()
        return
    } else if (store.game.over) {
        ui.startNewGame()
        return
    }
    const gameBoard = store.gameBoard
    const char = store.currentTurn === 'Player X' ? 'x' : 'o'
    if (gameBoard[index] === '') {
        gameBoard[index] = char
        store.currentTurn = store.currentTurn === 'Player X' ? 'Player O' : 'Player X'
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

const onMiniGames = function (event) {
    const miniBoard = event.target.parentNode.parentNode.parentNode.parentNode
    if (miniBoard.id) {
        api.getGame(miniBoard.id)
            .then(ui.refreshBoard)
            .catch(ui.failure)
    }
}

module.exports = {
    onMakeMove,
    onNewGame,
    onGetAllGames,
    onMiniGames,
    onGetCompleteGames,
    onGetIncompleteGames,
    onPageButtonClick
}