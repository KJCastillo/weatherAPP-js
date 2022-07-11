const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;F</span>
    </div>
    `;

    //remove d-none
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //prevent refresh

  const city = cityForm.city.value.trim();
  cityForm.reset();
  //get city value from form and reset it after

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
  //update the ui with new city
});
