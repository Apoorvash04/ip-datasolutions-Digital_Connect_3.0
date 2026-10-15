import { motion } from 'framer-motion'

// Vector recreation of the Digital Connect USB mark
export const MARK_PATH = 'M30 2 H70 V38 H90 V70 A40 30 0 0 1 10 70 V38 H30 Z'

export function LogoMark({ size = 40, animated = false, id = 'lm' }) {
  return (
    <svg width={size} height={size * 1.05} viewBox="0 0 100 105" fill="none">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#023e6b" />
          <stop offset="0.5" stopColor="#00d4f5" />
          <stop offset="1" stopColor="#023e6b" />
        </linearGradient>
      </defs>
      {animated ? (
        <motion.path
          d={MARK_PATH}
          stroke="#00d4f5"
          strokeWidth="1.5"
          fill={`url(#${id}-g)`}
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ pathLength: { duration: 1.2, ease: 'easeInOut' }, fillOpacity: { delay: 1, duration: 0.6 } }}
        />
      ) : (
        <path d={MARK_PATH} fill={`url(#${id}-g)`} />
      )}
      <motion.rect x="38" y="12" width="9" height="6" fill="#fff"
        initial={animated ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} />
      <motion.rect x="53" y="12" width="9" height="6" fill="#fff"
        initial={animated ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wm-dark">DIGITAL</span>
      <span className="wm-cyan">CONNECT</span>
    </span>
  )
}
