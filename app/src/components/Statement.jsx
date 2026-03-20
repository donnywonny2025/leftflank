import { motion } from 'framer-motion'
import styles from './Statement.module.css'

export default function Statement() {
  return (
    <section className={styles.statement}>
      <div className={styles.inner}>
        
        {/* Massive Branding Lockup directly below video */}
        <motion.h1 
          className={styles.massiveTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.lineOne}>LEFT FLANK</span>
          <span className={styles.lineTwo}>STRATEGIES</span>
        </motion.h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Premium political media. Built for the firms that win.
        </motion.p>
        
        <div className={styles.spacer} />

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Boutique political video production for the firms that win races.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#work" className={styles.cta}>
            View Our Work <span className={styles.arrow}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
