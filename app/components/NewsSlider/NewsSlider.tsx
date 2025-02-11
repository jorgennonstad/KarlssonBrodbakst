"use client"

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { client } from "@/app/lib/sanity";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./NewsSlider.css";

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

const query = `*[_type == "sliderImage"] | order(priority asc){
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

  // Fetch images from Sanity and set them in the state
  useEffect(() => {
    console.log("7")
    const fetchImages = async () => {
      const data = await client.fetch(query); // Fetching the data from Sanity using the query
      setImages(data); // Setting the fetched images to state
    };

    fetchImages();
  }, []); // Empty dependency array means this effect runs only once, on mount

  // Memoize nextSlide with useCallback
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]); // Only recreate nextSlide if images.length changes

  // Add interval to automatically change images
  useEffect(() => {
    console.log("8")
    if (images.length > 0 && !isHovered) {
      const interval = setInterval(nextSlide, 5000); // Change image every 5 seconds
      return () => clearInterval(interval); // Cleanup on unmount or when hover changes
    }
  }, [images, isHovered, nextSlide]); // Added nextSlide to the dependency array

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
          <button onClick={prevSlide} className="prev-button">
            <ArrowLeft size={24} />
          </button>
          <div className="slider-images">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: "transform 0.5s ease-in-out",
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
          <button onClick={nextSlide} className="next-button">
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="dots-container">
          {images.map((_, index) => (
            <div
              key={index}
              className={`dot ${currentIndex === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
