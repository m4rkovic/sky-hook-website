type SkyHookLogoProps = {
  variant?: "full" | "monogram";
  className?: string;
};

export function SkyHookLogo({ variant = "full", className = "" }: SkyHookLogoProps) {
  const compact = variant === "monogram";
  const label = compact ? "SH" : "SKY HOOK";

  return (
    <svg
      viewBox={compact ? "0 0 126 92" : "0 0 520 92"}
      role="img"
      aria-label={compact ? "SH" : "Sky Hook"}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(8 0) skewX(-8)">
        <text
          x="0"
          y="72"
          fill="var(--sh-ice-light)"
          stroke="var(--sh-surface-strong)"
          strokeWidth="2.4"
          paintOrder="stroke fill"
          fontFamily='"Arial Black", Impact, "Arial Narrow", sans-serif'
          fontSize="72"
          fontWeight="900"
          fontStyle="italic"
          letterSpacing={compact ? "-4" : "-5"}
        >
          {label}
        </text>
      </g>
    </svg>
  );
}
