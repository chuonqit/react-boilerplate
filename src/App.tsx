import Panorama from "./components/Panorama";

import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Panorama";
  }, []);

  return (
    <div className="App">
      <Panorama
        src="https://swall.teahub.io/photos/small/5-54070_new-york-ultra-wide.jpg"
        width="500px"
        height="250px"
      />
      <br />
      <Panorama
        src="https://thumbs.dreamstime.com/b/archipelago-sea-bay-hdri-environment-map-round-panorama-spherical-equidistant-projection-high-resolution-n-d-rendering-224018392.jpg"
        width="500px"
        height="250px"
      />
    </div>
  );
}

export default App;
