import type { Project } from "../types"; // Usar import type

export const PROJECTS: Project[] = [
  {
    tag: "Full Stack",
    title: "Sistema de Gestão de Processos",
    org: "CELEPAR",
    desc: "Plataforma institucional com RBAC, auditoria completa, integrações com sistemas legados e 500+ usuários ativos.",
    stack: ["FastAPI", "React", "PostgreSQL", "Docker", "AWS"],
    type: "enterprise",
  },
  {
    tag: "IA Aplicada",
    title: "Agente de Consulta Documental",
    org: "Preâmbulo Tech",
    desc: "Agente RAG integrado a acervo jurídico com busca híbrida, citação de fontes e memória de sessão.",
    stack: ["LangChain", "OpenAI", "Qdrant", "FastAPI", "React"],
    type: "ia",
  },
  {
    tag: "Automação",
    title: "Pipeline de Intake Inteligente",
    org: "Cliente SaaS",
    desc: "Automação de onboarding via WhatsApp: extrai dados, valida, cria conta e dispara boas-vindas. Zero toque humano.",
    stack: ["n8n", "WhatsApp API", "Python", "PostgreSQL"],
    type: "automacao",
  },
  {
    tag: "Visão Computacional",
    title: "Detecção de Anomalias em Produção",
    org: "Indústria",
    desc: "Modelo YOLOv8 customizado para inspeção visual em tempo real. Integrado ao sistema SCADA via MQTT.",
    stack: ["YOLOv8", "OpenCV", "Python", "MQTT", "Docker"],
    type: "ia",
  },
];

export const TYPE_COLORS: Record<Project["type"], string> = {
  enterprise: "#6366f1",
  ia: "var(--cyan)",
  automacao: "var(--amber)",
};