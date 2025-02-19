import Image from 'next/image';
import { client, urlFor } from '../../lib/sanity';
import Link from "next/link";
import "./Hero.css";

async function getData() {
    const query = '*[_type == "heroPage"][0]'; // Fetch the first document of type "heroPage"
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
                    src={urlFor(data.image1).width(2000).height(1200).quality(100).auto("format").url()} 
                    alt="Hero Background"
                    layout="fill" // Covers the entire container
                    className="h-full w-full object-cover object-center"
                />
                </div>
                <div className="hero-text-content">
                    {data.logo && (
                        <Image
                            src={urlFor(data.logo).url()} // Use logo from the schema
                            alt="Company Logo"
                            width={1000}
                            height={1000}
                            className="hero-logo"
                        />
                    )}

                    {/* Updated buttons */}
                    <div className="hero-links">
                        <Link href="#products-scroll" className="hero-link-rectangle">
                            Våre produkter
                        </Link>
                        <Link href="#Abonnement-scroll" className="hero-link-rectangle">
                            Abonnement
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}