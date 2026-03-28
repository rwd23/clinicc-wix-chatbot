import Link from "next/link";
import { clinicAssistantConfig } from "@/lib/clinic-config";

export default function HomePage() {
  return (
    <main className="launcher-shell">
      <section className="launcher-card">
        <p className="eyebrow">Vercel + Wix</p>
        <h1>{clinicAssistantConfig.clinicName} Concierge</h1>
        <p className="lead">
          This project hosts your chatbot on Vercel so you can embed it inside Wix
          without rebuilding your main website.
        </p>

        <div className="launcher-actions">
          <Link className="primary-link" href="/widget">
            Open widget preview
          </Link>
          <a
            className="secondary-link"
            href="https://www.clinicc.co.uk"
            target="_blank"
            rel="noreferrer"
          >
            Visit current site
          </a>
        </div>

        <div className="code-card">
          <p className="code-title">Wix embed snippet</p>
          <pre>{`<iframe
  src="https://YOUR-VERCEL-DOMAIN.vercel.app/widget"
  width="100%"
  height="760"
  style="border:0; border-radius:24px; overflow:hidden;"
  loading="lazy"
></iframe>`}</pre>
        </div>
      </section>
    </main>
  );
}
