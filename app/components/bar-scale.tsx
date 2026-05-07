export function BarScale() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 hidden border-t border-cv-rule-soft bg-cv-vellum-light/80 backdrop-blur-sm md:block"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-1.5">
        <span className="cv-mono text-[9px] font-medium uppercase tracking-[0.22em] text-cv-graphite-light">
          0&apos;
        </span>
        <div className="relative h-[6px] flex-1 overflow-hidden">
          {/* Tick marks */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--cv-pencil) 0 1px, transparent 1px 10%)",
              opacity: 0.5,
            }}
          />
          {/* Progress fill (scroll-driven where supported) */}
          <div
            className="cv-bar-scale-fill absolute inset-y-0 left-0 origin-left"
            style={{
              width: "100%",
              transform: "scaleX(0)",
              background: "var(--cv-copper)",
            }}
          />
        </div>
        <span className="cv-mono text-[9px] font-medium uppercase tracking-[0.22em] text-cv-graphite-light">
          End&nbsp;of&nbsp;sheet
        </span>
      </div>
    </div>
  );
}
