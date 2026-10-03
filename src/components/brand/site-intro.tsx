import { SkyHookLogo } from "./sky-hook-logo";

// Runs before the overlay is parsed so repeat visits never flash the intro.
// CSS finishes the reveal independently of hydration or image loading.
const introBootstrap = `(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (sessionStorage.getItem('skyhook:intro-seen')) return;
    sessionStorage.setItem('skyhook:intro-seen', '1');
  } catch {}
  document.documentElement.dataset.shIntro = 'show';
})();`;

export function SiteIntro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      <div className="site-intro" aria-hidden="true">
        <SkyHookLogo variant="monogram" className="w-32 sm:w-40" />
      </div>
    </>
  );
}
