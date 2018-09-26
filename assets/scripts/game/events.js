'user strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

// return an array with [is the game over, which token won, and which line in the grid won]
const checkForWin = function(game) {
    console.log(game.cells)
    const board = game.cells
    if (board[0] === board[1] && board[0] === board[2] && board[0] !== '') {
        return [true, board[0], 'top']
    } else if (board[3] === board[4] && board[3] === board[5] && board[3] !== '') {
        return [true, board[3], 'middle-row']
    } else if (board[6] === board[7] && board[6] === board[8] && board[6] !== '') {
        return [true, board[6], 'bottom']
    } else if (board[0] === board[3] && board[0] === board[6] && board[0] !== '') {
        return [true, board[0], 'left']
    } else if (board[1] === board[4] && board[1] === board[7] && board[1] !== '') {
        return [true, board[1], 'middle-col']
    } else if (board[2] === board[5] && board[2] === board[8] && board[2] !== '') {
        return [true, board[2], 'right']
    } else if (board[0] === board[4] && board[0] === board[8] && board[0] !== '') {
        return [true, board[0], 'left-to-right']
    } else if (board[2] === board[4] && board[2] === board[6] && board[2] !== '') {
        return [true, board[2], 'right-to-left']
    } else {
        return [false, '', '']
    }
}

const onNewGame = function(event) {
    event.preventDefault()
    // send new game request to api, get back id

    store.game = {}
    store.game.id = 1/*whatever id we get back*/
    store.game.cells = ['','','','','','','','','']
    store.game.over = false
    store.game.player_x = store.user
    store.game.player_o = store.user
    store.currentTurn = 'player_x'
    console.log(store.game)

    // rewrite tiles in ui
    ui.refreshBoard()
}

const onMakeMove = function(event) {
    event.preventDefault()
    const index = event.currentTarget.id
    if (!('game' in store)) {
        onNewGame(event)
    } else if (store.game.over) {
        onNewGame(event)
    }
    const gameBoard = store.game.cells
    const char = store.currentTurn === 'player_x' ? 'x' : 'o'
    if (gameBoard[index] === '') {
        gameBoard[index] = char
        // console.log(gameBoard)
        // push new tile to ui
        ui.updateGameBoard(index)
        store.currentTurn = store.currentTurn === 'player_x' ? 'player_o' : 'player_x'
        // send game update to server

        // check for game win
        const winReturn = checkForWin(store.game)
        if (winReturn[0]) {
            store.game.over = true
            console.log('Game Over')
            console.log(`Player ${winReturn[1]} Won!\nThe winning line was ${winReturn[2]}`)
            // update ui telling the player they won
            ui.gameOver(winReturn[2])
            // update the api with game over true

         }
    } else {
       console.log('choose a new spot!')
    }
}

module.exports = {
    onMakeMove,
    onNewGame
}