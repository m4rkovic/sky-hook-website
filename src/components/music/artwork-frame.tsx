import Image from "next/image";

export function ArtworkFrame({ artwork, title, placeholderLabel, priority = false }: { artwork?: string; title: string; placeholderLabel: string; priority?: boolean }) {
  return (
    <div className="group/art relative aspect-square overflow-hidden border border-line bg-surface-strong">
      {artwork ? (
        <Image src={artwork} alt={`${title} artwork`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(175,199,255,.18),transparent_34%),linear-gradient(145deg,#111a3d,#05060b_70%)]" />
          <div className="absolute -right-[12%] top-[8%] font-display text-[clamp(5rem,13vw,11rem)] uppercase leading-none text-ice/[0.07]">SH</div>
          <div className="absolute inset-x-4 top-4 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="kicker text-ice/70">Sky Hook</span>
            <span className="kicker text-paper/30">Archive</span>
          </div>
          <div className="absolute inset-x-4 bottom-4">
            <p className="max-w-[10ch] font-display text-3xl uppercase leading-[0.95] text-paper md:text-4xl">{title}</p>
            <span className="kicker mt-4 block text-ice-light/35">{placeholderLabel}</span>
          </div>
        </>
      )}
    </div>
  );
}
