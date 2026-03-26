import { useState, useCallback, useRef, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { PROJECTS, TYPE_COLORS } from "../../constants/projects/projects";
import type { Project } from "../../types";
import nubankVideo from "../../assets/gif-nubank.mp4";
import saphienVideo from "../../assets/saphien-landing.mp4";
import awsDocs from "../../constants/projects/EC2-AutoScaling-LoadBalancer/README.md?raw";

// ─── HOOK: MEDIA QUERY ────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// ─── DOCS MODAL ───────────────────────────────────────────────────────────────
function DocsModal({ isOpen, onClose, content }: { isOpen: boolean; onClose: () => void; content: string }) {
  if (!isOpen) return null;

  const renderMarkdown = (text: string) =>
    text
      .replace(/^# (.*$)/gm, '<h1 style="font-size:22px;margin:20px 0 10px;color:#ff9d00;">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 style="font-size:18px;margin:16px 0 8px;color:#ff9d00;">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 style="font-size:15px;margin:12px 0 6px;color:#ff9d00;">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code style="background:rgba(255,150,0,0.1);padding:2px 4px;border-radius:4px;">$1</code>')
      .replace(/- (.*$)/gm, '<li style="margin-left:20px;">• $1</li>')
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 900,
          maxHeight: "85vh",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 12, overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "var(--bg2)", flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="fileText" size={18} color="#ff9d00" />
            <span style={{ fontWeight: 600, color: "var(--text)", fontSize: "clamp(13px, 3vw, 15px)" }}>
              Documentação Técnica — AWS Infrastructure
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)", border: "none",
              borderRadius: 6, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text)", fontSize: 16, flexShrink: 0,
            }}
          >✕</button>
        </div>
        <div
          style={{ padding: "20px clamp(16px,4vw,32px)", overflowY: "auto", color: "var(--text)", lineHeight: 1.6, fontSize: 14 }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
    </div>
  );
}

// ─── FAKE BROWSER CHROME ──────────────────────────────────────────────────────
function BrowserChrome({ accentColor }: { accentColor: string }) {
  return (
    <div
      style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 32,
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${accentColor}22`,
        display: "flex", alignItems: "center", gap: 6, padding: "0 14px", zIndex: 10,
      }}
    >
      {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
        <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.9 }} />
      ))}
      <div style={{ marginLeft: 10, flex: 1, height: 16, borderRadius: 4, background: "rgba(255,255,255,0.15)", maxWidth: 180 }} />
    </div>
  );
}

// ─── PROJECT PREVIEW ──────────────────────────────────────────────────────────
function ProjectPreview({ project, onOpenDocs }: { project: Project; onOpenDocs?: () => void }) {
  const color = TYPE_COLORS[project.type];
  const resolvedColor = color.startsWith("var") ? "#ff9d00" : color;
  const videoRef = useRef<HTMLVideoElement>(null);

  // Landing Page Nubank
  if (project.title.includes("Nubank")) {
    return (
      <a
        href="https://nubank-landing-rho.vercel.app/"
        target="_blank" rel="noopener noreferrer"
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#000", display: "block", textDecoration: "none" }}
      >
        <BrowserChrome accentColor={resolvedColor} />
        <video ref={videoRef} src={nubankVideo} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", zIndex: 10 }}>
          LIVE DEMO
        </div>
      </a>
    );
  }

  // EC2 Auto Scaling & Load Balancer
  if (project.title.includes("Load Balancer") || project.title.includes("Auto Scaling")) {
    return (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#232f3e" }}>
        <BrowserChrome accentColor={resolvedColor} />
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1a2b3c, #0f1a24)" }}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>☁️</div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>AWS Infrastructure</div>
            <div style={{ fontSize: 10, opacity: 0.6 }}>Auto Scaling • Load Balancer</div>
          </div>
        </div>
        <button
          onClick={onOpenDocs}
          style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,150,0,0.9)", backdropFilter: "blur(4px)", padding: "6px 12px", borderRadius: 20, fontSize: 10, fontWeight: 600, color: "#0a0500", border: "none", zIndex: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          <Icon name="fileText" size={12} /> DOCUMENTAÇÃO
        </button>
        <div style={{ position: "absolute", top: 42, left: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "#ff9d00", border: "1px solid rgba(255,150,0,0.3)", zIndex: 10 }}>
          🚀 EM PRODUÇÃO
        </div>
      </div>
    );
  }

  // Saphien Landing Page
  if (project.title.includes("Saphien")) {
    return (
      <a
        href="https://landingpage-development.up.railway.app"
        target="_blank" rel="noopener noreferrer"
        style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0a0a0f", display: "block", textDecoration: "none" }}
      >
        <BrowserChrome accentColor={resolvedColor} />
        <video ref={videoRef} src={saphienVideo} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 42, left: 12, background: "rgba(0,255,200,0.2)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "#0ff", border: "1px solid rgba(0,255,200,0.3)", letterSpacing: "0.3px", zIndex: 10 }}>
          🤖 IA PRODUTO
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", zIndex: 10 }}>
          LIVE DEMO
        </div>
      </a>
    );
  }

  // AI CRM
  if (project.title.includes("CRM")) {
    return (
      <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", background: "#0a0f0a" }}>
        <BrowserChrome accentColor={resolvedColor} />
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #0a1a12, #050f09)", paddingTop: 32 }}>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.85)", padding: "0 20px" }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🤖</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#4ade80" }}>AI CRM</div>
            <div style={{ fontSize: 10, opacity: 0.55, lineHeight: 1.5 }}>
              Agentes Autônomos • Lead Intelligence
            </div>
            {/* mini fake UI */}
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, width: 180, margin: "16px auto 0" }}>
              {[
                { label: "João Silva", status: "🔥 Quente", color: "#4ade80" },
                { label: "Ana Costa", status: "🧊 Frio", color: "#60a5fa" },
                { label: "Pedro Luz", status: "⏳ Follow-up", color: "#fbbf24" },
              ].map((lead) => (
                <div key={lead.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "5px 10px" }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)" }}>{lead.label}</span>
                  <span style={{ fontSize: 8, color: lead.color, fontWeight: 600 }}>{lead.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", top: 42, left: 12, background: "rgba(74,222,128,0.15)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", zIndex: 10 }}>
          ⚡ AGENTES ATIVOS
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "4px 10px", borderRadius: 20, fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", zIndex: 10 }}>
          EM DESENVOLVIMENTO
        </div>
      </div>
    );
  }

  // Fallback genérico
  return (
    <div style={{ width: "100%", height: "100%", background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${resolvedColor}14 0%, transparent 70%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, position: "relative", overflow: "hidden" }}>
      <BrowserChrome accentColor={resolvedColor} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "72%", marginTop: 20 }}>
        <div style={{ height: 10, borderRadius: 3, background: `${resolvedColor}30`, width: "55%" }} />
        <div style={{ height: 7, borderRadius: 3, background: "rgba(255,255,255,0.07)", width: "90%" }} />
        <div style={{ height: 7, borderRadius: 3, background: "rgba(255,255,255,0.05)", width: "75%" }} />
        <div style={{ height: 36, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginTop: 6, border: `1px solid ${resolvedColor}18` }} />
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {[40, 55, 35].map((w, idx) => (
            <div key={idx} style={{ height: 22, borderRadius: 4, background: `${resolvedColor}${idx === 0 ? "28" : "10"}`, width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SLOT SYSTEM (DESKTOP ONLY) ───────────────────────────────────────────────
type SlotPosition = "left" | "center" | "right" | "hidden-left" | "hidden-right";

function getSlotStyle(pos: SlotPosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    transition: "all 0.55s cubic-bezier(0.34, 1.20, 0.64, 1)",
    transformOrigin: "bottom center",
    cursor: "pointer",
  };
  switch (pos) {
    case "center":       return { ...base, width: 480, height: 340, left: "50%", bottom: 0, transform: "translateX(-50%) translateY(0) rotateY(0deg) scale(1)", zIndex: 10, filter: "none", opacity: 1 };
    case "left":         return { ...base, width: 320, height: 240, left: "50%", bottom: -20, transform: "translateX(-620px) translateY(40px) rotateY(18deg) scale(0.82)", zIndex: 5, filter: "blur(3px) brightness(0.55)", opacity: 0.75 };
    case "right":        return { ...base, width: 320, height: 240, left: "50%", bottom: -20, transform: "translateX(300px) translateY(40px) rotateY(-18deg) scale(0.82)", zIndex: 5, filter: "blur(3px) brightness(0.55)", opacity: 0.75 };
    case "hidden-left":  return { ...base, width: 280, height: 200, left: "50%", bottom: -30, transform: "translateX(-900px) translateY(60px) scale(0.6)", zIndex: 1, filter: "blur(8px)", opacity: 0, pointerEvents: "none" };
    case "hidden-right": return { ...base, width: 280, height: 200, left: "50%", bottom: -30, transform: "translateX(620px) translateY(60px) scale(0.6)", zIndex: 1, filter: "blur(8px)", opacity: 0, pointerEvents: "none" };
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

// ─── MOBILE CARD STACK ────────────────────────────────────────────────────────
function MobileGallery({
  active,
  setActive,
  total,
  prev,
  next,
  handleOpenDocs,
}: {
  active: number;
  setActive: (i: number) => void;
  total: number;
  prev: () => void;
  next: () => void;
  handleOpenDocs: () => void;
}) {
  const touchStartX = useRef<number>(0);
  const touchDeltaX = useRef<number>(0);
  const [dragging, setDragging] = useState(false);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setDragging(true);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    setDragging(false);
    if (touchDeltaX.current < -48) next();
    else if (touchDeltaX.current > 48) prev();
    touchDeltaX.current = 0;
  };

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{ position: "relative", width: "100%", paddingBottom: "62%", touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {PROJECTS.map((p, i) => {
          const diff = ((i - active) % total + total) % total;
          const isCenter = diff === 0;
          const isNext = diff === 1;
          const isPrev = diff === total - 1;
          const visible = isCenter || isNext || isPrev;
          if (!visible) return null;

          const offset = isCenter ? 0 : isNext ? 12 : -12;
          const scale = isCenter ? 1 : 0.92;
          const zIndex = isCenter ? 10 : 2;
          const opacity = isCenter ? 1 : 0.4;
          const blur = isCenter ? 0 : 3;

          return (
            <div
              key={p.title}
              onClick={() => { if (!isCenter) { isNext ? next() : prev(); } }}
              style={{
                position: "absolute", inset: 0,
                transform: `translateX(${offset}px) scale(${scale})`,
                transition: dragging ? "none" : "all 0.45s cubic-bezier(0.34,1.2,0.64,1)",
                transformOrigin: "center bottom",
                zIndex,
                opacity,
                filter: blur ? `blur(${blur}px)` : "none",
                cursor: isCenter ? "default" : "pointer",
              }}
            >
              <div
                style={{
                  width: "100%", height: "100%",
                  borderRadius: 12, overflow: "hidden",
                  border: `1px solid ${isCenter ? "rgba(255,150,0,0.35)" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isCenter ? "0 8px 40px rgba(0,0,0,0.5), 0 0 40px rgba(255,120,0,0.15)" : "0 4px 16px rgba(0,0,0,0.3)",
                  background: "var(--surface)",
                }}
              >
                <ProjectPreview
                  project={p}
                  onOpenDocs={p.title.includes("Load Balancer") || p.title.includes("Auto Scaling") ? handleOpenDocs : undefined}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 14 }}>
        <button
          onClick={prev}
          style={{ background: "rgba(255,120,0,0.08)", border: "1px solid rgba(255,120,0,0.2)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ff9d00" }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 3, border: "none", cursor: "pointer", background: i === active ? "linear-gradient(90deg,#ff6b00,#ffb340)" : "rgba(255,120,0,0.2)", transition: "all 0.3s ease", padding: 0 }}
            />
          ))}
        </div>
        <button
          onClick={next}
          style={{ background: "rgba(255,120,0,0.08)", border: "1px solid rgba(255,120,0,0.2)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ff9d00" }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}

// ─── INFO PANEL ───────────────────────────────────────────────────────────────
function InfoPanel({
  current,
  active,
  setActive,
  resolvedColor,
  handleCTAClick,
  isMobile,
}: {
  current: Project;
  active: number;
  total: number;
  setActive: (i: number) => void;
  resolvedColor: string;
  handleCTAClick: (e: React.MouseEvent) => void;
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        marginTop: 32,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
        alignItems: "start",
        gap: isMobile ? 20 : 32,
        padding: isMobile ? "24px 20px" : "32px 36px",
        background: "var(--surface)",
        border: `1px solid ${resolvedColor}22`,
        borderRadius: 14,
        boxShadow: `0 0 48px ${resolvedColor}10`,
        transition: "border-color 0.5s, box-shadow 0.5s",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
              color: resolvedColor, background: `${resolvedColor}16`,
              padding: "3px 10px", borderRadius: 4, border: `1px solid ${resolvedColor}28`,
            }}
          >
            {current.tag}
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "monospace" }}>
            {current.org}
          </span>
        </div>
        <h3 style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 12, color: "var(--text)" }}>
          {current.title}
        </h3>
        <p style={{ fontSize: "clamp(13px, 3vw, 14px)", color: "var(--muted)", lineHeight: 1.7, marginBottom: 20 }}>
          {current.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {current.stack.map((s) => (
            <span key={s} className="chip" style={{ fontSize: 10 }}>{s}</span>
          ))}
        </div>
      </div>

      {/* CTA + dots */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile ? "space-between" : "flex-start",
          gap: isMobile ? 12 : 24,
          minWidth: isMobile ? "auto" : 160,
        }}
      >
        <a
          href="#"
          onClick={handleCTAClick}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: isMobile ? "9px 16px" : "10px 22px",
            borderRadius: 6, fontSize: 13, fontWeight: 600,
            textDecoration: "none", color: "#0a0500",
            background: "linear-gradient(135deg, #ff6b00, #ff9d00)",
            boxShadow: "0 0 20px rgba(255,107,0,0.3)",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap", cursor: "pointer", border: "none",
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

        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 22 : 7, height: 7,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: i === active ? "linear-gradient(90deg,#ff6b00,#ffb340)" : "rgba(255,120,0,0.2)",
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
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function Projects() {
  const [active, setActive] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile(768);
  const total = PROJECTS.length;

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  const current = PROJECTS[active];
  const color = TYPE_COLORS[current.type];
  const resolvedColor = color.startsWith("var") ? "#ff9d00" : color;

  const handleOpenDocs = () => setIsModalOpen(true);
  const handleCloseDocs = () => setIsModalOpen(false);

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (current.title.includes("Nubank")) {
      window.open("https://nubank-landing-rho.vercel.app/", "_blank", "noopener noreferrer");
    } else if (current.title.includes("Load Balancer") || current.title.includes("Auto Scaling")) {
      handleOpenDocs();
    } else if (current.title.includes("Saphien")) {
      window.open("https://landingpage-development.up.railway.app", "_blank", "noopener noreferrer");
    }
    // CRM: sem link por enquanto (em desenvolvimento)
  };

  return (
    <section
      className="section"
      id="projetos"
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", overflow: "hidden" }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: isMobile ? 36 : 64, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#ff9d00", fontFamily: "monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
              // projetos selecionados
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 6vw, 48px)", lineHeight: 1 }}>
              SISTEMAS
              <br />
              <span style={{ background: "linear-gradient(90deg,#ff6b00,#ffb340)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                EM PRODUÇÃO
              </span>
            </h2>
          </div>
          <p style={{ color: "var(--muted)", maxWidth: 320, fontSize: "clamp(13px, 3vw, 14px)", lineHeight: 1.6 }}>
            Não uma lista de repositórios. Contexto real, decisões reais, resultados reais.
          </p>
        </div>

        {/* Gallery — mobile vs desktop */}
        {isMobile ? (
          <MobileGallery
            active={active}
            setActive={setActive}
            total={total}
            prev={prev}
            next={next}
            handleOpenDocs={handleOpenDocs}
          />
        ) : (
          <>
            <div style={{ position: "relative", width: "100%", height: 380, perspective: "1200px", perspectiveOrigin: "50% 120%" }}>
              <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 560, height: 32, borderRadius: "50%", background: `radial-gradient(ellipse, ${resolvedColor}28 0%, transparent 70%)`, filter: "blur(8px)", transition: "background 0.5s ease", zIndex: 0 }} />

              {PROJECTS.map((p, i) => {
                const pos = getPosition(i, active, total);
                return (
                  <div
                    key={p.title}
                    style={getSlotStyle(pos)}
                    onClick={() => { if (pos === "left") prev(); if (pos === "right") next(); }}
                  >
                    <div style={{ width: "100%", height: "100%", borderRadius: 12, overflow: "hidden", border: `1px solid ${pos === "center" ? `${resolvedColor}45` : "rgba(255,255,255,0.06)"}`, boxShadow: pos === "center" ? `0 0 60px ${resolvedColor}30, 0 24px 64px rgba(0,0,0,0.6)` : "0 8px 32px rgba(0,0,0,0.4)", background: "var(--surface)", position: "relative", transition: "border-color 0.5s ease, box-shadow 0.5s ease" }}>
                      <ProjectPreview
                        project={p}
                        onOpenDocs={p.title.includes("Load Balancer") || p.title.includes("Auto Scaling") ? handleOpenDocs : undefined}
                      />
                    </div>
                  </div>
                );
              })}

              <button onClick={prev} aria-label="Projeto anterior"
                style={{ position: "absolute", left: "calc(50% - 340px)", bottom: 100, zIndex: 20, background: "rgba(255,120,0,0.08)", border: "1px solid rgba(255,120,0,0.25)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ff9d00", transition: "all 0.2s ease", backdropFilter: "blur(8px)" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,120,0,0.18)"; b.style.boxShadow = "0 0 20px rgba(255,120,0,0.25)"; b.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,120,0,0.08)"; b.style.boxShadow = "none"; b.style.transform = "scale(1)"; }}
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={next} aria-label="Próximo projeto"
                style={{ position: "absolute", right: "calc(50% - 340px)", bottom: 100, zIndex: 20, background: "rgba(255,120,0,0.08)", border: "1px solid rgba(255,120,0,0.25)", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ff9d00", transition: "all 0.2s ease", backdropFilter: "blur(8px)" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,120,0,0.18)"; b.style.boxShadow = "0 0 20px rgba(255,120,0,0.25)"; b.style.transform = "scale(1.1)"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,120,0,0.08)"; b.style.boxShadow = "none"; b.style.transform = "scale(1)"; }}
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </>
        )}

        <InfoPanel
          current={current}
          active={active}
          total={total}
          setActive={setActive}
          resolvedColor={resolvedColor}
          handleCTAClick={handleCTAClick}
          isMobile={isMobile}
        />
      </div>

      <DocsModal isOpen={isModalOpen} onClose={handleCloseDocs} content={awsDocs} />
    </section>
  );
}