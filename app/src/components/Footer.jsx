import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>LEFT FLANK</span>
        <span className={styles.copy}>© {new Date().getFullYear()} Left Flank Strategies. All rights reserved.</span>
      </div>
    </footer>
  )
}
