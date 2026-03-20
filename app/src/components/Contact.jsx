import { motion } from 'framer-motion'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className={styles.split}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.headline}>Let's talk about the 2026 cycle.</h2>
            <p className={styles.sub}>
              We're taking on production partners for the 2026 cycle. If you need fast, reliable overflow from editors who know political video — we're ready.
            </p>
          </motion.div>

          <motion.form
            className={styles.form}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={e => e.preventDefault()}
          >
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input type="text" placeholder="Your name" required className={styles.input} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Organization</label>
                <input type="text" placeholder="Firm or campaign" className={styles.input} />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input type="email" placeholder="you@firm.com" required className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Project Details</label>
              <textarea
                placeholder="Timeline, scope, deliverables..."
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submit}>
              Send Message <span className={styles.arrow}>→</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
