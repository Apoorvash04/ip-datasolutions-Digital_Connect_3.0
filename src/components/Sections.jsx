import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Reveal, SectionTitle, Counter, Magnetic } from './Effects'
import { LogoMark, Wordmark } from './Logo'
import { CodeIcon, PenIcon, ChipIcon, ServerIcon, CloudIcon, ShieldIcon, ArrowIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'

/* ---------------- Marquee ---------------- */
const tech = ['React', 'Next.js', 'Node.js', 'WordPress', 'Shopify', 'AWS', 'Linux', 'Docker', 'Figma', 'Adobe Suite', 'SEO', 'MySQL', 'Cloudflare', 'Kubernetes']

function MarqueeRow({ items, reverse }) {
  return (
    <div className="marquee-track">
      <div className={`marquee ${reverse ? 'reverse' : ''}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="chip">
            <span className="chip-glyph">{t.slice(0, 1)}</span>{t}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  const half = Math.ceil(tech.length / 2)
  return (
    <section className="marquee-wrap">
      <Reveal>
        <p className="marquee-label"><span />Technologies we work with<span /></p>
      </Reveal>
      <MarqueeRow items={tech.slice(0, half)} />
      <MarqueeRow items={tech.slice(half)} reverse />
    </section>
  )
}

/* ---------------- Services ---------------- */
const services = [
  { Icon: CodeIcon, title: 'Web Development', desc: 'Blazing-fast, responsive websites & web apps built with modern stacks — designed to convert visitors into customers.', points: ['Custom Websites', 'E-commerce', 'Web Apps'] },
  { Icon: PenIcon, title: 'Content Creation', desc: 'Scroll-stopping visuals, videos, copy and social media content that make your brand impossible to ignore.', points: ['Branding', 'Video & Reels', 'Copywriting'] },
  { Icon: ChipIcon, title: 'IT Services', desc: 'End-to-end IT support, networking and system setup so your team never has to worry about technology again.', points: ['IT Support', 'Networking', 'AMC'] },
  { Icon: ServerIcon, title: 'Servers & Data', desc: 'We build and provide powerful dedicated servers and storage to keep your business data safe, fast and always on.', points: ['Dedicated Servers', 'Data Storage', 'Backups'] },
  { Icon: CloudIcon, title: 'Cloud & Hosting', desc: 'Scalable cloud hosting, VPS and domain management with 99.9% uptime and lightning-quick load times.', points: ['VPS Hosting', 'Domains', 'Migration'] },
  { Icon: ShieldIcon, title: 'Cyber Security', desc: 'Firewalls, SSL, monitoring and audits that lock down your digital assets against modern threats.', points: ['Firewalls', 'SSL', 'Audits'] },
]

function TiltCard({ s, i }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 })
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.div className="service-card" style={{ rotateX: rx, rotateY: ry, '--gx': gx, '--gy': gy }}
      onPointerMove={onMove} onPointerLeave={reset}
      initial={{ opacity: 0, y: 60, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}>
      <div className="card-shine" />
      <div className="card-num">0{i + 1}</div>
      <motion.div className="card-icon" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.7 }}><s.Icon /></motion.div>
      <h3>{s.title}</h3>
      <p>{s.desc}</p>
      <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
      <a href="#contact" className="card-link">Learn more <ArrowIcon /></a>
    </motion.div>
  )
}

export function Services() {
  return (
    <section className="section" id="services">
      <SectionTitle tag="What We Do" title="Everything Digital," highlight="Under One Roof"
        sub="From the first line of code to the last byte on your server — we design, build, create and maintain it all." />
      <div className="services-grid">
        {services.map((s, i) => <TiltCard key={s.title} s={s} i={i} />)}
      </div>
    </section>
  )
}

/* ---------------- Infrastructure / Servers ---------------- */
function ServerRack() {
  return (
    <div className="rack">
      <div className="rack-top"><span /><span /><span /></div>
      {[...Array(7)].map((_, i) => (
        <motion.div key={i} className="rack-unit" initial={{ opacity: 0, x: i % 2 ? 80 : -80 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div className="leds">
            {[0, 1, 2].map((l) => (
              <motion.span key={l} className={`led led-${l}`} animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.4 + ((i * 3 + l) % 5) * 0.25, repeat: Infinity, delay: (i + l) * 0.13 }} />
            ))}
          </div>
          <div className="vents">{[...Array(14)].map((_, v) => <span key={v} />)}</div>
          <div className="unit-bar"><motion.div animate={{ width: ['20%', `${55 + ((i * 17) % 40)}%`, '35%', '80%', '20%'] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }} /></div>
        </motion.div>
      ))}
      <div className="data-stream">
        {[...Array(8)].map((_, i) => (
          <motion.span key={i} animate={{ y: ['-10%', '1100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.28, ease: 'linear' }} />
        ))}
      </div>
    </div>
  )
}

const infra = [
  { k: 'Dedicated Servers', v: 'High-performance machines configured exactly to your workload.' },
  { k: 'Secure Data Storage', v: 'Redundant storage with encryption at rest and in transit.' },
  { k: 'Automated Backups', v: 'Daily snapshots so your data is never more than a click away.' },
  { k: '24/7 Monitoring', v: 'Real-time health checks with instant alerts and rapid response.' },
]

export function Infrastructure() {
  const [load, setLoad] = useState(42)
  useEffect(() => {
    const t = setInterval(() => setLoad(30 + Math.round(Math.random() * 50)), 1500)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="section infra" id="infrastructure">
      <div className="infra-grid">
        <div>
          <SectionTitle tag="Servers & Data" title="Infrastructure That" highlight="Never Sleeps"
            sub="We don't just build websites — we build and provide the servers that power them. Your data lives on hardware we engineer, monitor and protect around the clock." />
          <div className="infra-list">
            {infra.map((f, i) => (
              <Reveal key={f.k} delay={i * 0.1}>
                <div className="infra-item">
                  <span className="check">✓</span>
                  <div><h4>{f.k}</h4><p>{f.v}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="rack-wrap" y={60}>
          <ServerRack />
          <motion.div className="float-stat fs-1" animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>
            <span className="fs-label">Uptime</span><strong>99.99%</strong>
          </motion.div>
          <motion.div className="float-stat fs-2" animate={{ y: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <span className="fs-label">Server Load</span>
            <strong><motion.span key={load} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{load}%</motion.span></strong>
            <div className="mini-bar"><motion.div animate={{ width: `${load}%` }} transition={{ duration: 0.8 }} /></div>
          </motion.div>
          <motion.div className="float-stat fs-3" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
            <span className="live-dot" /> All systems operational
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Stats ---------------- */
const stats = [
  { to: 250, suffix: '+', label: 'Happy Clients' },
  { to: 480, suffix: '+', label: 'Projects Delivered' },
  { to: 99.99, suffix: '%', label: 'Server Uptime', decimals: 2 },
  { to: 24, suffix: '/7', label: 'Expert Support' },
]

export function Stats() {
  return (
    <section className="stats">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="stat">
              <div className="stat-num"><Counter to={s.to} suffix={s.suffix} decimals={s.decimals} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Process ---------------- */
const steps = [
  { t: 'Discover', d: 'We dive deep into your goals, audience and tech needs to map out the perfect strategy.' },
  { t: 'Design', d: 'Wireframes, visuals and architecture — crafted and refined until it feels just right.' },
  { t: 'Develop', d: 'Clean code, powerful servers and compelling content come together into one product.' },
  { t: 'Deploy & Support', d: 'We launch, monitor and keep improving — you get a partner, not just a vendor.' },
]

export function Process() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })
  return (
    <section className="section" id="process">
      <SectionTitle tag="How We Work" title="From Idea to" highlight="Impact" sub="A proven four-step process that turns your vision into a living, breathing digital product." />
      <div className="timeline" ref={ref}>
        <div className="tl-track"><motion.div className="tl-fill" style={{ scaleY: h }} /></div>
        {steps.map((s, i) => (
          <motion.div key={s.t} className={`tl-step ${i % 2 ? 'right' : 'left'}`}
            initial={{ opacity: 0, x: i % 2 ? 80 : -80 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <motion.div className="tl-node" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}>{i + 1}</motion.div>
            <div className="tl-card">
              <span className="tl-step-label">Step 0{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Testimonials ---------------- */
const testimonials = [
  { q: 'Digital Connect rebuilt our website and moved us to their servers. Load time dropped by 70% and enquiries doubled within two months.', n: 'Rahul Mehta', r: 'Founder, UrbanNest Realty' },
  { q: 'Their content team gets our brand better than we do. The reels and creatives they produce consistently outperform everything else.', n: 'Sneha Kapoor', r: 'Marketing Head, Bloom Organics' },
  { q: 'From networking our office to managing our data backups, they handle all of IT for us. Zero downtime in over a year.', n: 'Arjun Verma', r: 'Director, Verma Logistics' },
]

export function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setI((p) => (p + 1) % testimonials.length) }, 5500)
    return () => clearInterval(t)
  }, [i])
  const go = (n) => { setDir(n > i ? 1 : -1); setI(n) }
  const t = testimonials[i]
  return (
    <section className="section" id="testimonials">
      <SectionTitle tag="Testimonials" title="Loved by" highlight="Businesses" />
      <Reveal>
        <div className="testi">
          <div className="quote-mark">“</div>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={i} custom={dir}
              initial={{ opacity: 0, x: dir * 80, filter: 'blur(8px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: dir * -80, filter: 'blur(8px)' }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
              <div className="stars">{'★★★★★'.split('').map((s, k) => (
                <motion.span key={k} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + k * 0.07 }}>{s}</motion.span>
              ))}</div>
              <p className="testi-q">{t.q}</p>
              <div className="testi-author">
                <span className="t-avatar">{t.n[0]}</span>
                <div><strong>{t.n}</strong><span>{t.r}</span></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="dots">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => go(k)} className={k === i ? 'active' : ''} aria-label={`Testimonial ${k + 1}`}>
                {k === i && <motion.span layoutId="dot" className="dot-fill" />}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ---------------- CTA + Contact ---------------- */
export function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); setTimeout(() => setSent(false), 4000) }
  return (
    <section className="section" id="contact">
      <Reveal>
        <div className="cta-banner">
          <div className="cta-glow" />
          <motion.div className="cta-mark" animate={{ rotate: [0, 6, -6, 0], y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <LogoMark size={90} id="cta" />
          </motion.div>
          <h2>Ready to get <span className="grad-text">connected?</span></h2>
          <p>Tell us about your project and get a free consultation within 24 hours.</p>
        </div>
      </Reveal>
      <div className="contact-grid">
        <div className="contact-info">
          {[
            { Icon: MailIcon, k: 'Email us', v: 'hello@digitalconnect.com' },
            { Icon: PhoneIcon, k: 'Call us', v: '+91 98765 43210' },
            { Icon: PinIcon, k: 'Visit us', v: 'India' },
          ].map(({ Icon, k, v }, i) => (
            <Reveal key={k} delay={i * 0.1}>
              <motion.div className="info-card" whileHover={{ x: 8 }}>
                <span className="info-icon"><Icon /></span>
                <div><span>{k}</span><strong>{v}</strong></div>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <form className="contact-form" onSubmit={submit}>
            <div className="row">
              <label><input required placeholder=" " /><span>Your Name</span></label>
              <label><input required type="email" placeholder=" " /><span>Email Address</span></label>
            </div>
            <label>
              <select required defaultValue="">
                <option value="" disabled>Select a service</option>
                {services.map((s) => <option key={s.title}>{s.title}</option>)}
              </select>
            </label>
            <label><textarea rows="4" required placeholder=" " /><span>Tell us about your project</span></label>
            <Magnetic strength={0.2}>
              <button className="btn btn-primary" type="submit">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>✓ Message Sent!</motion.span>
                  ) : (
                    <motion.span key="send" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="btn-inner">Send Message <ArrowIcon /></motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const isServicesPage = window.location.pathname.replace(/\/$/, '') === '/services'
  return (
    <footer className="footer">
      <div className="footer-big">
        {'CONNECT'.split('').map((c, i) => (
          <motion.span key={i} initial={{ y: '100%', opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>{c}</motion.span>
        ))}
      </div>
      <div className="footer-row">
        <a href="/" className="nav-brand"><LogoMark size={30} id="foot" /><Wordmark /></a>
        <div className="footer-links">
          {['Services', 'Infrastructure', 'Process', 'Contact'].map((l) => <a key={l} href={l === 'Services' ? '/services' : `${isServicesPage ? '/' : ''}#${l.toLowerCase()}`}>{l}</a>)}
        </div>
        <span className="copy">© {new Date().getFullYear()} Digital Connect. All rights reserved.</span>
      </div>
    </footer>
  )
}
