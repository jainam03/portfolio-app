import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="divider" />
        </div>

        <About />

        <div className="max-w-6xl mx-auto px-6">
          <div className="divider" />
        </div>

        <Projects />

        <div className="max-w-6xl mx-auto px-6">
          <div className="divider" />
        </div>

        <Skills />

        <div className="max-w-6xl mx-auto px-6">
          <div className="divider" />
        </div>

        <Leadership />

        <div className="max-w-6xl mx-auto px-6">
          <div className="divider" />
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
