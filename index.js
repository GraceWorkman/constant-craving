const bodyParser = require('body-parser')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'William Workman',
    color: '#FF9760', //#00BD99
    head: 'silly',
    tail: 'bolt'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var gameData = request.body // Game details
  var boardWidth = gameData.board.width // Horizontals bounds
  var boardHeight = gameData.board.height // Vetical bounds
  var posX = gameData.you.head.x // Head X coordinate
  var posY = gameData.you.head.y // Head Y coordinate
  var possibleMoves = ['up', 'down', 'left', 'right'] // All possible moves
  var viableMoves = possibleMoves // Actual viable moves

  /* Functions */
  function arrayRemove(array, item) {
    let newArray = [];
    for( let i = 0; i < array.length; i++) {
        if(array[i] !== item) {
            newArray.push(array[i]);
        }
    }
    return newArray;
  }

  function checkBounds() {
    if(posX <= 0){ arrayRemove(viableMoves,'left'); }
    if(posX >= boardWidth){ arrayRemove(viableMoves,'right'); }
    if(posY <= 0){ arrayRemove(viableMoves,'down'); }
    if(posX >= boardHeight){ arrayRemove(viableMoves,'up'); }
  }

  /* Logic path */
  checkBounds()
  var move = viableMoves[Math.floor(Math.random() * viableMoves.length)]

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}
