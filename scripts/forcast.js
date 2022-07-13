class Forecast {
  constructor() {
    this.key = "WtRG6JMrpA6mdIlBgOidOHtjrape7j6n";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    //query takes api key const and then paramater for city
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}

//must have .then since function is async and promise needs to be resolved
//get input from getCity, takes the key from the array and passes it to getWeather for it's current condition
//multiple .then because each returns a promise that must be resolved
