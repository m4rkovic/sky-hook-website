type Tone = "paper" | "background" | "surface" | "surface-strong";
type Direction = "left" | "right";

const toneClass: Record<Tone, string> = {
  paper: "text-paper",
  background: "text-background",
  surface: "text-surface",
  "surface-strong": "text-surface-strong",
};

export function SectionTransition({
  tone,
  direction = "left",
}: {
  tone: Tone;
  direction?: Direction;
}) {
  const path = direction === "left"
    ? "M0 10 L300 22 L560 31 L760 36 L650 52 L860 47 L1120 62 L1440 88 L1440 104 L0 104 Z"
    : "M0 88 L320 61 L580 48 L790 53 L690 36 L900 31 L1160 22 L1440 10 L1440 104 L0 104 Z";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 -top-[3rem] z-20 h-12 md:-top-[5rem] md:h-20 ${toneClass[tone]}`}
    >
      <svg
        viewBox="0 0 1440 104"
        preserveAspectRatio="none"
        className="block h-full w-full fill-current"
      >
        <path d={path} />
      </svg>
    </div>
  );
}
