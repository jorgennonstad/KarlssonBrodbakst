"use client";

import React, { useEffect, useState } from "react";
import { CateringItem } from "../interface"; // import the interface if it's in a separate file
import "./CateringCopy.css";
import Footer from "../components/Footer/footer";
import { client } from "@/app/lib/sanity";
import Image from "next/image"; // Import Image from next/image
import Navbar from "../components/NavBar/Navbar";



const Catering = () => {
  // State to hold the menu items fetched from Sanity, with correct type
  const [menuItems, setMenuItems] = useState<CateringItem[]>([]);

  // Fetch data from Sanity
  useEffect(() => {
    console.log("1")
    const fetchMenuItems = async () => {
      const query = `*[_type == "cateringItems"]|order(orderRank){
        title,
        note,
        description,
        price,
        image {
          asset -> {
            url
          }
        }
      }`;

      try {
        const data = await client.fetch(query);
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching catering items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Function to handle the contact button click
  const handleContactButtonClick = () => {
    const subject = encodeURIComponent("Catering Forespørsel");
    const body = encodeURIComponent(`
Hei,

Jeg er interessert i å bestille catering. Her er mine detaljer:

- Ønsket dato: [Fyll ut dato]
- Ønskede varer: [Fyll ut ønskede varer]
- Kontakt info: [Fyll ut telefonnummer og e-post]
- Adresse: [Fyll ut leveringsadresse]
- Mer informasjon: [Fyll ut annen info]

Vennlig hilsen,
[Fyll ut navn]
    `);

    window.location.href = `mailto:karlsson-brodbakst@hotmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="catering-page">
      <Navbar />
      <h1 className="catering-title">Catering</h1>
      <div className="catering-container">
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              {/* Displaying image if available */}
              {item.image && item.image.asset && (
                <Image
                src={`${item.image.asset.url}?w=1000&h=800&auto=format&dpr=2&q=100`}
                  alt={item.title}
                  className="menu-item-image"
                  width={500}   // Specify width (adjust as necessary)
                  height={300}  // Specify height (adjust as necessary)
                  layout="intrinsic" // This ensures the image maintains aspect ratio
                />
              )}
              <div className="menu-text">
                <h2 className="menu-item-title">{item.title}</h2>
                <p className="menu-item-note">{item.note}</p>
                <ul className="menu-item-description">
                  {item.description?.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
                <p className="menu-item-price">{item.price},-</p>
                <button
                  className="contact-button"
                  onClick={handleContactButtonClick}
                >
                  Kontakt oss for catering i dag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-button-container"></div>
      <Footer />
    </div>
  );
};

export default Catering;
