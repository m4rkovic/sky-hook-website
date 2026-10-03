import type { StreamingLinks } from "@/content/schemas";

const services = [
  { key: "spotify", label: "Spotify", action: "play" },
  { key: "appleMusic", label: "Apple Music", action: "play" },
  { key: "youtube", label: "YouTube", action: "watch" },
  { key: "youtubeMusic", label: "YouTube Music", action: "play" },
  { key: "tidal", label: "TIDAL", action: "play" },
  { key: "deezer", label: "Deezer", action: "play" },
  { key: "amazonMusic", label: "Amazon Music", action: "play" },
  { key: "anghami", label: "Anghami", action: "play" },
  { key: "bandcamp", label: "Bandcamp", action: "open" },
] as const;

type Labels = { play: string; watch: string; open: string; noLinks: string };

export function ListenLinks({ streaming, labels, compact = false }: { streaming: StreamingLinks; labels: Labels; compact?: boolean }) {
  const configured = services.filter((service) => Boolean(streaming[service.key]));

  if (compact && configured.length === 0) return null;

  if (configured.length === 0) {
    return (
      <div className="border border-line bg-paper px-5 py-6 text-background">
        <p className="text-sm leading-6 text-background/55">{labels.noLinks}</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-3">
        {configured.map((service) => (
          <a key={service.key} className="kicker border border-current px-3 py-2 transition-colors hover:bg-ice hover:text-background" href={streaming[service.key]} target="_blank" rel="noreferrer">
            {service.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-line bg-paper text-background">
      {configured.map((service) => {
        const href = streaming[service.key];
        const action = service.action === "watch" ? labels.watch : service.action === "open" ? labels.open : labels.play;

        return (
          <div key={service.key} className="grid min-h-16 grid-cols-[1fr_auto] items-center gap-5 border-b border-background/15 px-5 last:border-b-0">
            <span className="font-display text-lg uppercase">{service.label}</span>
            <a className="brutal-button min-h-9 border-background px-4" href={href} target="_blank" rel="noreferrer">
              {action}
            </a>
          </div>
        );
      })}
    </div>
  );
}
