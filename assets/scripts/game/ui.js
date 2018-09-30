'use strict'

const store = require('../store')
const logic = require('./logic')

const updateGameBoard = function (data) {
    for (let i = 0; i < data.game.cells.length; i++) {
        $(`#${i}-tile`).html(`${data.game.cells[i]}`)
    }
    store.game = data.game
    updateCurrentPlayer()
}

const updateGameBoardFailure = function (data) {
    $('.display-message').text('Game API Request Failed!')
    $('.display-message').css('color', 'red')
    store.gameBoard = store.game.cells
}

const refreshBoard = function (data) {
    logic.storeNewGame(data)
    for (let i = 0; i < store.game.cells.length; i++) {
        $(`#${i}-tile`).html(store.game.cells[i])
        $(`#${i}-tile`).css('background-color', '')
    }
    const winReturn = logic.checkForWin(store.game.cells)
    winReturn[0] ? gameOverWin(winReturn[2]) : updateCurrentPlayer()
    $('.game-board').show()
    clearDisplayMessage()
    $('.game-table').html('')
    $('.table-container').hide()
}

const updateCurrentPlayer = function () {
    $('#current-player').html(`${store.currentTurn}, You're up!`)
}

const gameOverWin = function (gridLine) {
    $('.game-board').children().children(`.${gridLine}`).css('background-color', '#b21313')
}

const miniGameWin = function (id, gridLine) {
    $(`#${id}`).children().children('.mini-board').children('.row').children(`.${gridLine}`).css('background-color', '#b21313')
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
    $('.table-container').hide()
    $('.game-board').show()
}

const clearDisplayMessage = function () {
    $('.display-message').text('')
}

const hideGameBoard = function () {
    $('.game-board').hide()
}

const showGames = function (data) {
    store.games = data.games
    store.games.sort((gameA, gameB) => gameA.id - gameB.id)
    showPage(1)
    populateButtons()
}

const populateButtons = function () {
    $('.games-page-buttons').html('')
    let buttonHTML = '<div class="btn-toolbar justify-content-center" role="toolbar"><div class="btn-group" role="group">'
    for (let i = 0; i < Math.ceil(store.games.length/10); i++) {
        if (i % 5 === 0 && i !== 0) {
            buttonHTML += '</div></div>'
            buttonHTML += '<div class="btn-toolbar justify-content-center" role="toolbar"><div class="btn-group" role="group">'
        }
        buttonHTML += `<button type="button" class="btn btn-dark page-btn">${i+1}</button>`
    }
    buttonHTML += '</div></div>'
    $('.games-page-buttons').append(buttonHTML)
}

const showPage = function (page) {
    store.currentPage = store.games.slice((page-1)*10, (page-1)*10+10)
    $('.table-container').show()
    clearDisplayMessage()
    $('.game-board').hide()
    $('.game-table').html('')
    store.currentPage.forEach(populateTable)
}

const populateTable = function (game) {
    const winReturn = logic.checkForWin(game.cells)
    const gameHTML = (`
        <tr id=${game.id}>
            <th scope="row">${game.id}</th>
            <td class="mini-board-td">${drawMiniBoard(game)}</td>
            <td>${game.over}</td>
            <td class="player-col">${game.player_x.email}</td>
            <td class="player-col">${game.player ? game.player_o.email : 'None'}</td>
        </tr>`)
    $('.game-table').append(gameHTML)
    if (winReturn[1] !== '') {
        miniGameWin(game.id, winReturn[2])
    }
}

const drawMiniBoard = function (game) {
    return `
        <div class="mini-board text-center">
            <div class="row">
                <div class="col-4 top left left-to-right game-tile">${game.cells[0]}</div>
                <div class="col-4 top middle-col game-tile">${game.cells[1]}</div>
                <div class="col-4 top right right-to-left game-tile">${game.cells[2]}</div>
            </div>
            <div class="row">
                <div class="col-4 middle-row left game-tile">${game.cells[3]}</div>
                <div class="col-4 middle-row middle-col left-to-right right-to-left game-tile">${game.cells[4]}</div>
                <div class="col-4 middle-row right game-tile">${game.cells[5]}</div>
            </div>
            <div class="row">
                <div class="col-4 bottom left right-to-left game-tile">${game.cells[6]}</div>
                <div class="col-4 bottom middle-col game-tile">${game.cells[7]}</div>
                <div class="col-4 bottom right left-to-right game-tile">${game.cells[8]}</div>
            </div>
        </div>`
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
    showGames,
    failure,
    updateGameBoardFailure,
    startNewGame,
    showPage
}