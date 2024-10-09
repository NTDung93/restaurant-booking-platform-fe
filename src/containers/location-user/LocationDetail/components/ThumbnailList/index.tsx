import React from 'react';

interface ThumbnailListProps {
  images: string[];
  currentSlide: number;
  handleThumbnailClick: (index: number) => void;
}

const ThumbnailList: React.FC<ThumbnailListProps> = ({
  images,
  currentSlide,
  handleThumbnailClick,
}) => (
  <>
    <div className="md:w-1/5 w-full flex flex-col mt-2">
      {images.slice(0, 3).map((image, index) => (
        <div
          key={index}
          onClick={() => handleThumbnailClick(index)}
          className={`h-1/3 p-2 rounded-lg flex items-center justify-center relative ${currentSlide === index ? 'border-4 border-blue-500' : ''}`}
        >
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ))}
    </div>

    <div className="md:w-1/5 w-full flex flex-col mt-2">
      {images.slice(3).map((image, index) => (
        <div
          key={index + 3}
          onClick={() => handleThumbnailClick(index + 3)}
          className={`h-1/3 p-2 mb-1 rounded-lg flex items-center justify-center relative ${currentSlide === index + 3 ? 'border-4 border-blue-500' : ''}`}
        >
          <img
            src={image}
            alt={`Image ${index + 4}`}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      ))}
    </div>
  </>
);

export default ThumbnailList;
