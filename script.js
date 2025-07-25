function getWeather(){
    const apikey = 'a4790a6a0f2b81916683dc8687b7a69e';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }

    // Constructing API URLs
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`;

    //We create a GET request to API => gets a response => parse json response => display data using the function
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data=>{
            displayWeather(data)
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data=>{
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error Fetching the hourly forecast data:',error);
            alert('Error fetching hourly forecast data. Please try again.');
        })
}
/* We created a getWeather function that does
          1. Displays current weather of the specified city
          2. Forecasts weather data
          3. Alerts incase of error
    We use API keys to do all these */

function displayWeather(data){
    //Creating variables that would be used to update current weather
    //We create references to HTML elements that would display weather
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //Clear previous content
    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML='';
    tempDivInfo.innerHTML='';

    //If error we display error exist
    if(data.cod==='404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode =data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;

        const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlydata){
    //Referencing the HTML elements
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlydata.slice(0,8);

    //Variables to display the forecast    
    next24Hours.forEach(item =>{
        const dateTime= new Date(item.dt_txt);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp-273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl= `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature} °C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
        
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
