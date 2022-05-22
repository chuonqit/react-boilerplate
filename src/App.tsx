import Panorama from "./components/Panorama";

import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Panorama";
  }, []);

  return (
    <div className="App">
      <Panorama src="https://i.imgur.com/Jvqqmx9.jpg" width="100vw" height="100vh" />
    </div>
  );
}

export default App;
