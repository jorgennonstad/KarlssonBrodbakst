"use client";

import React, { useState, useEffect } from 'react';
import { client } from '@/app/lib/sanity';
import './Abonnement.css';

// Define the TypeScript interface for the Abonnement data
interface AbonnementData {
  title: string;
  subtitle1: string;
  subtitle2: string;
  description: string;
  backgroundImage: string;  // The background image URL
  price: number;
  stripeProductId: string;
  stripePriceId: string;
}

// Sanity query to fetch subscription data
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="abonnement-container" id='Abonnement-scroll'>
      <div className="abonnement" style={{ backgroundImage: `url(${abonnement?.backgroundImage})` }}>
        <div className="abonnement_overlay">
          <div className="abonnement-left">
            <h1>{abonnement.title}</h1>
            <h2>{abonnement.subtitle1}</h2>
            <h3>{abonnement.subtitle2}</h3>
            <button className="subscribe-button">Abonner</button>
          </div>
          <div className="abonnement-right">
            <p>{abonnement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
