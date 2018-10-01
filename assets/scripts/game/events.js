'use strict'

const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const logic = require('./logic')
const getFormFields = require('../../../lib/get-form-fields')

const onNewGame = function(event) {
    event.preventDefault()
    api.newGame()
        .then(ui.refreshBoard)
        .catch(ui.failure)
}

const onJoinGame = function (event) {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.joinGame(data)
        .then(ui.joinGame)
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
    if (event.target.className === "btn btn-dark page-btn")
        ui.showPage(event.target.innerHTML)
}

const onBoardClick = function (event) {
    event.preventDefault()
    ui.clearDisplayMessage()
    if (!('game' in store)) {
        ui.startNewGame()
        return
    } else if (store.game.over) {
        ui.startNewGame()
        return
    }
    if (event.target.className.includes("game-tile")) {
        onMakeMove(parseInt(event.target.id, 10))
    }
}

const onAIClick = function (event) {
    event.preventDefault()
    ui.clearDisplayMessage()
    if (!('game' in store)) {
        ui.startNewGame()
        return
    } else if (store.game.over) {
        ui.startNewGame()
        return
    }
    onMakeMove(logic.determineAIIndex())
}

const onMakeMove = function(index) {
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
    onPageButtonClick,
    onBoardClick,
    onAIClick,
    onJoinGame
}