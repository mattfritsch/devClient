/* 2) Les types en JS */
/* 2.1) Les différents types */
/*
function showType() {
    let x;
    x = [  , 'blabla', "blabla", `blabla${x}`, 9, 2.5, true, undefined, null, [1,2,3], new Array(), {}, {"promo":"lpwmce","nb":25}, new Date(), function(){alert('toto')}, 42n];

    for(let i = 0; i <= x.length; i++){
        console.log(typeof x[i]);
    }
}
showType();
*/


/* 2.2) Déclaration */
/*
function showType2(){
    for(let i = 0; i <= x.length; i++){
        console.log(typeof x[i]);
    }
    var x; //peut se déclarer après et fonctionne quand même, contrairement au 'let'
    x = [ , 'blabla', "blabla", `blabla${x}`, 9, 2.5, true, undefined, null, [1,2,3], new Array(), {}, {"promo":"lpwmce","nb":25}, new Date(), function(){alert('toto')}, 42n];
}
showType2();
*/


/* 2.3) Conversions de type */
/*
function conversions(){
    let number = 15;
    let number1 = 10.569;
    let number2 = "21";

    console.log(typeof number.toString());
    console.log(typeof number1.toString());
    console.log(typeof parseInt(number2));
    console.log(typeof Number.parseInt(number2));
    console.log(typeof parseFloat(number2));
    console.log(typeof Number.parseFloat(number2));

    console.log(typeof Math.floor(number1));
    console.log(typeof Math.ceil(number1));
    console.log(typeof Math.round(number1));

    console.log(typeof Math.floor(number2)); //convertit la chaîne de caractère en type number
}

conversions();
*/


/* 2.4) Tests d'égalité */
/*
function equalityTest(){
    let b=false;
    let n=0;
    let s='0';
    let tab = [];
    let o = {};

    console.log(b == n);
    console.log(b == s);
    console.log(b == tab);
    console.log(b == o);
    console.log(n == s);
    console.log(n == tab);
    console.log(n == o);
    console.log(s == tab);
    console.log(s == o);
    console.log(tab == o);
    //quand les valeurs sont les mêmes -> true

    console.log(b === n);
    console.log(b === s);
    console.log(b === tab);
    console.log(b === o);
    console.log(n === s);
    console.log(n === tab);
    console.log(n === o);
    console.log(s === tab);
    console.log(s === o);
    console.log(tab === o);
    //même si les valeurs sont les mêmes -> false
}

equalityTest();
*/


/* 3) Les chaînes */
/* 3.1) */
/*
function upperCase(){
    let text = window.prompt("Veuillez saisir une phrase");

    while(text.trim() !== text.trim().toUpperCase()){
        text = window.prompt("Veuillez saisir une phrase");
    }
}
upperCase();
*/


/* 3.2) */
/*
function stringGenerator(){
    let specialChars = "~`!#$%^&*+=-_[]\\\';,/{}|\":<>?";
    let string;
    let counter = 0;
    let isOk = false;

    while(isOk === false){
        string = ""
        for(let i = 0; i<5; i++){
            string += String.fromCharCode(Math.floor(65 + Math.random() * (123 - 65)));
        }
        console.log(string);
        if(string === string.toUpperCase()){
            let numChar = 0;
            let splitString = string.split("");
            for(let i = 0; i < splitString.length; i++){
                if(!specialChars.includes(splitString[i])){
                    numChar++;
                }
                if(numChar === 5)
                    isOk = true;
            }
        }
        counter++
    }
    console.log("Nombre d'itérations : " + counter);
}
stringGenerator();
*/


/* 3.3) */
/*
function stringVowelGenerator(sizeOfString){
    let vowel = ['a', 'e', 'i', 'o', 'u', 'y'];
    let char = "";

    for(let i = 0; i < sizeOfString; i++){
        char += vowel[Math.floor(Math.random() * 6)];
    }
    console.log(char);

}
stringVowelGenerator(15);
*/


/* 3.4) */
/*
function concatNames(){
    let res;
    let firstName = window.prompt("Veuillez saisir votre prénom");
    let name = window.prompt("Veuillez saisir votre nom");
    if(!firstName.includes('-')) {
        res = name.toUpperCase(). //toUpperCase() le nom de famille
            concat(firstName.charAt(0).toUpperCase(). //ajout de la majuscule du prénom
                concat(firstName.slice(1, firstName.length))) // concaténation du prénom + du nom
    }
    else {
        firstName.indexOf('-') //prénom composé séparé d'un tiret
        res = name.toUpperCase(). //toUpperCase() le nom de famille
            concat(firstName.charAt(0).toUpperCase(). //concaténation du nom et du prénom + ajout de la majuscule de la première partie du prénom
                concat(firstName.slice(1, firstName.indexOf('-') + 1). //concaténation de la première partie du prénom
                    concat(firstName.charAt(firstName.indexOf('-') + 1).toUpperCase(). //ajout de la majuscule sur la deuxième partie du prénom
                        concat(firstName.slice((firstName.indexOf('-')) + 2))))) // concaténation de la deuxième partie du prénom
    }

    console.log(res);
}
concatNames();
*/


/* 3.5) */
/*
function cryptedString() {
    let cryptedCharacters = 'oizeasghbjklmndpqrftuvwxyc'; // autres caractères -> indexOf === -1
    let tab;
    let tmp = [];

    let string = window.prompt("Ecrire un mot").toLowerCase();

    tab = string.split("")
    tab.forEach(element => console.log(cryptedCharacters.indexOf(element)))
}
cryptedString()
*/


/* 3.6.1) */
/*
function jazzBundle(){
    const max = 100;
    let n = Math.round(Math.random() * max);

    for(let i = 1; i<=n; i++){
         if ((i % 3 === 0) && (i % 5 === 0))
            console.log("Jazz Bundle \n")
        else if(i % 3 === 0)
            console.log("Jazz \n");
        else if(i % 5 === 0)
            console.log("Bundle \n");
        else
            console.log(n)
    }
}
jazzBundle();
*/

/* 3.6.2) */
/*
function jazzBundle2(){
    const max = 100;
    let n = Math.round(Math.random() * max);
    let msg;

    for(let i = 1; i<=n; i++){
        if ((i % 3 === 0) && (i % 5 === 0))
            msg = "Jazz Bundle";
        else if(i % 3 === 0)
            msg = "Jazz";
        else if(i % 5 === 0)
            msg = "Bundle";
        else
            msg = n.toString();

        console.log(msg);
    }
}
jazzBundle2();
*/


/* 4) Les tableaux et fonctions */
/* 4.1) version algorithmique */
/*
tab = [5, 8, 9, 6, 2, 40, 89, 52, 41, 75];
function addition(tab){
    let total = 0;

    for(let i = 0; i < tab.length; i++){
       total += tab[i]
    }
    console.log("Somme de " + tab + " est " + total)
}
addition(tab);
*/

/* 4.1) version programmation fonctionnelle */
/*
let tab = [5, 8, 9, 6, 2, 40, 89, 52, 41, 75];
function addition2(tab){
    let total = tab.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    console.log("Somme de " + tab + " est " + total);
}
addition2(tab);
*/


/* 4.2) version algorithmique */
/*
tab = [5, 8, 9, 6, 2, 40, 89, 52, 41, 88];
function numberOfPair(tab){
    let counter = 0;

    for(let i = 0; i < tab.length; i++){
        if(tab[i] % 2 === 0){
            counter++
        }
    }
    console.log("Nombre d'entiers pair : " + counter)
}
numberOfPair(tab);
*/

/* 4.2) Version programmation fonctionnelle */
/*
let tab = [5, 8, 9, 6, 2, 40, 89, 52, 41, 88];
function numberOfPair2(tab){
    let counter = 0

    counter = tab.filter(element => element % 2 === 0).length
    console.log("Nombre d'entiers pair : " + counter)
}
numberOfPair2(tab);
*/


/* 4.3) Version algorithmique */
/*
let tab1 = [1, 4, 7, 8, 12, 49];
let tab2 = [2, 5, 6, 8, 75, 78];
function sortTableFusion(tab1, tab2){
    let temp;
    let tab3 = tab1.concat(tab2);
    let sortTab = tab3;

    for(let i = 0; i < tab3.length; i++){
        for(let j = 0; j < tab3.length; j++){
            if(tab3[i] < sortTab[j]){
                temp = tab3[i];
                tab3[i] = sortTab[j];
                sortTab[j] = temp;
            }
        }
    }
    return console.log(sortTab)
}
sortTableFusion(tab1, tab2);
*/

//ne fonctionne pas
/* 4.3) version programmation fonctionnelle */
/*
let tab1 = [1, 4, 7, 8, 12, 49];
let tab2 = [2, 5, 6, 8, 75, 78];
function sortTableFusion2(tab1, tab2){
        let tab3 = tab1.concat(tab2);
        let sortTab = tab3;
        let temp;

        tab3.forEach(element => {
            sortTab.forEach(element1 => {
              if(element < element1){
                  temp = element;
                  element = element1;
                  sortTab.push(temp);
              }
            })
        })
    return console.log(sortTab)
}
sortTableFusion2(tab1, tab2);
*/


/* 4.4) version algorithmique */
/*
let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9, 75, 78, 88, 89, 96, 98, 102];
function dichotomie(tab, f){

    let a = 0;
    let b = tab.length - 1;

    while(a <= b){
        let m = Math.floor((a+b) / 2);
        if(tab[m] === f){
            return console.log("position est " +m)
        }
        else if(tab[m] < f){
            a = m + 1
        }
        else{
            b = m - 1;
        }
    }
    return console.log("valeure non trouvée");
}
dichotomie(tab, 9)
*/

/* 4.4) version programmation fonctionnelle */
/*
let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9, 75, 78, 88, 89, 96, 98, 102];
function dichotomie2(tab, f){
    let m = 0;

    let tmp = tab.map(element => element === f);
    tmp.forEach(element => {
        if(element !== true)
            m++;
        else
            return console.log("Valeur trouvé à la position " + m);
    });

}
dichotomie2(tab, 9)
*/


/* 4.5) version algorithmique */
/*
function higherPair(...numbers){
    let tabPair = [];

    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] % 2 === 0){
            tabPair.push(numbers[i]);
        }
    }

    console.log("Le plus grand entier pair est : " + Math.max(...tabPair));
}
higherPair(4, 5, 8, 1, 7, 6, 9, 98, 187, 146, 154);
*/

/* 4.5) version programmation fonctionnelle */
/*
function higherPair2(...numbers){
    let tabPair = numbers.filter(element => element % 2 === 0)

    console.log("Le plus grand entier pair est : " + Math.max(...tabPair));
}
higherPair2(4, 5, 8, 1, 7, 6, 9, 98, 187, 146, 154);
*/

/* 4.6) version algorithmique */
/*
let string = "C'est une phrase phrase avec plusieurs plusieurs mot pour tester tester la fonction la tester fonction";
function occurrence(string){
    console.log(string);
    let text = string.toLowerCase().split(/[^a-zA-Z]/)
    let dictionary = {};

    for (let word of text) {
        if (word !== "") {
            if (dictionary[word] !== undefined) {
                dictionary[word] += 1;
            } else {
                dictionary[word] = 1
            }
        }
    }
    return console.log(dictionary)
}
occurrence(string);
*/

/* 4.6) version programmation fonctionnelle */
/*
let string = "C'est une phrase phrase avec plusieurs plusieurs mot pour tester tester la fonction la tester fonction";
function occurrence2(string){
    console.log(string);
    let text = string.toLowerCase().split(/[^a-zA-Z]/)
    let dictionary = {};

    text.forEach(word =>{
        if(Object.keys(dictionary).includes(word))
            dictionary[word] += 1;
        else
            dictionary[word] = 1;
    })

    return console.log(dictionary)
}
occurrence2(string);
*/