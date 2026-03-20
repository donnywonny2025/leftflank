import { motion } from 'framer-motion'
import Logo from './Logo'
import styles from './HeroStink.module.css'

export default function HeroStink() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 3.1 } 
    }
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className={styles.hero}>
      <motion.video
        className={styles.video}
        src={`${import.meta.env.BASE_URL}hero-loop.mp4`}
        autoPlay
        muted
        loop
        playsInline
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

    </section>
  )
}
