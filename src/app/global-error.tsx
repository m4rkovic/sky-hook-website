"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-[#05060b] text-[#f2f1ed]">
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
          <div style={{ width: "min(720px, 100%)", borderTop: "1px solid #242938", borderBottom: "1px solid #242938", padding: "48px 0" }}>
            <p style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#afc7ff" }}>Sky Hook / Error</p>
            <h1 style={{ margin: "16px 0 0", fontSize: "clamp(48px, 10vw, 96px)", lineHeight: 0.95, textTransform: "uppercase" }}>Signal lost.</h1>
            <p style={{ marginTop: 24, color: "#8a91a3", lineHeight: 1.7 }}>Nešto je puklo. Something went wrong.</p>
            <button
              type="button"
              onClick={reset}
              style={{ marginTop: 28, minHeight: 48, border: "1px solid #f2f1ed", background: "#f2f1ed", color: "#05060b", padding: "0 18px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}
            >
              Retry / Pokušaj ponovo
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
