import { motion } from 'framer-motion'
import styles from './About.module.css'

const STATS = [
  { value: '15+', label: 'Years Experience' },
  { value: '24hr', label: 'Rapid Response' },
  { value: '2', label: 'Senior Editors' },
]

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <motion.span
          className={styles.tag}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          PURPOSE
        </motion.span>
        <div className={styles.divider} />

        <div className={styles.split}>
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.headline}>
              We are the people who actually make the work.
            </h2>
            <p className={styles.body}>
              <strong>Left Flank Strategies</strong> is Jeff Kerr and Dan Egan — two veteran editors providing specialized overflow capacity for the country's top media consulting firms. We're not strategists. We're not pollsters. We're not media buyers.
            </p>
            <p className={styles.body}>
              We are the people who actually make the work. TV spots, digital video, rapid response content — delivered fast, delivered right. Your production partner for the 2026 cycle.
            </p>
            <a href="#contact" className={styles.cta}>
              Learn more about us <span className={styles.arrow}>→</span>
            </a>
          </motion.div>

          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {STATS.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statVal}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
