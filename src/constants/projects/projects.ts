import type { Project } from "../../types";

export const PROJECTS: Project[] = [
  {
    tag: "UI/UX • Front-end",
    title: "Landing Page Nubank",
    org: "Projeto Pessoal",
    desc: "Landing page inspirada no design system do Nubank. Recria a identidade visual e experiência do banco digital com atenção aos detalhes de animação e micro-interações.",
    stack: ["React", "TypeScript", "Styled Components", "Framer Motion", "Vite"],
    type: "enterprise",
  },
  {
    tag: "Cloud • DevOps",
    title: "EC2 Auto Scaling & Load Balancer",
    org: "AWS — Projeto Pessoal",
    desc: "Infraestrutura de alta disponibilidade na AWS com Auto Scaling Group, Application Load Balancer e políticas de escalonamento por CPU. Documentação técnica completa.",
    stack: ["AWS EC2", "Auto Scaling", "ALB", "CloudWatch", "IAM"],
    type: "enterprise",
  },
  {
    tag: "IA Produto",
    title: "Saphien — Landing Page",
    org: "Projeto Pessoal",
    desc: "Landing page da plataforma Saphien, sistema de IA que desenvolvi. A página apresenta a proposta de valor, features e experiência da plataforma com design próprio.",
    stack: ["React", "TypeScript", "Framer Motion", "Vite"],
    type: "ia",
  },
  {
    tag: "Full Stack • IA",
    title: "AI CRM — Intelligent Lead Management",
    org: "Projeto Pessoal",
    desc: "CRM com agentes autônomos que analisam leads, classificam intenção de compra, geram respostas e executam follow-ups automaticamente. Sistema onde IA gera valor de negócio real.",
    stack: ["FastAPI", "React", "PostgreSQL", "OpenAI", "Docker"],
    type: "ia",
  },
];

export const TYPE_COLORS: Record<Project["type"], string> = {
  enterprise: "#6366f1",
  ia: "var(--cyan)",
  automacao: "var(--amber)",
};