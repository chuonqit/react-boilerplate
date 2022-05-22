import Panorama from "./components/Panorama";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Panorama src="https://i.imgur.com/s7gBWif.jpg" width={500} />
      <Panorama src="https://i.imgur.com/QvlEsl7h.jpg" width={500} />
      <Panorama
        src="https://thumbs.dreamstime.com/b/equirectangular-panorama-360-degrees-21184868.jpg"
        width={500}
      />
      <Panorama src="http://i.imgur.com/EcT6CCv.jpg" width={500} />
      <Panorama
        src="https://thumbs.dreamstime.com/b/archipelago-sea-bay-hdri-environment-map-archipelago-sea-bay-hdri-environment-map-round-panorama-spherical-panorama-equidistant-224106475.jpg"
        width={500}
      />
    </div>
  );
}

export default App;
