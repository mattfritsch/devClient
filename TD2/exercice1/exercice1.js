//Ajout de l'article 0
function addArticle(){
    let body = document.getElementsByTagName("body")
    let newH = document.createElement('h2')
    newH.textContent = "Article 0 - Interdiction"

    let newP = document.createElement('p')
    newP.innerHTML = "<span style='color:#000000;'>Il est interdit de dépasser sous peine de disqualification</span>"

    body[0].prepend(newH, newP)
}

//Modification du texte des titres en majuscule sans CSS
function titleToUpperCaseWithoutCSS(){
    let titles = document.getElementsByTagName('h2');
    for(let i = 0; i < titles.length; i++){
        titles[i].innerText = titles.item(i).innerText.toUpperCase();
    }
}

//Modfication du texte des titres en majuscule avec CSS
function titleToUpperCasewithCSS(){
    let titles = document.getElementsByTagName('h2');

    for(let i = 0; i < titles.length; i++){
        titles.item(i).style.textTransform = "uppercase"
        //titles.item(i).setAttribute("style", "text-transform : uppercase")
    }
}

//Décaler les numéros d'article
function shiftTo(){
    let titles = document.getElementsByTagName('h2');
    let nameArticle
    for(let i = 0; i < titles.length; i++){
        nameArticle = titles.item(i).innerText.split('-')
        nameArticle[0] = "article " + (i+1);
        titles[i].innerText = nameArticle.join(' - ')
    }
}

//couleur de fond un article sur deux (titre + texte)
function addBackgroundColor(){
    let titles = document.getElementsByTagName('h2')
    let i = 1
    let next

    while(i < titles.length){
        titles.item(i).style.backgroundColor = "#FF9D90"
        next = titles.item(i).nextElementSibling;

        while(next.nodeName !== "H2"){
            next.style.backgroundColor = "#FF9D90"
            next = next.nextElementSibling
            if (next.nodeName === "SCRIPT"){
                break;
            }
        }

        i += 2
    }
}

//inverser l'ordre des trois périodes d'inscription à l'article 4 => comprends rien
function reverseInscription(){
    let body = document.body
    let element = body.firstElementChild

    //boucle pour arriver jusqu'aux éléments "ul" à inverser
    while(!element.innerText.trim().endsWith("inscription :")){
        element = element.nextElementSibling
    }

    //element est égal au premier "ul"
    element = element.nextElementSibling

    let i = 0
    //initialisation du tableau qui contiendra le contenu des "ul"
    let ulTab = []

    //boucle pour faire le traitement uniquement sur les "ul" concernées
    while(element.nodeName !== "P"){
        //récupération du contenu du "ul" courant
        ulTab[i] = element.innerHTML
        i++
        let tmp = element
        //element devient le prochain "ul"
        element = element.nextElementSibling
        //on supprime le "ul" courant
        tmp.remove()
    }

    //ajout d'un attribut id sur l'élément "p" qui est le frère du dernier "ul" à traiter
    element.setAttribute("id", "before")
    //changement de l'ordre du tableau pour avoir les dates des plus récentes au moins récentes
    ulTab.reverse()

    //pour tous les éléments "ul" contenu dans le tableau
    for(let j = 0; j < ulTab.length; j++){
        //création d'un nouvel élément "ul"
        let ul = document.createElement("ul")
        //ajout du contenu dans le nouveau "ul" créée
        ul.innerHTML = ulTab[j]
        //reference correspond à l'élément ou il faut ajouter le nouveau "ul" avant ce dernier
        let reference = document.getElementById("before")
        //ul est ajouté avant l'élément reference
        body.insertBefore(ul, reference)
    }
}

addArticle()
shiftTo()
titleToUpperCaseWithoutCSS()
titleToUpperCasewithCSS()
reverseInscription()
addBackgroundColor()