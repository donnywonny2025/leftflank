import { motion } from 'framer-motion'
import DomeGallery from './DomeGallery'
import { portfolioData } from '../data/portfolio'
import styles from './DomeWork.module.css'

export default function DomeWork() {
  // Map portfolio data to the format DomeGallery expects
  const galleryItems = portfolioData.map(item => ({
    src: item.thumbnail,
    alt: item.title,
    vimeoId: item.vimeoId,
    vimeoHash: item.vimeoHash
  }))

  return (
    <section className={styles.hero}>
      {/* Contained dome box */}
      <motion.div
        className={styles.domeBox}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <DomeGallery
          images={galleryItems}
          fit={0.8}
          minRadius={500}
          segments={34}
          dragDampening={2}
          maxVerticalRotationDeg={3}
          overlayBlurColor="#060010"
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
          openedImageWidth="90vw"
          openedImageHeight="50.625vw" /* 16:9 aspect ratio */
          grayscale={true}
        />
      </motion.div>
    </section>
  )
}
