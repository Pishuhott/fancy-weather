import {allData} from './js/data.js';
import {
    findCity,
    findGeolocation,
    findIpLocation
} from './js/geolocation.js';
import {
    setMap,
    updateMap,
    changeLanguageOfMap
} from './js/map.js';
import {
    getWeather,
    setWeatherToday,
    setWeatherNextDays
} from './js/weather.js';
import {
    getImage,
    setTempDeg,
    translate,
    setLocalStorage,
    getLocalStorage,
    weatherUpdateController
} from './js/utils.js'

let doc = document;
let refreshBtn = doc.querySelector('.header__btn-refresh');
let langEnBtn = doc.querySelector('.header__btn-eng-lang');
let langRuBtn = doc.querySelector('.header__btn-ru-lang');
let tempCelBtn = doc.querySelector('.header__btn-celsius-deg');
let tembFahBtn = doc.querySelector('.header__btn-fahrenheid-deg');
let locatiosBtn = doc.querySelector('.header__btn-current-location');
let searchBtn = doc.querySelector('.header__search-btn');
let searchInput = doc.querySelector('.header__search-input');
let errBtn = doc.querySelector('.error__confirm-button');

async function runApp(city) {
    allData.lastUpdated = 0;
    await findCity(city);
    await getWeather();
    await setWeatherToday();
    await setWeatherNextDays(3);
    await updateMap();
    await setLocalStorage();
}

window.addEventListener('load', () => {
    findIpLocation()
        .then(() => runApp(allData.city))
        .then(() => changeLanguageOfMap())
        .then(() => {
            setTimeout(() => {
                doc.querySelector('.background__splash-screen')
                    .classList.remove('active');
            }, 1000)
        });
})

window.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    setMap();
    translate();
})

refreshBtn.addEventListener('click', () => {
    getImage()
})

langEnBtn.addEventListener('click', () => {
    langRuBtn.classList.remove('header__btn--active');
    langEnBtn.classList.add('header__btn--active');
    allData.currentLanguage = 'en';
    findCity(allData.city)
        .then(() => getWeather())
        .then(() => setWeatherToday())
        .then(() => setWeatherNextDays(3))
        .then(() => translate())
        .then(() => changeLanguageOfMap())
        .then(() => setLocalStorage())
})

langRuBtn.addEventListener('click', () => {
    langEnBtn.classList.remove('header__btn--active');
    langRuBtn.classList.add('header__btn--active');
    allData.currentLanguage = 'ru';
    findCity(allData.city)
        .then(() => getWeather())
        .then(() => setWeatherToday())
        .then(() => setWeatherNextDays(3))
        .then(() => translate())
        .then(() => changeLanguageOfMap())
        .then(() => setLocalStorage())
})

tempCelBtn.addEventListener('click', () => {
    tembFahBtn.classList.remove('header__btn--active');
    tempCelBtn.classList.add('header__btn--active');
    allData.currentUnitOfTemperature = 'celsius';
    setTempDeg(3);
    setLocalStorage();
})

tembFahBtn.addEventListener('click', () => {
    tempCelBtn.classList.remove('header__btn--active');
    tembFahBtn.classList.add('header__btn--active');
    allData.currentUnitOfTemperature = 'fahrenheit';
    setTempDeg(3);
    setLocalStorage();
})

locatiosBtn.addEventListener('click', () => {
    findGeolocation()
        .then(() => runApp(allData.coordinates.lat +
            ',' + allData.coordinates.lng))
})

searchBtn.addEventListener('click', () => {
    runApp(searchInput.value)
})

searchInput.onkeydown = function () {
    this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
}

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        runApp(searchInput.value)
    }
})

errBtn.addEventListener('click', () => {
    doc.querySelector('.error').classList.remove('active')
})

setInterval(() => {
    weatherUpdateController()
}, 9e5)
