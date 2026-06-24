import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Skills } from "./Skills";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { GitHub } from "./GitHub";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

export function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <GitHub />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}