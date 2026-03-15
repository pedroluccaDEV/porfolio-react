import { Icon } from "../ui/Icon";
import { IA_BLOCKS, IA_CASES } from "../../constants/ia";

export function IASection() {
  return (
    <section className="section" id="ia" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", top: "30%", right: "-20%",
          width: "clamp(300px, 50vw, 600px)", height: "clamp(300px, 50vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ maxWidth: 680, marginBottom: 56 }}>
          <p
            style={{
              color: "var(--amber)", fontFamily: "monospace",
              fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", marginBottom: 12,
            }}
          >
            // ia & automação — diferencial real
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 6vw, 56px)",
              lineHeight: 1,
            }}
          >
            AGENTES QUE
            <br />
            <span style={{ color: "var(--cyan)" }}>OPERAM.</span> SISTEMAS
            <br />
            QUE APRENDEM.
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 16, lineHeight: 1.7, fontWeight: 300, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
            Não é chatbot de FAQ. São agentes integrados a sistemas reais, com acesso a ferramentas, memória,
            contexto de negócio — e entregando resultado mensurável.
          </p>
        </div>

        {/* Blocks grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {IA_BLOCKS.map((b) => (
            <div
              key={b.title}
              className="card-lift"
              style={{
                padding: "clamp(20px, 4vw, 28px) clamp(16px, 4vw, 24px)",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
              }}
            >
              <div style={{ color: "var(--cyan)", marginBottom: 14 }}>
                <Icon name={b.icon} size={22} />
              </div>
              <div style={{ fontSize: "clamp(12px, 3vw, 13px)", fontWeight: 600, marginBottom: 12 }}>
                {b.title}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {b.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: "clamp(12px, 2.8vw, 12.5px)",
                      color: "var(--muted)",
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "var(--cyan)", opacity: 0.5, flexShrink: 0, lineHeight: 1.6 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cases */}
        <div
          style={{
            borderLeft: "2px solid var(--cyan)",
            paddingLeft: "clamp(16px, 4vw, 28px)",
          }}
        >
          <div
            style={{
              fontSize: 11, color: "var(--cyan)",
              letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20,
            }}
          >
            Casos reais em produção
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {IA_CASES.map((c) => (
              <div key={c.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div className="dot" style={{ flexShrink: 0, marginTop: 5 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "clamp(13px, 3vw, 14px)", fontWeight: 600, marginBottom: 4 }}>
                    {c.title}
                  </div>
                  <div style={{ fontSize: "clamp(12px, 3vw, 13px)", color: "var(--muted)", lineHeight: 1.6 }}>
                    {c.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}