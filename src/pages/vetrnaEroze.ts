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
        zoom: 8,
        ui: {
            components: ["attribution"]
        }
    });

    view.ui.move("zoom", "bottom-left");
    
    // Remove loading indicator when map is ready
    view.when(() => {
        container.querySelector('.spinner-border')?.parentElement?.parentElement?.remove();
        
        // Add "Map in preparation" banner
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: hsl(0 0% 15% / 0.95);
            border: 2px solid hsl(200 100% 60%);
            border-radius: 8px;
            padding: 1.5rem 2.5rem;
            text-align: center;
            color: hsl(200 100% 60%);
            font-size: 1.25rem;
            font-weight: 600;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            pointer-events: none;
            z-index: 1000;
        `;
        banner.innerHTML = '🚧 Mapa je v přípravě 🚧';
        container.appendChild(banner);
    });
}
