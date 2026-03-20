import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './WorkGrid.module.css'

const PROJECTS = [
  {
    id: 1,
    title: 'Campaign Reel',
    category: 'TV_SPOTS',
    poster: 'https://jefferykerr.com/Videos/Reel_Poster.jpg',
    video: 'https://jefferykerr.com/Videos/REELQuickLoop.mp4',
  },
  {
    id: 2,
    title: 'New Balance — Rome',
    category: 'DIGITAL',
    poster: 'https://jefferykerr.com/Videos/NBPOSTER_clean.jpg',
    video: 'https://jefferykerr.com/Videos/NBLoop.mp4',
  },
  {
    id: 3,
    title: 'Danny Was Here TV',
    category: 'TV_SPOTS',
    poster: 'https://jefferykerr.com/Videos/DannyPoster_clean.jpg',
    video: 'https://jefferykerr.com/Videos/DannyLoop.mp4',
  },
  {
    id: 4,
    title: 'BioGen — NeuroPioneers',
    category: 'DIGITAL',
    poster: 'https://jefferykerr.com/Videos/Biogen_Poster.jpg',
    video: 'https://jefferykerr.com/Videos/BiogenLoop.mp4',
  },
]

const FILTERS = ['ALL', 'TV_SPOTS', 'DIGITAL']

export default function WorkGrid() {
  const [filter, setFilter] = useState('ALL')
  const filtered = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section className={styles.work} id="work">
      <div className={styles.inner}>
        <div className={styles.header}>
          <motion.span
            className={styles.tag}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            RECENT WORK
          </motion.span>
          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterPill} ${filter === f ? styles.active : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <motion.div
          className={styles.grid}
          layout
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              layout
            >
              <div className={styles.imageWrap}>
                <img src={project.poster} alt={project.title} className={styles.poster} />
                <video
                  className={styles.video}
                  src={project.video}
                  muted
                  loop
                  playsInline
                  onMouseEnter={e => e.target.play()}
                  onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0 }}
                />
              </div>
              <h3 className={styles.title}>{project.title}</h3>
              <span className={styles.category}>#{project.category}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
