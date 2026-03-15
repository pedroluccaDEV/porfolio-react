import { Icon } from "../ui/Icon";
import { CONTACT_ITEMS } from "../../constants/contact";

export function Contact() {
  return (
    <section
      className="section"
      id="contato"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", bottom: -40, right: -20,
          fontFamily: "var(--font-display)", fontSize: "clamp(72px, 20vw, 180px)",
          color: "rgba(255,255,255,0.02)", lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}
      >
        CONTATO
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              color: "var(--cyan)", fontFamily: "monospace",
              fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", marginBottom: 12,
            }}
          >
            // vamos conversar
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 8vw, 72px)",
              lineHeight: 0.95, marginBottom: 20,
            }}
          >
            TEM UM
            <br />
            <span style={{ color: "var(--cyan)" }}>PROBLEMA</span>
            <br />
            REAL?
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 40, fontWeight: 300, maxWidth: 440, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
            Me conta o contexto — não o escopo. Prefiro entender o problema antes de falar em solução.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CONTACT_ITEMS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="card-lift"
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "16px 20px",
                  textDecoration: "none", color: "var(--text)",
                }}
              >
                <div style={{ color: c.color, flexShrink: 0 }}>
                  <Icon name={c.icon} size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11, color: "var(--muted)",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                    }}
                  >
                    {c.label}
                  </div>
                  <div style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.value}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", color: "var(--muted)", flexShrink: 0 }}>
                  <Icon name="arrow" size={16} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}