//on récupère les variables locales
let township = localStorage.getItem("cct_code_township")
let department = localStorage.getItem("cct_code_dept")


let temp = document.getElementById("temp")
let feelsLike = document.getElementById("feels_like")
let tempMin = document.getElementById("temp_min")
let tempMax = document.getElementById("temp_max")
let description = document.getElementById("description")
let humidity = document.getElementById("humidity")
let localization = document.getElementById("localization")

localization.innerHTML = township + ", en " + department

let apiKeys = "1974f01130afca6df9bb4bbe6055a8b7"

let latLonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + township + ",33&limit=1&appid=" + apiKeys
let weatherUrl

/**
 * Cette fonction permet de récupérer la longitude et la latitude de la commune
 * @param latLonUrl : string -> url de l'api pour récupérer lon et lat
 * @returns {Promise<void>}
 */
async function getLatLon(latLonUrl){
    const response = await fetch(latLonUrl, {
        method: 'GET',
    }).catch(function (error){
        console.log("problème fetch: " + error.message)
    })
    const json = await response.json()
    lat = json[0].lat
    lon = json[0].lon
    weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&lat=" + lat + "&lon=" + lon + "&appid=" + apiKeys
}

/**
 * Cette fonction fait un appel à l'API openweather.org puis affiche les données météo de cette dernière sur la page
 * @param weatherUrl : string -> url de l'API openweather.org pour récupérer les données météo
 * @returns {Promise<void>}
 */
async function getWeather(weatherUrl){
    const response = await fetch(weatherUrl,{
        method : 'GET',
    }).catch(function (error){
        console.log("problème fetch : " + error.message)
    })
    const json = await response.json()
    console.log(json)
    temp.innerHTML = json.main['temp'] + " °C"
    feelsLike.innerHTML = json.main['feels_like'] + " °C"
    tempMin.innerHTML = json.main['temp_min'] + " °C"
    tempMax.innerHTML = json.main['temp_max'] + " °C"
    description.innerHTML = json.weather[0].description
    humidity.innerHTML = json.main['humidity'] + " %"
}

/**
 * Appel des fonctions présenté précédemment
 */
getLatLon(latLonUrl)
    .then(() => getWeather(weatherUrl))
    .catch(function (error){
        console.log("problème fetch : " + error.message)
    })