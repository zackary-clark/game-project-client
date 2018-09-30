'use strict'

const store = require('../store')

const checkForWin = function(board) {
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

const storeNewGame = function (data) {
    store.game = data.game
    store.gameBoard = data.game.cells
    data.game.cells.filter(cell => cell !== '').length % 2 === 0 ? store.currentTurn = 'Player X' : store.currentTurn = 'Player O'
}

const determineAIIndex = function () {
    const ret = getBestMove(store.gameBoard.slice(), store.currentTurn === 'Player X' ? true : false, 0)
    // console.log(store.nodeMap)
    return ret
}

// get an array of open indexes in the board
const getAvailableMoves = function (board) {
    const moves = []
    board.forEach((cell, index) => {
        if (cell === '') {
            moves.push(index)
        } 
    })
    return moves
}

// find the best possible move
const getBestMove = function (board, maxOrMin = true, depth = 0) {
    // create a map to store the nodes that will be accessible by all recursions
    if (depth === 0) {
        store.nodeMap = new Map()
    }
    let ret = -1
    // reach the last node in the branch and return the "score"
    if (checkForWin(board)[0]) {
        if(checkForWin(board)[1] === 'x') {
            return 10 - depth
        } else if (checkForWin(board)[1] === 'o') {
            return -10 + depth
        } 
        return 0
    }
    // current player is maximizing score, i.e. the current player is 'x'
    if (maxOrMin) {
        let best = -10
        // loop through empty cells
        getAvailableMoves(board).forEach(index => {
            // create a new game board for each recursion
            const child = board.slice()
            child[index] = 'x'
            // call getBestMove recursively
            const nodeValue = getBestMove(child, false, depth + 1)
            // update best value
            best <= nodeValue ? best = nodeValue : ''
            // on the initial call map the heuristic values
            if (depth === 0) {
                // comma separated list if multiple moves have the same value
                const moves = store.nodeMap.has(nodeValue) ? `${store.nodeMap.get(nodeValue)},${index}` : index
                store.nodeMap.set(nodeValue, moves)
            }
        })
        // in initial call, return the index of the best move (random if there're several with the same value)
        if (depth === 0) {
            if (typeof store.nodeMap.get(best) === 'string') {
                const arr = store.nodeMap.get(best).split(',')
                ret = arr[Math.floor(Math.random()*arr.length)]
            } else {
                ret = store.nodeMap.get(best)
            }
            return ret
        }
        // if recursive call, return the "score"
        return best
    }
    // current player is minimizing "score"
    if (!maxOrMin) {
        let best = 10
        getAvailableMoves(board).forEach(index => {
            const child = board.slice()
            child[index] = 'o'
            const nodeValue = getBestMove(child, true, depth + 1)
            best >= nodeValue ? best = nodeValue : ''
            if (depth === 0) {
                const moves = store.nodeMap.has(nodeValue) ? `${store.nodeMap.get(nodeValue)},${index}` : index
                store.nodeMap.set(nodeValue, moves)
            }
        })
        if (depth === 0) {
            if (typeof store.nodeMap.get(best) === 'string') {
                const arr = store.nodeMap.get(best).split(',')
                ret = arr[Math.floor(Math.random()*arr.length)]
            } else {
                ret = store.nodeMap.get(best)
            }
            return ret
        }
        return best
    }
}

module.exports = {
    checkForWin,
    storeNewGame,
    determineAIIndex
}