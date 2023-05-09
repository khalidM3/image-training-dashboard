import "./ImageCard.css";
import { useRef, useState } from "react";
import Tag from "../Tag/Tag";

export default function ImageCard({ name, trainLabel = {}, path }) {
  const imageRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const { top, left, width, height, label } = trainLabel;

  const resize = (size = 1) => {
    const shrinkBy = 320 / imageRef?.current?.naturalWidth;
    return size * shrinkBy + "px";
  };

  return (
    <div className="ImageCard">
      <div className="ImageCard_imgContainer">
        <img
          ref={imageRef}
          className="ImageCard_img"
          style={{
            display: loaded ? "flex" : "none",
            width: "320px",
          }}
          src={`${path}/${name}`}
          onLoad={() => setLoaded(true)}
        />
        {label && (
          <div
            className="ImageCard_BoundingBox"
            style={{
              height: resize(height),
              width: resize(width),
              top: resize(top),
              left: resize(left),
            }}
          ></div>
        )}
      </div>

      <div className="ImageCard_details">
        <div className="ImageCard_name"> {name} </div>
        <div className="ImageCard_label">
          {label && <Tag label={label} isActive={true} />}
        </div>
      </div>
    </div>
  );
}
