import styles from './Logo.module.css'

export default function Logo({ scale = 1, style, className, theme = 'light' }) {
  const themeClass = theme === 'dark' ? styles.darkTheme : styles.lightTheme;
  const logoColor = theme === 'dark' ? '#000000' : '#ffffff';

  // We use SVG for the logo to ensure "STRATEGIES" is pixel-perfectly aligned 
  // with the edges of "LEFT FLANK" using textLength and lengthAdjust.
  return (
    <div 
      className={`${styles.logoContainer} ${themeClass} ${className || ''}`}
      style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'left center',
        ...style 
      }}
    >
      <svg 
        width="120" 
        height="40" 
        viewBox="0 0 120 40" 
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.logoSvg}
      >
        <text 
          x="0" 
          y="20" 
          textLength="120" 
          lengthAdjust="spacing" 
          className={styles.svgTopText}
          fill={logoColor}
        >
          LEFT FLANK
        </text>
        <text 
          x="0" 
          y="31" 
          textLength="120" 
          lengthAdjust="spacing" 
          className={styles.svgBottomText}
          fill={logoColor}
        >
          STRATEGIES
        </text>
        <line 
          x1="0" 
          y1="38" 
          x2="120" 
          y2="38" 
          stroke={logoColor}
          strokeWidth="1.2"
          className={styles.svgLine}
        />
      </svg>
    </div>
  )
}
