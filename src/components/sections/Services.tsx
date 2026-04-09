import { Icon } from "../ui/Icon";
import type { IconName } from "../../types";

interface Service {
  icon: IconName;
  label: string;
  problem: string;
  desc: string;
  chips: string[];
}

const SERVICES: Service[] = [
  {
    icon: "layers",
    label: "Sistemas Web, Mobile & APIs",
    problem: "Você precisa de um produto que funcione de verdade — não de um MVP frágil.",
    desc: "Desenvolvo soluções completas de ponta a ponta: da interface que o usuário toca até a infraestrutura que sustenta tudo. Arquitetura, banco de dados, nuvem, versionamento — cada camada pensada para escalar e durar.",
    chips: ["Interface", "Back-end", "Banco de dados", "Nuvem", "Arquitetura", "CI/CD"],
  },
  {
    icon: "bot",
    label: "Agentes & IA Aplicada",
    problem: "IA só tem valor quando resolve um problema real no seu negócio.",
    desc: "Construo agentes e automações inteligentes integradas diretamente ao seu sistema — seja para processos internos como geração de documentos, agendamentos e triagem, seja para interação direta com o usuário executando tarefas de forma autônoma. LLMs como ferramenta, não como vitrine.",
    chips: ["Agentes autônomos", "Processos internos", "Interação com usuário", "LLMs na prática"],
  },
  {
    icon: "zap",
    label: "Automação & Integração",
    problem: "Trabalho manual que se repete é custo escondido.",
    desc: "Conecto sistemas, elimino gargalos operacionais e automatizo fluxos que consomem tempo sem agregar valor. Integrações entre plataformas, pipelines de dados e processos que simplesmente rodam — sem intervenção humana.",
    chips: ["Integração de sistemas", "Pipelines", "Eliminação de gargalos", "Fluxos automáticos"],
  },
];

export function Services() {
  return (
    <section
      className="section"
      id="servicos"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* ── Transição suave vindo do Hero ── */}

      {/* Fade escuro desce do topo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "180px",
          background:
            "linear-gradient(to bottom, rgba(8,4,1,0.98) 0%, rgba(8,4,1,0.6) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Linha fina laranja — eco visual das floating lines do hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,107,0,0.3), rgba(254,140,1,0.55), rgba(255,107,0,0.3), transparent)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {/* Halo laranja difuso sangrando do topo */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "65%",
          height: "200px",
          background:
            "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,107,0,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 4 }}>
        <div style={{ marginBottom: 56 }}>
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
          <p
            style={{
              color: "var(--muted)",
              maxWidth: 480,
              marginTop: 14,
              fontWeight: 300,
              fontSize: "clamp(14px, 3.5vw, 16px)",
            }}
          >
            Não trabalho com hype. Trabalho com sistemas que entregam resultado — em produção, com dados reais.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.label}
              className="card-lift"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 32px)",
                borderRadius: 10,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 24,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(48px, 8vw, 64px)",
                  color: "rgba(0,229,200,0.05)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                0{i + 1}
              </div>
              <div style={{ color: "var(--cyan)", marginBottom: 16 }}>
                <Icon name={s.icon} size={28} />
              </div>
              <h3
                style={{
                  fontSize: "clamp(16px, 3.5vw, 18px)",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                {s.label}
              </h3>
              <p
                style={{
                  fontSize: "clamp(12px, 3vw, 13px)",
                  color: "var(--cyan)",
                  fontStyle: "italic",
                  marginBottom: 12,
                  fontWeight: 300,
                }}
              >
                {s.problem}
              </p>
              <p
                style={{
                  fontSize: "clamp(13px, 3vw, 14px)",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {s.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.chips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}