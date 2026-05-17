import Link from 'next/link';
import { ArrowLeft, Lock, Server, FileCheck, Key } from 'lucide-react';

export default function SecurityPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 items-center justify-start p-8 min-h-screen">
      <div className="max-w-4xl w-full mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00205B] font-medium hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-10 w-10 text-[#00205B]" />
          <h1 className="text-4xl font-extrabold text-[#00205B]">Security Architecture</h1>
        </div>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p className="text-lg mb-4">
              Our infrastructure is engineered with a security-first ideology. 
              Below is an overview of the strict policies, HTTP headers, and access management systems that secure this website and our integration hubs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Server className="h-6 w-6 text-indigo-600" />
              Global HTTP Security Headers
            </h2>
            <p className="mb-2">We enforce robust, globally-applied security headers on all requests:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Content-Security-Policy (CSP):</strong> Explicitly scopes valid sources for scripts, images, and frames. Mitigates Cross-Site Scripting (XSS).</li>
              <li><strong>Strict-Transport-Security (HSTS):</strong> Enforces the use of HTTPS exclusively, preventing downgrade and man-in-the-middle attacks.</li>
              <li><strong>X-Content-Type-Options (nosniff):</strong> Prevents browsers from MIME-sniffing the response, heavily reducing the risk of drive-by downloads.</li>
              <li><strong>Referrer-Policy:</strong> Set to <code>strict-origin-when-cross-origin</code> to protect sensitive URL parameters from leaking cross-domain.</li>
              <li><strong>Permissions-Policy:</strong> Restricts powerful browser features (e.g., microphones, location, cameras) unless explicitly requested.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Key className="h-6 w-6 text-emerald-600" />
              Secrets Management
            </h2>
            <p>
              Hard-coded secrets or credentials are strictly prohibited in the codebase. All deployment tokens, API Keys (e.g., Gemini, Google Drive IDs), and environment-specific values are securely managed and injected via Environment Variables. This prevents accidental credential exposure in compiled client-side JavaScript chunks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-blue-600" />
              Infrastructure Hardening
            </h2>
            <p>
              By leveraging Vercel edge networks, we benefit from enterprise-grade DDoS protection, Web Application Firewalls (WAF), and automated TLS certificate management. System routes that interact directly with the LLMs are protected behind server-side Next.js API Routes, keeping all API keys entirely obscured from the client side browser.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
