import React, { useState, useEffect } from "react";
import fallbackImage from "../../images/Apple.svg";

interface Props {
  expertName?: string;
  yearsExperience?: number;
  price?: number | string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

const PropertyCardH: React.FC<Props> = ({
  expertName = "Unknown Service",
  yearsExperience = 0,
  price = 0,
  image,
  className = "",
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(() => {
    // Validate image URL before setting it
    if (!image) return fallbackImage;
    
    // Skip base64 images to prevent React errors
    if (image.startsWith('data:image/')) {
      console.warn('Skipping base64 image in PropertyCardH');
      return fallbackImage;
    }
    
    // Handle relative URLs by adding the backend base URL
    if (image.startsWith('/media/') || image.startsWith('/static/')) {
      const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
      return `${baseUrl}${image}`;
    }
    
    return image;
  });

  useEffect(() => {
    console.log("🟡 Received props in PropertyCardH:", {
      expertName,
      yearsExperience,
      price,
      image,
    });
    console.log("🖼️ Image URL being set:", imgSrc);
  }, [expertName, yearsExperience, price, image, imgSrc]);

  // Update image when prop changes
  useEffect(() => {
    if (image && !image.startsWith('data:image/')) {
      // Handle relative URLs by adding the backend base URL
      if (image.startsWith('/media/') || image.startsWith('/static/')) {
        const baseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";
        setImgSrc(`${baseUrl}${image}`);
      } else {
        setImgSrc(image);
      }
    }
  }, [image]);

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4 bg-white dark:bg-gray-800 ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt="Service cover"
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={() => setImgSrc(fallbackImage)}
        />
        {/* Experience Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {yearsExperience}y
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {expertName}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {yearsExperience} years of experience
        </p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            PKR {parseFloat(price as string).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardH;
