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
    ? "M0 20 L1440 72 L1440 104 L0 104 Z"
    : "M0 72 L1440 20 L1440 104 L0 104 Z";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 -top-6 z-0 h-6 md:-top-10 md:h-10 ${toneClass[tone]}`}
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
