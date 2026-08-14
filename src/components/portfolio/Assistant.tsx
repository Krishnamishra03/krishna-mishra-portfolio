import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useServerFn } from "@tanstack/react-start";
import { askAssistant } from "@/lib/assistant.functions";
import botIcon from "@/assets/bot-icon-v2.png";

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Who is Krishna?",
  "Show me his projects",
  "What's his tech stack?",
  "How can I hire him?",
];

const greeting: Msg = {
  role: "assistant",
  content: "Hi — I'm Krishna's portfolio assistant. Ask me about his projects, stack, experience, or how to hire him.",
};

export function Assistant() {
  const ask = useServerFn(askAssistant);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await ask({
        data: { messages: next.filter((m) => m !== greeting).map(({ role, content }) => ({ role, content })) },
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            err instanceof Error && err.message
              ? err.message.replace(/^Error:\s*/, "")
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="AI assistant"
        className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-foreground shadow-2xl ring-2 ring-aurora/30 transition-transform hover:scale-105 active:scale-95"
      >
        <span className="relative grid h-full w-full place-items-center">
          <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-aurora/40" />
          <img src={botIcon} alt="Krishna's AI assistant" className="h-9 w-9 object-contain" width={36} height={36} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel fixed bottom-20 right-5 z-[80] flex h-[min(520px,72vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <img
                src={botIcon}
                alt="Krishna's AI assistant"
                className="h-7 w-7 rounded-full object-contain ring-1 ring-aurora/30"
                width={28}
                height={28}
              />
              <div>
                <div className="text-sm font-semibold">Ask about Krishna</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {loading ? "thinking…" : "portfolio assistant"}
                </div>
              </div>
            </div>

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-foreground px-3 py-2 text-xs leading-relaxed text-background"
                        : "max-w-[90%] rounded-2xl rounded-bl-sm border border-border/60 bg-white/[0.03] px-3 py-2 text-xs leading-relaxed text-muted-foreground"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 px-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-aurora"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-border/60 px-3 py-2.5"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, stack, hiring…"
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
