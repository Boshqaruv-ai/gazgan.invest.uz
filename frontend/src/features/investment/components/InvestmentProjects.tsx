import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface Project {
  id: string;
  name: string;
  amount: number;
  roi: number;
  payback: number;
  description: string;
}

const investments: Project[] = [
  {
    id: 'granit-processing',
    name: 'Granit qayta ishlash sexi',
    amount: 5000000,
    roi: 25,
    payback: 4,
    description: 'Granit plitka va bloklarni qayta ishlash uchun ishlab chiqarish ssenariysi.',
  },
  {
    id: 'marble-processing',
    name: 'Marmar qayta ishlash sexi',
    amount: 4000000,
    roi: 22,
    payback: 5,
    description: 'Marmar plitka va dekorativ mahsulotlar ishlab chiqarish ssenariysi.',
  },
  {
    id: 'quarry-development',
    name: 'Kon ochish',
    amount: 8000000,
    roi: 30,
    payback: 3,
    description: "Yangi kon yo'nalishini rivojlantirish uchun dastlabki baholash.",
  },
  {
    id: 'souvenir-factory',
    name: 'Suvenir fabrikasi',
    amount: 1500000,
    roi: 30,
    payback: 3,
    description: 'Marmar va granitdan kichik dekorativ buyumlar ishlab chiqarish ssenariysi.',
  },
];

export function InvestmentProjects() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-2">Investitsiya ssenariylari</h2>
      <p className="text-gray-500 mb-8">Miqdor va ROI ko&apos;rsatkichlari taxminiy. Tijoriy taklif kontakt so&apos;rovidan keyin tayyorlanadi.</p>
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-8">
        {investments.map((project) => (
          <Card key={project.id} hover>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{project.name}</h3>
                <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  ~{project.roi}% ROI
                </span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{project.description}</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-3 sm:mb-4">
                <div>
                  <div className="text-base sm:text-lg font-bold text-accent">${(project.amount / 1000000).toFixed(1)}M</div>
                  <div className="text-gray-500 text-xs">Miqdor</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-green-400">{project.roi}%</div>
                  <div className="text-gray-500 text-xs">Taxminiy ROI</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-accent">{project.payback} yil</div>
                  <div className="text-gray-500 text-xs">Qoplash</div>
                </div>
              </div>
              <Link href={`/investment/${project.id}`}>
                <Button className="w-full text-sm sm:text-base py-2 sm:py-3">Batafsil -&gt;</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
