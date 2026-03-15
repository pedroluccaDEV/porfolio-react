import type { ServiceItem } from "../types"; // Usar import type

export const SERVICES: ServiceItem[] = [
  {
    icon: "layers",
    label: "Sistemas Web & APIs",
    problem: "Precisa de um produto que escale e não quebre em produção?",
    desc: "Arquiteturas limpas, backends robustos com FastAPI / Node.js, frontends em React ou Vue, autenticação, filas, cache.",
    chips: ["FastAPI", "React", "PostgreSQL", "Docker", "Redis"],
  },
  {
    icon: "bot",
    label: "Agentes & IA Aplicada",
    problem: "Quer automatizar decisões com inteligência real?",
    desc: "Agentes LLM com memória e ferramentas, pipelines RAG, visão computacional, integração a sistemas existentes via API.",
    chips: ["LangChain", "LlamaIndex", "OpenAI", "RAG", "Visão Computacional"],
  },
  {
    icon: "zap",
    label: "Automação & Integração",
    problem: "Tem processo manual repetitivo roubando tempo do seu time?",
    desc: "Workflows automatizados, bots de WhatsApp / Telegram, integrações com CRMs, webhooks, processamento de dados em escala.",
    chips: ["n8n", "WhatsApp API", "Webhooks", "ETL", "Zapier"],
  },
];