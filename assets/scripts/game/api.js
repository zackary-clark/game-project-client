'use strict'

const config = require('../config')
const store = require('../store')

const getGames = function () {
    return $.ajax({
        url: config.apiUrl + '/games',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    })
}

const newGame = function () {
    return $.ajax({
        url: config.apiUrl + '/games',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'POST'
    })
}

const updateGame = function (index, char, over) {
    return $.ajax({
        url: config.apiUrl + '/games/' + store.game.id,
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'PATCH',
        data: {
            "game": {
                "cell": {
                    "index": index,
                    "value": char
                },
                "over": over ? true : false
            }
        }
    })
}

module.exports = {
    getGames,
    newGame,
    updateGame
}