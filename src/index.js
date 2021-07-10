
import Game from './js/game'
import Player from './js/player'
import { getDomElement, id } from './js/_helper'

import './css/style.css'

const gameList = []

function initialize() {
    getDomElement(`.game-container`).innerHTML = ''

    const game = new Game([new Player(id(), 1), new Player(id(), 2)])
    gameList.push(game)

    gameList.forEach((game, index) => {
        if (index === gameList.length - 1) game.init()
        else game.stop()
    })

}

document.addEventListener('DOMContentLoaded', () => {
    initialize()
    getDomElement('.btn-new-game').addEventListener('click', initialize)
})