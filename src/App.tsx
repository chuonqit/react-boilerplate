import Panorama from "./components/Panorama";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Panorama src="https://i.imgur.com/s7gBWif.jpg" width={500} />
      <Panorama
        src="https://github.com/mrdoob/three.js/blob/master/examples/textures/2294472375_24a3b8ef46_o.jpg?raw=true"
        width={500}
      />
      <Panorama
        src="https://thumbs.dreamstime.com/b/equirectangular-panorama-360-degrees-21184868.jpg"
        width={500}
      />
      <Panorama src="http://i.imgur.com/EcT6CCv.jpg" width={500} />
      <Panorama
        src="https://thumbs.dreamstime.com/b/minsk-belarus-may-full-seamless-hdri-panorama-degrees-angle-view-interior-bathroom-modern-flat-apartments-equirectangular-172270436.jpg"
        width={500}
      />
    </div>
  );
}

export default App;
