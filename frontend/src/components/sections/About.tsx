import { Icon } from "../ui/Icon";

export function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100%", paddingBottom: "100%",
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 12, position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)", fontSize: 72,
                    background: "linear-gradient(135deg, #a78bfa, #818cf8)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}
                >
                  DEV
                </div>
                <div
                  style={{
                    fontSize: 12, color: "var(--muted)",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                  }}
                >
                  Curitiba, PR
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute", bottom: -16, right: -16,
                background: "var(--surface)", border: "1px solid var(--cyan)",
                borderRadius: 8, padding: "12px 18px",
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <div
                className="pulse"
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                Disponível agora
              </span>
            </div>
          </div>

          <div>
            <p
              style={{
                color: "var(--cyan)", fontFamily: "monospace",
                fontSize: 12, letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 12,
              }}
            >
              // sobre
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1.05, marginBottom: 20,
              }}
            >
              MAIS QUE UM DEV.
              <br />
              <span style={{ color: "var(--cyan)" }}>UM RESOLVEDOR.</span>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 16, fontWeight: 300 }}>
              Tenho experiência em ambientes de produção reais — CELEPAR, Preâmbulo Tech — onde "funciona no meu
              computador" não é resposta. Arquitetura, observabilidade, integrações e entrega são parte do
              trabalho, não extras.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>
              Quando você me contrata, não está pagando só por linhas de código. Está pagando por decisões que
              evitam retrabalho, sistemas que escalam e clareza técnica em cada etapa.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href="https://github.com/pedroluccaDEV"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ padding: "10px 18px" }}
              >
                <Icon name="github" size={16} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pedroluccaga/"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
                style={{ padding: "10px 18px" }}
              >
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}