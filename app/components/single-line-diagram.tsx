import { cn } from "~/lib/utils";

type SingleLineDiagramProps = {
  className?: string;
  /** When true, the diagram uses light strokes (for dark hero backgrounds) */
  inverted?: boolean;
};

/**
 * Stylized single-line diagram of a substation:
 * incoming HV line → disconnect → breaker → transformer → bus → outgoing feeders.
 * Strokes use stroke-dasharray for a "draw-in" animation when wrapped in `.cv-draw-line`.
 */
export function SingleLineDiagram({ className, inverted = false }: SingleLineDiagramProps) {
  const stroke = inverted ? "var(--cv-vellum)" : "var(--cv-pencil)";
  const accent = "var(--cv-copper)";
  const accentSoft = inverted ? "rgba(212, 147, 90, 0.6)" : "rgba(184, 115, 51, 0.6)";
  const labelColor = inverted ? "rgba(244, 239, 226, 0.72)" : "rgba(58, 68, 82, 0.85)";

  return (
    <svg
      viewBox="0 0 720 460"
      role="img"
      aria-label="Single-line diagram of a substation: HV line, disconnect, breaker, transformer, bus, and outgoing feeders."
      className={cn("cv-draw-line h-auto w-full", className)}
      style={{ ["--cv-draw-len" as string]: "1400" }}
    >
      <defs>
        <pattern id="cv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke={inverted ? "rgba(244, 239, 226, 0.06)" : "rgba(26, 26, 26, 0.07)"}
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect
        width="720"
        height="460"
        fill="url(#cv-grid)"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      />

      {/* Title-block style frame */}
      <rect
        x="6"
        y="6"
        width="708"
        height="448"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.32"
      />

      {/* === Incoming HV line === */}
      <text
        x="48"
        y="40"
        fill={labelColor}
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        letterSpacing="2"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        HV INCOMING — 138 kV
      </text>

      {/* Lightning entry */}
      <polyline
        points="48,80 76,80 90,68 110,92 124,68 138,80 168,80"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="square"
      />

      {/* Vertical drop */}
      <line x1="168" y1="80" x2="168" y2="130" stroke={stroke} strokeWidth="1.5" />

      {/* Disconnect switch (pivot + arm) */}
      <line x1="168" y1="130" x2="168" y2="138" stroke={stroke} strokeWidth="1.5" />
      <line x1="168" y1="138" x2="184" y2="124" stroke={stroke} strokeWidth="1.5" />
      <circle cx="168" cy="138" r="3" fill={stroke} stroke={stroke} strokeWidth="1" />
      <line x1="168" y1="148" x2="168" y2="170" stroke={stroke} strokeWidth="1.5" />
      <text
        x="194"
        y="138"
        fill={labelColor}
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="1.5"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        DISC
      </text>

      {/* Circuit breaker (square) */}
      <rect
        x="156"
        y="170"
        width="24"
        height="24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <line x1="168" y1="194" x2="168" y2="220" stroke={stroke} strokeWidth="1.5" />
      <text
        x="194"
        y="186"
        fill={labelColor}
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="1.5"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        52
      </text>

      {/* Transformer (two interlocking circles) */}
      <circle cx="168" cy="240" r="20" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="168" cy="270" r="20" fill="none" stroke={stroke} strokeWidth="1.5" />
      <line x1="168" y1="220" x2="168" y2="220" stroke={stroke} strokeWidth="1.5" />
      <line x1="168" y1="290" x2="168" y2="320" stroke={stroke} strokeWidth="1.5" />
      <text
        x="194"
        y="258"
        fill={labelColor}
        fontFamily="JetBrains Mono, monospace"
        fontSize="10"
        letterSpacing="1.5"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        XFMR
      </text>

      {/* Bus bar (horizontal heavy line) */}
      <line
        x1="80"
        y1="320"
        x2="640"
        y2="320"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="square"
      />
      <text
        x="80"
        y="312"
        fill={accent}
        fontFamily="JetBrains Mono, monospace"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.5"
        style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
      >
        BUS A — 13.8 kV
      </text>

      {/* Outgoing feeders */}
      {[140, 280, 420, 560].map((x, i) => (
        <g key={x}>
          <line x1={x} y1="320" x2={x} y2="350" stroke={stroke} strokeWidth="1.5" />
          {/* Disconnect */}
          <line x1={x} y1="350" x2={x + 12} y2="338" stroke={stroke} strokeWidth="1.5" />
          <circle cx={x} cy="350" r="2.5" fill={stroke} />
          <line x1={x} y1="358" x2={x} y2="384" stroke={stroke} strokeWidth="1.5" />
          {/* Breaker */}
          <rect
            x={x - 10}
            y="384"
            width="20"
            height="20"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <line x1={x} y1="404" x2={x} y2="430" stroke={stroke} strokeWidth="1.5" />
          {/* Triangle terminator (load) */}
          <polygon
            points={`${x - 6},430 ${x + 6},430 ${x},442`}
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
          />
          <text
            x={x}
            y="456"
            fill={labelColor}
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            letterSpacing="1.5"
            textAnchor="middle"
            style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}
          >
            FDR-{(i + 1).toString().padStart(2, "0")}
          </text>
        </g>
      ))}

      {/* Voltage callouts (late draw) */}
      <g className="cv-draw-late">
        <circle cx="168" cy="80" r="6" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="168" cy="320" r="6" fill="none" stroke={accent} strokeWidth="1.5" />
        <circle cx="280" cy="384" r="6" fill="none" stroke={accentSoft} strokeWidth="1.5" />
        <circle cx="560" cy="384" r="6" fill="none" stroke={accentSoft} strokeWidth="1.5" />
      </g>

      {/* Drawing notation in bottom-right */}
      <g style={{ animation: "none", strokeDasharray: "none", strokeDashoffset: 0 }}>
        <line x1="540" y1="36" x2="700" y2="36" stroke={stroke} strokeWidth="1" opacity="0.4" />
        <text
          x="540"
          y="30"
          fill={labelColor}
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
        >
          DETAIL — TYP. SUBSTATION
        </text>
        <text
          x="540"
          y="50"
          fill={labelColor}
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
          opacity="0.7"
        >
          REV 03 · NOT TO SCALE
        </text>
      </g>
    </svg>
  );
}
