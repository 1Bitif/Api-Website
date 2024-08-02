document.addEventListener('DOMContentLoaded', () => {
    fetch('city_coordinates.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const select = document.getElementById('location');
            lines.forEach(line => {
                const [latitude, longitude, city, country] = line.split(',');
                if (city && country) {
                    const option = document.createElement('option');
                    option.value = `${latitude},${longitude}`;
                    option.textContent = `${city}, ${country}`;
                    select.appendChild(option);
                }
            });
        });
});

function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) return;

    const [lat, lon] = location.split(',');
    fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data.dataseries);
        });
}
// import img from "../images/clear.png";
function getWeatherIcon(weather) {
    const iconMap = {
        'Clear': "../images/clear.png",
        'Partly Cloudy': '../images/pcloudy.png',
        'Cloudy': '../images/cloudy.png',
        'Very Cloudy': '../images/very-cloudy.png',
        'Foggy': '../images/fog.png',
        'Light rain or showers': '../images/lightrain.png',
        'Occasional showers': '../images/oshower.png',
        'Isolated showers': '../images/ishower.png',
        'Light or occasional snow': '../images/snow.png',
        'Rain': '../images/rain.png',
        'Snow': '../images/snow.png',
        'Mixed': '../images/mixed.png',
        'Thunderstorm possible': '../images/tstorm.png',
        'Thunderstorm': '../images/tstorm.png',
        'Windy': '../images/windy.png'
    };
    return iconMap[weather] || '../images/default-icon.png';
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    data.forEach(entry => {
        const date = new Date(entry.timepoint * 1000);
        const temp = entry.temp2m;
        const weather = entry.weather;
        const weatherIcon = getWeatherIcon(weather);

        const weatherCard = document.createElement('div');
        weatherCard.className = 'swiper-slide weather-card';

        weatherCard.innerHTML = `
            <img src="${weatherIcon}" alt="${weather}">
            <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Weather:</strong> ${weather}</p>
        `;
        weatherInfo.appendChild(weatherCard);
    });

    initSwiper();
}

function initSwiper() {
    new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });
}
