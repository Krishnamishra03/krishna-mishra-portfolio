import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 2.2);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 420);
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          {/* scanning line */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-aurora to-transparent"
          />
          {/* grid bg */}
          <div
            className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(1 0 0 / .35) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / .35) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative flex flex-col items-center gap-8 px-6 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Initializing experience
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-5xl font-extrabold tracking-tight md:text-7xl"
            >
              <span className="text-gradient">KRISHNA MISHRA</span>
            </motion.h1>
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-aurora">
              Software Engineer
            </div>

            <div className="mt-2 w-[min(420px,80vw)]">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span>loading</span>
                <span className="tabular-nums text-foreground">{pct}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-aurora via-violet-400 to-aurora"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}