import { useState, useEffect } from "react";
import { Nav } from "./components/ui/Nav";
import { Footer } from "./components/ui/Footer";
import { Home } from "./pages/Home";
import "./assets/styles/global.css";

function App() {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll<HTMLElement>("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav active={active} />
      <Home />
      <Footer />
    </>
  );
}

export default App;