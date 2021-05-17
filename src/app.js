import './main.scss';
import {allData} from './js/data';
import {findCity, findGeolocation, findIpLocation} from './js/geolocation';
import {setMap, updateMap, changeLanguageOfMap} from './js/map';
import {getWeather, setWeatherToday, setWeatherNextDays} from './js/weather';
import {showTime, getImage, setTempDeg, translate, setLocalStorage, getLocalStorage} from './js/utils'

let doc = document;
let refreshBtn = doc.querySelector('.header__btn-refresh');
let langEnBtn = doc.querySelector('.header__btn-eng-lang');
let langRuBtn = doc.querySelector('.header__btn-ru-lang');
let tempCelBtn = doc.querySelector('.header__btn-celsius-deg');
let tembFahBtn = doc.querySelector('.header__btn-fahrenheid-deg');
let locatiosBtn = doc.querySelector('.header__btn-current-location');
let searchBtn = doc.querySelector('.header__search-btn');
let searchInput = doc.querySelector('.header__search-input');

async function runApp(city) {
    await findCity(city);
    await getWeather(allData.coordinates.lng, allData.coordinates.lat);
    await translate();
    await setWeatherToday();
    await setWeatherNextDays(3);
    await updateMap(allData.coordinates.lng, allData.coordinates.lat);
    await setLocalStorage();
}

window.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    setMap(allData.coordinates.lng, allData.coordinates.lat);
    findIpLocation()
        .then(() => updateMap(allData.coordinates.lng, allData.coordinates.lat))
        .then(() => runApp(allData.city))
        .then(() => translate())
        .then(() => changeLanguageOfMap())
        .then(() => showTime());
})

refreshBtn.addEventListener('click', () => {
    getImage() 
})

langEnBtn.addEventListener('click', () => {
    langRuBtn.classList.remove('header__btn--active');
    langEnBtn.classList.add('header__btn--active');
    allData.currentLanguage = 'en';
    findCity(allData.city)
            .then(() => getWeather(allData.coordinates.lng, allData.coordinates.lat))
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
            .then(() => getWeather(allData.coordinates.lng, allData.coordinates.lat))
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
      
});

