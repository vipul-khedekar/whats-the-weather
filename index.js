const cityForm = document.querySelector(`[data-city-form]`);
const cityInput = document.querySelector(`[data-city-input]`);

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

    async fetchData(apiUrl) {
        try {
            fetch(apiUrl, {mode: `cors`})
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                console.log(Math.round(response.main.temp - storedData.tempKelvin));
            });
        }
        catch (err) {
            console.error(err);
        }
    }
}

const weatherApp = new Weather();

cityForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    if(cityInput.value === ``) return;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${storedData.apiKey}`;
    weatherApp.fetchData(apiUrl);
    cityInput.value = null;
});