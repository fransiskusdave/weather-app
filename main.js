const apiKey = "5db16362e7541a79b003a90c191f9367";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const button = document.querySelector(".search button");
const error = document.querySelector(".error");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
  } else {
    let data = await response.json();

    const cityName = document.querySelector(".city");
    cityName.innerText = data.name;

    const temperature = document.querySelector(".temperature");
    temperature.innerText = `${Math.round(data.main.temp)}°C`;

    const humidity = document.querySelector(".humidity");
    humidity.innerText = `${data.main.humidity}%`;

    const wind = document.querySelector(".wind");
    wind.innerText = `${data.wind.speed} km/h`;

    const weatherIcon = document.querySelector(".weather-icon");
    if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    }

    weather.style.display = "block";
    error.style.display = "none";
  }
}

button.addEventListener("click", (e) => {
  const inputBox = document.querySelector(".search input").value;
  checkWeather(inputBox);
  e.preventDefault();
});
