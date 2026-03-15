import { useState, useEffect } from "react";

interface TypedTextProps {
  text: string;
  speed?: number;
}

export function TypedText({ text, speed = 75 }: TypedTextProps) {
  const [displayed, setDisplayed] = useState<string>("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  return (
    <>
      {displayed}
      <span
        className="cursor"
        style={{
          // Neon orange cursor — matches headline gradient end tone
          color: "#ffb340",
          filter: "drop-shadow(0 0 6px rgba(255,179,64,0.8))",
        }}
      >
        |
      </span>
    </>
  );
}