import { useState, useEffect } from "react";
import { Icon } from "./Icon";
import { NAV_LINKS } from "../../constants/navigation";

interface NavProps {
  active: string;
}

export function Nav({ active }: NavProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // Warm dark tint instead of cold slate
        background: scrolled ? "rgba(10,7,3,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,120,0,0.12)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
        // Subtle orange horizon glow when scrolled
        boxShadow: scrolled ? "0 1px 32px rgba(255,90,0,0.06)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            color: "var(--text)",
            letterSpacing: "0.08em",
            display: "flex",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #ff6b00, #ffb340)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            &lt;
          </span>
          PEDRO LUCCA
          <span
            style={{
              background: "linear-gradient(90deg, #ff6b00, #ffb340)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            /&gt;
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: active === l.href ? "#ff9d00" : "rgba(200,160,100,0.55)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "color 0.2s, text-shadow 0.2s",
                textShadow:
                  active === l.href ? "0 0 12px rgba(255,157,0,0.4)" : "none",
                paddingBottom: 2,
                borderBottom:
                  active === l.href
                    ? "1px solid rgba(255,120,0,0.5)"
                    : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (active !== l.href) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,180,80,0.85)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== l.href) {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(200,160,100,0.55)";
                }
              }}
            >
              {l.label}
            </a>
          ))}

          {/* CTA button */}
          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 18px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              color: "#0a0500",
              background: "linear-gradient(135deg, #ff6b00 0%, #ff9d00 100%)",
              boxShadow: "0 0 18px rgba(255,107,0,0.3)",
              transition: "all 0.2s ease",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 28px rgba(255,107,0,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 18px rgba(255,107,0,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.filter = "none";
            }}
          >
            Contato
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#ff9d00",
            display: "none",
            padding: 4,
          }}
          className="mobile-menu-btn"
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            background: "rgba(10,6,2,0.97)",
            borderTop: "1px solid rgba(255,120,0,0.12)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 22,
            backdropFilter: "blur(16px)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color:
                  active === l.href ? "#ff9d00" : "rgba(200,160,100,0.6)",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 24px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              color: "#0a0500",
              background: "linear-gradient(135deg, #ff6b00 0%, #ff9d00 100%)",
              boxShadow: "0 0 24px rgba(255,107,0,0.35)",
            }}
            onClick={() => setOpen(false)}
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  );
}