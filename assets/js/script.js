// __________
// DOM element variables
// __________

// Getting the search form DOM elements
var form = document.getElementById("form-container");
var citySearch = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var recentSearches = document.getElementById("button-container");

// Getting the current weather DOM elements
var selectedCity = document.getElementById("current-city");
var currentDate = document.getElementById("current-date");
var currentTemperature = document.getElementById("current-temperature");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex= document.getElementById("current-uv-index");

// Five-Day Forecast
// Getting the first day's forecast's DOM elements
var firstDayDate= document.getElementById("first-day-date");
var firstDayIcon = document.getElementById("first-day-icon");
var firstDayTemperature = document.getElementById("first-day-temperature");
var firstDayWind = document.getElementById("first-day-wind");
var firstDayHumidity = document.getElementById("first-day-humidity");

// Getting the second day's forecast's DOM elements
var secondDayDate = document.getElementById("second-day-date");
var secondDayIcon = document.getElementById("second-day-icon");
var secondDayTemperature = document.getElementById("second-day-temperature");
var secondDayWind = document.getElementById("second-day-wind");
var secondDayHumidity = document.getElementById("second-day-humidity");

// Getting the third day's forecast's DOM elements
var thirdDayDate = document.getElementById("third-day-date");
var thirdDayIcon = document.getElementById("third-day-icon");
var thirdDayTemperature = document.getElementById("third-day-temperature");
var thirdDayWind = document.getElementById("third-day-wind");
var thirdDayHumidity = document.getElementById("third-day-humidity");

// Getting the forth day's forecast's DOM elements
var forthDayDate = document.getElementById("forth-day-date");
var forthDayIcon = document.getElementById("forth-day-icon");
var forthDayTemperature = document.getElementById("forth-day-temperature");
var forthDayWind = document.getElementById("forth-day-wind");
var forthDayHumidity = document.getElementById("forth-day-humidity");

// Getting the fifth day's forecast's DOM elements
var fifthDayDate = document.getElementById("fifth-day-date");
var fifthDayIcon = document.getElementById("fifth-day-icon");
var fifthDayTemperature = document.getElementById("fifth-day-temperature");
var fifthDayWind = document.getElementById("fifth-day-wind");
var fifthDayHumidity = document.getElementById("fifth-day-humidity");

var apiKey = "3b64e855db6f550ac62900aed67b9ff5";
var currentLongitude = 0;
var currentLatitude = 0;

// Luxon date and time variables
var DateTime = luxon.DateTime;
var now = DateTime.now();

function fetchWeatherData(city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Display the selected city's name
        selectedCity.innerHTML = city;
        
        // Display the current date and time
        currentDate.innerHTML = "Current Date and Time".bold() + ": "  + now.toLocaleString(DateTime.DATETIME_MED);

        // Display the selected city's current temperature
        currentTemperature.innerHTML = "Current Temperature in Degrees Celsius".bold()  + ": "  + (data.main.temp - 273.15);

        // Display the selected city's current wind speed
        currentWind.innerHTML = "Current Wind Speed in Metres Per Second".bold() + ": "  + data.wind.speed;

        // Display the selected city's current humidity
        currentHumidity.innerHTML = "Current Humidity %".bold()  + ": "  + data.main.humidity;

        console.log(data);
        currentLongitude = data.coord.lon;
        currentLatitude = data.coord.lat;
    });

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLatitude + "&lon=" + currentLongitude + "&exclude=hourly,daily&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Display current uv index
        currentUVIndex.innerHTML = "Current UV Index".bold() + ": " + data.current.uvi;
    });
}

form.addEventListener('submit', function(event) {
    // Prevent default event behaviours
    event.preventDefault();

    // Retrieve search value
    var searchValue = citySearch.value;

    fetchWeatherData(searchValue);
});