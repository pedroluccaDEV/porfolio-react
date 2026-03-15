import { Icon } from "../ui/Icon";
import fotoPerfil from "../../assets/foto-porfolio.jfif";

export function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          {/* Foto */}
          <div style={{ position: "relative", maxWidth: 420, width: "100%", margin: "0 auto" }}>
            <div
              style={{
                width: "100%",
                paddingBottom: "100%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={fotoPerfil}
                alt="Pedro Lucca - Desenvolvedor Full Stack"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(145deg, rgba(255,107,0,0.05) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Badge */}
            <div
              style={{
                position: "absolute",
                bottom: -14,
                right: -14,
                background: "var(--surface)",
                border: "1px solid var(--cyan)",
                borderRadius: 8,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="pulse"
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }}
              />
              <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap" }}>
                Curitiba, PR
              </span>
            </div>
          </div>

          {/* Texto */}
          <div style={{ paddingBottom: 16 }}>
            <p
              style={{
                color: "var(--cyan)",
                fontFamily: "monospace",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // sobre
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 5vw, 44px)",
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              MAIS QUE UM DEV.
              <br />
              <span style={{ color: "var(--cyan)" }}>UM RESOLVEDOR.</span>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 16, fontWeight: 300, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
              Tenho experiência em ambientes de produção reais — CELEPAR, Preâmbulo Tech — onde "funciona no meu
              computador" não é resposta. Arquitetura, observabilidade, integrações e entrega são parte do
              trabalho, não extras.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: 28, fontWeight: 300, fontSize: "clamp(14px, 3.5vw, 16px)" }}>
              Quando você me contrata, não está pagando só por linhas de código. Está pagando por decisões que
              evitam retrabalho, sistemas que escalam e clareza técnica em cada etapa.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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