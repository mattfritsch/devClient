import {Morpion} from "./class/Morpion.js";
import {MorpionSimple} from "./class/MorpionSimple.js";

let classMorpion

let scorePlayerOne = 0
let scorePlayerTwo = 0

let playerNameOne = "Joueur 1"
let playerNameTwo = "Joueur 2"


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
    setGameStatus(classMorpion.playerTurn)
}

/**
 * fonction qui sert à lancer et relancer la partie
 * @returns {void}
 */
function reloadGame() {
    document.getElementById("gameZone").style.display = "block"
    //récupération de la taille de la grille
    let gridSize = document.getElementById("gridSize").value
    let gameMode = document.getElementById("gameMode").value //récupération du mode de jeu

    //instanciation de la classe en fonction du mode de jeu
    if (gameMode === "complete"){
        classMorpion = new Morpion(gridSize, "complete", "X", "O", "X", [],
            0);
    }
    else{
        classMorpion = new MorpionSimple(gridSize, "simple", "X", "O", "X", [],
            0, 3);
    }

    reloadPseudo()
    setGameStatus(classMorpion.playerTurn)

    let grid = document.getElementById("grid")
    grid.innerHTML = ""
    drawGrid(grid, classMorpion.gridSize)

    classMorpion.playerTurn = classMorpion.playerOne

    reloadBtn.value = "Recommencer"
    reloadBtn.style.display = "none"

    updateGameScore()
}

/**
 * fonction qui permet au joueur de mettre son symbole dans une case
 * @param {String} currentCase
 * @param {int} x
 * @param {int} y
 * @return void
 */
function game(currentCase, x, y){
    let victory
    if(classMorpion.morpion[x][y] === " "){
        classMorpion.morpion[x][y] = classMorpion.playerTurn
        classMorpion.nbCoups = classMorpion.nbCoups + 1
        document.getElementById(currentCase).value = classMorpion.playerTurn

        victory = classMorpion.checkWin(x, y, classMorpion.playerTurn)

        let nul = classMorpion.checkNul()
        if(victory){
            setGameStatus("win" + classMorpion.playerTurn)
            addPoint(classMorpion.playerTurn)
            reloadBtn.style.display = "block"
            updateGameScore()
            classMorpion.nbCoups = 0
        }
        else if(nul){
            setGameStatus("nul")
            reloadBtn.style.display = "block"
            updateGameScore()
        }
        else{
            classMorpion.playerTurn === classMorpion.playerOne ? classMorpion.playerTurn = classMorpion.playerTwo
                : classMorpion.playerTurn = classMorpion.playerOne
            setGameStatus(classMorpion.playerTurn)
        }
    }
    else{
        alert("La case est déjà occupé")
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
    classMorpion.morpion = Array(gridSize)
    let table = document.createElement('table')
    for (let i = 0; i < gridSize; i++){
        //à chaque itération jusqu'à gridSize on ajoute une ligne au tableau morpion
        classMorpion.morpion[i] = Array(gridSize)
        let row = table.insertRow(i)
        for(let j = 0; j < gridSize; j++){
            classMorpion.morpion[i][j] = ' '
            let cell = row.insertCell(j)
            let button = document.createElement('input')
            button.setAttribute("type", "button")
            let id = i.toString() + j.toString()
            button.setAttribute("id", id)
            button.setAttribute("class", "morpionButton")
            //ajout d'un id pour récupérer la case courante, i pour la ligne courante et j pour la colonne courante pour le tableau morpion
            button.addEventListener('click', function (){
                game(id, i, j)
            })
            cell.appendChild(button)
        }
    }
    console.log(classMorpion.morpion)
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

/**
 * fonction qui permet d'ajouter un point au score du joueur gagnant
 * @param { String } playerTurn
 * @return void
 */
function addPoint(playerTurn){
    playerTurn === 'X' ? scorePlayerOne++ : scorePlayerTwo++
}