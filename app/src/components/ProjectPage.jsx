import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { portfolioData } from '../data/portfolio'
import NavStink from './NavStink'
import FooterStink from './FooterStink'
import styles from './ProjectPage.module.css'

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = portfolioData.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className={styles.error}>
        <h1>Project Not Found</h1>
        <Link to="/">Back Home</Link>
      </div>
    )
  }

  // Helper to get video embed URL
  const getEmbedUrl = () => {
    if (project.vimeoId) {
      const hash = project.vimeoHash ? `?h=${project.vimeoHash}` : ''
      return `https://player.vimeo.com/video/${project.vimeoId}${hash}`
    }
    if (project.youtubeId) {
      return `https://www.youtube.com/embed/${project.youtubeId}`
    }
    return null
  }

  const embedUrl = getEmbedUrl()

  return (
    <div className={styles.container}>
      <NavStink />
      
      <main className={styles.main}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.meta}>
            <span className={styles.client}>{project.client}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.tags}>
              {project.tags?.map(t => <span key={t}>{t}</span>)}
              <span className={styles.year}>{project.year}</span>
            </div>
          </div>
        </motion.div>

        <section className={styles.playerSection}>
          {embedUrl ? (
            <div className={styles.aspectRatio}>
              <iframe
                src={embedUrl}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={project.title}
              />
            </div>
          ) : (
            <div className={styles.noVideo}>
              <img src={project.thumbnail} alt={project.title} />
            </div>
          )}
        </section>

        <section className={styles.footerNav}>
          <Link to="/" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            BACK TO WORK
          </Link>
        </section>
      </main>

      <FooterStink />
    </div>
  )
}
