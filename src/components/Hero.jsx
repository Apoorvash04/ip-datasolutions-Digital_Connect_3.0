import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { LogoMark, Wordmark } from './Logo'
import { NetworkCanvas, Magnetic } from './Effects'
import { CodeIcon, PenIcon, ServerIcon, CloudIcon, ShieldIcon, ChipIcon, ArrowIcon } from './Icons'

const links = ['Services', 'Infrastructure', 'Process', 'Testimonials', 'Contact']

export function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 300 && !open)
    setScrolled(v > 40)
  })
  return (
    <motion.header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      animate={{ y: hidden ? '-110%' : 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
      <a href="#top" className="nav-brand"><LogoMark size={34} id="nav" /><Wordmark /></a>
      <nav className="nav-links">
        {links.map((l, i) => (
          <motion.a key={l} href={`#${l.toLowerCase()}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 + i * 0.08 }}>{l}</motion.a>
        ))}
      </nav>
      <a href="#contact" className="btn btn-primary btn-sm nav-cta">Get a Quote</a>
      <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            {links.map((l, i) => (
              <motion.a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>{l}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const words = ['Websites', 'Content', 'IT Solutions', 'Servers', 'Cloud']
const orbitItems = [
  { Icon: CodeIcon, label: 'Web Dev' },
  { Icon: PenIcon, label: 'Content' },
  { Icon: ServerIcon, label: 'Servers' },
  { Icon: CloudIcon, label: 'Cloud' },
  { Icon: ShieldIcon, label: 'Security' },
  { Icon: ChipIcon, label: 'IT' },
]

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span key={words[i]} className="grad-text"
          initial={{ y: '100%', opacity: 0, rotateX: -80 }} animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: '-100%', opacity: 0, rotateX: 80 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const line = (delay) => ({
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] } },
})

function HeroVisual() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 100, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 100, damping: 15 })
  useEffect(() => {
    const move = (e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5) }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  return (
    <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
      <motion.div className="visual-3d" style={{ rotateX: rx, rotateY: ry }}>
        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />
        <div className="core-glow" />
        <motion.div className="core-mark" animate={{ y: [0, -18, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <LogoMark size={170} id="hero" />
          <div className="mark-shadow" />
        </motion.div>
        <div className="orbit">
          {orbitItems.map(({ Icon, label }, i) => {
            const angle = (i / orbitItems.length) * 360
            return (
              <div key={label} className="orbit-slot" style={{ transform: `rotate(${angle}deg) translateX(var(--orbit-r)) rotate(${-angle}deg)` }}>
                <div className="orbit-chip">
                  <Icon />
                  <span>{label}</span>
                </div>
              </div>
            )
          })}
        </div>
        {[...Array(10)].map((_, i) => (
          <motion.span key={i} className="spark"
            style={{ left: `${50 + 45 * Math.cos(i * 0.63)}%`, top: `${50 + 45 * Math.sin(i * 0.63)}%` }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.35 }} />
        ))}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 600], [0, 150])
  const fade = useTransform(scrollY, [0, 500], [1, 0])
  return (
    <section className="hero" id="top">
      <NetworkCanvas />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="grid-bg" />
      <motion.div className="hero-inner" style={{ y: yText, opacity: fade }}>
        <div className="hero-text">
          <motion.div className="pill" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
            <span className="pulse" /> Web · Content · IT · Servers
          </motion.div>
          <motion.h1 initial="hidden" animate="show">
            <span className="line-mask"><motion.span variants={line(2.4)}>We Build, Create</motion.span></span>
            <span className="line-mask"><motion.span variants={line(2.55)}>& Connect Your</motion.span></span>
            <span className="line-mask"><motion.span variants={line(2.7)}><RotatingWord /></motion.span></span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.9, duration: 0.8 }}>
            Digital Connect is your one-stop technology partner — from stunning websites and scroll-stopping
            content to rock-solid IT services and high-performance servers that keep your data alive 24/7.
          </motion.p>
          <motion.div className="hero-btns" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.05, duration: 0.8 }}>
            <Magnetic><a href="#contact" className="btn btn-primary">Start Your Project <ArrowIcon /></a></Magnetic>
            <Magnetic><a href="#services" className="btn btn-ghost">Explore Services</a></Magnetic>
          </motion.div>
          <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.3 }}>
            <div className="avatars">
              {['#00d4f5', '#0077b6', '#023e6b', '#48cae4'].map((c, i) => <span key={i} style={{ background: c }}>{'ADSR'[i]}</span>)}
            </div>
            <div><strong>250+ businesses</strong> already connected</div>
          </motion.div>
        </div>
        <HeroVisual />
      </motion.div>
      <motion.a href="#services" className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }}>
        <span className="mouse"><motion.span animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.8, repeat: Infinity }} /></span>
        Scroll
      </motion.a>
    </section>
  )
}
