import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import styles from './NavStink.module.css'

export default function NavStink() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  // Handle hash scrolling on page load or navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      // Small delay to let the page render before scrolling
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 2.0 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const handleLinkClick = (e, target) => {
    e.preventDefault()
    setOpen(false)
    const id = target.replace('#', '')

    if (isHome) {
      // Already on home page — just scroll to the section
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      // Update URL hash without triggering navigation
      window.history.pushState(null, '', `/#${id}`)
    } else {
      // On a different page — navigate home, then scroll after render
      navigate(`/#${id}`)
    }
  }

  return (
    <motion.nav 
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} 
      initial="hidden" 
      animate="visible" 
      variants={navVariants}
    >
      <div className={styles.inner}>
        <motion.div className={styles.logoLink} variants={itemVariants}>
          <Link to="/" onClick={() => setOpen(false)}>
            <Logo scale={scrolled ? 0.8 : 1} />
          </Link>
        </motion.div>
        <div className={styles.links}>
          {['Work', 'About', 'News', 'Contact'].map(link => (
             <motion.div key={link} className={styles.link} variants={itemVariants}>
               <Link 
                 to={`/#${link.toLowerCase()}`} 
                 onClick={(e) => handleLinkClick(e, `#${link.toLowerCase()}`)}
                >
                 {link}
               </Link>
             </motion.div>
          ))}
        </div>
        <motion.button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          variants={itemVariants}
        >
          <span /><span /><span />
        </motion.button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          <Link to="/#work" className={styles.mobileLink} onClick={(e) => handleLinkClick(e, '#work')}>Work</Link>
          <Link to="/#about" className={styles.mobileLink} onClick={(e) => handleLinkClick(e, '#about')}>About</Link>
          <Link to="/#news" className={styles.mobileLink} onClick={(e) => handleLinkClick(e, '#news')}>News</Link>
          <Link to="/#contact" className={styles.mobileLink} onClick={(e) => handleLinkClick(e, '#contact')}>Contact</Link>
        </div>
      )}
    </motion.nav>
  )
}

