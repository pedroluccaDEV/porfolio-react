import { Icon } from "../ui/Icon";
import { IA_BLOCKS, IA_CASES } from "../../constants/ia";

export function IASection() {
  return (
    <section className="section" id="ia" style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute", top: "30%", right: "-20%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
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
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1,
            }}
          >
            AGENTES QUE
            <br />
            <span style={{ color: "var(--cyan)" }}>OPERAM.</span> SISTEMAS
            <br />
            QUE APRENDEM.
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 16, lineHeight: 1.7, fontWeight: 300 }}>
            Não é chatbot de FAQ. São agentes integrados a sistemas reais, com acesso a ferramentas, memória,
            contexto de negócio — e entregando resultado mensurável.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 56,
          }}
        >
          {IA_BLOCKS.map((b) => (
            <div
              key={b.title}
              className="card-lift"
              style={{
                padding: "28px 24px", background: "var(--surface)",
                border: "1px solid var(--border)", borderRadius: 8,
              }}
            >
              <div style={{ color: "var(--cyan)", marginBottom: 14 }}>
                <Icon name={b.icon} size={22} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{b.title}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {b.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontSize: 12.5, color: "var(--muted)",
                      display: "flex", gap: 8, alignItems: "center",
                    }}
                  >
                    <span style={{ color: "var(--cyan)", opacity: 0.5 }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cases */}
        <div style={{ borderLeft: "2px solid var(--cyan)", paddingLeft: 28 }}>
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
              <div key={c.title} style={{ display: "flex", gap: 16 }}>
                <div className="dot" />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}