"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Nyheter.css';

const mockNews = [
  {
    _id: '1',
    title: 'Vår nye butikkåpning!',
    publishedDate: '2024-11-10',
    slug: 'nyhet-1',
    image: '/images/placeholder-image.jpg',
    body: 'Vi er stolte av å kunngjøre åpningen av vår nye butikk i Oslo...',
  },
  {
    _id: '2',
    title: 'Nye produkter i butikken!',
    publishedDate: '2024-10-30',
    slug: 'nyhet-2',
    image: '/images/placeholder-image.jpg',
    body: 'Vi har nettopp fått inn nye spennende produkter...',
  },
  {
    _id: '3',
    title: 'Søndagskampanje!',
    publishedDate: '2024-10-20',
    slug: 'nyhet-3',
    image: '/images/placeholder-image.jpg',
    body: 'Få 20% rabatt på alle produkter i butikken denne søndagen...',
  },
];

export default function NyheterPage() {
  const [news, setNews] = useState<any[]>(mockNews);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='news-container'>
      <h1 className='news-header'>Nyheter</h1>
      <div className='news-list'>
        {news.map((newsItem) => (
          <div key={newsItem._id} className='news-card'>
            <img 
              src={newsItem.image} 
              alt={newsItem.title} 
              className="news-image"
            />
            <div className='news-content'>
              <h2 className='news-title'>{newsItem.title}</h2>
              <p className='news-body'>{newsItem.body.slice(0, 120)}...</p>
              <Link href={`/nyheter/${newsItem.slug}`} className='news-link'>
                Les mer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
