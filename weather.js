"use strict";

const theApi = {
    key: "9ea0bdadb593a41acc0169b42e9cac42",
    url: "https://api.openweathermap.org/data/2.5/"
};

const search = document.querySelector(".search");
search.addEventListener("keydown", lookUp);

function lookUp(event) {
    if(event.keyCode === 13){
        theResult(search.value);
        console.log(search.value);
        event.currentTarget.value = "";
    };
};

function theResult(look) {
    
    const invalid = document.getElementById("invalid");

    fetch(`${theApi.url}weather?q=${look}&units=metric&APPID=${theApi.key}`)
        .then(weather => {
        return weather.json();
    }).then(display)
    .then(clear)
    .catch(() => {
        invalid.innerHTML = "Invalid City";
    });
};

function clear() {
    invalid.innerHTML = "";
};

function display(weather) {
    console.log(weather);
    let city = document.querySelector(".place .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;   

    let temperature = document.querySelector(".temp .temperature");
    temperature.innerHTML = `${Math.round(weather.main.temp)}°c`;

    let w = document.querySelector(".temp .weather");
    w.innerHTML = weather.weather[0].main;

    let feel = document.querySelector(".feel");
    let feelsLike = document.querySelector(".feels-like");
    feelsLike.innerHTML = "Feels Like";
    feel.innerHTML = `${Math.round(weather.main.feels_like)}°c`;

    let humid = document.querySelector(".humid");
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = "Humidity";
    humid.innerHTML = `${weather.main.humidity}%`;
    console.log(weather.main.humidity);
};

