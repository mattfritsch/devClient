import * as td3modules from "../array_utils.js";

document.getElementById("addButton").addEventListener('click', addNewElement)

let numberOfElements = 1
let numberArr = []
let searchValue

function addNewElement(event){
    numberOfElements++

    event.target.remove()

    let container = document.getElementById("elements")

    let div = document.createElement("div")
    div.setAttribute("class", "input-element")

    let label = document.createElement("label")
    label.setAttribute("for", "element" + numberOfElements)
    label.innerText = "Elément " + numberOfElements + " : "

    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("class", "element")
    input.setAttribute("id", "element" + numberOfElements)

    let button = document.createElement("button")
    button.setAttribute("type", "button")
    button.setAttribute("id", "addButton")
    button.innerText = "+"
    button.addEventListener('click', addNewElement)

    div.prepend(label, input, button)
    container.append(div)
}

document.getElementById("searchButton").addEventListener('click', saveElements)

function saveElements(){
    for (let i = 1; i <= numberOfElements; i++){
        let value = document.getElementById("element" + i).value
        numberArr.push(parseInt(value))
    }
    searchValue = parseInt(document.getElementById("search").value.trim())

    let sumOfElements = td3modules.getSum41(numberArr)
    let numberOfEven = td3modules.getNumberOfEven42(numberArr)
    let maxEven = td3modules.getMaxEven45(numberArr)
    let elementPosition = td3modules.dichotomie(numberArr, searchValue)

    document.getElementById("sum").innerText = sumOfElements.toString()
    document.getElementById("numberOf").innerText = numberOfEven.toString()
    document.getElementById("max").innerText = maxEven.toString()
    document.getElementById("position").innerText = elementPosition.toString()

}



