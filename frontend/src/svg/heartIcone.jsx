import React from 'react';
import { ReactComponent as HeartIconSvg } from 'C:/Users/Ahmed/Desktop/MTHREADS/Frontend/src/assets/SVG/heart.svg'; // Adjust the path as needed

const HeartIcon = ({ color = 'currentColor', stroke = 'black', size = 24, className = '' }) => {
  return (
    <HeartIconSvg
      width={size}
      height={size}
      className={className}
      style={{ fill: color, stroke: stroke }}
    />
  );
};

export default HeartIcon;
