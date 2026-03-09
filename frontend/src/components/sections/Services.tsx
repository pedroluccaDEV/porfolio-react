import { Icon } from "../ui/Icon";
import { SERVICES } from "../../constants/services";

export function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <p
            style={{
              color: "var(--cyan)", fontFamily: "monospace",
              fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", marginBottom: 12,
            }}
          >
            // o que eu faço
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1,
            }}
          >
            TRÊS FRENTES,
            <br />
            <span style={{ color: "var(--cyan)" }}>UM OBJETIVO</span>
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: 480, marginTop: 14, fontWeight: 300 }}>
            Não trabalho com hype. Trabalho com sistemas que entregam resultado — em produção, com dados reais.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.label}
              className="card-lift"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "36px 32px",
                borderRadius:
                  i === 0 ? "10px 0 0 10px" : i === 2 ? "0 10px 10px 0" : "0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute", top: 20, right: 24,
                  fontFamily: "var(--font-display)", fontSize: 64,
                  color: "rgba(0,229,200,0.05)", lineHeight: 1, userSelect: "none",
                }}
              >
                0{i + 1}
              </div>
              <div style={{ color: "var(--cyan)", marginBottom: 16 }}>
                <Icon name={s.icon} size={28} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{s.label}</h3>
              <p
                style={{
                  fontSize: 13, color: "var(--cyan)",
                  fontStyle: "italic", marginBottom: 12, fontWeight: 300,
                }}
              >
                {s.problem}
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.chips.map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}