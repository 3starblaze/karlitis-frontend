import { useEffect } from 'react';
import * as L from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';

function Map() {
    useEffect(() => {
        let map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    });
    return (
        <div
        id="map"
        className="bg-blue-100 h-80 lg:w-full"></div>
    )
}

export default Map;
