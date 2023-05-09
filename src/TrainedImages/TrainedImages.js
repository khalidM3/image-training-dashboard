import "./TrainedImages.css";
import { useEffect, useState } from "react";
import Tag from "../Tag/Tag";
import ImageCard from "../ImageCard/ImageCard";
import { getLabelsText, getTrainImages, parseCSV } from "../helpers";

const trainImages = getTrainImages();

export default function TrainedImages() {
  const [images, setImages] = useState(trainImages);
  const [labelTags, setLabelTags] = useState({});
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    const text = await getLabelsText();
    const { trainLabels, tags } = parseCSV(text);
    const labeledImages = trainImages.map(({ name }) => ({
      name,
      trainLabel: trainLabels[name],
    }));

    setLabelTags(tags);
    setImages(labeledImages);
  };

  const handleTagClick = (label) => {
    setLabelTags({ ...labelTags, [label]: !Boolean(labelTags[label]) });
  };

  const filterImages = () => {
    const shouldFilter = Object.values(labelTags)?.some((lb) => lb === true);
    const filtered = images.filter(({ trainLabel }) => {
      if (!shouldFilter) return true;
      return labelTags[trainLabel?.label] === true;
    });
    setFilteredImages(filtered);
  };

  useEffect(() => {
    filterImages();
  }, [labelTags]);

  return (
    <div className="TrainedImages">
      <section className="TagFiltersContainer">
        {Object.keys(labelTags)?.map((label) => (
          <Tag
            key={label}
            label={label}
            isActive={labelTags[label]}
            onClick={() => handleTagClick(label)}
          />
        ))}
      </section>

      <section className="ImagesContainer">
        {filteredImages?.map((image, i) => (
          <ImageCard
            key={image.name}
            name={image.name}
            path={"/train_images"}
            trainLabel={image.trainLabel}
          />
        ))}
      </section>
    </div>
  );
}
