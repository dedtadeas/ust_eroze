import "@arcgis/core/assets/esri/themes/light/main.css";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";

export function loadMap(containerId: string) {
    const webmap = new WebMap({
        portalItem: {
            id: "59bc4eb4eaee4fc48931611029997ff9"
        }
    });

    const view = new MapView({
        map: webmap,
        container: containerId
    });


    const layerList = new LayerList({
        view: view
    });

    view.ui.add(layerList, "top-right");
}
