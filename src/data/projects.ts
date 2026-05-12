import { client } from '../lib/sanity';

export interface ProjectImage {
  src: string | null;
  alt: string;
  asset?: any;
}

export interface ProjectBody {
  overview: string;
  methodology?: string;
  results?: string;
  conclusion?: string;
}

export interface Project {
  _id: string;
  id: string; // for backward compatibility
  slug: string;
  title: string;
  category: string;
  description: string;
  year: string;
  featured: boolean;
  images: ProjectImage[];
  body: ProjectBody;
}

// GROQ Query for all projects
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  category,
  description,
  year,
  featured,
  "images": coalesce(images[] {
    alt,
    "src": image.asset->url,
    "asset": image.asset
  }, []),
  body
}`;

// GROQ Query for featured projects
export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(year desc) {
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  category,
  description,
  year,
  featured,
  "images": coalesce(images[] {
    alt,
    "src": image.asset->url,
    "asset": image.asset
  }, []),
  body
}`;

// GROQ Query for a single project by slug
export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  category,
  description,
  year,
  featured,
  "images": coalesce(images[] {
    alt,
    "src": image.asset->url,
    "asset": image.asset
  }, []),
  body
}`;

// Helper to fetch all projects
export const fetchAllProjects = async (): Promise<Project[]> => {
  console.log('Fetching all projects...');
  try {
    const data = await client.fetch(ALL_PROJECTS_QUERY);
    console.log('All Projects Data:', data);
    return data || [];
  } catch (err) {
    console.error('Error fetching all projects:', err);
    return [];
  }
};

// Helper to fetch featured projects
export const fetchFeaturedProjects = async (): Promise<Project[]> => {
  console.log('Fetching featured projects...');
  try {
    const data = await client.fetch(FEATURED_PROJECTS_QUERY);
    console.log('Featured Projects Data:', data);
    return data || [];
  } catch (err) {
    console.error('Error fetching featured projects:', err);
    return [];
  }
};

// Helper to fetch single project
export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  console.log(`Fetching project with slug: ${slug}`);
  try {
    const data = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug });
    console.log('Project Data:', data);
    return data || null;
  } catch (err) {
    console.error('Error fetching project by slug:', err);
    return null;
  }
};

// Legacy static data (empty for now, as we transition to async)
export const projects: Project[] = [];
