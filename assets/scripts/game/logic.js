'use strict'

const store = require('../store')

const checkForWin = function(game) {
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
    } else if (board.every(element => element !== '')) {
        return [true, '', '']
    } else {
        return [false, '', '']
    }
}

const storeNewGame = function () {
    store.game = {}
    store.game.id = 1/*whatever id we get back*/
    store.game.cells = ['','','','','','','','','']
    store.game.over = false
    store.game.player_x = store.user
    store.game.player_o = store.user
    store.currentTurn = 'player_x'
}

module.exports = {
    checkForWin,
    storeNewGame
}