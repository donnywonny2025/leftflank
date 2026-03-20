import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import styles from './NavStink.module.css'

export default function NavStink() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      // Threshold for when navigation should transition (e.g. past hero)
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
    if (isHome && target.startsWith('#')) {
      // Allow default hash scroll on home page
      setOpen(false)
    } else {
      // Force navigation to home page with hash
      setOpen(false)
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
          <Link to="/#work" className={styles.mobileLink} onClick={() => setOpen(false)}>Work</Link>
          <Link to="/#about" className={styles.mobileLink} onClick={() => setOpen(false)}>About</Link>
          <Link to="/#news" className={styles.mobileLink} onClick={() => setOpen(false)}>News</Link>
          <Link to="/#contact" className={styles.mobileLink} onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </motion.nav>
  )
}

