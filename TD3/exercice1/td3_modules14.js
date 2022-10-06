import {getSum41, getNumberOfEven42, getMaxEven45} from "../array_utils.js";

let array = window.prompt("Veuillez saisir des entiers séparer par une virgule")

function arrayTreatment(array){
    let stringArr = array.trim().split(',')
    let numberArr = []
    stringArr.forEach(element => numberArr.push(parseInt(element)))
    console.log(getSum41(numberArr))
    console.log(getNumberOfEven42(numberArr))
    console.log(getMaxEven45(numberArr))
}

arrayTreatment(array)

