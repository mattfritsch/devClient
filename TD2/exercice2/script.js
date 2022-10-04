let playerNameOne = "Joueur 1"
let playerNameTwo = "Joueur 2"
let gridSize = 3
let gameMode = "simple"
let scorePlayerOne = 0
let scorePlayerTwo = 0

//sert à la vérification du match nul
let nbCoups = 0

let maxSize


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

    if(gameMode === "simple"){
        maxSize = 3
    }
    else{
        maxSize = parseInt(gridSize)
    }
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
        }
    }
    else{
        setGameStatus("complete")
    }
    playerTurn === playerOne ? playerTurn = playerTwo : playerTurn = playerOne
}

//////////////////////////////////////////FONCTIONS VERIFICATIONS //////////////////////////////////////////////////
//fonction de vérification de victoire
function checkWin(x, y, playerTurn){
    return checkRow(x, playerTurn) || checkColumn(y, playerTurn) || checkDiagonal(x, y, playerTurn)
        || checkReverseDiagonal(x, y, playerTurn);
}
//fonction de vérification de match nul
function checkNul(){
    return nbCoups === parseInt(gridSize) * parseInt(gridSize);

}

function checkRow(x, playerTurn){
    let victoryPattern = playerTurn.repeat(parseInt(maxSize))

    let pattern = ''
    morpion[x].forEach(element => (pattern = pattern.concat(element)))

    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

function checkColumn(y, playerTurn){
    let victoryPattern = playerTurn.repeat(maxSize)

    let pattern = ''
    morpion.forEach(element => (pattern = pattern.concat(element[y])))

    if(pattern.indexOf(victoryPattern) >= 0)
        return true
}

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