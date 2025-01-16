"use client";

import React from "react";
import "./catering.css";
import Image from "next/image";
import { client } from "@/app/lib/sanity";

const Catering = () => {
    const [cateringDetails, setCateringDetails] = React.useState(null);

    React.useEffect(() => {
        const fetchCateringDetails = async () => {
            try {
                const data = await client.fetch(`*[_type == "catering"]{
                    title,
                    description,
                    "imageUrl": image.asset->url
                }[0]`);
                setCateringDetails(data);
            } catch (error) {
                console.error("Failed to fetch catering details:", error);
            }
        };

        fetchCateringDetails();
    }, []);

    if (!cateringDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="catering-container">
            <div className="catering-hero">
                <Image
                    src={cateringDetails.imageUrl}
                    alt={cateringDetails.title}
                    fill
                    className="catering-hero-image"
                />
                <div className="catering-hero-overlay">
                    <h1 className="catering-title">{cateringDetails.title}</h1>
                </div>
            </div>
            <div className="catering-content">
                <p className="catering-description">
                    {cateringDetails.description}
                </p>
            </div>
        </div>
    );
};

export default Catering;
