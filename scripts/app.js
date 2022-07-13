const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;F</span>
    </div>
    `;

  //update images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  //remove d-none
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

  localStorage.setItem("city", city);
  //setlocalstorage
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
//checks local storage for city and updates UI if true
//run updateCity() and that returns a promise
//after promise updateUI() with data