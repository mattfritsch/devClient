//initialisation de variable de base pour le morpion
let playerNameOne = "Joueur 1"
let playerNameTwo = "Joueur 2"
let gameMode = "simple"
let gridSize = "3"
let scorePlayerOne = 0
let scorePlayerTwo = 0

//initialisation de variable pour vérifier les coups des joueurs
//sert à compter le nombre de coups pour la vérification du match nul
let nbCoups = 0
//tableau en deux dimensions qui sert à stocker les symboles des joueurs
let morpion
//taille de la grille de morpion en fonction du mode simple, ou du mode complet
let maxSize

//symboles des joueurs
let playerOne = "X"
let playerTwo = "O"
//correspond au tour du joueur en fonction du symbole
let playerTurn = playerOne

//label où s'affichera des informations au courant de la partie (tour, gagné ou nul)
let gameStatus = document.getElementById("gameStatus")
//label qui sert à afficher les scores
let gameScore = document.getElementById("gameScore")

//bouton jouer et recommencer
let reloadBtn = document.getElementById("reloadGame")
reloadBtn.addEventListener('click', reloadGame)

/**
 * fonction qui permet le changement de pseudo des deux joueurs
 * @returns {void}
 */
function reloadPseudo(){
    if(document.getElementById("player1").value !== ""){
        playerNameOne = document.getElementById("player1").value
    }
    if(document.getElementById("player2").value !== ""){
        playerNameTwo = document.getElementById("player2").value
    }
    setGameStatus(playerTurn)
}

/**
 * fonction qui sert à lancer et relancer la partie
 * @returns {void}
 */
function reloadGame(){
    document.getElementById("gameZone").style.display = "block"
    //récupération de la taille de la grille
    gridSize = document.getElementById("gridSize").value
    //récupération du mode de jeu
    gameMode = document.getElementById("gameMode").value
    reloadPseudo()
    setGameStatus(playerTurn)

    let grid = document.getElementById("grid")
    grid.innerHTML = ""
    drawGrid(grid, gridSize)

    playerTurn = playerOne

    reloadBtn.value = "Recommencer"
    reloadBtn.style.display = "none"

    if(gameMode === "simple"){
        maxSize = 3
    }
    else{
        maxSize = parseInt(gridSize)
    }

    updateGameScore()
}

/**
 * fonction qui permet d'ajouter un point au score du joueur gagnant
 * @param { String } playerTurn
 * @return void
 */
function addPoint(playerTurn){
    playerTurn === 'X' ? scorePlayerOne++ : scorePlayerTwo++
}

/**
 * fonction qui permet au joueur de mettre son symbole dans une case
 * @param {String} currentCase
 * @param {int} x
 * @param {int} y
 * @return void
 */
function game(currentCase, x, y){
    if(morpion[x][y] === " "){
        morpion[x][y] = playerTurn
        nbCoups++
        document.getElementById(currentCase).value = playerTurn

        let victory = checkWin(x, y, playerTurn)
        let nul = checkNul()
        if(victory){
            setGameStatus("win" + playerTurn)
            addPoint(playerTurn)
            reloadBtn.style.display = "block"
            updateGameScore()
            nbCoups = 0
        }
        else if(nul){
            setGameStatus("nul")
            reloadBtn.style.display = "block"
            updateGameScore()
        }
        else{
            playerTurn === playerOne ? playerTurn = playerTwo : playerTurn = playerOne
            setGameStatus(playerTurn)
        }
    }
    else{
        alert("La case est déjà occupé")
    }
}

/**
 * fonction de vérification de victoire
 * @param {int} x
 * @param {int} y
 * @param {String} playerTurn
 * @returns {boolean}
 */
function checkWin(x, y, playerTurn){
    return checkRow(x, playerTurn) || checkColumn(y, playerTurn) || checkDiagonal(x, y, playerTurn)
        || checkReverseDiagonal(x, y, playerTurn);
}

/**
 * fonction de vérification de match nul
 * @returns {boolean}
 */
function checkNul(){
    return nbCoups === parseInt(gridSize) * parseInt(gridSize);

}

/**
 * fonction de vérification des lignes du morpion
 * @param {int} x
 * @param {String} playerTurn
 * @returns {boolean}
 */
function checkRow(x, playerTurn){
    //création d'un pattern de victoire en fonction du mode de jeu
    let victoryPattern = playerTurn.repeat(maxSize)

    //pour chaque ligne, on ajoute à une chaine de caractères le symbole de la case courante
    let pattern = ''
    morpion[x].forEach(element => (pattern = pattern.concat(element)))

    //si la chaîne de caractère contient le victoryPattern alors le joueur courant à gagné
    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

/**
 * fonction de vérification des colonnes du morpion
 * @param {int} y
 * @param {String} playerTurn
 * @returns {boolean}
 */
function checkColumn(y, playerTurn){
    let victoryPattern = playerTurn.repeat(maxSize)

    let pattern = ''
    morpion.forEach(element => (pattern = pattern.concat(element[y])))

    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

/**
 * fonction de vérification de la diagonale du morpion
 * @param {int} x
 * @param {int} y
 * @param {String} playerTurn
 * @returns {boolean}
 */
function checkDiagonal(x, y, playerTurn){
    let victoryPattern = playerTurn.repeat(maxSize)
    if(x === y) {
        let pattern = ''

        for (let rc = 0; rc < gridSize; rc++) {
            pattern = pattern.concat(morpion[rc][rc])
        }

        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }
}

/**
 * fonction de vérification de la diagonale inverse du morpion
 * @param {int} x
 * @param {int} y
 * @param {String} playerTurn
 * @returns {boolean}
 */
function checkReverseDiagonal(x, y, playerTurn){
    let victoryPattern = playerTurn.repeat(maxSize)
    if(x === gridSize - (y + 1)){
        let pattern = ''

        for(let row = 0; row < gridSize; row++){
            pattern = pattern.concat(morpion[row][gridSize - (row + 1)])
        }

        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }
}


/**
 * fonction création de la grille de morpion
 * @param {Element} div
 * @param {String} gridSize
 * @returns {void}
 */
function drawGrid(div, gridSize){
    //création d'un tableau pour stocker les symboles pour les vérifications de victoire
    morpion = Array(gridSize)
    let table = document.createElement('table')
    for (let i = 0; i < gridSize; i++){
        //à chaque itération jusqu'à gridSize on ajoute une ligne au tableau morpion
        morpion[i] = Array(gridSize)
        let row = table.insertRow(i)
        for(let j = 0; j < gridSize; j++){
            morpion[i][j] = ' '
            let cell = row.insertCell(j)
            let button = document.createElement('input')
            button.setAttribute("type", "button")
            let id = i.toString() + j.toString()
            button.setAttribute("id", id)
            button.setAttribute("class", "morpionButton")
            //ajout d'un id pour récupérer la case courante, i pour la ligne courante et j pour la colonne courante pour le tableau morpion
            button.setAttribute("onclick", "game(" + '"' +id + '"' + ", " + i + ", " + j + ")")
            cell.appendChild(button)
        }
    }
    console.log(morpion)
    document.getElementsByClassName("morpionButton").disabled = false
    div.appendChild(table)
}

/**
 * fonction pour changer le texte du label gameStatus
 * @param {String} status
 * @returns {void}
 */
function setGameStatus(status){
    let textStatus

    switch(status){
        case 'X':
            textStatus = playerNameOne + ", à toi de jouer !"
            break
        case 'O':
            textStatus = playerNameTwo + ", à toi de jouer !"
            break
        case 'winX':
            textStatus = "Bravo " + playerNameOne + ", tu as gagné ! :D"
            break
        case 'winO':
            textStatus = "Bravo " + playerNameTwo + ", tu as gagné ! :D"
            break
        case 'nul':
            textStatus = "Égalité, aucun de vous deux n'a gagné."
            break
    }
    gameStatus.innerText = textStatus
}

/**
 * fonction pour changer le score à chaque fin de partie
 * @returns {void}
 */
function updateGameScore(){
    gameScore.innerText = playerNameOne + " : " + scorePlayerOne + " / " + playerNameTwo + " : " + scorePlayerTwo
}