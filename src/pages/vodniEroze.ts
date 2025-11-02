import "@arcgis/core/assets/esri/themes/dark/main.css";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";
import Search from "@arcgis/core/widgets/Search";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";

export function loadMap(containerId: string) {
    const container = document.getElementById(containerId)!;

    // 🔄 Loading overlay
    container.innerHTML = `
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:hsl(0 0% 10%)">
      <div style="text-align:center;color:hsl(200 100% 60%)">
        <div class="spinner-border" role="status" style="width:2.5rem;height:2.5rem;border-width:0.25em;">
          <span class="visually-hidden">Načítání mapy...</span>
        </div>
        <p style="margin-top:0.75rem;font-size:0.95rem;opacity:0.8;">Načítání mapy...</p>
      </div>
    </div>
  `;

    // 🗺️ Create WebMap (default basemap: satellite)
    const webmap = new WebMap({
        portalItem: { id: "a246009483044bdbaf84cf21b8b45fb1" },
        basemap: "satellite"
    });

    const view = new MapView({
        map: webmap,
        container: containerId,

        ui: { components: ["attribution"] }
    });
    view.scale = 1000000;
    view.when(function () {
        // MapView is now ready for display and can be used. Here we will
        // use goTo to view a particular location at a given zoom level and center
        view.goTo({
            center: [ 13.467423108110502, 50.39653151335184],
        });
    })
        .catch(function (err) {
            // A rejected view indicates a fatal error making it unable to display.
            // Use the errback function to handle when the view doesn't load properly
            console.error("MapView rejected:", err);
        });
    view.ui.move("zoom", "bottom-left");

    // 🔍 Search widget
    const search = new Search({
        view,
        includeDefaultSources: true,
        locationEnabled: false
    });
    view.ui.add(search, "top-left");

    // 📋 LayerList with built-in legends
    const layerList = new LayerList({
        view,
        listItemCreatedFunction: (event) => {
            const item = event.item;
            if (item.layer && item.layer.type !== "group") {
                item.panel = {
                    content: "legend",
                    open: false // set true if you want legends open by default
                };
            }
        }
    });

    const layerListExpand = new Expand({
        view,
        content: layerList,
        expandTooltip: "Vrstvy"
    });
    view.ui.add(layerListExpand, "top-right");

    // 🗺️ Basemap gallery (optional toggle)
    const basemapGallery = new BasemapGallery({
        view
    });

    const basemapExpand = new Expand({
        view,
        content: basemapGallery,
        expandTooltip: "Změna podkladové mapy"
    });
    view.ui.add(basemapExpand, "bottom-right");

    // 📏 Scale bar
    const scaleBar = new ScaleBar({
        view,
        unit: "metric"
    });
    view.ui.add(scaleBar, "bottom-left");

    // ✅ Remove loading overlay when map is ready
    view.when(() => {
        container.querySelector('.spinner-border')?.parentElement?.parentElement?.remove();
    });
}
