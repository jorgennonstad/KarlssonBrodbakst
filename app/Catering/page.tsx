
"use client";

import React, { useEffect, useState } from "react";
import "./CateringCopy.css";
import Footer from "../components/Footer/footer";
import { client } from "@/app/lib/sanity";

const Catering = () => {
  // State to hold the menu items fetched from Sanity
  const [menuItems, setMenuItems] = useState([]);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchMenuItems = async () => {
      const query = `*[_type == "cateringItems"]{
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

  return (
    <div className="catering-page">
      <h1 className="catering-title">Catering</h1>
      <div className="catering-container">
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              {/* Displaying image if available */}
              {item.image && item.image.asset && (
                <img
                  src={item.image.asset.url}
                  alt={item.title}
                  className="menu-item-image"
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
                  onClick={() =>
                    window.location.href = "mailto:example@domain.com?subject=Catering Forespørsel"
                  }
                >
                  Kontakt oss for catering i dag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-button-container">
      </div>
      <Footer />
    </div>
  );
};

export default Catering;
