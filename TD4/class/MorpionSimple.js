import {Morpion} from "./Morpion.js"

export class MorpionSimple extends Morpion{

    #maxSize

    /**
     *
     * @param gridSize : string
     * @param gameMode : string
     * @param playerOne : string
     * @param playerTwo : string
     * @param playerTurn : string
     * @param morpion : array
     * @param nbCoups : int
     * @param maxSize : int
     */
    constructor(gridSize, gameMode, playerOne, playerTwo, playerTurn, morpion, nbCoups, maxSize){
        super(gridSize, gameMode, playerOne, playerTwo, playerTurn, morpion, nbCoups);
        this.#maxSize = maxSize
    }

    /**
     * getter
     * @returns {*}
     */
    get maxSize(){
        return this.#maxSize
    }

    /**
     * Setter
     * @param mS : int
     */
    set maxSize(mS){
        this.#maxSize = mS
    }

    /**
     * fonction de vérification de victoire
     * @param {int} x
     * @param {int} y
     * @param {String} playerTurn
     * @returns {boolean}
     */
    checkWin(x, y, playerTurn){
        return super.checkRow(x, playerTurn, this.#maxSize) || super.checkColumn(y, playerTurn, this.#maxSize) ||
            super.checkDiagonal(x, y, playerTurn, this.#maxSize) || super.checkReverseDiagonal(x, y, playerTurn, this.#maxSize);
    }
}