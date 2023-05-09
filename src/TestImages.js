import { getTestImages } from "./helpers";
import ImageCard from "./ImageCard/ImageCard";

const testImages = getTestImages();

export default function TestImages() {
  return (
    <div className="ImagesContainer">
      {testImages.map((image) => (
        <ImageCard key={image.name} path={"/test_images"} name={image.name} />
      ))}
    </div>
  );
}
