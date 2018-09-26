'user strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')



const onMakeMove = function(data /*event*/) {
    // event.preventDefault()
    console.log('In onMakeMove')
    // const data = getFormFields(event.target)
    const index = data.cell.index
    const gameBoard = store.game.cells
    if (gameBoard[index] === '') {
        gameBoard[index] = data.cell.value
        return gameBoard
    } else {
       return 'choose a new spot!'
    }
}

console.log(onMakeMove({
    cell: {
        index: 0,
        value: 'x'
    }
}))