import React from "react";
import request from "superagent";

import "./App.css";

function App() {
  const [picture, setPicture] = React.useState("");
  const [imgFromCloud, setImgFromCloud] = React.useState("");

  const handleUpload = file => {
    let upload = request
      .post("https://api.cloudinary.com/v1_1/deivexiin/image/upload")
      .field("upload_preset", "images")
      .field("file", file);
    upload.end((err, response) => {
      if (err) {
        console.log("cloudinary err", err);
      }
      if (response) {
        setImgFromCloud(response.body.secure_url);
      }
    });
  };

  return (
    <div className="">
      <input type="file" onChange={e => setPicture(e.target.files[0])} />
      <button onClick={() => handleUpload(picture)}>Upload</button>
      <img src={imgFromCloud} alt="picture" />
    </div>
  );
}

export default App;
