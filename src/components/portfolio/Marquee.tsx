const tokens = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "React Native",
  "MongoDB",
  "Firebase",
  "Tailwind",
  "Express",
  "PostgreSQL",
  "YOLOv8",
  "GSAP",
  "Three.js",
  "Vercel",
];

export function Marquee() {
  const row = [...tokens, ...tokens];
  return (
    <section
      aria-hidden
      className="relative border-y border-border/60 bg-background/40 py-6 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            {t}
            <span className="ml-12 text-aurora">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}