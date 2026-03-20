import { motion } from 'framer-motion'
import DomeGallery from './DomeGallery'
import styles from './DomeWork.module.css'

const PROJECT_IMAGES = [
  { src: 'https://jefferykerr.com/Videos/Reel_Poster.jpg', alt: 'Campaign Reel' },
  { src: 'https://jefferykerr.com/Videos/NBPOSTER_clean.jpg', alt: 'New Balance' },
  { src: 'https://jefferykerr.com/Videos/DannyPoster_clean.jpg', alt: 'Danny Was Here' },
  { src: 'https://jefferykerr.com/Videos/Biogen_Poster.jpg', alt: 'BioGen' },
  { src: 'https://jefferykerr.com/Videos/AISC_Poster.jpg', alt: 'AISC' },
  { src: 'https://jefferykerr.com/Videos/CRNPOSTER.jpg', alt: 'CRN' },
  { src: 'https://jefferykerr.com/Videos/BANCO_Loop.jpg', alt: 'Banco' },
  { src: 'https://jefferykerr.com/Videos/FTCLEANPoster.jpg', alt: 'FTC' },
  { src: 'https://jefferykerr.com/Videos/JusticePoster.jpg', alt: 'Justice' },
  { src: 'https://jefferykerr.com/Videos/NASAPoster.jpg', alt: 'NASA' },
]

export default function DomeWork() {
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
          images={PROJECT_IMAGES}
          fit={0.8}
          minRadius={500}
          segments={34}
          dragDampening={2}
          maxVerticalRotationDeg={3}
          overlayBlurColor="#060010"
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
          openedImageWidth="500px"
          openedImageHeight="350px"
          grayscale={true}
        />
      </motion.div>
    </section>
  )
}
