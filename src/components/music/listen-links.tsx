import type { Release } from "@/content/schemas";

const services = [
  { key: "spotify", label: "Spotify", action: "play" },
  { key: "appleMusic", label: "Apple Music", action: "play" },
  { key: "youtube", label: "YouTube", action: "watch" },
  { key: "youtubeMusic", label: "YouTube Music", action: "play" },
  { key: "tidal", label: "TIDAL", action: "play" },
  { key: "deezer", label: "Deezer", action: "play" },
  { key: "bandcamp", label: "Bandcamp", action: "open" },
] as const;

type Labels = { play: string; watch: string; open: string; soon: string; noLinks: string };

export function ListenLinks({ release, labels }: { release: Release; labels: Labels }) {
  const configuredCount = services.filter((service) => release.streaming[service.key]).length;

  return (
    <div className="border border-line bg-paper text-background">
      {services.map((service) => {
        const href = release.streaming[service.key];
        const action = service.action === "watch" ? labels.watch : service.action === "open" ? labels.open : labels.play;
        return (
          <div key={service.key} className="grid min-h-16 grid-cols-[1fr_auto] items-center gap-5 border-b border-background/15 px-5 last:border-b-0">
            <span className="font-display text-lg font-black uppercase tracking-[-0.02em]">{service.label}</span>
            {href ? (
              <a className="brutal-button min-h-9 border-background px-4" href={href} target="_blank" rel="noreferrer">{action}</a>
            ) : (
              <span className="kicker text-background/35">{labels.soon}</span>
            )}
          </div>
        );
      })}
      {configuredCount === 0 ? <p className="border-t border-background/15 px-5 py-4 text-sm text-background/55">{labels.noLinks}</p> : null}
    </div>
  );
}
