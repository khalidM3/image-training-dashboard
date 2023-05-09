
export const getLabelsText = async () => {
  const data = await fetch("/train_labels.csv");
  const text = await data.text();
  return text;
};

//TODO - use a 3rd pary lib for better csv parsing
export const parseCSV = (text) => {
  const labelsMap = {};

  const columns = text.split("\n");
  const [, ...lines] = columns;

  const trainLabels = lines.reduce((acc, curr, index) => {
    const [name, top, left, width, height, label] = curr.split(",");
    if (!name) return acc;
    acc[name] = { top, left, width, height, label };

    labelsMap[label] = false;
    return acc;
  }, {});

  return { trainLabels: trainLabels, tags: labelsMap };
};

export const getTrainImages = () => {
  return require
    .context("../public/train_images", true)
    .keys()
    .map((filePath) => ({
      name: filePath.slice(2),
    }));
};

export const getTestImages = () => {
  return require
    .context("../public/test_images", true)
    .keys()
    .map((filePath) => ({
      name: filePath.slice(2),
    }));
};

/**
 *  Generates an HLS color based on a string
 * @param {*} string
 * @param {*} saturation
 * @param {*} lightness
 * @returns hls color value
 */
export const genColorFromString = (
  string = "",
  saturation = 100,
  lightness = 75
) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash && hash;
  }
  return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
};
  