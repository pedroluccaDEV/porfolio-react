export type IconName =
  | "arrow"
  | "external"
  | "github"
  | "cpu"
  | "layers"
  | "zap"
  | "code2"
  | "mail"
  | "linkedin"
  | "whatsapp"
  | "check"
  | "server"
  | "db"
  | "bot"
  | "menu"
  | "fileText"
  | "x";

export interface ServiceItem {
  icon: IconName;
  label: string;
  problem: string;
  desc: string;
  chips: string[];
}

export interface StackCategory {
  cat: string;
  items: string[];
}

export interface IABlock {
  icon: IconName;
  title: string;
  items: string[];
}

export interface Project {
  tag: string;
  title: string;
  org: string;
  desc: string;
  stack: string[];
  type: "enterprise" | "ia" | "automacao";
  hasDocs?: boolean;
  docsPath?: string;
}

export interface ContactItem {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface CaseItem {
  title: string;
  desc: string;
}

export interface NavLink {  // Certifique-se que esta interface está aqui
  label: string;
  href: string;
}