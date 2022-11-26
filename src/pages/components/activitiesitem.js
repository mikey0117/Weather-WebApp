import defaultColor from "../assets/images/image.png";
import { useState, useEffect } from "react";
import { getGooglePhoto } from "../utils/ingest";

export default function ActivitiesItem({ todoItem }) {
  const [image, setImage] = useState(defaultColor);
  const titleCharLimit = 30;

  useEffect(() => {
    const fetchPhoto = async () => {
      if (todoItem.imageUrl !== undefined) {
        const url = todoItem.imageUrl;
        setImage(url);
      } else {
        const url = await getGooglePhoto(todoItem);
        setImage(url);
      }
    };

    fetchPhoto();
  }, [todoItem]);

  const onImageError = (e) => {
    e.target.src = defaultColor
  };

  return (
    <div className="card">
      <div id="map"></div>
      <img
        src={image === null ? defaultColor : image}
        className="card-img-top"
        style={{ width: "100%" }}
        alt={todoItem.name}
        onError={onImageError}
      />
      <div className="card-body" style={{ margin: "0", padding: "0" }}>
        <h5 className="card-title">{
          (todoItem.name).length <= titleCharLimit
            ? todoItem.name
            : `${(todoItem.name).slice(0, titleCharLimit)}...`
        }</h5>
      </div>
    </div>
  );
}
