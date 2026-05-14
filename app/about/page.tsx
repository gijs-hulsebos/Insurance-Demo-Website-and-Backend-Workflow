import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col w-full bg-slate-50 items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-[#00205B] mb-6">About Us</h1>
        <p className="text-lg text-slate-600 mb-8">
          The team behind DEMO Insurance is dedicated to revolutionizing claim execution with scalable AI operations.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-[#00205B] font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
