import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle, Database } from 'lucide-react';

export default function ProductPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 items-center justify-start p-8 min-h-screen">
      <div className="max-w-4xl w-full mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00205B] font-medium hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold text-[#00205B] mb-6">Product Overview: Claim Process</h1>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              Automated Triage Workflow
            </h2>
            <p>
              Our product revolutionizes claims processing by integrating an intelligent AI Agent that handles initial triage. 
              The system automatically analyzes provided claim information, including unstructured text and images, to determine urgency, category, and required actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-indigo-600" />
              Data Splitting & GDPR Compliance
            </h2>
            <p>
              To ensure strict compliance with the General Data Protection Regulation (GDPR), our system employs advanced data splitting and anonymization techniques.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>PII Extraction:</strong> Before any data is sent to external Large Language Models (LLMs), all Personally Identifiable Information (PII) such as names, policy numbers, and contact details are systematically extracted and scrubbed.</li>
              <li><strong>Secure Local Storage:</strong> PII is strictly stored and processed securely within our localized, compliant environment and paired with session identifiers.</li>
              <li><strong>Anonymized AI Processing:</strong> The LLM is only provided with the unstructured incident description and image metadata. It never has access to the identity of the claimant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Human-in-the-Loop (EU AI Act)
            </h2>
            <p>
              In alignment with the EU AI Act&apos;s requirements for high-risk AI systems, our architecture explicitly incorporates a <strong>Human-in-the-Loop</strong> safeguard.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>Advisory Role:</strong> The AI Agent suggests urgency levels, confidence scores, and summaries, but does not independently execute final claim decisions.</li>
              <li><strong>Mandatory Review:</strong> All automated classifications are queued for mandatory review by a certified human claims adjuster.</li>
              <li><strong>Auditability:</strong> Detailed audit logs of the AI&apos;s reasoning and generated summaries are maintained to ensure complete algorithmic transparency and accountability.</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
