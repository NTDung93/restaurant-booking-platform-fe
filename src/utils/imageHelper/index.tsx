export const getFirstImageUrl = (imageStr: string): string => {
  const defaultImage =
    'https://img.freepik.com/free-photo/dinner-table-with-foods-soft-drinks-restaurant_114579-3319.jpg?t=st=1728653521~exp=1728657121~hmac=32d8bd096f99eeed1a269054bae3059e692d7b0a354806a69bf9088c6a0a7856&w=740';

  if (!imageStr) return defaultImage;

  const trimmed = imageStr.trim().slice(1, -1);

  const urls = trimmed.split(',');

  if (urls.length === 0) return defaultImage;

  return urls[0].trim() || defaultImage;
};
