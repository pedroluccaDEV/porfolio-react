import { Icon } from "../ui/Icon";
import fotoPerfil from "../../assets/foto-porfolio.jfif"; // Ajuste o nome do arquivo se necessário

export function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100%", 
                paddingBottom: "100%",
                background: "var(--surface)", 
                border: "1px solid var(--border)",
                borderRadius: 12, 
                position: "relative",
                overflow: "hidden", // Garante que a imagem respeite as bordas arredondadas
              }}
            >
              {/* Imagem de perfil */}
              <img
                src={fotoPerfil}
                alt="Pedro Lucca - Desenvolvedor Full Stack"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Faz a imagem cobrir todo o espaço sem distorcer
                  objectPosition: "center", // Centraliza a imagem
                }}
              />
              
              {/* Overlay sutil para dar profundidade (opcional) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(145deg, rgba(255,107,0,0.05) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            
            {/* Badge de localização */}
            <div
              style={{
                position: "absolute", 
                bottom: -16, 
                right: -16,
                background: "var(--surface)", 
                border: "1px solid var(--cyan)",
                borderRadius: 8, 
                padding: "12px 18px",
                display: "flex", 
                alignItems: "center", 
                gap: 10,
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                className="pulse"
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }}
              />
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                Curitiba, PR
              </span>
            </div>
          </div>

          <div>
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
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1.05, 
                marginBottom: 20,
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