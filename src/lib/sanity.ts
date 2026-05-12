import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'c2t45jcn',
  dataset: 'production',
  useCdn: false, // Set to false to bypass CDN and get fresh data
  apiVersion: '2024-03-12', // use current date
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
