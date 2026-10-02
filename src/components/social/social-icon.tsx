type SocialIconName = "instagram" | "facebook" | "youtube" | "spotify";

export function SocialIcon({ name, className = "" }: { name: SocialIconName; className?: string }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <rect x="10" y="10" width="44" height="44" rx="13" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="32" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="46" cy="18" r="3.5" fill="currentColor" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <path
          d="M38.5 17.5H45V7.2c-1.1-.2-5-.7-9.5-.7-9.3 0-15.7 5.7-15.7 16.1v9H9.5V43h10.3v28h12.7V43h10.6l1.7-11.4H32.5v-7.9c0-3.3.9-6.2 6-6.2Z"
          transform="translate(0 -6)"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
        <rect x="6" y="14" width="52" height="36" rx="10" fill="currentColor" />
        <path d="M27 24 43 32 27 40Z" fill="var(--sh-bg)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="27" fill="currentColor" />
      <path d="M18 25c11-3 24-1.8 31 2" fill="none" stroke="var(--sh-bg)" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 33c9-2.2 19.5-1.3 26 1.6" fill="none" stroke="var(--sh-bg)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M22 40c7-1.4 14.5-.7 20 1.8" fill="none" stroke="var(--sh-bg)" strokeWidth="3.25" strokeLinecap="round" />
    </svg>
  );
}
