import { useEffect, useRef } from "react";
import { Icon } from "../ui/Icon";
import { TypedText } from "../ui/TypedText";
import { STATS } from "../../constants/contact";

// ─── LIQUID BLOBS CANVAS ─────────────────────────────────────────────────────
function LiquidBlobs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Blob config — all orange/amber family + one deep ember for depth
    interface Blob {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      speedX: number;
      speedY: number;
      t: number;
      tSpeed: number;
      wobbleAmp: number;
      wobbleFreq: number;
      color: string;
      glowColor: string;
      opacity: number;
    }

    const blobs: Blob[] = [
      // Large anchor blob — deep ember, bottom-right
      {
        x: 0, y: 0, baseX: 0.78, baseY: 0.72,
        radius: 260, speedX: 0.00018, speedY: 0.00014,
        t: 0, tSpeed: 0.0007, wobbleAmp: 28, wobbleFreq: 2.1,
        color: "rgba(251,146,0,0.13)",
        glowColor: "rgba(251,146,0,0.22)",
        opacity: 1,
      },
      // Medium — neon orange, top-right
      {
        x: 0, y: 0, baseX: 0.82, baseY: 0.18,
        radius: 160, speedX: -0.00022, speedY: 0.00020,
        t: 1.4, tSpeed: 0.0009, wobbleAmp: 18, wobbleFreq: 2.8,
        color: "rgba(255,95,0,0.18)",
        glowColor: "rgba(255,95,0,0.30)",
        opacity: 1,
      },
      // Medium — warm amber, left-center
      {
        x: 0, y: 0, baseX: 0.14, baseY: 0.55,
        radius: 140, speedX: 0.00016, speedY: -0.00018,
        t: 2.8, tSpeed: 0.0011, wobbleAmp: 22, wobbleFreq: 1.9,
        color: "rgba(255,165,0,0.12)",
        glowColor: "rgba(255,165,0,0.20)",
        opacity: 1,
      },
      // Small — bright neon, center-top
      {
        x: 0, y: 0, baseX: 0.48, baseY: 0.12,
        radius: 90, speedX: 0.00025, speedY: 0.00016,
        t: 4.2, tSpeed: 0.0013, wobbleAmp: 14, wobbleFreq: 3.2,
        color: "rgba(255,115,0,0.20)",
        glowColor: "rgba(255,115,0,0.35)",
        opacity: 1,
      },
      // Tiny — ember red-orange, bottom-left
      {
        x: 0, y: 0, baseX: 0.08, baseY: 0.85,
        radius: 70, speedX: -0.00020, speedY: -0.00015,
        t: 5.7, tSpeed: 0.0015, wobbleAmp: 10, wobbleFreq: 2.5,
        color: "rgba(255,60,0,0.15)",
        glowColor: "rgba(255,60,0,0.25)",
        opacity: 1,
      },
      // Extra subtle — large dim amber, center-bottom, barely visible
      {
        x: 0, y: 0, baseX: 0.52, baseY: 0.88,
        radius: 200, speedX: 0.00010, speedY: -0.00012,
        t: 0.9, tSpeed: 0.0006, wobbleAmp: 32, wobbleFreq: 1.6,
        color: "rgba(255,140,0,0.07)",
        glowColor: "rgba(255,140,0,0.12)",
        opacity: 1,
      },
    ];

    // Draw a wobbly blob using bezier curves
    const drawBlob = (blob: Blob, t: number) => {
      const { x, y, radius, wobbleAmp, wobbleFreq } = blob;
      const points = 8;
      ctx.beginPath();

      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wobble =
          Math.sin(angle * wobbleFreq + t) * wobbleAmp +
          Math.sin(angle * (wobbleFreq + 1) + t * 1.3) * (wobbleAmp * 0.5);
        const r = radius + wobble;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          // Smooth bezier between points
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevWobble =
            Math.sin(prevAngle * wobbleFreq + t) * wobbleAmp +
            Math.sin(prevAngle * (wobbleFreq + 1) + t * 1.3) * (wobbleAmp * 0.5);
          const pr = radius + prevWobble;
          const ppx = x + Math.cos(prevAngle) * pr;
          const ppy = y + Math.sin(prevAngle) * pr;
          const cpx = (ppx + px) / 2;
          const cpy = (ppy + py) / 2;
          ctx.quadraticCurveTo(ppx, ppy, cpx, cpy);
        }
      }
      ctx.closePath();
    };

    let time = 0;
    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      time += 0.01;

      blobs.forEach((blob) => {
        blob.t += blob.tSpeed;
        // Gentle drifting orbit
        blob.x = blob.baseX * W + Math.sin(time * blob.speedX * 10000) * W * 0.04;
        blob.y = blob.baseY * H + Math.cos(time * blob.speedY * 10000) * H * 0.04;

        // Outer glow pass — blurred, larger
        ctx.save();
        ctx.filter = `blur(${blob.radius * 0.55}px)`;
        drawBlob(blob, blob.t);
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius * 1.4);
        grad.addColorStop(0, blob.glowColor);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Inner blob pass — softer blur
        ctx.save();
        ctx.filter = `blur(${blob.radius * 0.22}px)`;
        drawBlob(blob, blob.t);
        const innerGrad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        innerGrad.addColorStop(0, blob.color);
        innerGrad.addColorStop(0.6, blob.color.replace(/[\d.]+\)$/, "0.06)"));
        innerGrad.addColorStop(1, "transparent");
        ctx.fillStyle = innerGrad;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
export function Hero() {
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
        // Deep dark base — slightly warm to complement orange
        background: "radial-gradient(ellipse 120% 80% at 70% 60%, #0f0a04 0%, #080808 60%, #060608 100%)",
      }}
    >
      {/* Grid overlay — warm tinted */}
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
        }}
      />

      {/* Liquid blobs */}
      <LiquidBlobs />

      {/* Scan line */}
      <div className="scanline" style={{ zIndex: 1 }} />

      {/* Vignette — pulls edges dark, makes center pop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(4,3,2,0.65) 100%)",
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
            <span
              style={{
                display: "block",
                color: "#f0ece6",
              }}
            >
              CRIO SISTEMAS
            </span>
            <span
              style={{
                display: "block",
                // Neon orange gradient on text
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
            <span
              style={{
                color: "rgba(255,200,150,0.95)",
                fontWeight: 500,
              }}
            >
              problemas reais de negócio
            </span>
          </p>

          {/* CTAs */}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,120,0,0.7)";
                (e.currentTarget as HTMLAnchorElement).style.color = "#ff9d00";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 20px rgba(255,120,0,0.15), inset 0 0 20px rgba(255,120,0,0.05)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,120,0,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,200,150,0.9)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
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
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 48px rgba(255,107,0,0.55), 0 4px 32px rgba(255,107,0,0.40)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 32px rgba(255,107,0,0.35), 0 4px 24px rgba(255,107,0,0.25)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.filter = "none";
              }}
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
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
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