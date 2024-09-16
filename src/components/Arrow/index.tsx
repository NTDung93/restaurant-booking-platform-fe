// components/Arrow.tsx
import React from 'react';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PrevArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: 0, zIndex: 1 }}
      onClick={onClick}
    ></div>
  );
};

export const NextArrow: React.FC<ArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: 0, zIndex: 1 }}
      onClick={onClick}
    ></div>
  );
};
