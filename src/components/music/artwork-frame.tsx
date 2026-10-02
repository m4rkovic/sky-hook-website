import Image from "next/image";

export function ArtworkFrame({ artwork, title, placeholderLabel, priority = false }: { artwork?: string; title: string; placeholderLabel: string; priority?: boolean }) {
  return (
    <div className="relative aspect-square overflow-hidden border border-line bg-surface-strong">
      {artwork ? (
        <Image src={artwork} alt={`${title} artwork`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        <div className="flex h-full items-end p-4">
          <span className="kicker text-ice-light/35">{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
