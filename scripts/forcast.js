const key = "WtRG6JMrpA6mdIlBgOidOHtjrape7j6n";

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  //query takes api key const and then paramater for city

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

getCity("San Diego")
  .then((data) => {
    return getWeather(data.Key);
  })
  .then((data) => {
    data;
  })
  .catch((err) => console.log(err));
//must have .then since function is async and promise needs to be resolved
//get input from getCity, takes the key from the array and passes it to getWeather for it's current condition
//multiple .then because each returns a promise that must be resolved