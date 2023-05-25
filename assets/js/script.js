var APIkey ="d8f02cd57afcf692f2e73a035903094d";
// created button link and link to cities 
var searchBtn = document.getElementById("searchBtn");

// var savedCity = localStorage.getItem('city');
// var searchHistory = document.getElementById('history');
// searchHistory.append(savedCity);

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