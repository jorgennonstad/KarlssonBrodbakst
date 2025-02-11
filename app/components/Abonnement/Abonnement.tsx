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
  const [selectedBreads, setSelectedBreads] = useState<string[]>([""]);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("2")
    async function fetchAbonnementData() {
      try {
        const data = await fetchData();
        setAbonnement(data.abonnement);
        setProducts(data.products);
      } catch (error) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching data: ", error); // Logging the error to console
      } finally {
        setLoading(false);
      }
    }
    fetchAbonnementData();
  }, []);

  useEffect(() => {
    console.log("3")
    const subtotal = selectedBreads.reduce((acc, bread) => {
      return acc + (products.find((product) => product.name === bread)?.price || 0);
    }, 0);

    if (abonnement && selectedBreads.some((bread) => bread)) {
      const discount = (subtotal * abonnement.discountPercentage) / 100;
      const finalPrice = subtotal - discount + abonnement.deliveryFee;
      setTotalPrice(finalPrice);
    } else {
      setTotalPrice(null);
    }
  }, [selectedBreads, abonnement, products]);

  const addDropdown = () => {
    setSelectedBreads([...selectedBreads, ""]);
  };

  const removeDropdown = (index: number) => {
    setSelectedBreads(selectedBreads.filter((_, i) => i !== index));
  };

  const handleSelectionChange = (index: number, value: string) => {
    const newSelections = [...selectedBreads];
    newSelections[index] = value;
    setSelectedBreads(newSelections);
  };

  const generateEmail = () => {
    const breadNames = selectedBreads.filter(Boolean).join(", ");
    const emailSubject = "Bestilling av abonnement på brød";
    const emailBody = `
      Hei,
      \nJeg er interesert i å bestille abonnementet med følgende brød:
      - ${breadNames.replace(/, /g, "\n      - ")}
      \nTotalpris: ${totalPrice?.toFixed(2)} Kr
      \nExtra kommentarer?:
      \n\nKundens informasjon:
      \nNavn: \nAdresse: \nTelefonnummer:
      \nTakk!
    `;
    const mailToLink = `mailto:karlsson-brodbakst@hotmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailToLink;
  };

  const isButtonDisabled = !selectedBreads.some(bread => bread !== "");

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
            <h2>Velg dine brød</h2>
            {selectedBreads.map((bread, index) => (
              <div key={index} className="bread-dropdown">
                <select
                  value={bread}
                  onChange={(e) => handleSelectionChange(index, e.target.value)}
                >
                  <option value="">Velg et brød</option>
                  {products.map((product) => (
                    <option key={product.price_id} value={product.name}>
                      {product.name} - {product.price} Kr
                    </option>
                  ))}
                </select>
                {selectedBreads.length > 1 && (
                  <button className="removeDopdownButton" onClick={() => removeDropdown(index)}>Fjern</button>
                )}
              </div>
            ))}

            <button className="legg-til-brod-btn" onClick={addDropdown}>
              + Legg til et brød
            </button>

            <div className="price-container">
              <h3>Total pris: {totalPrice !== null ? `${totalPrice.toFixed(2)} Kr` : "Velg minst ett brød"}</h3>
              <p className={`delivery-fee-note ${abonnement && totalPrice !== null ? "visible" : ""}`}>
                Leveringsgebyr på {abonnement?.deliveryFee}kr lagt til i total
              </p>
              <button 
                onClick={generateEmail} 
                disabled={isButtonDisabled}
                style={{
                  ...(isButtonDisabled && {border: '3px solid #ccc', opacity: 0.5, backgroundColor: 'transparent'}),
                  cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                Send Bestilling via E-post
              </button>
            </div>
          </div>
        </div>

        <div className="abonnement_overlay"></div>
      </div>
    </div>
  );
}
