import { getDomElement } from './_helper'
import images from './images'

class Game {
    constructor(players) {
        this.players = players
        this.activePlayerIndex = 0
        this.winningScore = 100
        this.handleDiceRoll = this.handleDiceRoll.bind(this)
        this.handleHold = this.handleHold.bind(this)
        getDomElement('.btn-roll').addEventListener('click', this.handleDiceRoll)
        getDomElement('.btn-hold').addEventListener('click', this.handleHold)
    }

    init() {
        this.players.forEach(player => {
            getDomElement(`.current-score-${player.id}`).textContent = 0
            getDomElement(`.total-score-${player.id}`).textContent = 0
        })
    }

    stop() {
        getDomElement('.btn-roll').removeEventListener('click', this.handleDiceRoll)
        getDomElement('.btn-hold').removeEventListener('click', this.handleHold)
    }

    randomNumber() {
        return Math.floor(Math.random() * 6) + 1
    }

    handleDiceRoll() {
        const dice = this.randomNumber()
        const activePlayer = this.players[this.activePlayerIndex]
        this.renderDice(dice)
        if (dice !== 1) {
            activePlayer.updateCurrentScore(dice)
        } else {
            activePlayer.updateCurrentScore(dice)
            this.switchPlayer()
        }
    }


    renderDice(score) {
        getDomElement(`.dice-image`).setAttribute('src', images[`img${score}`])
    }

    handleHold() {
        getDomElement(`.dice-image`).removeAttribute('src')

        const activePlayer = this.players[this.activePlayerIndex]
        activePlayer.updateTotalScore()
        activePlayer.updateCurrentScore(1)

        if (activePlayer.totalScore >= this.winningScore) {
            activePlayer.setWinner()
            this.stop()
        } else {
            this.switchPlayer()
        }
    }

    switchPlayer() {
        this.activePlayerIndex = this.activePlayerIndex === 0 ? 1 : 0
        this.players.forEach(player => {
            getDomElement(`.player-${player.id}`).classList.toggle('active')
        })
    }
}

export default Game