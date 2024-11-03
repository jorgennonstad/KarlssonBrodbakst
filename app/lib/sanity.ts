import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: 'koixe24m',
    dataset: 'production',
    apiVersion: '2024-02-11',
    useCdn: true,
});

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
    return builder.image(source)
}