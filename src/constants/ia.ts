import type { IABlock, CaseItem } from "../types"; // Usar import type

export const IA_BLOCKS: IABlock[] = [
  {
    icon: "bot",
    title: "Agentes & Orquestração",
    items: ["LangChain / LangGraph", "CrewAI", "Function calling", "Tool use + memória", "Multi-agent pipelines"],
  },
  {
    icon: "db",
    title: "Vetores & RAG",
    items: ["LlamaIndex", "Chroma / Qdrant / Pinecone", "Embeddings", "Hybrid search", "Chunking strategies"],
  },
  {
    icon: "cpu",
    title: "Visão Computacional",
    items: ["YOLOv8 / YOLOv9", "OpenCV", "Segmentation", "Inferência em produção", "GPUs / ONNX"],
  },
  {
    icon: "zap",
    title: "Automação",
    items: ["n8n", "Zapier avançado", "WhatsApp / Telegram API", "Webhooks", "RPA (Playwright / Puppeteer)"],
  },
];

export const IA_CASES: CaseItem[] = [
  {
    title: "Agente integrado a sistema público",
    desc: "Consultas automatizadas em base de dados governamental via agente LLM com ferramentas customizadas. Redução de 80% no tempo de pesquisa manual.",
  },
  {
    title: "RAG sobre documentação institucional",
    desc: "Sistema de busca semântica em acervo de 40k documentos com reranking híbrido e respostas com fonte rastreável.",
  },
  {
    title: "Visão computacional em linha de produção",
    desc: "Detecção de anomalias em tempo real com YOLOv8 customizado. Integrado ao sistema de alertas operacional.",
  },
];