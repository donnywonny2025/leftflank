import { motion } from 'framer-motion'
import styles from './HeroPlayer.module.css'

export default function HeroPlayer() {
  return (
    <section className={styles.heroPlayer}>
      <motion.div 
        className={styles.videoContainer}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className={styles.video}
          poster="https://jefferykerr.com/Videos/NBPOSTER_clean.jpg"
        >
          <source src="https://jefferykerr.com/Videos/NB_Loop.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </section>
  )
}
