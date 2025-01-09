"use client";

import './AboutUs.css';
import Footer from "../components/Footer/footer";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/app/lib/sanity"; // Antatt oppsett for Sanity-klienten

const AboutUs = () => {
    const [employees, setEmployees] = useState([]);
    const [history, setHistory] = useState(null);
    const [header, setHeader] = useState(null);

    useEffect(() => {
        // Fetch data from Sanity
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

                setEmployees(employeesData);
                setHistory(historyData);
                setHeader(headerData);
            } catch (error) {
                console.error("Failed to fetch data from Sanity:", error);
            }
        };

        fetchData();
    }, []);

    if (!employees.length || !history || !header) {
        return <div>Loading...</div>; // Simple loading state
    }

    return (
        <div className="about-us-page">
            {/* Hero Section */}
            <div className="about-us-hero-container">
                <div className="about-us-hero-images-container">
                    <div className="about-us-hero-overlay"></div>
                    <div className="about-us-hero-text-content">
                        <h1 className="about-us-hero-title">{header.title}</h1>
                        <p className="about-us-hero-subtitle">{header.subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Employees Section */}
            <div className="about-us-images-section">
                {employees.map((employee, index) => (
                    <div
                        key={index}
                        className={`about-us-image bilde-${index + 1}`}
                    >
                        <Image
                            src={employee.imageUrl}
                            alt={employee.name}
                            fill
                            className="about-us-employee-image"
                        />
                        <div className="hover-text">
                            <h2>{employee.name}</h2>
                            <p>{employee.bio}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Our History Section */}
            <div className="about-us-wide-image-container">
                <div className="about-us-wide-image">
                    <div className="about-us-wide-image-overlay"></div>
                    <h1>{history.title}</h1>
                    <div className="about-us-text-container">
                        {history.content.map((block, index) => (
                            <p key={index}>{block.children.map(child => child.text).join("")}</p>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
