import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Define the type for the image asset (this can be adjusted if your structure differs)
interface SanityImage {
  asset: {
    _ref: string;
  };
}

export const client = createClient({
  projectId: 'koixe24m',
  dataset: 'production',
  apiVersion: '2024-02-11',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
