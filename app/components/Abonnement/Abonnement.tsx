"use client";

import React, { useState, useEffect } from "react";
import { client } from "@/app/lib/sanity";
import "./Abonnement.css";

interface AbonnementData {
  title: string;
  description: string;
  backgroundImage: string;
  discountPercentage: number;
  deliveryFee: number;
}

interface ProductData {
  name: string;
  price: number;
  price_id: string;
}

// Fetch subscription data from Sanity
async function fetchData(): Promise<{ abonnement: AbonnementData; products: ProductData[] }> {
  const query = `
  {
    "abonnement": *[_type == "abonnement"][0]{
      title,
      description,
      "backgroundImage": backgroundImage.asset->url,
      discountPercentage,
      deliveryFee
    },
    "products": *[_type == "product" && availableInAbonnement == true]{
      name,
      price,
      price_id
    }
  }
  `;
  return await client.fetch(query);
}

export default function Abonnement() {
  const [abonnement, setAbonnement] = useState<AbonnementData | null>(null);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [selectedBread1, setSelectedBread1] = useState<string>("");
  const [selectedBread2, setSelectedBread2] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbonnementData() {
      try {
        const data = await fetchData();
        setAbonnement(data.abonnement);
        setProducts(data.products);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAbonnementData();
  }, []);

  useEffect(() => {
    const selectedPrice1 = products.find((product) => product.name === selectedBread1)?.price || 0;
    const selectedPrice2 = products.find((product) => product.name === selectedBread2)?.price || 0;

    if (abonnement) {
      const subtotal = selectedPrice1 + selectedPrice2;
      const discount = (subtotal * abonnement.discountPercentage) / 100;
      const finalPrice = subtotal - discount + abonnement.deliveryFee;
      setTotalPrice(finalPrice);
    }
  }, [selectedBread1, selectedBread2, abonnement, products]);

  const generateEmail = () => {
    const breadNames = [selectedBread1, selectedBread2].filter(Boolean).join(", ");
    const emailSubject = "Bestilling av abonnement på brød";
    const emailBody = `
      Hei,

      Jeg er interesert i å bestille abonnementet med følgende brød:
      - Brød 1: ${selectedBread1}
      - Brød 2: ${selectedBread2}

      Totalpris: ${totalPrice.toFixed(2)} Kr

      Extra kommentarer:
      xxxx
      
      Kundens informasjon:
      Navn: ___________
      Adresse: ___________
      Telefonnummer: ___________

      Takk!
    `;

    const mailToLink = `mailto:example@domain.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailToLink;
  };

  // Disable the button if either bread is not selected
  const isButtonDisabled = !selectedBread1 || !selectedBread2;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="abonnement-container" id="Abonnement-scroll">
      <div
        className="abonnement"
        style={{ backgroundImage: `url(${abonnement?.backgroundImage})` }}
      >
        <div className="abonnement-left">
          <div className="abonnement-left-text">
            <h2>{abonnement?.title}</h2>
            <p>Beskrivelse: {abonnement?.description}</p>
          </div>
        </div>

        <div className="abonnement-right">
          <div className="abonnement-right-text">
            <h2>Velg to brød og regn ut abonnement prisen</h2>

            <label htmlFor="bread1">Velg første brød:</label>
            <select
              id="bread1"
              value={selectedBread1}
              onChange={(e) => setSelectedBread1(e.target.value)}
            >
              <option value="">Velg et brød</option>
              {products.map((product) => (
                <option key={product.price_id} value={product.name}>
                  {product.name} - {product.price} Kr
                </option>
              ))}
            </select>

            <label htmlFor="bread2">Velg andre brød:</label>
            <select
              id="bread2"
              value={selectedBread2}
              onChange={(e) => setSelectedBread2(e.target.value)}
            >
              <option value="">Velg et brød</option>
              {products.map((product) => (
                <option key={product.price_id} value={product.name}>
                  {product.name} - {product.price} Kr
                </option>
              ))}
            </select>

            <h3>Total pris: {totalPrice.toFixed(2)} Kr</h3>
            <button 
              onClick={generateEmail} 
              disabled={isButtonDisabled}
              style={{ 
                backgroundColor: isButtonDisabled ? '#ccc' : '#007bff', 
                cursor: isButtonDisabled ? 'not-allowed' : 'pointer' 
              }}
            >
              Send Bestilling via E-post
            </button>
          </div>
        </div>

        <div className="abonnement_overlay"></div>
      </div>
    </div>
  );
}
