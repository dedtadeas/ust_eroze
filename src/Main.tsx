import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { createRoot } from "react-dom/client";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { loadMap as loadVod } from "./pages/vodniEroze";
import { loadMap as loadTan } from "./pages/erozeTaniSnehu";
import { loadMap as loadVet } from "./pages/vetrnaEroze";
import { loadMap as loadRet } from "./pages/retence";

// --- Main App Layout ---
const root = createRoot(document.getElementById("app")!);
root.render(
  <>
    <Header />
    <div id="content" style={{ display: "flex" }}></div>
    <div id="viewDiv" style={{ display: "none" }}></div>
    <Footer />
  </>
);

// --- Global State ---
let contentRoot: ReturnType<typeof createRoot> | null = null;

// --- Routes ---
const routes: Record<string, () => void> = {
  "#/": () => {
    const content = document.getElementById("content")!;
    const viewDiv = document.getElementById("viewDiv")!;
    viewDiv.style.display = "none";
    content.style.display = "block";

    // Create root only once, reuse it afterwards
    if (!contentRoot) {
      contentRoot = createRoot(content);
    }
    contentRoot.render(<Home />);
  },

  "#/mapy/vodni-eroze": () => showMap(() => loadVod("viewDiv")),
  "#/mapy/eroze-tani-snehu": () => showMap(() => loadTan("viewDiv")),
  "#/mapy/vetrna-eroze": () => showMap(() => loadVet("viewDiv")),
  "#/mapy/retence": () => showMap(() => loadRet("viewDiv")),
};

// --- Helpers ---
function showMap(loader: () => void) {
  const content = document.getElementById("content")!;
  const viewDiv = document.getElementById("viewDiv")!;

  // Unmount React content if it exists
  if (contentRoot) {
    contentRoot.unmount();
    contentRoot = null;
  }

  content.style.display = "none";
  viewDiv.style.display = "flex";
  viewDiv.innerHTML = "";
  loader();
}

function route() {
  const hash = location.hash || "#/";
  const loader = routes[hash];

  if (loader) {
    loader();
  } else {
    const content = document.getElementById("content")!;
    content.innerHTML = "<p>Page not found</p>";
    content.style.display = "block";
  }
}

// --- Ensure hash + run routing immediately ---
if (!location.hash) {
  location.hash = "#/";
}

// --- Event Listeners ---
window.addEventListener("hashchange", route);
window.addEventListener("load", route);
route(); // ✅ Run once immediately (fixes blank page on mobile)
