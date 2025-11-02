import "@arcgis/core/assets/esri/themes/dark/main.css";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";

export function loadMap(containerId: string) {
    const container = document.getElementById(containerId)!;

    // Show loading indicator
    container.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; background: hsl(0 0% 10%);">
            <div style="text-align: center; color: hsl(200 100% 60%);">
                <div class="spinner-border" role="status" style="width: 2.5rem; height: 2.5rem; border-width: 0.25em;">
                    <span class="visually-hidden">Načítání mapy...</span>
                </div>
                <p style="margin-top: 0.75rem; font-size: 0.95rem; opacity: 0.8;">Načítání mapy...</p>
            </div>
        </div>
    `;

    const webmap = new WebMap({
        portalItem: {
            id: "a246009483044bdbaf84cf21b8b45fb1"
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

    // Remove loading indicator when map is ready
    view.when(() => {
        container.querySelector('.spinner-border')?.parentElement?.parentElement?.remove();
    });
}
