import Image from 'next/image'
import { client, urlFor } from '../../lib/sanity'
import Link from "next/link";

async function getData(){
    const query= '*[_type == "heroImage"][0]';
    const data = await client.fetch(query)
    return data
}

export default async function Hero() {
    const data = await getData()
    return (
        <div>
            <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
                <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                    <div className=" mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
                            Karlson Brødbakst
                        </h1>
                        <p>
                            Vi selger og leverer de ferskeste og beste foccaciaene i hele Gjøvik. Vi har også et stort utvalg av brød og aioli.
                        </p>
                    </div>

                    <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                        <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                            <Image 
                            src={urlFor(data.image1).url()} 
                            alt='Great Photo'
                            className='h-full w-full object-cover object-center'
                            width={500}
                            height={500}
                            />
                        </div>

                        <div className='overflow-hidden rounded-lg bg-gray-100 shadow-lg'>
                            <Image src={urlFor(data.image2).url()} alt="Great Photo" 
                            className='h-full w-full object-cover object-center'
                            width={500}
                            height={500}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col item-center justify-between gap-8 md:flex-row'>
                        <div className='flex h-12 w-64 divide-x overflow-hidden rounded-lg border'>
                            <Link href="/Foccacia" className='flex w-1/4 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray200'>
                                Foccacia
                            </Link>
                            <Link href="/Brod" className='flex w-1/4 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray200'>
                                Brød
                            </Link>
                            <Link href="/Abonoment" className='flex w-1/4 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray200'>
                            Abonoment
                            </Link>
                            <Link href="/Aioli" className='flex w-1/4 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray200'>
                                Aioli
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


