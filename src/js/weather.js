import {allData} from './data.js';
import {language} from './language.js';

let doc = document;

let getDataWeatherToday = function (data) {
    allData.lastUpdated = data.current.last_updated_epoch;
    allData.dayId = data.current.is_day;
    allData.weatherId = data.current.condition.code;
    allData.weather = data.current.condition.text;
    allData.temperatureToday.celsius = data.current.temp_c;
    allData.temperatureToday.fahrenheit = data.current.temp_f;
    allData.feelsLike.celsius = data.current.feelslike_c;
    allData.feelsLike.fahrenheit = data.current.feelslike_f;
    allData.humidity = data.current.humidity;
    allData.wind = data.current.wind_kph;
    allData.visibility = data.current.vis_km;
    allData.weatherIcon.today = data.current.condition.icon;
}

let getDataWeatherNextDays = function (data) {
    let objsData = data.forecast.forecastday;
    allData.weatherIdNextDays = [];
    allData.temperatureNextDays.celsius = [];
    allData.temperatureNextDays.fahrenheit = [];
    allData.weatherIcon.nextDays = [];
    allData.dateNextDay = [];

    for (let i = 0; i < objsData.length; i++) {
        allData.weatherIdNextDays.push(objsData[i].day.condition.code);
        allData.temperatureNextDays.celsius.push(objsData[i].day.avgtemp_c);
        allData.temperatureNextDays.fahrenheit.push(objsData[i].day.avgtemp_f);
        allData.weatherIcon.nextDays.push(objsData[i].day.condition.icon);
        allData.dateNextDay.push(objsData[i].date);
    };
}

let assigningIcons = function (dayId = 1, weatherId, iconDay, spareIcon) {
    let dayOrNight;

    if (dayId === 0) {
        dayOrNight = 'night';
    } else {
        dayOrNight = 'day';
    }

    if (weatherId === 1000) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/113.svg'>`;
    } else if (weatherId === 1003) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/116.svg'>`;
    } else if (weatherId === 1006) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/119.svg'>`;
    } else if (weatherId === 1009) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/122.svg'>`;
    } else if (weatherId === 1030 || weatherId === 1135 || weatherId === 1147) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/143-248-260.svg'>`;
    } else if (weatherId === 1063 || weatherId === 1180 || weatherId === 1186 || weatherId === 1240) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/176-293-299-353.svg'>`;
    } else if (weatherId === 1150 || weatherId === 1153 || weatherId === 1183) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/263-266-296.svg'>`;
    } else if (weatherId === 1189 || weatherId === 1195) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/302-308.svg'>`;
    } else if (weatherId === 1192 || weatherId === 1243 || weatherId === 1246) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/305-356-359.svg'>`;
    } else if (weatherId === 1210 || weatherId === 1216 || weatherId === 1255) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/323-329-368.svg'>`;
    } else if (weatherId === 1222 || weatherId === 1252 || weatherId === 1258) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/335-365-371.svg'>`;
    } else if (weatherId === 1213 || weatherId === 1219 || weatherId === 1225) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/326-332-338.svg'>`;
    } else if (weatherId === 1276) {
        iconDay.innerHTML = `<img src='./../src/assets/images/icon/${dayOrNight}/389.svg'>`;
    } else {
        iconDay.innerHTML = `<img src='${spareIcon}'>`;
    }
}

export function getWeather() {
    const lng = allData.coordinates.lng;
    const lat = allData.coordinates.lat;
    const key = '485137a585be4832b85155503210705';
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},
        ${lng}&days=4&lang=${allData.currentLanguage}&aqi=no&alerts=no`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (allData.lastUpdated < data.current.last_updated_epoch) {
                getDataWeatherToday(data);
                getDataWeatherNextDays(data);
                allData.weatherUpdate = true;
            } else {
                allData.weatherUpdate = false;
            }
        })
        .catch(error => {
            console.log(error);
            let elErr = document.querySelector('.error');
            let lang = [allData.currentLanguage];
            elErr.querySelector('.error__message').textContent =
                language.weather.background[lang];
            elErr.classList.add('active');
        })
}

export function setWeatherToday() {
    return new Promise((resolve) => {
        let tempKey = [allData.currentUnitOfTemperature];

        doc.querySelector('.weather__temp-today').textContent =
            allData.temperatureToday[tempKey];
        doc.querySelector('.weather__today-description').textContent =
            allData.weather;
        doc.querySelector('.weather__feels-like').textContent =
            allData.feelsLike[tempKey];
        doc.querySelector('.weather__wind').textContent =
            ((allData.wind) * 0.28).toFixed(1);
        doc.querySelector('.weather__humidity').textContent =
            allData.humidity;
        doc.querySelector('.weather__visibility').textContent =
            allData.visibility;
        assigningIcons(
            allData.dayId,
            allData.weatherId,
            doc.querySelector('.weather__icon-today'),
            allData.weatherIcon.today
        );
        setTimeout(() => {
            resolve()
        }, 0)
    });
}

export function setWeatherNextDays(days) {
    return new Promise((resolve) => {
        let tempKey = [allData.currentUnitOfTemperature];

        for (let i = 0; i < days; i++) {
            let date = new Date(allData.dateNextDay[i])
            let lang = [allData.currentLanguage];

            doc.querySelector('.weather__title-day-' + i).textContent =
                language.dayOfWeek[lang][date.getDay()];
            doc.querySelector('.weather__temp-day-' + i).textContent =
                allData.temperatureNextDays[tempKey][i];
            assigningIcons(
                1,
                allData.weatherIdNextDays[i],
                doc.querySelector('.weather__icon-day-' + i),
                allData.weatherIcon.nextDays[i]
            );
        }

        setTimeout(() => {
            resolve()
        }, 0)
    });
}