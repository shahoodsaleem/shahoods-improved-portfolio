'use client'

import { useCallback } from 'react'
import { useLenis } from '../../hooks/useLenis'
import Preloader from '../../sections/Preloader'
import GrainOverlay from '../../sections/GrainOverlay'
import Navigation from '../../sections/Navigation'
import SocialLinks from '../../sections/SocialLinks'
import Hero from '../../sections/Hero'
import Intro from '../../sections/Intro'
import Expertise from '../../sections/Expertise'
import Projects from '../../sections/Projects'
import Contact from '../../sections/Contact'

export default function HomeClient() {
  useLenis()

  const handlePreloaderComplete = useCallback(() => {
    // Preloader complete - content is ready
  }, [])

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <GrainOverlay />
      <Navigation />
      <SocialLinks />
      <main>
        <Hero />
        <Intro />
        <Expertise />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
