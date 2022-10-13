export class Morpion{

    #gridSize
    #gameMode
    #playerOne
    #playerTwo
    #playerTurn
    #morpion
    #nbCoups



    /**
     * Constructeur de la classe Morpion
     *
     * @param gridSize : string
     * @param gameMode : string
     * @param playerOne : string
     * @param playerTwo : string
     * @param playerTurn : string
     * @param morpion : array
     * @param nbCoups : int
     */
    constructor(gridSize, gameMode, playerOne, playerTwo, playerTurn, morpion, nbCoups){
        this.#gridSize = gridSize
        this.#gameMode = gameMode
        this.#playerOne = playerOne
        this.#playerTwo = playerTwo
        this.#playerTurn = playerTurn
        this.#morpion = morpion
        this.#nbCoups = nbCoups
    }


    /**
     * Getter
     * @returns {*}
     */
    get gridSize(){
        return this.#gridSize
    }

    /**
     * Setter
     * @param nbC : string
     */
    set gridSize(gS){
        this.#gridSize = gS
    }

    /**
     * Getter
     * @returns {*}
     */
    get gameMode(){
        return this.#gameMode
    }

    /**
     * Setter
     * @param nbC : string
     */
    set gameMode(gM){
        this.#gameMode = gM
    }

    /**
     * Getter
     * @returns {*}
     */
    get playerOne(){
        return this.#playerOne
    }

    /**
     * Setter
     * @param nbC : string
     */
    set playerOne(pOne){
        this.#playerOne = pOne;
    }

    /**
     * Getter
     * @returns {*}
     */
    get playerTwo(){
        return this.#playerTwo
    }

    /**
     * Setter
     * @param nbC : string
     */
    set playerTwo(pTwo){
        this.#playerTwo = pTwo;
    }

    /**
     * Getter
     * @returns {*}
     */
    get playerTurn(){
        return this.#playerTurn
    }

    /**
     * Setter
     * @param nbC : string
     */
    set playerTurn(pTurn){
        this.#playerTurn = pTurn;
    }

    /**
     * Getter
     * @returns {*}
     */
    get morpion(){
        return this.#morpion
    }

    /**
     * Setter
     * @param nbC : array
     */
    set morpion(m){
        this.#morpion = m
    }

    /**
     * Getter
     * @returns {*}
     */
    get nbCoups(){
        return this.#nbCoups
    }

    /**
     * Setter
     * @param nbC : int
     */
    set nbCoups(nbC){
        this.#nbCoups = nbC
    }


    /**
     * fonction de vérification de victoire
     * @param {int} x
     * @param {int} y
     * @param {String} playerTurn
     * @returns {boolean}
     */
    checkWin(x, y, playerTurn){
        return this.checkRow(x, playerTurn, this.#gridSize) || this.checkColumn(y, playerTurn, this.#gridSize) ||
            this.checkDiagonal(x, y, playerTurn, this.#gridSize) || this.checkReverseDiagonal(x, y, playerTurn, this.#gridSize);
    }

    /**
     * fonction de vérification de match nul
     * @returns {boolean}
     */
    checkNul() {
        return this.#nbCoups === parseInt(this.#gridSize) * parseInt(this.#gridSize);
    }

    /**
     * fonction de vérification des lignes du morpion
     * @param {int} x
     * @param {String} playerTurn
     * @param {int} maxSize
     * @returns {boolean}
     */
    checkRow(x, playerTurn, maxSize){
        //création d'un pattern de victoire en fonction du mode de jeu
        let victoryPattern = playerTurn.repeat(maxSize)

        //pour chaque ligne, on ajoute à une chaine de caractères le symbole de la case courante
        let pattern = ''
        this.#morpion[x].forEach(element => (pattern = pattern.concat(element)))

        //si la chaîne de caractère contient le victoryPattern alors le joueur courant à gagné
        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }

    /**
     *
     * @param {int} y
     * @param {String} playerTurn
     * @param {int} maxSize
     * @returns {boolean}
     */
    checkColumn(y, playerTurn, maxSize){
        let victoryPattern = playerTurn.repeat(maxSize)

        let pattern = ''
        this.#morpion.forEach(element => (pattern = pattern.concat(element[y])))

        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }

    /**
     *
     * @param {int} x
     * @param {int} y
     * @param {String} playerTurn
     * @param {int} maxSize
     * @returns {boolean}
     */
    checkDiagonal(x, y, playerTurn, maxSize){
        let victoryPattern = playerTurn.repeat(maxSize)
        if(x === y) {
            let pattern = ''

            for (let rc = 0; rc < this.#gridSize; rc++) {
                pattern = pattern.concat(this.#morpion[rc][rc])
            }

            if(pattern.indexOf(victoryPattern) >= 0)
                return true
        }
    }

    /**
     *
     * @param {int} x
     * @param {int} y
     * @param {String} playerTurn
     * @param {int} maxSize
     * @returns {boolean}
     */
    checkReverseDiagonal(x, y, playerTurn, maxSize){
        let victoryPattern = playerTurn.repeat(maxSize)
        if(x === this.#gridSize - (y + 1)){
            let pattern = ''

            for(let row = 0; row < this.#gridSize; row++){
                pattern = pattern.concat(this.#morpion[row][this.#gridSize - (row + 1)])
            }

            if(pattern.indexOf(victoryPattern) >= 0)
                return true
        }
    }


    /**
     * ToString
     * @returns {string}
     */
    toString(){
        return "Taille de la grille : " + this.#gridSize + ", Symbole du joueur 1 : " + this.#playerOne + ", Symbole du joueur 2 : "
        + this.#playerTwo + ", au tour du symbole : " + this.#playerTurn + ", grille de morpion : " + this.#morpion +
            ", nbCoups : " + this.#nbCoups + "."
    }
}