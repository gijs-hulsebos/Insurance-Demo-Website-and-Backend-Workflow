import Link from 'next/link';
import { ArrowLeft, PlayCircle, Layers, Image as ImageIcon } from 'lucide-react';

export default function DemoPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 items-center justify-start p-8 min-h-screen">
      <div className="max-w-4xl w-full mt-12 bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-[#00205B] font-medium hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <PlayCircle className="h-10 w-10 text-[#00205B]" />
          <h1 className="text-4xl font-extrabold text-[#00205B]">Demo Details</h1>
        </div>
        
        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p className="text-lg mb-4">
              The front-page demo exhibits our AI-powered visual triage agent simulating a live claim intake. 
              By utilizing multi-modal AI, we can demonstrate how both text and image data are processed simultaneously to reach actionable conclusions faster than traditional methods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="h-6 w-6 text-indigo-600" />
              How the Demo Works
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Pre-loaded Scenarios:</strong> Users can select from various incident types, such as a frontal vehicle collision, utility pole impact, or shattered windshield.</li>
              <li><strong>Live API Inference:</strong> When you click &quot;Submit Claim&quot;, the payload (anonymized) is securely sent to our backend where a generative model assesses the visual damage against the text description.</li>
              <li><strong>Digital Adjuster Report:</strong> The AI produces a structured breakdown including Urgency Level, Confidence Score, and a concise Technical Summary.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="h-6 w-6 text-emerald-600" />
              Image Processing
            </h2>
            <p>
              The images used in the demo are securely fetched via Google Drive integrations. During analysis, they are securely processed in memory. The system demonstrates our ability to evaluate extensive front-end damage, minor scratches, and flat tires in real time without storing claimant imagery permanently on edge nodes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
