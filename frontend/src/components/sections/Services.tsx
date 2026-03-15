// Services.tsx
import { Icon } from "../ui/Icon";

const SERVICES = [
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