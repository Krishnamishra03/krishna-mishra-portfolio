import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Universe } from "./Universe";
import { Skills } from "./Skills";
import { Services } from "./Services";
import { Projects } from "./Projects";
import { Terminal } from "./Terminal";
import { Experience } from "./Experience";
import { GitHub } from "./GitHub";
import { Testimonials } from "./Testimonials";
import { Certificates } from "./Certificates";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";
import { Assistant } from "./Assistant";

export function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Universe />
        <Skills />
        <Services />
        <Projects />
        <Terminal />
        <Experience />
        <GitHub />
        <Certificates />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Assistant />
    </div>
  );
}