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
                    this.updateClimateImg(climate);
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    updateWeatherInfo(cityName, temperature, feelsLike, clouds, wind, climate) {
        weatherInfo.innerText = `In ${cityName}, temperature is ${temperature}°C but feels like ${feelsLike}°C.
                                It's ${clouds}% cloudy, with wind speed of ${wind}m/s and the climate state is ${climate} like.`;
    }

    updateClimateImg(climate) {
        if(climate === `Thunderstorm`) {
            climateImg.src = `https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/undefined/external-thunderstorm-weather-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-3.png`;
        }
        if(climate === `Drizzle`) {
            climateImg.src = `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-drizzle-weather-flaticons-lineal-color-flat-icons.png`;
        }
        if(climate === `Rain`) {
            climateImg.src = `https://img.icons8.com/dusk/64/undefined/rain--v1.png`;
        }
        if(climate === `Snow`) {
            climateImg.src = `https://img.icons8.com/dusk/64/undefined/snow.png`;
        }
        if(climate === `Clear`) {
            climateImg.src = `https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/64/undefined/external-clear-sky-weather-kosonicon-lineal-color-kosonicon.png`;
        }
        if(climate === `Clouds`) {
            climateImg.src = `https://img.icons8.com/external-justicon-lineal-color-justicon/64/undefined/external-cloudy-weather-justicon-lineal-color-justicon-1.png`;
        }
        if(climate === `Mist`) {
            climateImg.src = `https://img.icons8.com/dusk/64/undefined/foggy-night-1.png`;
        }
        if(climate === `Smoke`) {
            climateImg.src = `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-smoke-factory-flaticons-lineal-color-flat-icons-2.png`;
        }
        if(climate === `Haze`) {
            climateImg.src = `https://img.icons8.com/plasticine/100/undefined/foggy-night-1.png`;
        }
        if(climate === `Dust`) {
            climateImg.src = `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-dust-weather-flaticons-lineal-color-flat-icons.png`;
        }
        if(climate === `Fog`) {
            climateImg.src = `https://img.icons8.com/external-fauzidea-flat-fauzidea/64/undefined/external-fog-weather-fauzidea-flat-fauzidea.png`;
        }
        if(climate === `Sand`) {
            climateImg.src = `https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/undefined/external-desert-landscape-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png`;
        }
        if(climate === `Ash`) {
            climateImg.src = `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-smoke-factory-flaticons-lineal-color-flat-icons-2.png`;
        }
        if(climate === `Squall`) {
            climateImg.src = `https://img.icons8.com/fluency/96/undefined/waterspout.png`;
        }
        if(climate === `Tornado`) {
            climateImg.src = `https://img.icons8.com/external-dreamcreateicons-outline-color-dreamcreateicons/64/undefined/external-tornado-weather-dreamcreateicons-outline-color-dreamcreateicons-2.png`;
        }
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