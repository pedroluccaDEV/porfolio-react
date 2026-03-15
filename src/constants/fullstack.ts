

export interface StackItem {
  name: string;
  level: "expert" | "advanced" | "solid"; // expert = uso diário, advanced = projetos reais, solid = conhecimento sólido
}

export interface RichStackCategory {
  cat: string;
  icon: string;
  desc: string;
  items: StackItem[];
}

export const FS_STACK: RichStackCategory[] = [
  {
    cat: "Frontend",
    icon: "layers",
    desc: "Interfaces escaláveis com componentização real, state management e arquitetura de design system.",
    items: [
      { name: "React",        level: "expert"   },
      { name: "Next.js",      level: "expert"   },
      { name: "Vue 2/3",      level: "expert"   },
      { name: "Angular",      level: "advanced" },
      { name: "React Native", level: "advanced" },
      { name: "TypeScript",   level: "expert"   },
      { name: "TailwindCSS",  level: "expert"   },
      { name: "Figma",        level: "solid"    },
    ],
  },
  {
    cat: "Backend & APIs",
    icon: "server",
    desc: "APIs REST e GraphQL, autenticação, filas assíncronas, WebSockets e integrações externas robustas.",
    items: [
      { name: "FastAPI",       level: "expert"   },
      { name: "Node.js",       level: "expert"   },
      { name: "Express.js",    level: "expert"   },
      { name: "Flask",         level: "advanced" },
      { name: "Python",        level: "expert"   },
      { name: "REST / GraphQL",level: "expert"   },
      { name: "WebSockets",    level: "advanced" },
      { name: "Django",        level: "solid"    },
      { name: "Java / Spring", level: "solid"    },
    ],
  },
  {
    cat: "Banco de Dados",
    icon: "db",
    desc: "Modelagem relacional e NoSQL, consultas otimizadas, índices, pipelines agregados e ORMs.",
    items: [
      { name: "PostgreSQL",    level: "expert"   },
      { name: "MongoDB",       level: "expert"   },
      { name: "Redis",         level: "advanced" },
      { name: "MySQL / MariaDB", level: "advanced" },
      { name: "DynamoDB",      level: "solid"    },
      { name: "PrismaORM",     level: "expert"   },
      { name: "SQLAlchemy",    level: "advanced" },
      { name: "Mongoose",      level: "advanced" },
    ],
  },
  {
    cat: "Infra & DevOps",
    icon: "cpu",
    desc: "Contêinerização, deploy em nuvem, pipelines CI/CD e observabilidade em ambientes produtivos.",
    items: [
      { name: "Docker / Compose", level: "expert"   },
      { name: "AWS (EC2, S3, Lambda)", level: "advanced" },
      { name: "GitHub Actions", level: "expert"   },
      { name: "Jenkins",        level: "solid"    },
      { name: "AWS CloudWatch", level: "solid"    },
      { name: "API Gateway",    level: "advanced" },
      { name: "Nginx",          level: "solid"    },
    ],
  },
  {
    cat: "Arquitetura",
    icon: "zap",
    desc: "Sistemas modulares, desacoplados e escaláveis — do monólito bem estruturado ao microserviço real.",
    items: [
      { name: "Clean Architecture", level: "expert"   },
      { name: "Microservices",      level: "advanced" },
      { name: "Event-driven",       level: "advanced" },
      { name: "Async / Filas",      level: "expert"   },
      { name: "JWT / OAuth2",       level: "expert"   },
      { name: "RBAC / Multi-tenant",level: "advanced" },
      { name: "Swagger / OpenAPI",  level: "advanced" },
    ],
  },
];

export const FS_HIGHLIGHTS: string[] = [
  "React, Next.js, Vue 2/3 e Angular em produção real",
  "Backends desacoplados com FastAPI, Node.js e Flask",
  "Infra containerizada com Docker + CI/CD GitHub Actions",
  "Auth JWT/OAuth2, RBAC, auditoria e multi-tenancy",
  "AWS (EC2, Lambda, S3, CloudWatch, API Gateway)",
  "PostgreSQL e MongoDB com modelagem e performance reais",
];

export const LEVEL_LABEL: Record<StackItem["level"], string> = {
  expert:   "Uso diário",
  advanced: "Projetos reais",
  solid:    "Conhecimento sólido",
};

export const LEVEL_COLOR: Record<StackItem["level"], string> = {
  expert:   "#ff7a00",
  advanced: "#ffb340",
  solid:    "rgba(255,180,80,0.4)",
};