import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroObjects from "@/assets/hero-objects.jpg";
import { Magnetic } from "./Magnetic";

const typing = [
  "MERN Stack",
  "React Native",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Firebase",
  "AI Integration",
];

function useTyper(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          if (text.length < word.length) setText(word.slice(0, text.length + 1));
          else setTimeout(() => setDel(true), 1400);
        } else {
          if (text.length > 0) setText(word.slice(0, text.length - 1));
          else {
            setDel(false);
            setI((v) => v + 1);
          }
        }
      },
      del ? 40 : 70,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const word = useTyper(typing);

  return (
    <section id="top" ref={ref} className="relative grain min-h-[100svh] overflow-hidden pt-28">
      {/* Aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-aurora/25 blur-[120px] animate-aurora" />
        <div className="absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full bg-aurora/20 blur-[120px] animate-aurora [animation-delay:-8s]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,oklch(0.18_0.02_260)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(1 0 0 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <motion.div
        style={{ y, scale, opacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[80vh] max-w-6xl"
      >
        <img
          src={heroObjects}
          alt=""
          width={1920}
          height={1280}
          className="h-full w-full object-contain object-bottom opacity-60 mix-blend-screen"
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs glass-panel"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Available — Q3 2026
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-[0.92] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient"
          >
            Hello, I&apos;m Krishna Mishra.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-muted-foreground"
          >
            Engineering with <span className="text-aurora">precision.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="max-w-xl space-y-5">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Software Engineer · Full Stack Developer · Mobile App Developer. I build
              high-performance products at the intersection of clean architecture and
              cinematic interfaces.
            </p>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">{">"}</span>
              <span className="text-foreground">{word}</span>
              <span className="inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-aurora" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Magnetic
              as="a"
              href="#work"
              strength={0.4}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors"
            >
              View Projects
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Magnetic>
            <Magnetic
              as="a"
              href="#"
              strength={0.35}
              className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
            >
              Download Résumé
            </Magnetic>
            <Magnetic
              as="a"
              href="#contact"
              strength={0.3}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Hire me →
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
}