import { useState, useCallback } from "react";
import { Icon } from "../ui/Icon";
import { PROJECTS, TYPE_COLORS } from "../../constants/projects";
import type { Project } from "../../types";

// ─── PREVIEW PLACEHOLDER ─────────────────────────────────────────────────────
// Renders a stylized "screenshot" per project type when no real image exists
function ProjectPreview({ project }: { project: Project }) {
  const color = TYPE_COLORS[project.type];
  const isVar = color.startsWith("var");
  const resolvedColor = isVar ? "#ff9d00" : color;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${resolvedColor}14 0%, transparent 70%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fake browser chrome */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 32,
          background: "rgba(255,255,255,0.04)",
          borderBottom: `1px solid ${resolvedColor}22`,
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 14px",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
        <div
          style={{
            marginLeft: 10,
            flex: 1,
            height: 16,
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            maxWidth: 180,
          }}
        />
      </div>

      {/* Fake UI lines */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "72%", marginTop: 20 }}>
        <div style={{ height: 10, borderRadius: 3, background: `${resolvedColor}30`, width: "55%" }} />
        <div style={{ height: 7, borderRadius: 3, background: "rgba(255,255,255,0.07)", width: "90%" }} />
        <div style={{ height: 7, borderRadius: 3, background: "rgba(255,255,255,0.05)", width: "75%" }} />
        <div style={{ height: 36, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginTop: 6, border: `1px solid ${resolvedColor}18` }} />
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {[40, 55, 35].map((w, i) => (
            <div key={i} style={{ height: 22, borderRadius: 4, background: `${resolvedColor}${i === 0 ? "28" : "10"}`, width: `${w}%` }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: 48, borderRadius: 6, flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${resolvedColor}12` }} />
          ))}
        </div>
      </div>

      {/* Center glow dot */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 28,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: `${resolvedColor}22`,
          border: `1px solid ${resolvedColor}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        {project.type === "ia" ? "🤖" : project.type === "automacao" ? "⚡" : project.type === "enterprise" ? "🏛️" : "👁️"}
      </div>
    </div>
  );
}

// ─── CARD SLOT TYPES ─────────────────────────────────────────────────────────
type SlotPosition = "left" | "center" | "right" | "hidden-left" | "hidden-right";

function getSlotStyle(pos: SlotPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    transition: "all 0.55s cubic-bezier(0.34, 1.20, 0.64, 1)",
    transformOrigin: "bottom center",
    cursor: "pointer",
  };

  switch (pos) {
    case "center":
      return {
        ...base,
        width: 480,
        height: 340,
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%) translateY(0) rotateY(0deg) scale(1)",
        zIndex: 10,
        filter: "none",
        opacity: 1,
      };
    case "left":
      return {
        ...base,
        width: 320,
        height: 240,
        left: "50%",
        bottom: -20,
        transform: "translateX(-620px) translateY(40px) rotateY(18deg) scale(0.82)",
        zIndex: 5,
        filter: "blur(3px) brightness(0.55)",
        opacity: 0.75,
      };
    case "right":
      return {
        ...base,
        width: 320,
        height: 240,
        left: "50%",
        bottom: -20,
        transform: "translateX(300px) translateY(40px) rotateY(-18deg) scale(0.82)",
        zIndex: 5,
        filter: "blur(3px) brightness(0.55)",
        opacity: 0.75,
      };
    case "hidden-left":
      return {
        ...base,
        width: 280,
        height: 200,
        left: "50%",
        bottom: -30,
        transform: "translateX(-900px) translateY(60px) scale(0.6)",
        zIndex: 1,
        filter: "blur(8px)",
        opacity: 0,
        pointerEvents: "none",
      };
    case "hidden-right":
      return {
        ...base,
        width: 280,
        height: 200,
        left: "50%",
        bottom: -30,
        transform: "translateX(620px) translateY(60px) scale(0.6)",
        zIndex: 1,
        filter: "blur(8px)",
        opacity: 0,
        pointerEvents: "none",
      };
  }
}

function getPosition(index: number, active: number, total: number): SlotPosition {
  const diff = ((index - active) % total + total) % total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === total - 1) return "left";
  if (diff === 2) return "hidden-right";
  return "hidden-left";
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function Projects() {
  const [active, setActive] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const total = PROJECTS.length;

  const prev = useCallback(() => {
    setDirection("left");
    setActive((a) => (a - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setDirection("right");
    setActive((a) => (a + 1) % total);
  }, [total]);

  const current = PROJECTS[active];
  const color = TYPE_COLORS[current.type];
  const resolvedColor = color.startsWith("var") ? "#ff9d00" : color;

  return (
    <section
      className="section"
      id="projetos"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                color: "#ff9d00",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // projetos selecionados
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1,
              }}
            >
              SISTEMAS
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #ff6b00, #ffb340)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                EM PRODUÇÃO
              </span>
            </h2>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 320, fontSize: 14, lineHeight: 1.6 }}>
            Não uma lista de repositórios. Contexto real, decisões reais, resultados reais.
          </p>
        </div>

        {/* Arc Gallery */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 380,
            perspective: "1200px",
            perspectiveOrigin: "50% 120%",
          }}
        >
          {/* Arc ground shadow */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 560,
              height: 32,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${resolvedColor}28 0%, transparent 70%)`,
              filter: "blur(8px)",
              transition: "background 0.5s ease",
              zIndex: 0,
            }}
          />

          {PROJECTS.map((p, i) => {
            const pos = getPosition(i, active, total);
            return (
              <div
                key={p.title}
                style={getSlotStyle(pos)}
                onClick={() => {
                  if (pos === "left") prev();
                  if (pos === "right") next();
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                    overflow: "hidden",
                    border: `1px solid ${
                      pos === "center"
                        ? `${resolvedColor}45`
                        : "rgba(255,255,255,0.06)"
                    }`,
                    boxShadow:
                      pos === "center"
                        ? `0 0 60px ${resolvedColor}30, 0 24px 64px rgba(0,0,0,0.6)`
                        : "0 8px 32px rgba(0,0,0,0.4)",
                    background: "var(--surface)",
                    position: "relative",
                    transition: "border-color 0.5s ease, box-shadow 0.5s ease",
                  }}
                >
                  <ProjectPreview project={p} />
                </div>
              </div>
            );
          })}

          {/* Left Arrow */}
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: "calc(50% - 340px)",
              bottom: 100,
              zIndex: 20,
              background: "rgba(255,120,0,0.08)",
              border: "1px solid rgba(255,120,0,0.25)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ff9d00",
              transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,120,0,0.18)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,120,0,0.25)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,120,0,0.08)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
            aria-label="Projeto anterior"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            style={{
              position: "absolute",
              right: "calc(50% - 340px)",
              bottom: 100,
              zIndex: 20,
              background: "rgba(255,120,0,0.08)",
              border: "1px solid rgba(255,120,0,0.25)",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ff9d00",
              transition: "all 0.2s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,120,0,0.18)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,120,0,0.25)";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,120,0,0.08)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
            aria-label="Próximo projeto"
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Info panel — slides with active project */}
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "start",
            gap: 32,
            padding: "32px 36px",
            background: "var(--surface)",
            border: `1px solid ${resolvedColor}22`,
            borderRadius: 14,
            boxShadow: `0 0 48px ${resolvedColor}10`,
            transition: "border-color 0.5s, box-shadow 0.5s",
          }}
        >
          <div>
            {/* Tag + org */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: resolvedColor,
                  background: `${resolvedColor}16`,
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: `1px solid ${resolvedColor}28`,
                }}
              >
                {current.tag}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>
                {current.org}
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "clamp(20px, 2.5vw, 26px)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 12,
                color: "var(--text)",
              }}
            >
              {current.title}
            </h3>

            {/* Desc */}
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 20,
              }}
            >
              {current.desc}
            </p>

            {/* Stack chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {current.stack.map((s) => (
                <span key={s} className="chip" style={{ fontSize: 10 }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right col: CTA + dots */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 24,
              minWidth: 160,
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                color: "#0a0500",
                background: "linear-gradient(135deg, #ff6b00, #ff9d00)",
                boxShadow: "0 0 20px rgba(255,107,0,0.3)",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.12)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(255,107,0,0.5)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "none";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(255,107,0,0.3)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              }}
            >
              Ver detalhes <Icon name="arrow" size={14} />
            </a>

            {/* Dot indicators */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 22 : 7,
                    height: 7,
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    background:
                      i === active
                        ? "linear-gradient(90deg, #ff6b00, #ffb340)"
                        : "rgba(255,120,0,0.2)",
                    transition: "all 0.3s ease",
                    boxShadow: i === active ? "0 0 10px rgba(255,120,0,0.5)" : "none",
                    padding: 0,
                  }}
                  aria-label={`Ir para projeto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}