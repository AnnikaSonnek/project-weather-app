//------------------------------------------DOM-selectors-----------------------------------------------
const weatherApp = document.getElementById('weather-app')
const cityName = document.getElementById('city-name')
const currentTemp = document.getElementById('current-temp')
const weekDays = document.getElementById('weekdays')
const weekTemp = document.getElementById('week-temp')
const windSpeed = document.getElementById('wind-speed')
const weatherDesc = document.getElementById('weather-description')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const weatherSymbolBox = document.getElementById('big-weather-symbol-container')
const weatherSymbol = document.getElementById('big-weather-symbol')


//---------------------------------------------1ST FETCH REQUEST----------------------------------------
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2`)
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)
  
//------------------VARIABLES FOR TEMP, DESCRIPTION, SUNRISE, SUNSET AND WINDSPEED-------------------------------------------
    const temp = Math.round(json.main.temp)
    const description = json.weather[0].description
    const rise = new Date(json.sys.sunrise * 1000)
    const up = rise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const set = new Date(json.sys.sunset * 1000)
    const down = set.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const windspeed = Math.round(json.wind.speed)
    
//--------------DISPLAYING: city, temp, weather description, sunrise, and sunset---------------
    cityName.innerHTML = `${json.name}`//displays the city name
    currentTemp.innerHTML = `${temp}°`//displays the current temperature using the temp variable 
    weatherDesc.innerHTML = `${description}`
    sunrise.innerHTML = `${up}`
    sunset.innerHTML = `${down}`
    windSpeed.innerHTML = `<p>${windspeed} m/s</p>`
    
//------------------FUNCTION WITH IF-STATEMENTS FOR DISPLAYING ICONS----------------------------   
    const currentWeather = json.weather[0].main //variable checking what the current weather is using the main-property in the json
    
    const changeWeatherIcon = () => {
        if (currentWeather === "Snow") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/snow-alt.svg"/>`
        }

        else if (currentWeather === "Clear") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/sun.svg"/>`
        }

        else if (currentWeather === "Thunderstorm") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/lightning-rain.svg"/>`
        }

        else if (currentWeather === "Drizzle") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/drizzle.svg"/>`
        }

        else if (currentWeather === "Rain") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/rain.svg"/>`
        }

        else if (currentWeather === "Clouds") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/cloud.svg"/>`
        }

        else if (currentWeather === "Fog") {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/fog.svg"/>`
        }

        else {
            weatherSymbolBox.innerHTML = `<img class = "big-weather-symbol" 
            id="big-weather-symbol" 
            src="./Weather-Icons/Weather-Icons-IOS7-Style-PIXEDEN/SVG/cloud-sun.svg"/>`
        }
    }
changeWeatherIcon(currentWeather); //Calling the function changeWeatherIcon with currentWeather variable

})

//---------------------------------2ND FETCH FOR FORECAST--------------------------------------------
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=26c922535e2ba939d3ff0d8af53d90a2`)
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json)


//--------------------------------------FILTER + FOREACH---------------------------------
//Filtered forcast for weekdays + foreach-loop that displays the weekdays of the dates
    const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) 
    console.log(filteredForecast)
    filteredForecast.forEach((day) => {
        const date = new Date(day.dt * 1000)
        let dayName = date.toLocaleDateString("en-US", {weekday: "short"})
        weekDays.innerHTML += `<h6>${dayName}</h6>`

        //during the same loop we also get the temperature for each day and display it without decimals
        forecastTemp = Math.round(day.main.temp) 
        weekTemp.innerHTML += `<h6>${forecastTemp}°</h6>`
        
        })        
})

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

