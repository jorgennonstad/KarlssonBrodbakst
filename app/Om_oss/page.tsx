"use client";

import './AboutUs.css';
import Footer from "../components/Footer/footer";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";

const AboutUs = () => {
    const [employees, setEmployees] = useState([]);
    const [history, setHistory] = useState(null);
    const [header, setHeader] = useState(null);
    const [heroImage, setHeroImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeesData = await client.fetch(`*[_type == "employee"]{
                    name,
                    bio,
                    "imageUrl": image.asset->url
                }`);
                const historyData = await client.fetch(`*[_type == "ourHistory"][0]{
                    title,
                    content
                }`);
                const headerData = await client.fetch(`*[_type == "pageHeader"][0]{
                    title,
                    subtitle
                }`);
                const heroImageData = await client.fetch(`*[_type == "omOssHeroImage"][0]{
                    "imageUrl": image1.asset->url
                }`);

                setEmployees(employeesData);
                setHistory(historyData);
                setHeader(headerData);
                setHeroImage(heroImageData);
            } catch (error) {
                console.error("Failed to fetch data from Sanity:", error);
            }
        };

        fetchData();
    }, []);

    if (!employees.length || !history || !header || !heroImage) {
        return <div>Loading...</div>;
    }

    return (
        <div className="about-us-page">
            {/* Hero Section */}
            <div className="about-us-hero-container">
                <div className="about-us-hero-images-container">
                    <div className="about-us-hero-overlay"></div>
                    <div className="about-us-hero-image">
                        <Image
                            src={heroImage.imageUrl}
                            alt="Hero Background"
                            fill
                            className="object-cover object-center"
                        />
                    </div>
                    <div className="about-us-hero-text-content">
                        <h1 className="about-us-hero-title">{header.title}</h1>
                        <p className="about-us-hero-subtitle">{header.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Vår Historie Section */}
            <div className="about-us-history-section">
                <h1 className="about-us-section-title">{history.title}</h1>
                <div className="about-us-text-container">
                    <PortableText 
                        value={history.content}
                        components={{
                            block: {
                                normal: ({ children }) => <p>{children}</p>,
                                h2: ({ children }) => <h2>{children}</h2>,
                            },
                            marks: {
                                strong: ({ children }) => <strong>{children}</strong>,
                                em: ({ children }) => <em>{children}</em>,
                            },
                            list: {
                                bullet: ({ children }) => <ul>{children}</ul>,
                                number: ({ children }) => <ol>{children}</ol>,
                            },
                            listItem: {
                                bullet: ({ children }) => <li>{children}</li>,
                            },
                        }}
                    />
                </div>
            </div>

            {/* Ansatte Section */}
            <h2 className="about-us-section-title">Ansatte</h2>
            <div className="about-us-images-section">
                {employees.map((employee, index) => (
                    <div key={index} className="about-us-image">
                        <Image
                            src={employee.imageUrl}
                            alt={employee.name}
                            fill
                            className="about-us-employee-image"
                        />
                        <div className="hover-text">
                            <h2>{employee.name}</h2>
                            {/* Rendre biografien med PortableText */}
                            <div className="employee-bio">
                                <PortableText
                                    value={employee.bio}
                                    components={{
                                        block: {
                                            normal: ({ children }) => <p>{children}</p>,
                                            h2: ({ children }) => <h2>{children}</h2>,
                                        },
                                        marks: {
                                            strong: ({ children }) => <strong>{children}</strong>,
                                            em: ({ children }) => <em>{children}</em>,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
