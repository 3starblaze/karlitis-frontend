import { useEffect } from 'react';
import * as L from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';
import proj4 from 'proj4';

let map;
function Map({ points, home }) {
    useEffect(() => {
        // Example of how to turn EPSG:3857 (coords in data) into LatLng (coords used by leaflet) 
        const latLngCoord = proj4("EPSG:3857", "EPSG:4326", [2807409, 7682065]);
        const flippedCoord = [latLngCoord[1], latLngCoord[0]];
        if(!map) map = L.map('map').setView(flippedCoord, 13);

        let test = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        points.forEach((pointData) => {
            if (pointData === null) return;

            const latLngCoord = proj4("EPSG:3857", "EPSG:4326", pointData.latLng);
            const flippedCoord = [latLngCoord[1], latLngCoord[0]];
            let point = L.marker(flippedCoord);

            point.bindPopup(`<p>${ pointData.name }</p>`);
            point.addTo(map);
        });

		if (home !== null) {
			let point = L.marker(home);

			point.bindPopup(`<p>Home</p>`);
			point.addTo(map);

			map.setView(home);
		}

        test.addTo(map);
    });
    return (
        <div
        id="map"
        className="bg-blue-100 h-80 lg:w-full lg:h-screen"></div>
    )
}

export default Map;
