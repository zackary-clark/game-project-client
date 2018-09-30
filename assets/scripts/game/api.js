'use strict'

const config = require('../config')
const store = require('../store')

const getAllGames = function () {
    return $.ajax({
        url: config.apiUrl + '/games',
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    })
}

const getSomeGames = function (over) {
    return $.ajax({
        url: config.apiUrl + '/games?over=' + over,
        headers: {
            "Authorization": "Bearer " + store.user.token
        },
        method: 'GET'
    })
}

const getCompleteGames = function () {
    return getSomeGames(true)
}

const getIncompleteGames = function () {
    return getSomeGames(false)
}

const getGame = function (id) {
    return $.ajax({
        url: config.apiUrl + '/games/' + id,
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
    getAllGames,
    newGame,
    updateGame,
    getGame,
    getCompleteGames,
    getIncompleteGames
}