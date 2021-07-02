// __________
// DOM element variables
// __________

// Getting the search form DOM elements
var form = document.getElementById("form-container");
var citySearch = document.getElementById("city-search");
var searchButton = document.getElementById("search-button");
var recentSearches = document.getElementById("button-container");
var buttons = document.getElementById("buttons");

// Getting the current weather DOM elements
var selectedCity = document.getElementById("current-city");
var currentDate = document.getElementById("current-date");
var currentTemperature = document.getElementById("current-temperature");
var currentWind = document.getElementById("current-wind");
var currentHumidity = document.getElementById("current-humidity");
var currentUVIndex = document.getElementById("current-uv-index");
var currentWeatherIcon = document.getElementById("current-weather-icon");

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

// Getting the fifth day's forecast's DOM elements
var sixthDayDate = document.getElementById("sixth-day-date");
var sixthDayIcon = document.getElementById("sixth-day-icon");
var sixthDayTemperature = document.getElementById("sixth-day-temperature");
var sixthDayWind = document.getElementById("sixth-day-wind");
var sixthDayHumidity = document.getElementById("sixth-day-humidity");

// __________
// Non-DOM element variables
// __________

// OpenWeatherMap API-related information
var apiKey = "3b64e855db6f550ac62900aed67b9ff5";
var currentLongitude = 0;
var currentLatitude = 0;

// Luxon API date and time variables
var DateTime = luxon.DateTime;
var now = DateTime.now();

// Initializing the button list of recent searches array
var buttonList = [];

// Checking if there is a buttonList in the localStorage
if (!(JSON.parse(localStorage.getItem("buttonlist")))) {
    localStorage.setItem("buttonlist", JSON.stringify(buttonList));
}
// If there is a buttonList in the localStorage, then save its data to buttonList
else {
    buttonList = JSON.parse(localStorage.getItem("buttonlist"));
}

// __________
// Functions
// __________

// Fetch the weather data from the OpenWeatherMap API when we recieve a city search value
function fetchWeatherData(city) {
    // Fetching the first batch of data from an OpenWeatherMap API endpoint for the current weather
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Display the selected city's name
        selectedCity.innerHTML = city;
        
        // Display the current date and time
        currentDate.innerHTML = "Date and Time".bold() + ": "  + now.toLocaleString(DateTime.DATETIME_MED);

        // Display the selected city's current temperature
        currentTemperature.innerHTML = "Temperature in Degrees Celsius".bold()  + ": "  + Math.round(data.main.temp - 273.15);

        // Display the selected city's current wind speed
        currentWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": "  + data.wind.speed;

        // Display the selected city's current humidity
        currentHumidity.innerHTML = "Humidity %".bold()  + ": "  + data.main.humidity;

        // Saving the longitude and latitude for the currently searched for city
        currentLongitude = data.coord.lon;
        currentLatitude = data.coord.lat;

        // Saving the data from this fetch in localStorage
        var data1 = data;
        localStorage.setItem("weatherdata1", JSON.stringify(data1));
    });

    // Fetching the second batch of data from an OpenWeatherMap API endpoint for the current weather
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLatitude + "&lon=" + currentLongitude + "&exclude=hourly,daily&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Display the current UV Index
        currentUVIndex.innerHTML = "Current UV Index".bold() + ": " + data.current.uvi;

        // Change the color of the UV Index
        // Low UV Index
        if (data.current.uvi <= 3){
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("green");
        }
        // Moderate UV Index
        if ((data.current.uvi > 3) && (data.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }
        // High UV Index
        if (data.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }

        // Saving the data from this fetch in localStorage
        var data2 = data;
        localStorage.setItem("weatherdata2", JSON.stringify(data2));
    });

    // Fetching the third batch of data from an OpenWeatherMap API endpoint for the forecasted weather
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Display the current weather icon
        var iconValue = data.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        
        // Display the first day's forecasted date
        firstDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[2].dt_txt + " (24-Hour Clock)";        
        // Display the first day's forecasted weather icon
        var iconValue = data.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the first day's forecasted temperature
        firstDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[2].main.temp - 273.15);
        // Display the first day's forecasted wind
        firstDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[2].wind.speed;
        // Display the first day's forecasted humidity
        firstDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[2].main.humidity;

        // Display the second day's forecasted date
        secondDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[10].dt_txt + " (24-Hour Clock)";
        // Display the second day's forecasted weather icon
        var iconValue = data.list[10].weather[0].icon;
        secondDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the second day's forecasted temperature
        secondDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[10].main.temp - 273.15);
        // Display the second day's forecasted wind
        secondDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[10].wind.speed;
        // Display the second day's forecasted humidity
        secondDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[10].main.humidity;

        // Display the third day's forecasted date
        thirdDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[18].dt_txt + " (24-Hour Clock)";
        // Display the third day's forecasted weather icon
        var iconValue = data.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the third day's forecasted temperature
        thirdDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[18].main.temp - 273.15);
        // Display the third day's forecasted wind
        thirdDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[18].wind.speed;
        // Display the third day's forecasted humidity
        thirdDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[18].main.humidity;

        // Display the forth day's forecasted date
        forthDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[26].dt_txt + " (24-Hour Clock)";
        // Display the forth day's forecasted weather icon
        var iconValue = data.list[26].weather[0].icon;
        forthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the forth day's forecasted temperature
        forthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[26].main.temp - 273.15);
        // Display the forth day's forecasted wind
        forthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[26].wind.speed;
        // Display the forth day's forecasted humidity
        forthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[26].main.humidity;

        // Display the fifth day's forecasted date
        fifthDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[34].dt_txt + " (24-Hour Clock)";
        // Display the fifth day's forecasted weather icon
        var iconValue = data.list[34].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the fifth day's forecasted temperature
        fifthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[34].main.temp - 273.15);
        // Display the fifth day's forecasted wind
        fifthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[34].wind.speed;
        // Display the fifth day's forecasted humidity
        fifthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[34].main.humidity;

        // Display the sixth day's forecasted date
        sixthDayDate.innerHTML = "Date and Time".bold() + ": " + data.list[39].dt_txt + " (24-Hour Clock)";
        // Display the sixth day's forecasted weather icon
        var iconValue = data.list[39].weather[0].icon;
        sixthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the sixth day's forecasted temperature
        sixthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data.list[39].main.temp - 273.15);
        // Display the sixth day's forecasted wind
        sixthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data.list[39].wind.speed;
        // Display the sixth day's forecasted humidity
        sixthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data.list[39].main.humidity;

        // Saving the data from this fetch in localStorage
        var data3 = data;
        localStorage.setItem("weatherdata3", JSON.stringify(data3));
    })
}

// Load most recently searched for city's weather data
function load() {
    // Retrieve saved weather data from localStorage is any exists
    var data1 = JSON.parse(localStorage.getItem("weatherdata1")) || {};
    var data2 = JSON.parse(localStorage.getItem("weatherdata2")) || {};
    var data3 = JSON.parse(localStorage.getItem("weatherdata3")) || {};
    
    // If there is existing weather data in localStorage, then display it
    if (JSON.parse(localStorage.getItem("weatherdata1"))) {
        // Display the selected city's name
        selectedCity.innerHTML = data1.name;
            
        // Display the current date and time
        currentDate.innerHTML = "Date and Time".bold() + ": "  + now.toLocaleString(DateTime.DATETIME_MED);

        // Display the selected city's current temperature
        currentTemperature.innerHTML = "Temperature in Degrees Celsius".bold()  + ": "  + Math.round(data1.main.temp - 273.15);

        // Display the selected city's current wind speed
        currentWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": "  + data1.wind.speed;

        // Display the selected city's current humidity
        currentHumidity.innerHTML = "Humidity %".bold()  + ": "  + data1.main.humidity;

        // Saving the longitude and latitude for the searched for city
        currentLongitude = data1.coord.lon;
        currentLatitude = data1.coord.lat;

        // Display the current uv index
        currentUVIndex.innerHTML = "Current UV Index".bold() + ": " + data2.current.uvi;

        // Change the color of the UV Index
        // Low UV Index
        if (data2.current.uvi <= 3) {
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("green");
        }
        // Moderate UV Index
        if ((data2.current.uvi > 3) && (data2.current.uvi <= 6)) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("red");
            currentUVIndex.classList.add("yellow");
        }
        // High UV Index
        if (data2.current.uvi > 6) {
            currentUVIndex.classList.remove("green");
            currentUVIndex.classList.remove("yellow");
            currentUVIndex.classList.add("red");
        }

        // Display the current weather icon
        var iconValue = data3.list[0].weather[0].icon;
        currentWeatherIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        
        // Display the first day's forecasted date
        firstDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[2].dt_txt + " (24-Hour Clock)";        
        // Display the first day's forecasted weather icon
        var iconValue = data3.list[2].weather[0].icon;
        firstDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the first day's forecasted temperature
        firstDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[2].main.temp - 273.15);
        // Display the first day's forecasted wind
        firstDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[2].wind.speed;
        // Display the first day's forecasted humidity
        firstDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[2].main.humidity;

        // Display the second day's forecasted date
        secondDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[10].dt_txt + " (24-Hour Clock)";
        // Display the second day's forecasted weather icon
        var iconValue = data3.list[10].weather[0].icon;
        secondDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the second day's forecasted temperature
        secondDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[10].main.temp - 273.15);
        // Display the second day's forecasted wind
        secondDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[10].wind.speed;
        // Display the second day's forecasted humidity
        secondDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[10].main.humidity;

        // Display the third day's forecasted date
        thirdDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[18].dt_txt + " (24-Hour Clock)";
        // Display the third day's forecasted weather icon
        var iconValue = data3.list[18].weather[0].icon;
        thirdDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the third day's forecasted temperature
        thirdDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[18].main.temp - 273.15);
        // Display the third day's forecasted wind
        thirdDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[18].wind.speed;
        // Display the third day's forecasted humidity
        thirdDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[18].main.humidity;

        // Display the forth day's forecasted date
        forthDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[26].dt_txt + " (24-Hour Clock)";
        // Display the forth day's forecasted weather icon
        var iconValue = data3.list[26].weather[0].icon;
        forthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the forth day's forecasted temperature
        forthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[26].main.temp - 273.15);
        // Display the forth day's forecasted wind
        forthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[26].wind.speed;
        // Display the forth day's forecasted humidity
        forthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[26].main.humidity;

        // Display the fifth day's forecasted date
        fifthDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[34].dt_txt + " (24-Hour Clock)";
        // Display the fifth day's forecasted weather icon
        var iconValue = data3.list[34].weather[0].icon;
        fifthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the fifth day's forecasted temperature
        fifthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[34].main.temp - 273.15);
        // Display the fifth day's forecasted wind
        fifthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[34].wind.speed;
        // Display the fifth day's forecasted humidity
        fifthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[34].main.humidity;

        // Display the sixth day's forecasted date
        sixthDayDate.innerHTML = "Date and Time".bold() + ": " + data3.list[39].dt_txt + " (24-Hour Clock)";
        // Display the sixth day's forecasted weather icon
        var iconValue = data3.list[39].weather[0].icon;
        sixthDayIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconValue + "@2x.png' alt='Forecasted Weather Icon'></img>";
        // Display the sixth day's forecasted temperature
        sixthDayTemperature.innerHTML = "Temperature in Degrees Celsius".bold() + ": " + Math.round(data3.list[39].main.temp - 273.15);
        // Display the sixth day's forecasted wind
        sixthDayWind.innerHTML = "Wind Speed in Metres Per Second".bold() + ": " + data3.list[39].wind.speed;
        // Display the sixth day's forecasted humidity
        sixthDayHumidity.innerHTML = "Humidity %".bold() + ": " + data3.list[39].main.humidity;
    }

    // Add a button for the city in the Recent Searches container
    for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
        addCityButton(buttonList[i]);
    }
}

// Add a button for a recently-search city
function addCityButton(city) {
    // Create a new button for a city in the Recent Searches container
    var newButton = document.createElement("button");
    newButton.type = "submit";
    newButton.id = city;
    newButton.classList.add("btn");
    newButton.classList.add("btn-dark");
    newButton.value = city;
    newButton.textContent = city;

    // Add the button to the Recent Searches container
    buttons.appendChild(newButton);
}

// __________
// Initial Script Execution
// __________

// Load any existing weather data from localStorage if possible
load();

// Update the application every minute
setInterval(function() {location.reload();}, 60*1000);

// __________
// Event Listeners
// __________

form.addEventListener('submit', function(event) {
    // Prevent default event behaviours
    event.preventDefault();

    // Retrieve search value
    var searchValue = citySearch.value;

    // Fetching the first batch of data from an OpenWeatherMap API endpoint for the current weather to determine if a valid city was searched for
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        // Console logging either 200 for a successful request or 404 for an unsuccessful request
        console.log("Code: ", data.cod);

        // If the input value is empty or the API request was unsuccessful, then alert the user that an invalid city name was entered
        if ((searchValue == "") || (data.cod == 404)) {
            window.alert("'" + searchValue + "'" + " is not a valid city. Please try again.");
        }
        // If the API was succuessful, then fetch the weather data for the searched for city
        else {
            fetchWeatherData(searchValue);

            // Initializing a counter
            var j = 0;
            
            // Check to see if the searched for city is already in the buttonList
            for (var i = 0; (buttonList.length > 0) && (i < buttonList.length); i++) {
                if (buttonList[i] === searchValue) {
                    j++;
                }
            }

            // If the searched for city's if not in the buttonList, then add it to buttonList and create a button for it in the Recent Searches container
            if (j === 0) {
                buttonList.push(searchValue)
                localStorage.setItem("buttonlist", JSON.stringify(buttonList));
                addCityButton(searchValue);
            }
            }
        });
});

// Event listener for the buttons in the Recent Searches container
recentSearches.addEventListener('click', function(event) {
    // Prevent default event behaviours
    event.preventDefault();

    // Retrieve search value
    var searchValue = event.target.value;
    fetchWeatherData(searchValue);
});