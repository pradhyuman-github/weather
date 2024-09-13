"use strict";

const apiKey = "08de8e716e100d02cbc6c459d99871e9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".align input");
const searchBtn = document.querySelector(".align button");

async function chechWeather(cityname) {
    const response = await fetch(apiUrl + cityname + `&appid=${apiKey}`);
    
    if(response.status == 404) {
        document.querySelector(".error-message").style.display = 'block';
        document.querySelector(".info-box").style.display = 'none';
    }
    else {
        var data = await response.json();
        console.log(data);
        
        document.querySelector(".error-message").style.display = 'none';        
        document.querySelector(".info-box").style.display = 'block';        
        
        document.querySelector(".cityname").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";  
    
        const condition = data.weather[0].main;
        updateWeatherIcon(condition);
    
        function updateWeatherIcon(condition) {
            const weatherIcon = document.querySelector(".weather-icon");
            weatherIcon.className = "weather-icon";
            const iconMap = {'Clear':'fa-sun', 'Clouds':'fa-cloud', 'Rain':'fa-cloud-showers-heavy', 
                'Mist':'fa-cloud-rain', 'Drizzle':'fa-cloud-rain', 'Snow': 'fa-snowflake', 
                'Haze': 'fa-smog', 'Fog': 'fa-smog', 'Thunderstorm': 'fa-cloud-bolt'
            };
            const iconClass = iconMap[condition] || 'fa-cloud-sun';
            weatherIcon.classList.add('fas', iconClass);
        }
        
        
        const weatherBg = {                       
            'clear' : {
                image: "url('weather-img/clearsky.jpg')",
                size : "cover",
                repeat : "no-repeat"
            },
            'clouds' : { 
                image : "url('weather-img/cloud.avif')",
                size : "100% 100%",
                repeat : "no-repeat"
            },
            'rain' : {
                image : "url('weather-img/rain.jpg')",
                size : "cover",
                repeat : "no-repeat"
            },
            'mist' : {
                image : "url('weather-img/mist.jpg')",
                size : "100% 100%",
                repeat : "no-repeat"
            },
            'drizzle' : {
                image : "url('weather-img/mist.jpg')",
                size : "100% 100%",
                repeat : "no-repeat"
            },
            'snow' : {
                image : "url('weather-img/snow.jpg')",
                size : "100% 100%",
                repeat : "no-repeat"
            },
            'haze' : {
                image : "url('weather-img/haze.jpg')",
                size : "cover",
                repeat : "no-repeat"
            },
            'fog' : {
                image : "url('weather-img/fog.jpg')",
                size : "100% 100%",
                repeat : "no-repeat"
            },
            'thunderstorm' : {
                image : "url('weather-img/thunder.jpg')",
                size : "100% 100%",
                repeat : "no-repeat"
            }
        };

        function updateWeatherBg(condition) {
            const bg = document.querySelector("body");
            const lowerCase = condition.toLowerCase(); 
            
            const backgroundSettings = weatherBg[lowerCase] || weatherBg['clear'];
            bg.style.backgroundImage = backgroundSettings.image;
            bg.style.backgroundSize = backgroundSettings.size;
            bg.style.backgroundRepeat = backgroundSettings.repeat;

            document.querySelector("h3").innerText = condition;
        }
        updateWeatherBg(condition);
    }
}

searchBtn.addEventListener("click" , () => {
    chechWeather(searchBox.value);
});

