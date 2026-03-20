import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { portfolioData } from '../data/portfolio'
import styles from './WorkGridStink.module.css'

// Custom hook to detect when an element is in view (for autoplay)
function useInView(ref) {
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, { threshold: 0.1 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isInView
}

function AutoVideo({ src, poster, className }) {
  const videoRef = useRef(null)
  const isInView = useInView(videoRef)

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      muted
      playsInline
      loop
      autoPlay
    />
  )
}

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const rowVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
  }
}

function Card({ project, wrapClass }) {
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <motion.div 
      className={styles.card}
      variants={cardVariants}
    >
      <Link to={`/work/${project.slug}`} className={styles.cardLink} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className={wrapClass || styles.imageWrap}>
          {project.hoverClip ? (
            <AutoVideo
              className={styles.video}
              src={`${baseUrl}${project.hoverClip.replace(/^\//, '')}`}
              poster={`${baseUrl}${project.thumbnail.replace(/^\//, '')}`}
              style={project.videoZoom ? { transform: `scale(${project.videoZoom})` } : {}}
            />
          ) : (
            <img 
              src={`${baseUrl}${project.thumbnail.replace(/^\//, '')}`} 
              alt={project.title} 
              className={styles.video} 
              style={project.videoZoom ? { transform: `scale(${project.videoZoom})` } : {}}
            />
          )}
          <div className={styles.projectPlay}>
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        <h3 className={styles.title} data-title={project.title}>{project.title}</h3>
        <p className={styles.desc}>{project.subtitle || project.client}</p>
        <div className={styles.tags}>
          {project.tags && project.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
        </div>
      </Link>
    </motion.div>
  )
}

function RevealRow({ children, className }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.1, once: true })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-inview={inView}
      className={`${className} ${styles.revealRow}`}
    >
      {children}
    </div>
  )
}

function buildEditorialGrid(items, styles) {
  const projects = [...items];
  const grid = [];
  let i = 0;
  let patternIndex = 0;
  
  while (i < projects.length) {
    const remaining = projects.length - i;
    
    // Cycle through 4 distinct patterns for a more dynamic feel
    const pattern = patternIndex % 4;
    
    if (pattern === 0) {
      // Big Left (Uses 2 items)
      const chunk = projects.slice(i, i + 2);
      grid.push(
        <RevealRow key={`row-left-${i}`} className={styles.rowBigLeft}>
          <Card project={chunk[0]} wrapClass={styles.imageWrapTall} />
          {chunk[1] && <Card project={chunk[1]} />}
        </RevealRow>
      );
      i += (chunk.length);
    } 
    else if (pattern === 1) {
      // Full Width (Uses 1 item)
      grid.push(
        <RevealRow key={`row-full-${i}`} className={styles.rowFull}>
          <Card project={projects[i]} wrapClass={styles.imageWrapWide} />
        </RevealRow>
      );
      i += 1;
    } 
    else if (pattern === 2) {
      // Big Right (Uses 2 items)
      const chunk = projects.slice(i, i + 2);
      grid.push(
        <RevealRow key={`row-right-${i}`} className={styles.rowBigRight}>
          {chunk[1] && <Card project={chunk[1]} />}
          <Card project={chunk[0]} wrapClass={styles.imageWrapTall} />
        </RevealRow>
      );
      i += (chunk.length);
    } 
    else {
      // Two Even (Uses 2 items)
      const chunk = projects.slice(i, i + 2);
      grid.push(
        <RevealRow key={`row-even-${i}`} className={styles.rowTwoEven}>
          <Card project={chunk[0]} />
          {chunk[1] && <Card project={chunk[1]} />}
        </RevealRow>
      );
      i += (chunk.length);
    }
    
    patternIndex++;
  }
  
  return grid;
}

export default function WorkGridStink() {
  const recentIds = ['2', '3', '1', '5', '6', '11', '13'];
  const legacyIds = ['14', '15', '16', '19', '20', '10'];
  const advocacyIds = ['21', '22', '23', '24', '17', '18'];

  const recentItems = portfolioData.filter(p => recentIds.includes(p.id))
    .sort((a, b) => recentIds.indexOf(a.id) - recentIds.indexOf(b.id));
    
  const legacyItems = portfolioData.filter(p => legacyIds.includes(p.id))
    .sort((a, b) => legacyIds.indexOf(a.id) - legacyIds.indexOf(b.id));

  const advocacyItems = portfolioData.filter(p => advocacyIds.includes(p.id))
    .sort((a, b) => advocacyIds.indexOf(a.id) - advocacyIds.indexOf(b.id));

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="work" className={styles.workGrid}>
      <motion.div 
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Recent /</span>
          <h2 className={styles.sectionTitle}>Campaigns</h2>
        </div>
        <div className={styles.editorialGrid}>
          {buildEditorialGrid(recentItems, styles)}
        </div>

        <div className={styles.legacySection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Archival /</span>
            <h2 className={styles.sectionTitle}>Legacy Content</h2>
          </div>
          <div className={styles.legacyList}>
            {legacyItems.map((item, index) => (
              <RevealRow 
                key={item.id} 
                className={styles.legacyProject}
              >
                <Link to={`/work/${item.slug}`} className={styles.legacyLink}>
                  <motion.div className={styles.legacyNumber} variants={cardVariants}>{(index + 1).toString().padStart(2, '0')}</motion.div>
                  <motion.div className={styles.legacyMedia} variants={cardVariants}>
                    {item.hoverClip ? (
                      <AutoVideo 
                        src={`${baseUrl}${item.hoverClip.replace(/^\//, '')}`}
                        poster={`${baseUrl}${item.thumbnail.replace(/^\//, '')}`}
                        className={styles.legacyVideo}
                      />
                    ) : (
                      <img src={`${baseUrl}${item.thumbnail.replace(/^\//, '')}`} alt={item.title} className={styles.legacyVideo} />
                    )}
                  </motion.div>
                  <motion.div className={styles.legacyInfo} variants={cardVariants}>
                    <h3 className={styles.legacyTitle}>{item.title}</h3>
                    <p className={styles.legacySubtitle}>{item.client} — {item.year}</p>
                  </motion.div>
                  <div className={styles.legacyArrow}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              </RevealRow>
            ))}
          </div>
        </div>

        <div className={styles.advocacySection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Focused /</span>
            <h2 className={styles.sectionTitle}>Advocacy & Gov</h2>
          </div>
          <div className={styles.editorialGrid}>
            {buildEditorialGrid(advocacyItems, styles)}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
