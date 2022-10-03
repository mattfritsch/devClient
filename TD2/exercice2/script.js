let playerNameOne = "Joueur 1"
let playerNameTwo = "Joueur 2"
let gridSize = 3
let gameMode = "simple"
let scorePlayerOne = 0
let scorePlayerTwo = 0

//sert à la vérification du match nul
let nbCoups = 0


let playerOne = "X"
let playerTwo = "O"
let playerTurn = playerOne

let morpion

let gameStatus = document.getElementById("gameStatus")
let gameScore = document.getElementById("gameScore")

let pseudos = document.getElementById("reloadPseudo")
pseudos.addEventListener('click', reloadPseudo)

let reloadBtn = document.getElementById("reloadGame")
reloadBtn.addEventListener('click', reloadGame)


function reloadPseudo(){
    if(document.getElementById("player1").value !== ""){
        playerNameOne = document.getElementById("player1").value
    }
    if(document.getElementById("player2").value !== ""){
        playerNameTwo = document.getElementById("player2").value
    }

    setGameStatus(playerTurn)
}

function reloadGame(){
    document.getElementById("gameZone").style.display = "block"
    gridSize = document.getElementById("gridSize").value
    gameMode = document.getElementById("gameMode").value
    reloadPseudo()

    let grid = document.getElementById("grid")
    grid.innerHTML = ""
    drawGrid(grid, gridSize)

    playerTurn = playerOne

    reloadBtn.value = "Recommencer"
    reloadBtn.style.display = "none"

    setGameStatus("X")
    updateGameScore()
}

function addPoint(playerTurn){
    playerTurn === 'X' ? scorePlayerOne++ : scorePlayerTwo++
}

// j'ai essayé ce morceau de code pour récupérer tous les boutons de la grille de morpion, mais ne fonctionne pas comme
// je le veux, j'ai donc décidé d'ajouter des id à chaque bouton des cellules de la grille de morpion
/*let pions = document.querySelectorAll(".morpionButton")
pions.forEach(pions => {
    pions.addEventListener('click', playGame, {once : true})
})*/


function game(currentCase, x, y){
    if(morpion[x][y] === " "){
        morpion[x][y] = playerTurn
        nbCoups++
        document.getElementById(currentCase).value = playerTurn
        setGameStatus(playerTurn)

        let victory = checkWin(x, y, playerTurn, gameMode)
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
        }
    }
    else{
        setGameStatus("complete")
    }
    playerTurn === playerOne ? playerTurn = playerTwo : playerTurn = playerOne
}

//////////////////////////////////////////FONCTIONS VERIFICATIONS //////////////////////////////////////////////////
//fonction de vérification de victoire
function checkWin(x, y, playerTurn, gameMode){
    if(gameMode === "simple"){
        return checkRowSimple(x, playerTurn) || checkColumnSimple(y, playerTurn) || checkDiagonalSimple(x, y, playerTurn)
            || checkReverseDiagonalSimple(x, y, playerTurn);
    }
    else if(gameMode === "complete"){
        return checkRowComplete(x, y, playerTurn) || checkColumnComplete(x, y, playerTurn) || checkDiagonalComplete(x, y, playerTurn)
            || checkReverseDiagonalComplete(x, y, playerTurn);
    }
}
//fonction de vérification de match nul
function checkNul(){
    return nbCoups === parseInt(gridSize) * parseInt(gridSize);

}
/////////////////////////////////////////////Mode complet//////////////////////////////////////////////////////////
function checkRowComplete(x, y, playerTurn){
    let row = x
    let nbSymbols = 0
    for(let column = 0; column < gridSize; column++){
        if (morpion[row][column] === playerTurn){
            nbSymbols++
        }
    }
    return nbSymbols === parseInt(gridSize)
}

function checkColumnComplete(x, y, playerTurn){
    let column = y
    let nbSymbols = 0
    for(let row = 0; row < gridSize; row++){
        if(morpion[row][column] === playerTurn){
            nbSymbols++
        }
    }
    return nbSymbols === parseInt(gridSize)
}

function checkDiagonalComplete(x, y, playerTurn){
    if(x === y){
        let nbSymbols = 0
        for(let rc = 0; rc < gridSize; rc++){
            if(morpion[rc][rc] === playerTurn){
                nbSymbols++
            }
        }
        return nbSymbols === parseInt(gridSize)
    }
}

function checkReverseDiagonalComplete(x, y, playerTurn){
    if(x === gridSize - (y + 1)){
        let nbSymbols = 0
        for(let row = 0; row < gridSize; row++){
            if(morpion[row][gridSize - (row + 1)] === playerTurn){
                nbSymbols++
            }
        }
        return nbSymbols === parseInt(gridSize)
    }
}

/////////////////////////////////////////////Mode simple//////////////////////////////////////////////////////////
function checkRowSimple(x, playerTurn){
    let victoryPattern = playerTurn.concat(playerTurn).concat(playerTurn)

    let pattern = ''
    morpion[x].forEach(element => (pattern = pattern.concat(element)))

    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

function checkColumnSimple(y, playerTurn){
    let victoryPattern = playerTurn.concat(playerTurn).concat(playerTurn)

    let pattern = ''
    morpion.forEach(element => (pattern = pattern.concat(element[y])))

    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

function checkDiagonalSimple(x, y, playerTurn){
    let victoryPattern = playerTurn.concat(playerTurn).concat(playerTurn)
    if(x === y) {
        let pattern = ''

        for (let rc = 0; rc < gridSize; rc++) {
            pattern = pattern.concat(morpion[rc][rc])
        }

        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }
}

function checkReverseDiagonalSimple(x, y, playerTurn) {
    let victoryPattern = playerTurn.repeat(3)
    if(x === gridSize - (y + 1)){
        let pattern = ''

        for(let row = 0; row < gridSize; row++){
            pattern = pattern.concat(morpion[row][gridSize - (row + 1)])
        }

        if(pattern.indexOf(victoryPattern) >= 0)
            return true
    }
}

//////////////////////////////////////FONCTION AFFICHAGE///////////////////////////////////////////////////////////////

//fonction création de la grille de morpion
function drawGrid(div, gridSize){
    //création d'un tableau pour stocker les symboles pour les vérifications de victoire
    morpion = Array(gridSize)
    let table = document.createElement('table')
    for (let i = 0; i < gridSize; i++){
        //à chaque itération jusqu'à gridSize on ajoute une ligne au tableau morpion
        morpion[i] = Array(gridSize)
        let row = table.insertRow(i)
        for(let j = 0; j < gridSize; j++){
            //on remplie chaque cellule de la ligne i d'espace pour l'instant
            morpion[i][j] = ' '
            let cell = row.insertCell(j)
            let button = document.createElement('input')
            button.setAttribute("type", "button")
            let id = i.toString() + j.toString()
            button.setAttribute("id", id)
            button.setAttribute("class", "morpionButton")
            button.setAttribute("onclick", "game(" + '"' +id + '"' + ", " + i + ", " + j + ")")
            cell.appendChild(button)
        }
    }
    console.log(morpion)
    div.appendChild(table)
}

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
            textStatus = "Egalité, aucun de vous deux n'a gagné."
            break
        case 'complete':
            textStatus = "La case est déjà occupée."
            break
    }
    gameStatus.innerText = textStatus
}

function updateGameScore(){
    gameScore.innerText = playerNameOne + " : " + scorePlayerOne + " / " + playerNameTwo + " : " + scorePlayerTwo
}