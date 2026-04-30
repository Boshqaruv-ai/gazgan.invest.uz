import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark">
      <div className="section-shell py-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-lg font-black text-dark">G</div>
              <div>
                <span className="block text-lg font-bold tracking-tight text-copy">Gozgon Invest</span>
                <span className="-mt-0.5 block text-xs text-accent">Marble & Granite Platform</span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted">
              Marmar, granit, konlar va investitsiya loyihalari bo‘yicha premium platforma.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-copy">Sahifalar</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/quarries" className="hover:text-accent">Konlar</Link></li>
              <li><Link href="/production" className="hover:text-accent">Ishlab chiqarish</Link></li>
              <li><Link href="/products" className="hover:text-accent">Mahsulotlar</Link></li>
              <li><Link href="/investment" className="hover:text-accent">Investitsiya</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-copy">Aloqa</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Navoiy viloyati, G‘ozg‘on shahri</li>
              <li>+998 79 123 45 67</li>
              <li>info@gazgan.uz</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-copy">Investorlar uchun</h4>
            <p className="mt-4 text-sm leading-6 text-muted">
              ROI ssenariylari, mahsulot katalogi, kon ma’lumotlari va lead capture oqimi.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-7 text-sm text-muted">
          © 2026 Gozgon Invest Platform
        </div>
      </div>
    </footer>
  );
}
