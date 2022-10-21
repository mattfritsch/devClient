let cct_code_dept = localStorage.getItem("cct_code_dept")
let cct_code_township = localStorage.getItem("cct_code_township")

let table = document.getElementById('ctList')
let info = document.getElementById('pageInfo')
let localization = document.getElementById('localization')

//affichage du h1 de control.html
if(cct_code_township === null)
    localization.innerHTML = cct_code_dept + ""
else
    localization.innerHTML = cct_code_dept + " | " + cct_code_township

let url

//index auquelle l'API commence à envoyer les résultats
let start = 0
let page = 1

/**
 * cette fonction permet de récupérer les différents contrôle technique du département ou du département et de la commune
 * appel à l'API data.economie.gouv.fr
 * permet également d'afficher le tableau avec les informations
 * @returns {Promise<void>}
 */
async function getControls(){
    const response = await fetch(isTownship(), {
        method: 'GET',
    }).catch(function (error){
        console.log("problème fetch: " + error.message)
    })
    const json = await response.json()
    table.innerHTML = ""
    if(json['nhits'] > 0){
        await json.records.forEach( function (item){
            info.innerText = "Nombre de contrôle technique : " + json['nhits'] + " -- Page " + page + " sur " + parseInt(json['nhits'])/10
            let tr = document.createElement("tr");
            let address = document.createElement("td")
            address.innerText = item.fields['cct_adresse'] + ", " + item.fields['cct_code_commune'] + ", "
                + item.fields['cct_code_dept']
            let name = document.createElement("td")
            name.innerText = item.fields['cct_denomination']
            let phone = document.createElement("td")
            phone.innerText = item.fields['cct_tel']
            let price = document.createElement("td")
            price.innerText = item.fields['prix_visite']
            tr.append(address, name, phone, price)
            table.append(tr)
        })
    }
    else
        alert("Il n'y a pas de contrôle technique à " + cct_code_township)
}
getControls().catch((function (error){
    console.log("problème fetch: " + error.message)
}))

/**
 * Cette fonction permet de passer à la page suivante du tableau
 */
function next(){
    //start est incrémentée de 10 pour récupérer les 10 prochaines lignes du résultat de l'API
    start += 10
    page++
    getControls().catch((function (error){
        console.log("problème fetch: " + error.message)
    }))
}

/**
 * Cette fonction permet de revenir à la page précédente du tableau
 */
function previous(){
    //start est décrémentée de 10 pour récupérer les 10 précédentes lignes du résultat de l'API
    start -= 10
    page--
    getControls().catch((function (error){
        console.log("problème fetch: " + error.message)
    }))
}

/**
 * Cette fonction permet de renvoyer l'url de l'api avec ou sans le nom de la commune renseignée
 * @returns {string}
 */
function isTownship(){
    if(cct_code_township !== null){
        return url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=controle_techn&q=&rows=10&start=" + start +
            "&sort=cct_code_dept" + "&facet=cct_code_dept&facet=cct_code_commune&refine.cct_code_dept=" + cct_code_dept +
            "&refine.cct_code_commune=" + cct_code_township
    }
    else{
        return url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=controle_techn&q=&rows=10&start=" + start +
            "&sort=cct_code_dept" + "&facet=cct_code_dept&facet=cct_code_commune&refine.cct_code_dept=" + cct_code_dept
    }
}
