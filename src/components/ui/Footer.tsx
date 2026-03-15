// Footer.tsx
export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,120,0,0.12)",
        padding: "28px 0",
        background: "rgba(255,120,0,0.015)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontFamily: "monospace", fontSize: "clamp(11px, 3vw, 13px)", color: "var(--muted)" }}>
          © {new Date().getFullYear()} —{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #ff6b00, #ffb340)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 600,
            }}
          >
            &lt;Pedro Lucca /&gt;
          </span>
        </span>
        <span style={{ fontSize: "clamp(11px, 2.8vw, 12px)", color: "var(--muted)" }}>
          Curitiba, PR · Disponível para projetos remotos
        </span>
      </div>
    </footer>
  );
}