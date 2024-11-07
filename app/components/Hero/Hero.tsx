import Image from 'next/image';
import { client, urlFor } from '../../lib/sanity';
import Link from "next/link";
import "./Hero.css";

async function getData() {
    const query = '*[_type == "heroImage"][0]';
    const data = await client.fetch(query);
    return data;
}

export default async function Hero() {
    const data = await getData();
    return (
        <div className="hero-container">
            <div className="hero-images-container">
                <div className="hero-overlay"></div>
                <div className="hero-image">
                    <Image 
                        src={urlFor(data.image1).url()} 
                        alt="Hero Background"
                        layout="fill" /* Covers the entire container */
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="hero-text-content">
                    <h1 className="hero-title">Karlson Brødbakst</h1>
                    <p className="hero-subtitle">
                        Vi selger og leverer de ferskeste og beste foccaciaene i hele Gjøvik. Vi har også et stort utvalg av brød og aioli.
                    </p>
                </div>
            </div>
        </div>
    );
}
