import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export function loadMap(containerId: string) {
    const map = new Map({
        basemap: "topo-vector"
    });

    new MapView({
        map: map,
        container: containerId,
        center: [14.4208, 50.0880], // Prague coordinates
        zoom: 8
    });
}
