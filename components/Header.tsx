import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#00205B]">
            Insurance Demo
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {[
            { name: 'Product', path: '/product' },
            { name: 'Integrations', path: '/integrations' },
            { name: 'Demo', path: '/demo' },
            { name: 'Security', path: '/security' }
          ].map((item) => (
            <Link key={item.name} href={item.path} className="text-sm font-medium text-slate-600 hover:text-[#00205B] transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="/#claim-form" className="inline-flex rounded-md bg-[#00205B] px-5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#00205B] focus:ring-offset-2">
            Claim Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
