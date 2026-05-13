import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchProjectBySlug, fetchAllProjects } from '../../../data/projects'
import ProjectDetailClient from './ProjectDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO - title and description come from Sanity CMS
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await fetchProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | Shahood Saleem',
    }
  }

  return {
    title: `${project.title} | Shahood Saleem`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Shahood Saleem`,
      description: project.description,
      type: 'article',
      images: project.images?.[0]?.src
        ? [{ url: project.images[0].src, alt: project.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Shahood Saleem`,
      description: project.description,
    },
  }
}

// Pre-generate all known project pages at build time
export async function generateStaticParams() {
  const projects = await fetchAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

// Server component — fetches data, passes to interactive client component
export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await fetchProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
