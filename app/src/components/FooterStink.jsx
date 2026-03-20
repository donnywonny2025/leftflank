import { motion } from 'framer-motion'
import Logo from './Logo'
import styles from './FooterStink.module.css'

export default function FooterStink() {
  const container = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  }

  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.footer 
       className={styles.footer}
       variants={container}
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.inner}>
        {/* Giant official logo */}
        <motion.div variants={child} className={styles.logoWrap}>
          <Logo scale={1.2} theme="dark" />
        </motion.div>

        <motion.p className={styles.tagline} variants={child}>
          What we've learned creating the campaigns that changed elections.
        </motion.p>

        {/* Newsletter */}
        <motion.div className={styles.newsletter} variants={child}>
          <input
            type="email"
            placeholder="Sign up for our newsletter"
            className={styles.emailInput}
          />
          <button className={styles.subscribeBtn}>SUBSCRIBE</button>
        </motion.div>

        {/* Link columns */}
        <motion.div className={styles.linkGrid} variants={child}>
          <div className={styles.linkCol}>
            <a href="#">2026 Impact Report</a>
            <a href="#">Our Values</a>
            <a href="#">Code of Conduct</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className={styles.linkCol}>
            <a href="#">Careers</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">X / Twitter</a>
          </div>
        </motion.div>
        
        {/* Copyright Legal Block */}
        <motion.div className={styles.legal} variants={child}>
          <span>&copy; 2026 Left Flank Strategies, LLC. All rights reserved.</span>
          <span className={styles.designCredit}>Site by Left Flank</span>
        </motion.div>
      </div>
    </motion.footer>
  )
}
