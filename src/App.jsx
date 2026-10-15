import { Preloader, ScrollProgress, CursorGlow } from './components/Effects'
import { Navbar, Hero } from './components/Hero'
import { Marquee, Services, Infrastructure, Stats, Process, Testimonials, Contact, Footer } from './components/Sections'

export default function App() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Infrastructure />
        <Stats />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
