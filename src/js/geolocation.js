import {allData} from './data';
import {language} from './language';

export function findCity(city) {
    let key = 'c6b6da0f80f24b299e08ee1075f81aa5&pretty'
    let url = `https://api.opencagedata.com/geocode/v1/json?q=${city}
        &key=${key}=1&no_annotations=11&language=${allData.currentLanguage}`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            allData.coordinates.lat = data.results[0].geometry.lat;
            allData.coordinates.lng = data.results[0].geometry.lng;

            if (data.results[0].components.village) {
                allData.city = data.results[0].components.village;
            } else if (data.results[0].components.hamlet) {
                allData.city = data.results[0].components.hamlet;
            } else if (data.results[0].components.town) {
                allData.city = data.results[0].components.town;
            } else {
                allData.city = data.results[0].components.city;
            }
            allData.country = data.results[0].components.country;

            document.querySelector('.title__location').textContent =
                `${allData.city}, ${allData.country}`;
            document.querySelector('.latitude').textContent =
                ((allData.coordinates.lat).toFixed(2)).replace(".", "°") + "'";
            document.querySelector('.longitude').textContent =
                ((allData.coordinates.lng).toFixed(2)).replace(".", "°") + "'";
        })
        .catch(error => {
            let elErr = document.querySelector('.error');
            let lang = [allData.currentLanguage];
            elErr.querySelector('.error__message').textContent =
                language.error.query[lang];
            elErr.classList.add('active');
        })
}

export function findGeolocation() {
    return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(function (position) {
                allData.coordinates.lat = position.coords.latitude;
                allData.coordinates.lng = position.coords.longitude;
            });
            setTimeout(() => {
                resolve();
            }, 0);
        })
        .catch(error => {
            let elErr = document.querySelector('.error');
            let lang = [allData.currentLanguage];
            elErr.querySelector('.error__message').textContent =
                language.error.currentCoordinates[lang];
            elErr.classList.add('active');
        })
}

export function findIpLocation() {
    let key = 'f18649bed1c734';
    let url = `https://ipinfo.io?token=${key}`
    return fetch(url)
        .then(response => response.json())
        .then(data => allData.city = data.city)
        .catch(error => {
            let elErr = document.querySelector('.error');
            let lang = [allData.currentLanguage];
            elErr.querySelector('.error__message').textContent =
                language.error.currentCoordinates[lang];
            elErr.classList.add('active');
        })
}
