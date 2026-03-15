import { memo } from "react";
import { Icon } from "../ui/Icon";
import { TypedText } from "../ui/TypedText";
import { STATS } from "../../constants/contact";

// ─── BLOB CONFIG ──────────────────────────────────────────────────────────────
const BLOBS = [
  {
    w: 600, h: 600,
    left: "62%", top: "25%",
    blur: 110, dur: 14, delay: 0,
    color: "rgba(251,146,0,0.18)",
    colorMid: "rgba(255,107,0,0.10)",
  },
  {
    w: 380, h: 380,
    left: "72%", top: "-12%",
    blur: 72, dur: 9, delay: -3.5,
    color: "rgba(255,80,0,0.26)",
    colorMid: "rgba(255,60,0,0.12)",
  },
  {
    w: 320, h: 320,
    left: "-6%", top: "38%",
    blur: 80, dur: 16, delay: -6,
    color: "rgba(255,170,0,0.16)",
    colorMid: "rgba(255,140,0,0.08)",
  },
  {
    w: 220, h: 220,
    left: "36%", top: "-8%",
    blur: 55, dur: 11, delay: -2,
    color: "rgba(255,110,0,0.28)",
    colorMid: "rgba(255,90,0,0.12)",
  },
  {
    w: 160, h: 160,
    left: "4%", top: "70%",
    blur: 40, dur: 12, delay: -5,
    color: "rgba(255,55,0,0.20)",
    colorMid: "rgba(255,40,0,0.09)",
  },
  {
    w: 480, h: 480,
    left: "28%", top: "58%",
    blur: 120, dur: 18, delay: -8,
    color: "rgba(255,145,0,0.10)",
    colorMid: "rgba(255,120,0,0.05)",
  },
] as const;

// Três variações de movimento para os blobs - OTIMIZADAS (usando translate3d para GPU)
const KEYFRAMES = `
  @keyframes bd0 {
    0%   { transform: translate3d(-20px, 14px, 0) scale(1.00); }
    50%  { transform: translate3d(10px, -20px, 0) scale(1.04); }
    100% { transform: translate3d(24px, -8px, 0) scale(0.97); }
  }
  @keyframes bd1 {
    0%   { transform: translate3d(16px, -12px, 0) scale(1.02); }
    50%  { transform: translate3d(-22px, 8px, 0) scale(0.97); }
    100% { transform: translate3d(-10px, 20px, 0) scale(1.04); }
  }
  @keyframes bd2 {
    0%   { transform: translate3d(-12px, -22px, 0) scale(0.98); }
    50%  { transform: translate3d(18px, 10px, 0) scale(1.03); }
    100% { transform: translate3d(8px, 18px, 0) scale(1.00); }
  }
`;

// ─── INJECT KEYFRAMES (uma vez, sem JSX <style>) ──────────────────────────────
let injected = false;
function injectKeyframes() {
  if (injected || typeof document === "undefined") return;
  injected = true;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

// ─── LIQUID BLOBS ─────────────────────────────────────────────────────────────
const LiquidBlobs = memo(function LiquidBlobs() {
  injectKeyframes();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden", // Garante que nada vaze
      }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: b.w,
            height: b.h,
            left: b.left,
            top: b.top,
            marginLeft: -b.w / 2, // Centraliza melhor
            marginTop: -b.h / 2,
            borderRadius: "50%",
            background: `radial-gradient(circle at 40% 40%, ${b.color} 0%, ${b.colorMid} 45%, transparent 72%)`,
            filter: `blur(${b.blur}px)`,
            willChange: "transform",
            animation: `bd${i % 3} ${b.dur}s ease-in-out ${b.delay}s infinite alternate`,
            transform: "translate3d(0, 0, 0)", // Força aceleração GPU
          }}
        />
      ))}
    </div>
  );
});

// ─── HERO ─────────────────────────────────────────────────────────────────────
export function Hero() {
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

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 64,
        background:
          "radial-gradient(ellipse 120% 80% at 70% 60%, #0f0a04 0%, #080808 60%, #060608 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,120,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,120,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Liquid blobs — CSS only, GPU accelerated */}
      <LiquidBlobs />

      {/* Scan line */}
      <div className="scanline" style={{ zIndex: 1, pointerEvents: "none" }} />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(4,3,2,0.72) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Brilho central sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 50% at 30% 55%, rgba(255,100,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 860 }}>
          {/* Label */}
          <div
            className="fade-up"
            style={{ marginBottom: 22, display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                width: 36,
                height: 1,
                background: "linear-gradient(90deg, #ff7a00, transparent)",
              }}
            />
            <span
              style={{
                color: "#ff7a00",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Dev Full Stack & IA Aplicada
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up delay-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(56px, 9vw, 108px)",
              lineHeight: 0.92,
              letterSpacing: "0.01em",
              marginBottom: 30,
              color: "var(--text)",
            }}
          >
            <span style={{ display: "block", color: "#f0ece6" }}>
              CRIO SISTEMAS
            </span>
            <span
              style={{
                display: "block",
                background: "linear-gradient(90deg, #ff6b00 0%, #ff9d00 50%, #ffb340 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 32px rgba(255,107,0,0.55))",
              }}
            >
              <TypedText text="QUE PENSAM." />
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="fade-up delay-2"
            style={{
              fontSize: 18,
              color: "rgba(220,200,180,0.6)",
              maxWidth: 540,
              lineHeight: 1.75,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            Desenvolvimento de sistemas web, agentes inteligentes e automações que resolvem{" "}
            <span style={{ color: "rgba(255,200,150,0.95)", fontWeight: 500 }}>
              problemas reais de negócio
            </span>
          </p>

          {/* CTAs - CORRIGIDO! */}
          <div
            className="fade-up delay-3"
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 0 }}
          >
            <a
              href="#fullstack"
              className="btn"
              style={{
                background: "transparent",
                color: "rgba(255,200,150,0.9)",
                border: "1px solid rgba(255,120,0,0.3)",
                backdropFilter: "blur(8px)",
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
              gap: 40,
              flexWrap: "wrap",
              borderTop: "1px solid rgba(255,120,0,0.12)",
              paddingTop: 30,
              alignItems: "center",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 34,
                    lineHeight: 1,
                    background: "linear-gradient(135deg, #ff7a00, #ffb340)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(200,160,100,0.6)",
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
            <div
              style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                className="pulse"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(200,160,100,0.6)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Disponível para projetos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}