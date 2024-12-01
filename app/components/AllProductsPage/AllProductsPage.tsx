"use client";

import AddToBag from '@/app/components/AddToBag/AddToBag';
import CheckoutNow from '@/app/components/CheckOutNow/CheckOutNow';
import { fullProduct } from '@/app/interface';
import { client } from '@/app/lib/sanity';
import { Button } from '@/components/ui/button';
import { Star } from "lucide-react";
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next
import Image from 'next/image'; // Import Image from next
import { urlFor } from '@/app/lib/sanity'; // Import urlFor to generate image URLs
import './AllProductsPage.css';

async function getAllProducts() {
    const query = `
    *[_type == "product"]{
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }
    `;
    const data = await client.fetch(query);
    return data;
}

export const dynamic = "force-dynamic";

export default function AllProductsPage() {
    const [products, setProducts] = useState<fullProduct[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err) {
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='all-products-container' id='products-scroll'>
            <div className='product-grid-container'>
                <div className='product-grid'>
                    {products?.map((product) => (
                        <div key={product._id} className='product-card'>
                            <div className='product-image-container'>
                                <Image 
                                    src={urlFor(product.images[0]).url()} 
                                    alt={product.name} 
                                    className='product-image' 
                                    width={window.innerWidth / 3} 
                                    height={500}
                                />
                                
                                <div className='product-link'>
                                    <div className='product-title'>
                                        <h2 className='product-title-text'>{product.name}</h2>
                                    </div>

                                    <div className='product-overlay'>
                                        <div className='overlay-content'>
                                            <p className='product-description'>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='product-action-buttons'>
                                <AddToBag
                                    currency="USD"
                                    description={product.description}
                                    image={product.images[0]}
                                    name={product.name}
                                    price={product.price}
                                    key={`${product._id}-add-to-bag`}
                                    price_id={product.price_id}
                                />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
