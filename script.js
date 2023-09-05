const key = "d3acb866-3a04-49f7-9f81-53c2e61a7406";

const loader = document.querySelector(".loader-container");
const errorInformation = document.querySelector(".error-information");

async function getWeatherData() {
  try {
    const response = await fetch(
      "http://api.airvisual.com/v2/nearest_city?key=d3acb866-3a04-49f7-9f81-53c2e61a7406"
    ).catch(() => {
      throw new Error("Problème de connexion internet");
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status},${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData)
    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      iconId: responseData.data.current.weather.ic,
      temperature: responseData.data.current.weather.tp,
      humidity: responseData.data.current.weather.hu, 
  };
    console.log(sortedData)

    populateUI(sortedData);
  } catch (error) {
    loader.classList.remove("active");
    errorInformation.textContent = error.message;
  }
}
getWeatherData();

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");
const infoIcon = document.querySelector(".info-icon");
const humidityElement = document.querySelector(".humidity");

function populateUI(data) {
  cityName.textContent = data.city;
    countryName.textContent = data.country;
    temperature.textContent = `${data.temperature}°`;
    infoIcon.src = `ressources/icons/${data.iconId}.svg`;
    infoIcon.style.width = "150px";
    humidityElement.textContent = `${data.humidity}%`;
    loader.classList.remove("active");
}
