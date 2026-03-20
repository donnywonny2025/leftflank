import { motion } from 'framer-motion'
import styles from './ContactStink.module.css'

export default function ContactStink() {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  }

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className={styles.contact} id="contact">
      <motion.div 
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className={styles.grid}>
          <motion.div className={styles.leftCol} variants={child}>
            <h2 className={styles.title}>START A <br />PROJECT</h2>
            <p className={styles.sub}>
              Ready for the 2026 cycle? We are currently accepting overflow production partnerships and direct campaign creative roles.
            </p>
            <div className={styles.contactInfo}>
              <a href="mailto:info@leftflankstrategies.com" className={styles.link}>info@leftflankstrategies.com</a>
              <a href="tel:2025550198" className={styles.link}>202.555.0198</a>
              <span className={styles.location}>Washington, D.C.</span>
            </div>
          </motion.div>

          <motion.div className={styles.rightCol} variants={child}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Name" required />
              </div>
              <div className={styles.inputGroup}>
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Agency or Campaign" />
              </div>
              <div className={styles.inputGroup}>
                <textarea placeholder="Project Details / Timeline" rows={4} required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>
                SEND INQUIRY →
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
