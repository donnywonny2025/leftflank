import { motion } from 'framer-motion'
import styles from './Services.module.css'

const SERVICES = [
  { num: '01', name: 'TV Spots', desc: 'Broadcast-ready campaign ads that move voters. Full post-production from rough cut to air.' },
  { num: '02', name: 'Digital Video', desc: 'Platform-optimized content for paid digital, social, and pre-roll. Cut for every ratio.' },
  { num: '03', name: 'Rapid Response', desc: 'Same-day turnarounds when the news cycle demands it. We don\'t sleep on deadlines.' },
  { num: '04', name: 'Post-Production', desc: 'Color, graphics, sound design, finishing. The details that separate good from great.' },
]

export default function Services() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.inner}>
        <motion.span
          className={styles.tag}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          CAPABILITIES
        </motion.span>
        <div className={styles.divider} />

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Direct-to-editor access. No agency overhead.
        </motion.h2>

        <div className={styles.grid}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.num}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.num}>{svc.num}</span>
              <h3 className={styles.name}>{svc.name}</h3>
              <p className={styles.desc}>{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
