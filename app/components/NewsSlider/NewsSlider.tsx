"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/app/lib/sanity"; // Assuming you have this file setup to initialize your Sanity client
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import arrow icons
import "./NewsSlider.css"; // Ensure you have the appropriate CSS styles

// Define the image type structure
interface SliderImage {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
  altText?: string;
}

// Sanity query to fetch images
const query = `*[_type == "sliderImage"]{
  _id,
  image {
    asset -> {
      url
    },
  },
  altText
}`;

export default function NewsSlider() {
  const [images, setImages] = useState<SliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch images from Sanity
  useEffect(() => {
    const fetchImages = async () => {
      const result = await client.fetch(query);
      setImages(result); // Set the images to state
    };

    fetchImages();
  }, []);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Add interval to automatically change images
  useEffect(() => {
    if (images.length > 0 && !isHovered) {
      const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount or when hover changes
    }
  }, [images, isHovered]); // Re-run the effect when hover state changes

  // If images are still loading, show a loading state
  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <h1 className="newsTitle">Nyheter</h1>
      <div
        className="slider-container"
        onMouseEnter={() => setIsHovered(true)} // Stop slide on hover
        onMouseLeave={() => setIsHovered(false)} // Resume slide when hover ends
      >
        <div className="slider">
          {/* Previous Button with Arrow */}
          <button onClick={prevSlide} className="prev-button">
            <ArrowLeft size={24} />
          </button>
          <div className="slider-images">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Move the slider to the appropriate image
                transition: "transform 0.5s ease-in-out", // Apply sliding animation
              }}
            >
              {images.map((image) => (
                <div key={image._id} className="slider-image">
                  <Image
                    src={image.image.asset.url}
                    alt={image.altText || "Slider Image"}
                    width={600}
                    height={400}
                    layout="responsive"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Next Button with Arrow */}
          <button onClick={nextSlide} className="next-button">
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
