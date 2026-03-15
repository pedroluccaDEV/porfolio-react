import { useState } from "react";
import { Icon } from "../ui/Icon";
import {
  FS_STACK,
  FS_HIGHLIGHTS,
  LEVEL_LABEL,
  LEVEL_COLOR,
} from "../../constants/fullstack";
import type { RichStackCategory, StackItem } from "../../constants/fullstack";

// ─── LEVEL DOT ────────────────────────────────────────────────────────────────
function LevelDot({ level }: { level: StackItem["level"] }) {
  return (
    <span
      title={LEVEL_LABEL[level]}
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: LEVEL_COLOR[level],
        boxShadow: level === "expert" ? `0 0 6px ${LEVEL_COLOR[level]}` : "none",
        flexShrink: 0,
        marginTop: 1,
      }}
    />
  );
}

// ─── STACK CARD (sidebar button) ─────────────────────────────────────────────
function StackCard({
  cat,
  isActive,
  onClick,
}: {
  cat: RichStackCategory;
  isActive: boolean;
  onClick: () => void;
}) {
  const expertItems = cat.items.filter((i) => i.level === "expert").slice(0, 4);
  const remaining = cat.items.length - expertItems.length;

  return (
    <button
      onClick={onClick}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: "16px 18px",
        background: isActive
          ? "linear-gradient(135deg, rgba(255,107,0,0.10), rgba(255,179,64,0.05))"
          : "var(--surface)",
        border: `1px solid ${isActive ? "rgba(255,120,0,0.40)" : "rgba(255,120,0,0.09)"}`,
        borderRadius: 9,
        transition: "all 0.22s ease",
        boxShadow: isActive ? "0 0 28px rgba(255,107,0,0.09)" : "none",
        width: "100%",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ color: isActive ? "#ff7a00" : "rgba(255,120,0,0.40)" }}>
            <Icon name={cat.icon as any} size={15} />
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: isActive ? "#ff9d00" : "rgba(200,160,100,0.55)",
              transition: "color 0.2s",
            }}
          >
            {cat.cat}
          </span>
        </div>
        <span
          style={{
            color: isActive ? "#ff7a00" : "rgba(255,120,0,0.30)",
            transition: "transform 0.25s ease, color 0.2s",
            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
            display: "flex",
          }}
        >
          <Icon name="arrow" size={13} />
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {expertItems.map((item) => (
          <span
            key={item.name}
            style={{
              fontSize: 10,
              padding: "2px 7px",
              borderRadius: 3,
              background: "rgba(255,120,0,0.07)",
              border: "1px solid rgba(255,120,0,0.13)",
              color: "rgba(240,200,140,0.7)",
            }}
          >
            {item.name}
          </span>
        ))}
        {remaining > 0 && (
          <span style={{ fontSize: 10, color: "rgba(200,160,100,0.35)", padding: "2px 4px" }}>
            +{remaining}
          </span>
        )}
      </div>
    </button>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({ cat }: { cat: RichStackCategory }) {
  const levels: StackItem["level"][] = ["expert", "advanced", "solid"];

  return (
    <div
      style={{
        padding: "clamp(18px, 4vw, 28px) clamp(16px, 4vw, 32px)",
        background: "linear-gradient(145deg, rgba(255,107,0,0.06), rgba(255,179,64,0.025))",
        border: "1px solid rgba(255,120,0,0.22)",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        boxShadow: "0 4px 48px rgba(255,107,0,0.07)",
        minHeight: 320,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(255,120,0,0.12)",
              border: "1px solid rgba(255,120,0,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ff7a00",
              flexShrink: 0,
            }}
          >
            <Icon name={cat.icon as any} size={18} />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(20px, 4vw, 26px)",
                color: "var(--text)",
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              {cat.cat.toUpperCase()}
            </h3>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
              {cat.items.length} tecnologias mapeadas
            </p>
          </div>
        </div>
        <p style={{ fontSize: "clamp(13px, 3vw, 13.5px)", color: "var(--muted)", lineHeight: 1.65, marginTop: 4 }}>
          {cat.desc}
        </p>
      </div>

      <div style={{ height: 1, background: "rgba(255,120,0,0.09)" }} />

      {/* Items by level */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {levels.map((level) => {
          const group = cat.items.filter((i) => i.level === level);
          if (!group.length) return null;
          return (
            <div key={level}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <LevelDot level={level} />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: LEVEL_COLOR[level],
                  }}
                >
                  {LEVEL_LABEL[level]}
                </span>
                <span style={{ fontSize: 10, color: "rgba(200,160,100,0.3)", marginLeft: 2 }}>
                  — {group.length} itens
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.map((item) => (
                  <span
                    key={item.name}
                    style={{
                      fontSize: "clamp(11px, 2.5vw, 13px)",
                      padding: "5px 13px",
                      borderRadius: 5,
                      background: `${LEVEL_COLOR[level]}10`,
                      border: `1px solid ${LEVEL_COLOR[level]}25`,
                      color:
                        level === "expert"
                          ? "rgba(255,215,170,0.95)"
                          : level === "advanced"
                          ? "rgba(255,200,130,0.72)"
                          : "rgba(200,160,100,0.50)",
                      fontWeight: level === "expert" ? 500 : 400,
                      lineHeight: 1,
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer counts */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 14,
          borderTop: "1px solid rgba(255,120,0,0.07)",
          display: "flex",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        {levels.map((level) => {
          const count = cat.items.filter((i) => i.level === level).length;
          if (!count) return null;
          return (
            <div key={level} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <LevelDot level={level} />
              <span style={{ fontSize: 11, color: "rgba(200,160,100,0.38)" }}>
                {count}× {LEVEL_LABEL[level].split(" ")[0].toLowerCase()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── EXPERIENCE TIMELINE ──────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    role: "Desenvolvedor Full Stack & IA",
    company: "CELEPAR",
    period: "Jul 2024 – Atual",
    type: "Estágio",
    highlights: [
      "React, Flask e FastAPI em sistemas públicos produtivos com 500+ usuários",
      "Agentes inteligentes com LangChain, Agno e Hugging Face",
      "Bases vetoriais PGVector e MongoDB Vector Search em produção",
      "Deploy de modelos YOLO + OpenCV e ferramentas MCP customizadas",
      "Interfaces web para agentes e workflows de IA",
    ],
  },
  {
    role: "Desenvolvedor Full Stack",
    company: "Preâmbulo Tech",
    period: "Nov 2023 – Jul 2024",
    type: "Aprendiz",
    highlights: [
      "Vue 2/3, Node.js, Express e PostgreSQL em squad ágil",
      "APIs REST e integrações com bancos relacionais",
      "Entregas semanais end-to-end com versionamento e documentação",
    ],
  },
];

function ExperienceTimeline() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {EXPERIENCES.map((exp, i) => (
        <div key={exp.company} style={{ display: "flex", gap: 18 }}>
          {/* Track */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 18,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff7a00",
                boxShadow: "0 0 10px rgba(255,122,0,0.55)",
                marginTop: 5,
                zIndex: 1,
              }}
            />
            {i < EXPERIENCES.length - 1 && (
              <div
                style={{
                  width: 1,
                  flex: 1,
                  minHeight: 24,
                  background: "linear-gradient(to bottom, rgba(255,122,0,0.35), rgba(255,122,0,0.07))",
                  margin: "4px 0",
                }}
              />
            )}
          </div>

          {/* Content */}
          <div style={{ paddingBottom: i < EXPERIENCES.length - 1 ? 28 : 0, flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: "clamp(13px, 3vw, 14px)", fontWeight: 600, color: "var(--text)" }}>
                {exp.role}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ff9d00",
                  background: "rgba(255,120,0,0.10)",
                  border: "1px solid rgba(255,120,0,0.20)",
                  padding: "2px 7px",
                  borderRadius: 3,
                  whiteSpace: "nowrap",
                }}
              >
                {exp.type}
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#ffb340", fontWeight: 500 }}>{exp.company}</span>
              <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>{exp.period}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {exp.highlights.map((h) => (
                <div key={h} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: "#ff7a00",
                      opacity: 0.65,
                      flexShrink: 0,
                      marginTop: 5,
                      fontSize: 7,
                    }}
                  >
                    ▸
                  </span>
                  <span style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "var(--muted)", lineHeight: 1.55 }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function FullStack() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section
      className="section"
      id="fullstack"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid rgba(255,120,0,0.12)",
      }}
    >
      <div className="container">

        {/* ── Header row ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 6vw, 64px)",
            alignItems: "start",
            marginBottom: 64,
          }}
        >
          {/* Left — pitch */}
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
              // full stack developer
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 5vw, 52px)",
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              NÃO SÓ CÓDIGO.
              <br />
              <span style={{ color: "var(--text)" }}>ARQUITETURA</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #ff6b00, #ffb340)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                QUE AGUENTA.
              </span>
            </h2>
            <p
              style={{
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 28,
                fontWeight: 300,
                fontSize: "clamp(14px, 3.5vw, 16px)",
              }}
            >
              React, Vue, Angular, FastAPI, Node.js — em produção, não em tutorial.
              Do frontend até o deploy, com decisões de arquitetura que fazem
              diferença quando o sistema escala.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 36 }}>
              {FS_HIGHLIGHTS.map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      color: "#ff7a00",
                      marginTop: 3,
                      flexShrink: 0,
                      filter: "drop-shadow(0 0 4px rgba(255,122,0,0.45))",
                    }}
                  >
                    <Icon name="check" size={14} />
                  </span>
                  <span style={{ fontSize: "clamp(13px, 3vw, 13.5px)", color: "var(--muted)", lineHeight: 1.55 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <a href="#projetos" className="btn btn-ghost">
              Ver projetos Full Stack <Icon name="arrow" size={15} />
            </a>
          </div>

          {/* Right — timeline */}
          <div>
            <p
              style={{
                color: "#ff9d00",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              // experiência profissional
            </p>
            <ExperienceTimeline />
          </div>
        </div>

        {/* ── Stack section ───────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <p
            style={{
              color: "#ff9d00",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            // stack técnica — clique para detalhar
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            {(["expert", "advanced", "solid"] as StackItem["level"][]).map((lvl) => (
              <div key={lvl} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <LevelDot level={lvl} />
                <span style={{ fontSize: 12, color: "rgba(200,160,100,0.5)" }}>
                  {LEVEL_LABEL[lvl]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stack explorer ──────────────────────────────────────────── */}
        {/* Mobile: empilhado. Desktop: sidebar + painel lado a lado */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Cards de navegação — em desktop ficam numa row acima do painel */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 8,
            }}
          >
            {FS_STACK.map((cat, i) => (
              <StackCard
                key={cat.cat}
                cat={cat}
                isActive={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Detail panel — sempre abaixo dos cards */}
          <div style={{ marginTop: 8 }}>
            <DetailPanel cat={FS_STACK[activeIdx]} />
          </div>
        </div>

      </div>
    </section>
  );
}