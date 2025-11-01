import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import type { ReactElement } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";
import { loadMap as loadVod } from "./pages/vodniEroze";
import { loadMap as loadTan } from "./pages/erozeTaniSnehu";
import { loadMap as loadVet } from "./pages/vetrnaEroze";
import { loadMap as loadRet } from "./pages/retence";

// Create content root once
let contentRoot: ReturnType<typeof createRoot> | null = null;

const routes: Record<string, () => void> = {
  "#/": () => {
    const content = document.getElementById("content");
    const viewDiv = document.getElementById("viewDiv");
    if (!content || !viewDiv) return;
    
    viewDiv.style.display = "none";
    content.style.display = "flex";
    
    // Create root only once, reuse it afterwards
    if (!contentRoot) {
      contentRoot = createRoot(content);
    }
    contentRoot.render(<Home />);
  },
  "#/resitelsky-tym": () => showPage(Team),
  "#/mapy/vodni-eroze": () => showMap(() => loadVod("viewDiv")),
  "#/mapy/eroze-tani-snehu": () => showMap(() => loadTan("viewDiv")),
  "#/mapy/vetrna-eroze": () => showMap(() => loadVet("viewDiv")),
  "#/mapy/retence": () => showMap(() => loadRet("viewDiv")),
};

function showMap(loader: () => void) {
  const content = document.getElementById("content");
  const viewDiv = document.getElementById("viewDiv");
  if (!content || !viewDiv) return;
  
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
  }
}

function App() {
  useEffect(() => {
    // Initial route on mount
    route();
    
    // Listen for hash changes
    window.addEventListener("hashchange", route);
    
    return () => {
      window.removeEventListener("hashchange", route);
    };
  }, []);

  return (
    <>
      <Header />
      <div id="content"></div>
      <div id="viewDiv" style={{ display: 'none' }}></div>
      <Footer />
    </>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
function showPage(Page: () => ReactElement | null): void {
  const content = document.getElementById("content");
  const viewDiv = document.getElementById("viewDiv");
  if (!content || !viewDiv) return;

  // If a map view was active, clear it
  viewDiv.style.display = "none";
  viewDiv.innerHTML = "";

  // Show React content area
  content.style.display = "flex";

  // Create root if needed and render the page component
  if (!contentRoot) {
    contentRoot = createRoot(content);
  }
  contentRoot.render(<Page />);
}


