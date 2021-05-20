import {allData} from './data.js';
import {language} from './language.js';
import {
    getWeather,
    setWeatherToday,
    setWeatherNextDays
} from './weather.js'

let doc = document;
let rotateDeg = 0;

export function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    let date = today.getDate();
    let month;
    let weekDay;

    if (allData.currentLanguage === 'en') {
        month = language.month.en[today.getMonth()];
        weekDay = language.shortDayOfWeek.en[today.getDay()];
    } else {
        month = language.month.ru[today.getMonth()];
        weekDay = language.shortDayOfWeek.ru[today.getDay()];
    }

    doc.querySelector('.title__date').textContent = `${weekDay}, ${date} ${month}`;
    doc.querySelector('.title__time').textContent = `${hour}:${addZeroTime(min)}:${addZeroTime(sec)}`;
    setTimeout(showTime, 1000);
}

function addZeroTime(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function loadImage(urlImage) {
    rotateDeg += 360;
    let img = document.querySelector('.background__image');
    let iconRefresh = document.querySelector('.header__refresh-circle-arrows');

    iconRefresh.style['transform'] = `rotate(${rotateDeg}deg)`;
    img.style['background-image'] = `url(${urlImage})`;
    img.classList.add('background__image-delete');
    setTimeout(() => {
        img.classList.remove('background__image-delete');
    }, 2000)
}

export function translate() {
    let lang = [allData.currentLanguage];
    doc.querySelector('.header__search-input')
        .setAttribute('placeholder', language.searchInput[lang]);
    doc.querySelector('.header__search-btn').textContent =
        language.searchButton[lang];
    doc.querySelector('.weather__title-feels-like').textContent =
        language.weatherConditions.feelsLike[lang];
    doc.querySelector('.weather__title-wind').textContent =
        language.weatherConditions.wind[lang];
    doc.querySelector('.weather__wind-unit').textContent =
        language.weatherConditions.windUnit[lang];
    doc.querySelector('.weather__title-humidity').textContent =
        language.weatherConditions.humidity[lang];
    doc.querySelector('.weather__title-renge').textContent =
        language.weatherConditions.visRange[lang];
    doc.querySelector('.weather__visibility-unit').textContent =
        language.weatherConditions.visRangeUnit[lang];
    doc.querySelector('.title-latitude').textContent =
        language.latitude[lang];
    doc.querySelector('.title-longitude').textContent =
        language.longitude[lang];
    doc.querySelector('.splash-screen-text').textContent =
        language.preloader[lang];
    showTime();
}

export function getImage() {
    let key = 'JtHvIZb0hBW0IQpqUKN0vF-meUy8nDWf38FWLBMnfDs'
    let url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1
        &query=nature&client_id=${key}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadImage(data.urls.regular)
        })
        .catch(error => {
            let elErr = document.querySelector('.error');
            let lang = [allData.currentLanguage];
            elErr.querySelector('.error__message').textContent =
                language.error.background[lang];
            elErr.classList.add('active');
        })
}

export function setTempDeg(days) {
    let tempKey = [allData.currentUnitOfTemperature];

    doc.querySelector('.weather__temp-today').textContent =
        allData.temperatureToday[tempKey];
    doc.querySelector('.weather__feels-like').textContent =
        allData.feelsLike[tempKey];

    for (let i = 0; i < days; i++) {
        doc.querySelector('.weather__temp-day-' + i).textContent =
            allData.temperatureNextDays[tempKey][i];
    };
}

export function getLocalStorage() {
    return new Promise((resolve) => {
        if (localStorage.getItem('language') !== null) {
            allData.currentLanguage = localStorage.getItem('language');
        };

        if (localStorage.getItem('temp') !== null) {
            allData.currentUnitOfTemperature = localStorage.getItem('temp');
        }

        if (allData.currentLanguage === 'en') {
            doc.querySelector('.header__btn-eng-lang').classList.add('header__btn--active');
            doc.querySelector('.header__btn-ru-lang').classList.remove('header__btn--active');
        } else {
            doc.querySelector('.header__btn-ru-lang').classList.add('header__btn--active');
            doc.querySelector('.header__btn-eng-lang').classList.remove('header__btn--active');
        };

        if (allData.currentUnitOfTemperature === 'celsius') {
            doc.querySelector('.header__btn-celsius-deg').classList.add('header__btn--active');
            doc.querySelector('.header__btn-fahrenheid-deg').classList.remove('header__btn--active')
        } else {
            doc.querySelector('.header__btn-fahrenheid-deg').classList.add('header__btn--active')
            doc.querySelector('.header__btn-celsius-deg').classList.remove('header__btn--active');
        };
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

export function setLocalStorage() {
    localStorage.setItem('language', allData.currentLanguage);
    localStorage.setItem('temp', allData.currentUnitOfTemperature);
}

export function weatherUpdateController() {
    getWeather()
        .then(() => {
            if (allData.weatherUpdate === true) {
                setWeatherToday();
                setWeatherNextDays();
            }
        })

}
