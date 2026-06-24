import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./Section";

const items = [
  {
    quote: "Krishna delivered our healthcare platform with the polish of a senior product engineer. Architectural clarity, zero drama.",
    name: "A. Rao",
    role: "CTO, Health startup",
  },
  {
    quote: "Rare combination of design taste and engineering discipline. The mobile app shipped a week early and outperformed our benchmark.",
    name: "M. Sharma",
    role: "Product Lead",
  },
  {
    quote: "He treats codebases like physical objects — refined, considered, and built to last. Would hire again immediately.",
    name: "L. Verma",
    role: "Founder",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          align="center"
          eyebrow="07 / Voices"
          title={<>Trusted by teams that care about craft.</>}
        />
        <div className="relative h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel absolute inset-0 flex flex-col items-center justify-center gap-6 rounded-3xl p-10 text-center"
            >
              <p className="max-w-2xl text-balance font-display text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                &ldquo;{items[i].quote}&rdquo;
              </p>
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {items[i].name} · {items[i].role}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-aurora" : "w-1.5 bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}