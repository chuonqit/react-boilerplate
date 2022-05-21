import { useState } from "react";
import Photo360 from "./components/Photo360";

function App() {
  const [image, setImage] = useState<string>("https://i.imgur.com/s7gBWif.jpg");

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        flexDirection: "column",
        padding: 16,
      }}
    >
      <Photo360 src={image} />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{ width: 500 }}
      />
      <br />
      <ol>
        <li>https://i.imgur.com/QvlEsl7h.jpg</li>
        <li>
          https://thumbs.dreamstime.com/b/equirectangular-panorama-360-degrees-21184868.jpg
        </li>
        <li>http://i.imgur.com/EcT6CCv.jpg</li>
        <li>
          https://gc.360-data.com/tours/Ht50Vngjb5XQ/Ht50Vngjb5XQ-lQS7zie67nFJ-thumb.jpg
        </li>
      </ol>
    </div>
  );
}

export default App;
