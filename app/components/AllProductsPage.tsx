"use client";

import AddToBag from '@/app/components/AddToBag';
import CheckoutNow from '@/app/components/CheckOutNow';
import { fullProduct } from '@/app/interface';
import { client } from '@/app/lib/sanity';
import { Button } from '@/components/ui/button';
import { Star } from "lucide-react";
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next
import Image from 'next/image'; // Import Image from next
import { urlFor } from '@/app/lib/sanity'; // Import urlFor to generate image URLs

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
        <div className='bg-white'>
            <div className='mx-auto'>
                {/* Grid container for product cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full'>
                    {products?.map((product) => (
                        <div key={product._id} className='min-h-[500px] relative'>
                            {/* Display only the first image of the product */}
                            <div className='relative'>
                                <Image 
                                    src={urlFor(product.images[0]).url()} 
                                    alt={product.name} 
                                    className='object-cover w-full h-[750px]' // Set height for the image
                                    width={window.innerWidth / 3} // Image width set to 1/3 of the viewport width
                                    height={500} // Fixed height for image
                                />
                                
                                {/* Product Link (only for image and title) */}
                                <Link href={`/product/${product.slug}`}>
                                    {/* Title positioned above the overlay */}
                                    <div className='absolute top-4 left-4 right-4 z-10 text-center'>
                                        <h2 className='text-5xl font-bold text-white'>{product.name}</h2>
                                    </div>

                                    {/* Information overlay on top of the image */}
                                    <div className='absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                        <div className='flex flex-col justify-center h-full p-4'>
                                            {/* Description centered vertically */}
                                            <div className='flex-1 flex items-center justify-center'>
                                                <p className='text-3xl text-center'>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Shop buttons positioned absolutely on top of the image */}
                            {/* Shop buttons positioned absolutely on top of the image */}
                            <div className='absolute bottom-4 left-4 right-4 flex flex-col gap-4 z-20'>
                                <AddToBag
                                    currency="USD"
                                    description={product.description}
                                    image={product.images[0]}
                                    name={product.name}
                                    price={product.price}
                                    key={`${product._id}-add-to-bag`}
                                    price_id={product.price_id}
                                />
                                <CheckoutNow
                                    currency="USD"
                                    description={product.description}
                                    image={product.images[0]}
                                    name={product.name}
                                    price={product.price}
                                    key={`${product._id}-checkout-now`}  
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
