"""Regenerate the static press download pack from the shared website content."""
import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
COPY = json.loads((ROOT / "src/content/press.json").read_text())
STREAMING = json.loads((ROOT / "src/content/streaming.json").read_text())
SITE = (ROOT / "src/content/site.ts").read_text()
EMAIL = re.search(r'bookingEmail:\s*"([^"]+)"', SITE).group(1)
FILES = {
    "photos/sky-hook-band.jpg": PUBLIC / "press/sky-hook-band.jpg",
    "photos/sky-hook-live-01.jpg": PUBLIC / "media/photos/skyhook-live-01.jpg",
    "photos/sky-hook-live-02.jpg": PUBLIC / "media/photos/skyhook-live-02.jpg",
    "logo/sky-hook-logo.png": PUBLIC / "brand/sky-hook-wordmark.png",
}
for locale in ("sr", "en"):
    path = PUBLIC / f"press/sky-hook-bio-{locale}.txt"
    path.write_text(f"SKY HOOK\n\n{COPY[locale]['bio']}\n\nBooking / Press: {EMAIL}\n", encoding="utf-8")
    FILES[f"biographies/{path.name}"] = path

readme = (
    "SKY HOOK / PRESS KIT\n\n"
    f"Booking / press: {EMAIL}\n\n"
    "Photos: JPEG. Logo: PNG. Biographies: UTF-8 text in Serbian and English.\n"
    "Keep visible photographer credits when publishing.\n"
    "For the current technical rider and stage plot, contact the band.\n\n"
    "GDE PTICE LETE / LISTEN\n" + "\n".join(f"{name}: {url}" for name, url in STREAMING['album'].items()) + "\n"
)
with zipfile.ZipFile(PUBLIC / "press/sky-hook-press-kit.zip", "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for name, path in FILES.items():
        archive.write(path, f"sky-hook-press-kit/{name}")
    archive.writestr("sky-hook-press-kit/README.txt", readme)
print("Press kit generated: 3 photos, logo, SR/EN biographies and listening links.")
