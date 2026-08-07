import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroObjects from "@/assets/hero-objects.jpg";
import { Magnetic } from "./Magnetic";
import heroPhoto from "@/assets/hero-photo.png";
import { ResumeModal } from "./ResumeModal";

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
        <div className="absolute -left-[10%] -top-[10%] h-[55%] w-[55%] rounded-full bg-indigo-500/25 blur-[140px] animate-aurora" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[55%] w-[55%] rounded-full bg-aurora/20 blur-[140px] animate-aurora [animation-delay:-8s]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_130%,oklch(0.16_0.03_270)_0%,transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.7 0.02 260 / .4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.7 0.02 260 / .4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
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
          className="h-full w-full object-contain object-bottom opacity-40 mix-blend-screen"
        />
      </motion.div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 text-center md:pt-20">
        {/* Hero photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
        >
          {/* ambient portrait backdrop */}
          <div className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_40%_40%,oklch(0.22_0.04_270)_0%,oklch(0.12_0.03_270)_45%,transparent_75%)] opacity-80" />
          <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_60%_30%,oklch(0.7_0.12_270/0.18)_0%,oklch(0.6_0.1_200/0.1)_35%,transparent_65%)] blur-2xl" />
          {/* outer glow */}
          <div className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,oklch(0.75_0.18_270),oklch(0.8_0.15_200),oklch(0.85_0.15_150),oklch(0.75_0.18_270))] opacity-40 blur-2xl animate-[spin_14s_linear_infinite]" />
          {/* rotating conic ring */}
          <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,oklch(0.85_0.15_270)_60deg,transparent_140deg,oklch(0.85_0.15_150)_220deg,transparent_320deg)] animate-[spin_9s_linear_infinite]" />
          {/* counter-rotating dashed ring */}
          <div
            className="absolute -inset-4 rounded-full border border-dashed border-white/15 animate-[spin_28s_linear_infinite_reverse]"
            style={{ maskImage: "radial-gradient(circle, black 60%, transparent 100%)" }}
          />
          <div className="relative h-44 w-44 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_25%,oklch(0.26_0.03_270)_0%,oklch(0.15_0.02_270)_55%,oklch(0.10_0.01_270)_100%)] ring-1 ring-white/15 shadow-[0_0_60px_-10px_oklch(0.65_0.1_270/0.35)] md:h-52 md:w-52">
            <img
              src={heroPhoto}
              alt="Krishna Mishra"
              width={800}
              height={800}
              className="relative h-full w-full scale-[1.06] rounded-full object-cover object-[50%_12%]"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
          </div>
          {/* online pill */}
          <span className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300 ring-1 ring-emerald-400/30 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Online
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs glass-panel ring-1 ring-emerald-400/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-medium uppercase tracking-[0.22em] text-emerald-400/90">
            Available — Q3 2026
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold leading-[0.94] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block whitespace-nowrap"
          >
            Hello, I&apos;m <span className="text-aurora">Krishna Mishra.</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-foreground/85"
          >
            Engineering with precision.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Software Engineer · Full Stack Developer · Mobile App Developer — crafting
          high-performance products where robust backend systems meet fluid, pixel-perfect interfaces.
        </motion.p>

        {/* Terminal stack chip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-10 inline-flex items-center gap-3 rounded-2xl px-4 py-2.5 glass-panel"
        >
          <span className="font-mono text-sm text-aurora">$</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            building with
          </span>
          <span className="font-mono text-sm font-medium text-foreground">{word}</span>
          <span className="inline-block h-4 w-[2px] animate-pulse bg-aurora" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic
            as="a"
            href="#work"
            strength={0.4}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-foreground px-7 py-3.5 text-sm font-semibold text-background shadow-[0_0_30px_oklch(1_0_0/0.15)] transition-all duration-500 hover:shadow-[0_0_50px_oklch(1_0_0/0.35)] active:scale-[0.97]"
          >
            {/* aurora sweep on hover */}
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_20%,oklch(0.85_0.15_270/0.5)_45%,oklch(0.9_0.12_180/0.5)_55%,transparent_80%)] transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
            {/* animated arrow track */}
            <span className="relative z-10 overflow-hidden">
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">View Projects</span>
              <span className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-aurora">View Projects</span>
            </span>
            <span className="relative z-10 flex h-4 w-4 items-center overflow-hidden">
              <span className="flex -translate-x-4 transition-transform duration-500 group-hover:translate-x-0">
                <span className="w-4 shrink-0 text-center">→</span>
                <span className="w-4 shrink-0 text-center">→</span>
              </span>
            </span>
          </Magnetic>
          <ResumeModal>
            <Magnetic
              as="button"
              strength={0.35}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-foreground glass-panel transition-all duration-500 hover:bg-white/[0.08] hover:ring-white/25 active:scale-[0.97]"
            >
              {/* animated conic border on hover */}
              <span className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:conic-gradient(from_0deg,oklch(0.75_0.18_270),oklch(0.85_0.15_150),oklch(0.8_0.15_200),oklch(0.75_0.18_270))] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [mask-composite:exclude] [padding:1px] animate-[spin_4s_linear_infinite]" />
              <span className="relative z-10">Download Résumé</span>
              <span className="relative z-10 flex h-4 w-4 items-center justify-center overflow-hidden">
                <svg
                  className="h-4 w-4 text-muted-foreground transition-all duration-500 group-hover:-translate-y-6 group-hover:opacity-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <svg
                  className="absolute h-4 w-4 translate-y-6 text-aurora transition-all duration-500 group-hover:translate-y-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </span>
            </Magnetic>
          </ResumeModal>
          <Magnetic
            as="a"
            href="#contact"
            strength={0.3}
            className="group relative inline-flex items-center gap-2 rounded-xl px-5 py-3.5 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-aurora active:scale-[0.97]"
          >
            <span className="relative">
              Hire me
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-aurora via-violet-400 to-emerald-400 transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="relative flex h-4 w-4 items-center overflow-hidden">
              <span className="flex -translate-x-4 transition-transform duration-500 group-hover:translate-x-0">
                <span className="w-4 shrink-0 text-center">→</span>
                <span className="w-4 shrink-0 text-center">→</span>
              </span>
            </span>
          </Magnetic>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span>Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-aurora/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}