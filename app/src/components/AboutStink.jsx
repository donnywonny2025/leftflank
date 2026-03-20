import { motion } from 'framer-motion'
import styles from './AboutStink.module.css'

/* Per-letter spectrum cascade */
function SpectrumText({ text, delayOffset = 0, perChar = 0.04 }) {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className={styles.spectrumChar}
      style={{ animationDelay: `${delayOffset + i * perChar}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

export default function AboutStink() {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
    }
  }

  const child = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  const serviceReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 }
    }
  }

  const serviceItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  }

  const services = [
    'Campaign Advertising',
    'Rapid Response',
    'Documentary',
    'Motion Graphics',
    'Digital & Social',
  ]

  const line1 = "POLITICAL CREATIVE."
  const line2 = "BUILT TO PERFORM."
  const line2Offset = line1.length * 0.04

  return (
    <section className={styles.about} id="about">
      <div className={styles.grain} />
      <motion.div 
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Headline — each line treated as its own block */}
        <motion.div className={styles.headlineBlock} variants={child}>
          <h2 className={styles.headline}>
            <span className={styles.headlineLine}>
              <SpectrumText text={line1} delayOffset={2} perChar={0.04} />
            </span>
            <br/>
            <span className={styles.headlineLine}>
              <SpectrumText text={line2} delayOffset={2 + line2Offset} perChar={0.04} />
            </span>
          </h2>
          <div className={styles.headlineCta}>
            <span className={styles.highlight}>LET'S WORK.</span>
          </div>
        </motion.div>

        {/* Body — one tight paragraph */}
        <motion.p className={styles.body} variants={child}>
          Left Flank is a political video production studio. We produce campaign ads, rapid response content, and documentary work for progressive campaigns at every level.
        </motion.p>

        {/* Services — horizontal tags, not a list */}
        <motion.div 
          className={styles.services}
          variants={serviceReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {services.map((service, i) => (
            <motion.span key={i} className={styles.serviceTag} variants={serviceItem}>
              {service}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scanning line */}
      <div className={styles.scanlineWrap}>
        <div className={styles.scanline} />
      </div>
    </section>
  )
}
