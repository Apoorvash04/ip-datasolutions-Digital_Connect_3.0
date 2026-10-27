import { Preloader, ScrollProgress, CursorGlow } from './components/Effects'
import { Navbar, Hero } from './components/Hero'
import { Marquee, Services, Infrastructure, Stats, Process, Testimonials, Contact, Footer } from './components/Sections'
import ServicesPage from './components/ServicesPage'

export default function App() {
  const isServicesPage = window.location.pathname.replace(/\/$/, '') === '/services'
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      {isServicesPage ? <ServicesPage /> : (
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
      )}
      <Footer />
    </>
  )
}
