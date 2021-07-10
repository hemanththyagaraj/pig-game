import { getDomElement } from './_helper';

class Player {
    constructor(id, number) {
        this.id = id
        this.number = number;
        this.currentScore = 0;
        this.totalScore = 0;
        this.render()
    }

    updateCurrentScore(score) {
        if (score !== 1) {
            this.currentScore = this.currentScore + score
            getDomElement(`.current-score-${this.id}`).textContent = this.currentScore
        } else {
            this.currentScore = 0
            getDomElement(`.current-score-${this.id}`).textContent = 0

        }
    }

    updateTotalScore() {
        this.totalScore = this.totalScore + this.currentScore
        getDomElement(`.total-score-${this.id}`).textContent = this.totalScore
    }

    render() {
        const html = `
        <div class="player-${this.id} player player-${this.number} ${this.number === 1 ? 'active' : ''}">
            <h2 class="name">
                PLAYER ${this.number}    
            </h2>
            <h1 class="score total-score-${this.id}">0</h1>
            <div class="current-score-container">
                <p class="current">CURRENT</p>
                <p class="current-score current-score-${this.id}">0</p>
            </div>
        </div>
        `
        getDomElement('.game-container').insertAdjacentHTML('beforeend', html)
    }

    setWinner() {
        const html = `<div class="winner">
                        <h1 class="winner-title">
                            winner
                            <img class="winner-gif" src="https://i.gifer.com/2r6B.gif" alt="">
                        </h1>
                      </div> `
        getDomElement(`.total-score-${this.id}`).insertAdjacentHTML('afterend', html)
    }

    resetScore() {
        this.currentScore = 0
        this.totalScore = 0
    }

}

export default Player