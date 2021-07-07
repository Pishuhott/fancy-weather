import {allData} from './data';

let map;
let marker;

export function setMap() {
    const lng = allData.coordinates.lng;
    const lat = allData.coordinates.lat;

    return new Promise((resolve) => {
        mapboxgl.accessToken =
            'pk.eyJ1IjoicGlzaHVob3R0IiwiYSI6ImNrb2luZmxtYTFoODQybnRyejRiZnhueDMifQ.5IzK17HFZAddy9hkg64rMg';
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 11,
        });

        marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

        setTimeout(() => {
            resolve();
        }, 0)
    })
};

export function updateMap() {
    const lng = allData.coordinates.lng;
    const lat = allData.coordinates.lat;

    map.flyTo({
        center: [lng, lat],
        essential: true
    });

    marker.remove();
    marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map);
}

export function changeLanguageOfMap() {
    return new Promise((resolve) => {
        map.getStyle().layers.map((each) => {
            if (
                each.hasOwnProperty('layout') &&
                each.layout.hasOwnProperty('text-field')
            ) {
                if (!each.id.includes('road'))
                    map.setLayoutProperty(each.id, 'text-field', [
                        'get',
                        `name_${allData.currentLanguage}`,
                    ]);
            }
        });

        setTimeout(() => {
            resolve();
        }, 0)
    })
}
