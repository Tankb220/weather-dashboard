var APIkey ="d8f02cd57afcf692f2e73a035903094d";
// created button link and link to cities 
var searchBtn = document.getElementById("searchBtn");

// var savedCity = localStorage.getItem('city');

var listOfCities = [];
if(localStorage.getItem("history")) {
    listOfCities = JSON.parse(localStorage.getItem("history"))
}
function performSearch () {
    var inputVal = document.getElementById("cityToSearch").value.trim();
    listOfCities.push(inputVal)
    localStorage.setItem('history', JSON.stringify(listOfCities));
    weatherSearch(inputVal)
    forecastSearch(inputVal)
}
// created funciton to search for city
function weatherSearch(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.main.temp);
        var weatherIcon = document.getElementById('weather-icon');
        var dataIcon = data.weather[0].icon
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dataIcon}.png`)
        // weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`
        

        var cityName = document.getElementById("city-name");
        cityName.textContent = data.name;

        var today = dayjs().format('MM/DD/YYYY');
        document.getElementById("current-date").textContent = today
        document.getElementById("temp").textContent = "Temp: " + data.main.temp + " \u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById("humid").textContent = "Humidity: " + data.main.humidity + "%";
        renderHistory()
    })
}
function weatherSearch(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.main.temp);
        var weatherIcon = document.getElementById('weather-icon');
        var dataIcon = data.weather[0].icon
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dataIcon}.png`)
        // weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`
        

        var cityName = document.getElementById("city-name");
        cityName.textContent = data.name;

        var today = dayjs().format('MM/DD/YYYY');
        document.getElementById("current-date").textContent = today
        document.getElementById("temp").textContent = "Temp: " + data.main.temp + " \u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById("humid").textContent = "Humidity: " + data.main.humidity + "%";
        renderHistory()
    })
}
//function for weather to be searched when search button is clicked 
function weatherSearch(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;
    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function (data) {
        // console.log(data);
        // console.log(data.main.temp);
        var weatherIcon = document.getElementById('weather-icon');
        var dataIcon = data.weather[0].icon
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dataIcon}.png`)
        // weatherIcon.src = `https://openweathermap.org/img/wn/10d@2x.png`
        
// shows time and date of weather in city searched for
        var cityName = document.getElementById("city-name");
        cityName.textContent = data.name;

        var today = dayjs().format('MM/DD/YYYY');
        document.getElementById("current-date").textContent = today
        document.getElementById("temp").textContent = "Temp: " + data.main.temp + " \u00B0F";
        document.getElementById("wind").textContent = "Wind: " + data.wind.speed + " MPH";
        document.getElementById("humid").textContent = "Humidity: " + data.main.humidity + "%";
        renderHistory()
    })
}
searchBtn.addEventListener("click", performSearch);
// allows for future dates and times to be searched and added to the function 
function forecastSearch() {
    var userInput = document.getElementById('cityToSearch').value.trim();
    futureWeatherSearch(userInput);
}
function futureWeatherSearch(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

    fetch(queryURL)
    .then(function(result) {
        return result.json()
    })
    .then(function(data) {
        console.log(data)
        var arrOfTimes = data.list; // array of 40 items
        //attempt to normalize the data to just get noon items
        var arrOfFilteredTimes = [];
        

        for(i=0; i< arrOfTimes.length; i++) {
            if(arrOfTimes[i].dt_txt.split(" ")[1] == "12:00:00") {
                arrOfFilteredTimes.push(arrOfTimes[i])
            }

            // if(arrOfTimes[i].dt_txt.includes("12:00:00")) {
            //     arrOfFilteredTimes.push(arrOfTimes[i])
            // }
        }
        // console.log(arrOfFilteredTimes)

        renderForecast(arrOfFilteredTimes)
        // var today = dayjs().format('MM/DD/YYYY');
        // var oneDay = dayjs().add(dayjs.duration({'days':1}));
        // document.getElementById('one-day').textContent = oneDay;
    })    
}
//creates a forecast history for the weather data
function renderForecast(arr) {
    for(i =0; i<arr.length; i++) {
        var givenDate = arr[i].dt_txt.split(" ")[0]
        // console.log(givenDate)

        // var weatherIcon = document.getElementById('weather-icon');
        // var dataIcon = data.weather[0].icon
        // weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dataIcon}.png`)

        var properDate = givenDate.split('-');
        console.log(properDate)
        document.getElementById("date-" + i).textContent = properDate[1] + "/" + properDate[2] + "/" + properDate[0]
        document.getElementById("icon-" + i).innerHTML = `<img src="https://openweathermap.org/img/wn/${arr[i].weather[0].icon}.png"/>`
        document.getElementById("temp-" + i).textContent = "Temp: " + arr[i].main.temp + " \u00B0F"
        document.getElementById("wind-" + i).textContent = "Wind: " + arr[i].wind.speed + " MPH"
        document.getElementById("humid-" + i).textContent = "Humidity:" + arr[i].main.humidity + "%"
    }
}
//allows user to go back and find cities they have already searched 
function renderHistory() {
    document.getElementById("history").innerHTML = "";

    for(i=0; i<listOfCities.length; i++) {
        var newBtn = document.createElement("button")
        newBtn.textContent = listOfCities[i];
        newBtn.addEventListener("click", function(e) {
            weatherSearch(e.target.textContent)
            futureWeatherSearch(e.target.textContent)
        })
        
        document.getElementById("history").append(newBtn)
    }
}

renderHistory()
