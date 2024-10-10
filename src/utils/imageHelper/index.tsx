export const getFirstImageUrl = (imageStr: string): string => {
  const defaultImage =
    'https://e7.pngegg.com/pngimages/249/952/png-clipart-orange-and-white-location-icon-map-computer-icons-location-logo-text-orange-thumbnail.png';

  if (!imageStr) return defaultImage;

  const trimmed = imageStr.trim().slice(1, -1);

  const urls = trimmed.split(',');

  if (urls.length === 0) return defaultImage;

  return urls[0].trim() || defaultImage;
};
