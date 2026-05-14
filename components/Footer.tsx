export function Footer() {
  return (
    <footer className="py-8 bg-white border-t border-slate-200 text-center relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
        <p className="text-sm text-slate-500 font-medium">&copy; {new Date().getFullYear()} DEMO Insurance, Inc. All rights reserved.</p>
        <div className="text-xs font-mono text-slate-400">Simulated Environment</div>
      </div>
    </footer>
  );
}
