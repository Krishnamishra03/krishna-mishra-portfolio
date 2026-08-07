import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink, FileText } from "lucide-react";
import resumeAsset from "@/assets/Krishna_Kumar_Mishra_Resume.pdf.asset.json";

export function ResumeModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer"
        role="button"
        aria-label="Open résumé preview"
      >
        {children}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-[5vh] z-[100] mx-auto flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.1_0.01_270/0.95)] shadow-2xl shadow-black/40 md:inset-x-8 md:top-[6vh]"
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4 md:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-aurora/15 text-aurora">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight">Krishna Kumar Mishra</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Résumé · PDF Preview</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={resumeAsset.url}
                    download="Krishna_Kumar_Mishra_Resume.pdf"
                    className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:opacity-90 active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={resumeAsset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid size-9 place-items-center rounded-xl border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="grid size-9 place-items-center rounded-xl border border-white/10 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    aria-label="Close preview"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* viewer */}
              <div className="relative flex-1 overflow-hidden bg-white">
                <iframe
                  src={resumeAsset.url}
                  title="Krishna Kumar Mishra Resume"
                  className="h-[70vh] w-full md:h-[74vh]"
                />
              </div>

              {/* footer */}
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-5 py-3 md:px-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {resumeAsset.size ? `${(resumeAsset.size / 1024).toFixed(1)} KB · PDF` : "PDF Document"}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Close preview
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
