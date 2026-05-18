import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Cpu, Cloud, Code, GitMerge, AlertCircle, Database, Github } from 'lucide-react';
import { ZoomableImage } from '@/components/ZoomableImage';

export default function IntegrationsPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 items-center justify-start p-8 min-h-screen">
      <div className="max-w-4xl w-full mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00205B] font-medium hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className="text-4xl font-extrabold text-[#00205B] mb-6">Integrations & Architecture</h1>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code className="h-6 w-6 text-indigo-600" />
              Core Tech Stack
            </h2>
            <p className="mb-2">The application is built on modern, scalable web technologies:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Frontend:</strong> Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Motion (Framer Motion).</li>
              <li><strong>Deployment:</strong> Hosted and deployed seamlessly via <strong>Vercel</strong> for optimal global edge performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Cloud className="h-6 w-6 text-sky-600" />
              Automation with N8N
            </h2>
            <p className="mb-6">
              We utilize <strong>n8n</strong>, a powerful workflow automation tool, to orchestrate complex backend logic. This enables seamless connection between the AI inference layer, our internal tool functions, and destination data sinks.
            </p>
            <ZoomableImage 
              src="https://raw.githubusercontent.com/gijs-hulsebos/n8n-automation/main/Insurance-Demo/Image%2017-05-2026%20at%2020.43.jpeg" 
              alt="n8n Automation Workflow" 
            />
            <a 
              href="https://github.com/gijs-hulsebos/n8n-automation/tree/main/Insurance-Demo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              <Github className="h-4 w-4" /> View GitHub Repository
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-emerald-600" />
              RAG & Data Sinks
            </h2>
            <p>
              Knowledge retrieval and storage are powered by <strong>Google Sheets</strong> acting as a lightweight, highly accessible database constraint for demonstration. 
              Implementing Retrieval-Augmented Generation (RAG) allows the AI to reference historical claim patterns directly from the Sheets data without retraining.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-orange-500" />
              Error Handling & Risk Routes
            </h2>
            <p>
              Robust error boundaries and explicit <strong>Risk Routes</strong> are defined to catch anomalies. 
              If the LLM returns unstructured text instead of requested JSON, or if the confidence score drops below the established threshold, the system triggers a fallback route, automatically assigning highest manual review precedence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Cpu className="h-6 w-6 text-purple-600" />
              Tool Functions
            </h2>
            <p>
              The AI Agent is equipped with specific <strong>Tool Functions</strong> (function calling). Instead of just predicting text, it can programmatically invoke structured commands to fetch policy details, query the Google Sheets database, or trigger a risk escalation webhook in n8n.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
