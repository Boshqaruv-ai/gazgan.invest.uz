import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-primary border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">G&apos;</span>
              </div>
              <div>
                <span className="text-white font-bold text-lg">G&apos;ozg&apos;on</span>
                <span className="text-accent text-xs block -mt-1">Invest Portal</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Marmar, granit, konlar va taxminiy investitsiya ssenariylari bo&apos;yicha MVP portal.
            </p>
          </div>

          <div>
            <h4 className="text-accent font-semibold mb-4">Sahifalar</h4>
            <ul className="space-y-2">
              <li><Link href="/quarries" className="text-gray-400 hover:text-accent text-sm">Konlar</Link></li>
              <li><Link href="/production" className="text-gray-400 hover:text-accent text-sm">Ishlab chiqarish</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-accent text-sm">Mahsulotlar</Link></li>
              <li><Link href="/investment" className="text-gray-400 hover:text-accent text-sm">Investitsiya</Link></li>
              <li><Link href="/about#contact" className="text-gray-400 hover:text-accent text-sm">Aloqa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-semibold mb-4">Aloqa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Navoiy viloyati, G&apos;ozg&apos;on shahri</li>
              <li>+998 79 123 45 67</li>
              <li>info@gazgan.uz</li>
            </ul>
          </div>

          <div>
            <h4 className="text-accent font-semibold mb-4">MVP holati</h4>
            <p className="text-gray-400 text-sm">
              Hozircha portal katalog, kalkulyator, AI chat va email orqali so&apos;rov qabul qilishga qaratilgan.
            </p>
          </div>
        </div>

        <div className="border-t border-accent/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 G&apos;ozg&apos;on Investitsion Portali. Barcha huquqlar himoyalangan. | Dastur muallifi: Nurmurodov Damir</p>
        </div>
      </div>
    </footer>
  );
}
