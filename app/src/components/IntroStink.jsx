import { motion } from 'framer-motion'
import styles from './IntroStink.module.css'

const AsteriskSvg = () => (
  <motion.svg 
    width="26" 
    height="26" 
    viewBox="0 0 24 24" 
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.asterisk}
    animate={{ rotate: 360 }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
  >
    <path d="M10.8 0H13.2V8.5L20.5 4L21.8 6L14.5 10.5L21.8 15L20.5 17L13.2 12.5V21H10.8V12.5L3.5 17L2.2 15L9.5 10.5L2.2 6L3.5 4L10.8 8.5V0Z" fill="var(--text-white)"/>
  </motion.svg>
);

export default function IntroStink() {
  const sentence = "We're a premium political video agency. From the first idea to the final cut, we deliver creative built for campaigns that win.";
  const words = sentence.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: 2.6 }
    }
  };

  const child = {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const tagsContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 3.7 } 
    }
  }

  const tagItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section className={styles.intro}>
      <div className={styles.inner}>
        <motion.p 
          className={styles.statement}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.4em' }}>
             <motion.span style={{ display: 'inline-block' }} variants={child}>
                <AsteriskSvg />
             </motion.span>
          </span>
          {words.map((word, index) => (
            <span key={index} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em', paddingBottom: '0.1em' }}>
              <motion.span style={{ display: 'inline-block' }} variants={child}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.p>
        <motion.div 
           className={styles.tags}
           variants={tagsContainer}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 1 }}
        >
          <motion.span className={styles.tag} variants={tagItem}>CAMPAIGNS</motion.span>
          <motion.span className={styles.tag} variants={tagItem}>EDITORIAL</motion.span>
          <motion.span className={styles.tag} variants={tagItem}>BRANDED</motion.span>
        </motion.div>
      </div>
    </section>
  )
}
