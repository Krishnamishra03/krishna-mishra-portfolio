export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-aurora/60 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-[10px] font-bold text-background">KM</span>
          <div className="text-sm">
            <div className="font-semibold">Krishna Mishra</div>
            <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} · Engineered with care</div>
          </div>
        </div>
        <div className="flex gap-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="https://github.com/Krishnamishra03" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">GitHub</a>
          <a href="https://www.linkedin.com/in/krishna-mishra-4199a3250/" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">LinkedIn</a>
          <a href="https://x.com/Thekrishna02" target="_blank" rel="noreferrer noopener" className="hover:text-foreground">Twitter</a>
          <a href="mailto:krishanamishra913@gmail.com" className="hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  );
}