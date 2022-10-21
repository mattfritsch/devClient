let departmentSelect = document.getElementById("department-select")
let townshipContainer = document.getElementById("township-container")
let townshipSelect = document.getElementById("township-select")
let population = document.getElementById("population")
let weatherButton = document.getElementById("weather-button")
let controlButton = document.getElementById("control-button")


//fetch pour récupérer tous les départements et les afficher dans le input select
fetch('https://geo.api.gouv.fr/departements?', {
    method:"GET"
})
    .then(response => response.json())
    .then(json => json.forEach(function (element){
            let optionEl = document.createElement("option")
            optionEl.setAttribute("value", element.code + "_" + element.nom)
            optionEl.innerText = element.code + " - " + element.nom
            departmentSelect.appendChild(optionEl)
            departmentSelect.addEventListener("change", addTownship)
        }, this)

    )
    .catch(err => console.log("Erreur : " + err))


/**
 * Cette fonction permet d'ajouter les fonctions dans le input select en fonction du département sélectionné
 */
function addTownship(){
    //affichage du select value pour les communes
    townshipContainer.style.display = "block"
    //affichage du bouton contrôle technique
    controlButton.style.display = "block"

    let departmentValue = departmentSelect.value.split('_')

    //on vide le localStorage au cas où l'utilisateur ne veut pas choisir de commune
    localStorage.clear()
    //on set le nom du département sélectionné
    localStorage.setItem("cct_code_dept", departmentValue[1])

    fetch('https://geo.api.gouv.fr/departements/'+ departmentValue[0] + '/communes', {
        method:"GET"
    })
        .then(response => response.json())
        .then(json => json.forEach(function (element){
                let optionEl = document.createElement("option")
                optionEl.setAttribute("value", element.nom)
                optionEl.innerText = element.nom
                townshipSelect.appendChild(optionEl)
                townshipSelect.addEventListener("change", addPopulation)
            //stock le json pour la population
            }, this)

        )
        .catch(err => console.log("Erreur : " + err))
}

/**
 * cette fonction permet d'afficher le nombre d'habitants d'une commune
 */
function addPopulation(){
    let township = townshipSelect.value
    //on set le nom de la commune sélectionnée
    localStorage.setItem("cct_code_township", township)
    //affichage du bouton "météo"
    weatherButton.style.display = "block"

    fetch('https://geo.api.gouv.fr/communes?nom='+ township +'&fields=departement,population' , {
        method:"GET"
    })
        .then(response => response.json())
        .then(json => population.innerText = "Le nombre d'habitants est de " + json[0].population + " personnes.")
        .catch(err => console.log("Erreur : " + err))
}


