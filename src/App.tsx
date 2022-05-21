import { useState } from "react";
import Photo360 from "./components/Photo360";

function App() {
  const [image, setImage] = useState<string>("https://i.imgur.com/s7gBWif.jpg");

  return (
    <div className="App" style={{ padding: 16 }}>
      <Photo360 src={image} />
      <Photo360 src={image} />
      <br />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: 500 }}
      />
    </div>
  );
}

export default App;
