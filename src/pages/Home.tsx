import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { FullStack } from "../components/sections/FullStack";
import { IASection } from "../components/sections/IASection";
import { Projects } from "../components/sections/Projects";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";

export function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <FullStack />
      <IASection />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}