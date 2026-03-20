import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HeroStink from './components/HeroStink'
import NavStink from './components/NavStink'
import IntroStink from './components/IntroStink'
import WorkGridStink from './components/WorkGridStink'
import AboutStink from './components/AboutStink'
import ContactStink from './components/ContactStink'
import NewsStink from './components/NewsStink'
import FooterStink from './components/FooterStink'
import LoadingScreen from './components/LoadingScreen'
import ProjectPage from './components/ProjectPage'

function HomePage() {
  return (
    <>
      <HeroStink />
      <NavStink />
      <IntroStink />
      <WorkGridStink />
      <AboutStink />
      <ContactStink />
      <NewsStink />
      <FooterStink />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </Router>
  )
}

export default App
