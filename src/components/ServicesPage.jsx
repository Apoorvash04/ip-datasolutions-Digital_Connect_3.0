import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Reveal } from './Effects'
import { ArrowIcon } from './Icons'

const groups = [
  {
    name: 'Digital Services', eyebrow: 'Build your digital edge', icon: '✳',
    intro: 'Ideas, experiences and software that move your business forward.',
    services: [
      ['Content Creation', 'Distinctive content and creative assets made to bring your brand to life.'],
      ['Web Development', 'Responsive, high-performing websites built around your customers.'],
      ['App Development', 'Purpose-built mobile and web applications for the way you work.'],
    ],
  },
  {
    name: 'IT Services', eyebrow: 'Technology, taken care of', icon: '⌘',
    intro: 'Practical support and systems that help your people do their best work.',
    services: [
      ['IT Asset Management', 'Keep devices, licenses and technology assets organized and visible.'],
      ['Business Email Solutions', 'Professional, secure email that keeps your team connected.'],
      ['VDI', 'Give teams secure access to their workspaces from wherever they work.'],
      ['Custom Software & Billing', 'Streamline everyday workflows with software shaped around your business.'],
      ['IT Audits', 'Understand your current environment and find clear opportunities to improve.'],
    ],
  },
  {
    name: 'Servers & Data', eyebrow: 'Reliable at every layer', icon: '▤',
    intro: 'Dependable infrastructure to keep your applications and information available.',
    services: [
      ['Dedicated Servers', 'High-performance server resources configured for your workloads.'],
      ['Backup & Disaster Recovery', 'Protect critical information and plan for a confident recovery.'],
    ],
  },
  {
    name: 'Cloud & Hosting', eyebrow: 'Room to scale', icon: '☁',
    intro: 'Flexible cloud foundations with expert help at every step.',
    services: [
      ['VPS', 'Flexible virtual servers with the resources your projects need.'],
      ['Cloud Migration & Management', 'Move workloads thoughtfully and keep your cloud environment running smoothly.'],
      ['Domain & SSL', 'Secure your online identity with domain and certificate management.'],
    ],
  },
  {
    name: 'Cyber Security', eyebrow: 'Security built in', icon: '⬡',
    intro: 'Reduce risk and give your business a stronger security foundation.',
    services: [
      ['VAPT', 'Find and address vulnerabilities through penetration testing.'],
      ['Cybersecurity', 'Practical security services designed around your environment and risk.'],
      ['Managed Firewalls & WAF', 'Monitor and manage network and web application protection.'],
      ['Endpoint Protection & Monitoring', 'Protect devices and spot suspicious activity sooner.'],
      ['Cybersecurity Audits & Compliance (ISO 27001, DPDP Readiness)', 'Prepare for ISO 27001, DPDP and the security expectations of your customers.'],
    ],
  },
]

function ServiceCard({ item, index }) {
  return (
    <motion.article className="directory-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }} transition={{ duration: .32, delay: index * .045, ease: [0.16, 1, 0.3, 1] }}>
      <span className="directory-card-index">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item[0]}</h3>
      <p>{item[1]}</p>
      <a href="/#contact" aria-label={`Ask us about ${item[0]}`}><span>Explore service</span><ArrowIcon /></a>
    </motion.article>
  )
}

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(null)
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 72%', 'end 58%'] })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 105, damping: 24, mass: .35 })
  return (
    <main className="services-page">
      <section className="directory-hero">
        <div className="directory-hero-grid" />
        <div className="directory-orb directory-orb-one" /><div className="directory-orb directory-orb-two" />
        <div className="directory-hero-inner">
          <Reveal>
            <div className="directory-copy">
              <span className="tag"><span className="tag-dot" />Our Services</span>
              <h1>Technology that takes your business <span className="grad-text">further.</span></h1>
              <p>From the first idea to the infrastructure behind it, find the expertise to build, protect and grow your digital world.</p>
              <a className="btn btn-primary" href="#service-directory">Explore our capabilities <ArrowIcon /></a>
            </div>
          </Reveal>
          <motion.div className="directory-orbit" initial={{ opacity: 0, scale: .82, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .9, delay: .2 }} aria-hidden="true">
            <div className="directory-orbit-ring ring-a" /><div className="directory-orbit-ring ring-b" />
            <div className="directory-orbit-core"><span>DC</span><small>CONNECTED</small></div>
            <span className="orbit-label orbit-label-a">DESIGN</span><span className="orbit-label orbit-label-b">SECURITY</span><span className="orbit-label orbit-label-c">CLOUD</span>
          </motion.div>
        </div>
        <div className="directory-hero-foot"><span>One partner. Every layer.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="directory-content" id="service-directory">
        <Reveal>
          <div className="directory-heading">
            <div><span className="tag"><span className="tag-dot" />The service lineup</span><h2>Find your <span className="grad-text">next step.</span></h2></div>
            <p>Choose a capability to see how we can help. We’ll bring the right people and technology together around your goals.</p>
          </div>
        </Reveal>

        <div className="service-timeline" ref={timelineRef}>
          <div className="service-timeline-rail" aria-hidden="true"><motion.span style={{ scaleY: lineProgress }} /></div>
          {groups.map((group, i) => {
            const isOpen = activeIndex === i
            return (
              <motion.section key={group.name} className={`service-timeline-row ${i % 2 ? 'timeline-right' : 'timeline-left'} ${isOpen ? 'timeline-open' : ''}`}
                initial={{ opacity: 0, y: 38, scale: .975 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .28 }} transition={{ duration: .7, delay: i * .16, ease: [0.16, 1, 0.3, 1] }}>
                <span className="service-timeline-node" aria-hidden="true"><i>{String(i + 1).padStart(2, '0')}</i></span>
                <div className="service-timeline-spacer" />
                <div className="service-timeline-card-wrap">
                  <button type="button" className="service-timeline-card" aria-expanded={isOpen} aria-controls={`timeline-services-${i}`} onClick={() => setActiveIndex(isOpen ? null : i)}>
                    <span className="timeline-card-top"><span className="directory-group-icon">{group.icon}</span><span className="timeline-card-count">{String(group.services.length).padStart(2, '0')} SERVICES</span></span>
                    <span className="directory-eyebrow">{group.eyebrow}</span>
                    <strong>{group.name}</strong>
                    <span className="timeline-card-summary">{group.intro}</span>
                    <span className="timeline-card-action">{isOpen ? 'Hide services' : 'Explore services'}<b className={isOpen ? 'turned' : ''}>＋</b></span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div id={`timeline-services-${i}`} className="timeline-service-list" initial={{ height: 0, opacity: 0, y: -8 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -8 }} transition={{ duration: .38, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="timeline-service-list-inner">
                          <span className="timeline-list-label">Included in {group.name}</span>
                          {group.services.map((item, serviceIndex) => (
                            <motion.a key={item[0]} href="/#contact" className="timeline-service-item" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: serviceIndex * .055 }}>
                              <span><small className="timeline-service-dot" aria-hidden="true" /><strong>{item[0]}</strong></span><ArrowIcon />
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            )
          })}
        </div>

        <Reveal>
          <div className="directory-cta"><div><span className="directory-eyebrow">Have something specific in mind?</span><h2>Let’s make it happen.</h2></div><a href="/#contact" className="btn btn-primary">Talk to our team <ArrowIcon /></a></div>
        </Reveal>
      </section>
    </main>
  )
}
