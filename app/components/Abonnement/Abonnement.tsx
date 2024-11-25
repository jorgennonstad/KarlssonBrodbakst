"use client"

import React, { useState, useEffect } from "react";
import { client } from "@/app/lib/sanity";
import "./Abonnement.css";

// TypeScript interface for the Abonnement data
interface AbonnementData {
  title: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  backgroundImage: string; // Background image URL
  price: number;
  stripeProductId: string;
  stripePriceId: string; // This is what we need for the Stripe session
}

// Fetch subscription data from Sanity
async function getAbonnement(): Promise<AbonnementData> {
  const query = `
    *[_type == "abonnement"][0]{
      title,
      subtitle1,
      subtitle2,
      description,
      "backgroundImage": backgroundImage.asset->url,
      price,
      stripeProductId,
      stripePriceId
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default function Abonnement() {
  const [abonnement, setAbonnement] = useState<AbonnementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAbonnement() {
      try {
        const data = await getAbonnement();
        setAbonnement(data);
      } catch (err) {
        setError("Failed to load subscription. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchAbonnement();
  }, []);

  const handleSubscribe = async () => {
    if (!abonnement) return;

    try {
      // Send stripePriceId from Sanity to the backend
      const response = await fetch("http://localhost:5001/create-subscription-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1, priceId: abonnement.stripePriceId }), // Send priceId from Sanity
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Server error:", error.error || "Unknown error");
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        console.error("No URL returned from server");
      }
    } catch (e) {
      console.error("Failed to initiate checkout:", e);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="abonnement-container" id="Abonnement-scroll">
      <div
        className="abonnement"
        style={{ backgroundImage: `url(${abonnement?.backgroundImage})` }}
      >
        <div className="abonnement_overlay">
          <div className="abonnement-left">
            <h1>{abonnement.title}</h1>
            <h2>{abonnement.subtitle1}</h2>
            <h3>{abonnement.subtitle2}</h3>
          </div>
          <div className="abonnement-right">
            <p>{abonnement.description}</p>
          </div>
          <button className="subscribe-button" onClick={handleSubscribe}>
            Abonner
          </button>
        </div>
      </div>
    </div>
  );
}
