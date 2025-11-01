import "@arcgis/core/assets/esri/themes/dark/main.css";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

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
    
    const map = new Map({
        basemap: "streets-vector"
    });

    const view = new MapView({
        map: map,
        container: containerId,
        center: [14.4208, 50.0880], // Prague coordinates
        zoom: 8
    });
    
    // Remove loading indicator when map is ready
    view.when(() => {
        container.querySelector('.spinner-border')?.parentElement?.parentElement?.remove();
    });
}
