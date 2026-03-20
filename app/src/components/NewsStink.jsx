import { motion } from 'framer-motion'
import styles from './NewsStink.module.css'

const NEWS = [
  {
    title: 'How Left Flank Strategies Helped Flip a Key State Senate Seat',
    date: 'September 2026',
    desc: 'Read how our creative and rapid production made the difference.',
  },
  {
    title: 'Our Latest Campaign for Healthcare Access',
    date: 'August 2026',
    desc: 'Behind the scenes of a winning message.',
  },
  {
    title: 'AdAge Recognizes Our Work in "Best Political Campaigns of 2026"',
    date: 'July 2026',
    desc: 'See why our approach stands out.',
  },
]

export default function NewsStink() {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  }

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className={styles.news} id="news">
      <motion.div 
        className={styles.inner}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {NEWS.map((item, i) => (
          <motion.a
            href="#"
            className={styles.row}
            key={i}
            variants={rowVariants}
          >
            <span className={styles.icon}>↗</span>
            <div className={styles.content}>
              <h4 className={styles.headline}>{item.title}</h4>
              <p className={styles.meta}>{item.date} – {item.desc}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  )
}
