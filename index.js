const cityForm = document.querySelector(`[data-city-form]`);
const cityInput = document.querySelector(`[data-city-input]`);
const weatherInfo = document.querySelector(`[data-weather-info]`);
const climateImg = document.querySelector(`[data-climate-img]`);

const storedData = (() => {
    const apiKey = `0d056e5e90bb186470326a358eb17b3c`;
    const tempKelvin = 273;
    return {
        apiKey,
        tempKelvin,
    }
})();

class Weather {
    constructor() {
        // empty;
    }

    async fetchAndProcessData(apiUrl) {
        try {
            fetch(apiUrl, {mode: `cors`})
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    const temperature = (response.main.temp - storedData.tempKelvin).toFixed(1).toString();
                    const cityName = response.name.toString();
                    const feelsLike = (response.main.feels_like - storedData.tempKelvin).toFixed(1).toString();
                    const wind = response.wind.speed.toString();
                    const clouds = response.clouds.all.toString();
                    const climate = response.weather[0].main;

                    this.updateWeatherInfo(cityName, temperature, feelsLike, clouds, wind, climate);                    
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    updateWeatherInfo(cityName, temperature, feelsLike, clouds, wind, climate) {
        weatherInfo.innerText = `In ${cityName}, temperature is ${temperature}°C but feels like ${feelsLike}°C.
                                It's ${clouds}% cloudy, with wind speed of ${wind} and the climate is ${climate}.`;
    }
}

const weatherApp = new Weather();

cityForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if(cityInput.value === ``) return;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${storedData.apiKey}`;
    weatherApp.fetchAndProcessData(apiUrl);
    cityInput.value = null;
});