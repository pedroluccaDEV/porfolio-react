import type { ContactItem, StatItem } from "../types"; // Usar import type

export const STATS: StatItem[] = [
  { label: "Ambientes produtivos", value: "3+" },
  { label: "Agentes em produção", value: "5+" },
  { label: "Integrações reais", value: "12+" },
];

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "+55 (41) 9 8832-7983",
    href: "https://wa.me/5541988327983",
    color: "#22c55e",
  },
  {
    icon: "mail",
    label: "Email",
    value: "pedroluccaaraujo2004@gmail.com",
    href: "mailto:pedroluccaaraujo2004@gmail.com",
    color: "var(--cyan)",
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "/in/pedroluccaga/",
    href: "https://www.linkedin.com/in/pedroluccaga/",
    color: "#0ea5e9",
  },
];