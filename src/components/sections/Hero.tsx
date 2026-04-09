import { Icon } from "../ui/Icon";
import FloatingLines from "../ui/FloatingLines";
import { ShinyText } from "../ui/ShinyText";
import GradualBlur from "../ui/GradualBlur";
import { STATS } from "../../constants/contact";

// ─── Button hover handlers ───────────────────────────────────────────────────
const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.borderColor = "rgba(255,120,0,0.7)";
  el.style.color = "#ff9d00";
  el.style.boxShadow = "0 0 20px rgba(255,120,0,0.15), inset 0 0 20px rgba(255,120,0,0.05)";
  el.style.transform = "translateY(-2px)";
};
const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.borderColor = "rgba(255,120,0,0.3)";
  el.style.color = "rgba(255,200,150,0.9)";
  el.style.boxShadow = "none";
  el.style.transform = "translateY(0)";
};
const handleEnterGradient = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.boxShadow = "0 0 48px rgba(255,107,0,0.55), 0 4px 32px rgba(255,107,0,0.40)";
  el.style.transform = "translateY(-2px)";
  el.style.filter = "brightness(1.1)";
};
const handleLeaveGradient = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.boxShadow = "0 0 32px rgba(255,107,0,0.35), 0 4px 24px rgba(255,107,0,0.25)";
  el.style.transform = "translateY(0)";
  el.style.filter = "none";
};

// ─── Component ───────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 64,
        background:
          "radial-gradient(ellipse 120% 80% at 70% 60%, #0f0a04 0%, #080808 60%, #060608 100%)",
      }}
    >
      {/* ── FloatingLines — fundo absoluto ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <FloatingLines
          linesGradient={["#fe8c01", "#ff4000", "#ff6d01", "#ff0066"]}
          animationSpeed={1}
          interactive
          bendRadius={5}
          bendStrength={-0.5}
          mouseDamping={0.06}
          parallax
          parallaxStrength={0.2}
        />
      </div>

      {/* ── Grid overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,120,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,120,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Scanline ── */}
      <div className="scanline" style={{ zIndex: 2, pointerEvents: "none" }} />

      {/* ── Vignette radial — escurece as bordas ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(4,3,2,0.82) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* ── Camada escura central para legibilidade do texto ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, rgba(5,3,1,0.55) 0%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* ── Content ── */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: 860,
          padding: "0 24px",
        }}
      >
        {/* Label */}
        <div
          className="fade-up"
          style={{
            marginBottom: 22,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 1,
              background: "linear-gradient(90deg, transparent, #ff7a00)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: "#ff7a00",
              fontFamily: "monospace",
              fontSize: "clamp(10px, 2.5vw, 12px)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 500,
              textShadow: "0 0 20px rgba(255,120,0,0.4)",
            }}
          >
            Dev Full Stack & IA Aplicada
          </span>
          <div
            style={{
              width: 36,
              height: 1,
              background: "linear-gradient(90deg, #ff7a00, transparent)",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Headline */}
        <h1
          className="fade-up delay-1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(42px, 9vw, 108px)",
            lineHeight: 0.92,
            letterSpacing: "0.01em",
            marginBottom: 30,
          }}
        >
          <span
            style={{
              display: "block",
              color: "#f0ece6",
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            CRIO SISTEMAS
          </span>
          <ShinyText text="QUE PENSAM." speed={4} className="hero-shiny" />
        </h1>

        {/* Subheadline */}
        <p
          className="fade-up delay-2"
          style={{
            fontSize: "clamp(15px, 3.5vw, 18px)",
            color: "rgba(230,210,190,0.75)",
            maxWidth: 540,
            lineHeight: 1.75,
            marginBottom: 44,
            fontWeight: 300,
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}
        >
          Desenvolvimento de sistemas web, agentes inteligentes e automações que resolvem{" "}
          <span style={{ color: "rgba(255,210,160,1)", fontWeight: 500 }}>
            problemas reais de negócio
          </span>
        </p>

        {/* CTAs */}
        <div
          className="fade-up delay-3"
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
        >
          <a
            href="#fullstack"
            className="btn"
            style={{
              background: "rgba(8,5,2,0.55)",
              color: "rgba(255,200,150,0.9)",
              border: "1px solid rgba(255,120,0,0.35)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <Icon name="code2" size={16} />
            Full Stack Dev
          </a>
          <a
            href="#ia"
            className="btn"
            style={{
              background: "linear-gradient(135deg, #ff6b00 0%, #ff9d00 100%)",
              color: "#0a0500",
              fontWeight: 700,
              border: "none",
              boxShadow: "0 0 32px rgba(255,107,0,0.35), 0 4px 24px rgba(255,107,0,0.25)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={handleEnterGradient}
            onMouseLeave={handleLeaveGradient}
          >
            <Icon name="bot" size={16} />
            IA & Automação
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="fade-up delay-4"
          style={{
            marginTop: 68,
            display: "flex",
            gap: "clamp(20px, 5vw, 40px)",
            flexWrap: "wrap",
            borderTop: "1px solid rgba(255,120,0,0.12)",
            paddingTop: 30,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 5vw, 34px)",
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #ff7a00, #ffb340)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 12px rgba(255,120,0,0.35))",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 2vw, 11px)",
                  color: "rgba(210,170,110,0.7)",
                  marginTop: 5,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}

          {/* Available badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              className="pulse"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "clamp(9px, 2vw, 11px)",
                color: "rgba(210,170,110,0.7)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              Disponível para projetos
            </span>
          </div>
        </div>
      </div>

      {/* ── GradualBlur — transição suave na borda inferior da section ── */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
        exponential
        opacity={1}
        style={{ zIndex: 6 }}
      />
    </section>
  );
}