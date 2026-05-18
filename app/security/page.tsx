import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

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
        
        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <p className="text-lg">
              This security audit evaluates the Insurance Triage Evolved platform, focusing on its frontend architecture, backend automation workflows, and data handling practices. This assessment was partially conducted using security-audit-checker.vercel.app, a specialized tool developed by Gijs Hulsebos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 border-b pb-2">
              <span className="flex items-center justify-center bg-blue-100 text-blue-700 rounded-full h-8 w-8 text-sm">1</span>
              Executive Summary
            </h2>
            <p className="text-slate-700">
              The Insurance Demo platform demonstrates a &quot;Security by Design&quot; approach. By leveraging modern cloud infrastructure (Vercel) and robust workflow orchestration (n8n), the system minimizes common attack vectors like server misconfiguration and unauthorized API access. While the core architecture is highly resilient, one minor credential exposure was identified during the automated scan that requires immediate rotation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 border-b pb-2">
              <span className="flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-full h-8 w-8 text-sm">2</span>
              Infrastructure & Hosting Security
            </h2>
            <p className="mb-4">
              The decision to host on Vercel provides several out-of-the-box security advantages that are critical for an insurance-related application:
            </p>
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>Environment Variable Isolation:</strong> Sensitive keys (AI API keys, database credentials) are never stored in the codebase. They are managed through Vercel&apos;s encrypted dashboard, preventing accidental exposure via Git history.</li>
              <li><strong>Static Analysis & CI/CD:</strong> The use of <code>eslint.config.mjs</code> and TypeScript (<code>tsconfig.json</code>) ensures that code-level vulnerabilities are caught during the build process before reaching production.</li>
              <li><strong>DDoS Protection & Global Edge:</strong> Vercel provides automatic mitigation against layer 3 and 4 attacks, ensuring the claims portal remains available during traffic spikes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 border-b pb-2">
              <span className="flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full h-8 w-8 text-sm">3</span>
              Backend & Workflow Security (n8n)
            </h2>
            <p className="mb-4">
              The backend logic is handled via a complex n8n workflow, which introduces several &quot;Defense in Depth&quot; layers:
            </p>
            
            <h3 className="text-lg font-bold text-slate-800 mb-2 mt-6">Authentication & Perimeter Defense</h3>
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>Header-Based Security:</strong> The primary entry point (Insurance Demo Webhook) is protected via headerAuth. This ensures that only authorized requests from the frontend can trigger the claims processing logic.</li>
              <li><strong>Webhook Obfuscation:</strong> The workflow uses a unique, non-guessable UUID for the webhook path, significantly reducing the risk of &quot;IDOR&quot; or brute-force discovery.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-2 mt-6">Gatekeeper & Fraud Prevention</h3>
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>AI Gatekeeper Logic:</strong> The AI Agent node includes strict &quot;Gatekeeper Logic.&quot; It is programmed to reject nonsense inputs or unrelated data, acting as an automated first line of defense against &quot;Prompt Injection&quot; or fraudulent spam.</li>
              <li><strong>Validation Status:</strong> The system uses a Structured Output Parser to ensure that AI-generated responses conform to a strict JSON schema, preventing downstream processing errors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 border-b pb-2">
              <span className="flex items-center justify-center bg-orange-100 text-orange-700 rounded-full h-8 w-8 text-sm">4</span>
              Data Privacy & GDPR Compliance
            </h2>
            <p className="mb-4">
              Given the sensitivity of insurance data, the workflow incorporates dedicated privacy nodes:
            </p>
            <ul className="list-disc ml-6 space-y-3">
              <li><strong>PII Vaulting:</strong> The workflow explicitly separates Personally Identifiable Information (PII) like <code>user_email</code> and <code>policy_number</code> into a &quot;PII Vault&quot; before sending data to the AI agent for analysis.</li>
              <li><strong>Anonymization:</strong> The <code>compliance_meta</code> tag indicates that data is flagged as <code>gdpr_anonymized: true</code> during the processing phase.</li>
              <li><strong>Human-in-the-Loop (HITL):</strong> High-risk claims (Urgency Level 3) or low-confidence AI scores trigger a manual review via the &quot;Human Review?&quot; logic, ensuring that sensitive decisions are not left solely to an algorithm.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
