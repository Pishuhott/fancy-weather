export let allData = {
    currentLanguage: 'en',
    currentUnitOfTemperature: 'celsius',
    coordinates: {
        lat: 0,
        lng: 0,
    },
    temperatureToday: {
        celsius: 0,
        fahrenheit: 0,
    },
    temperatureNextDays: {
        celsius: [0, 0, 0],
        fahrenheit: [0, 0, 0],
    },
    weatherIcon: {
        today: '',
        nextDays: [],
    },
    lastUpdated: 0,
    weatherUpdate: false,
    dateNextDay: [0, 0, 0],
    weatherId: 0,
    weatherIdNextDays: [0, 0, 0, ],
    dayId: 1,
    weather: 0,
    feelsLike: {
        celsius: 0,
        fahrenheit: 0,
    },
    humidity: 0,
    wind: 0,
    visibility: 0,
    city: '',
    country: '',
};
