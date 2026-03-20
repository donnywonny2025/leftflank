import { motion } from 'framer-motion'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
      <motion.div 
      className={styles.loading}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      exit={{ 
        y: '-100%',
        transition: { 
          duration: 1.0, 
          ease: [0.16, 1, 0.3, 1]
        } 
      }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.logo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.left}>LEFT</span>
          <span className={styles.flank}>FLANK</span>
        </motion.div>
        
        <motion.div 
          className={styles.presents}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } }
          }}
        >
          {'STRATEGIES'.split('').map((char, index) => (
            <motion.span 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <div className={styles.lineWrap}>
          <motion.div 
            className={styles.line}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  )
}
