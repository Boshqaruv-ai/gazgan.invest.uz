import { useInvestmentCalc } from '../hooks/useInvestmentCalc';

export function InvestmentCalculator() {
  const {
    amount,
    setAmount,
    sector,
    setSector,
    period,
    setPeriod,
    results,
    sectors,
  } = useInvestmentCalc();

  const annualReturn = results.annual_return_amount;
  const totalReturn = results.total_return;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 sm:mb-8">Interaktiv investitsiya kalkulyatori</h2>
      <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-4 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 sm:mb-6">Parametrlarni kiriting</h3>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-400 text-xs sm:text-sm mb-2">Investitsiya miqdori (USD)</label>
                <input
                  type="range"
                  min="500000"
                  max="20000000"
                  value={amount}
                  step="500000"
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full accent-accent h-2"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span className="text-gray-500">$500K</span>
                  <span className="text-accent font-bold text-base sm:text-lg">${amount.toLocaleString()}</span>
                  <span className="text-gray-500">$20M</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Investitsiya sohasi</label>
                <select
                  value={sector}
                  onChange={(event) => setSector(event.target.value)}
                  className="input-field cursor-pointer"
                >
                  {sectors.map((item) => (
                    <option key={item.value} value={item.value} style={{ backgroundColor: '#1a1a2e', color: '#fff' }}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Investitsiya muddati (yil)</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={period}
                  onChange={(event) => setPeriod(Number(event.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span className="text-gray-500">1 yil</span>
                  <span className="text-accent font-bold">{period} yil</span>
                  <span className="text-gray-500">15 yil</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4 sm:mb-6">Natijalar</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-dark/50 rounded-xl p-4 sm:p-6 border border-accent/10">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm mb-1">Taxminiy ROI</div>
                    <div className="text-xl sm:text-2xl font-bold text-green-400">{results.annual_return_percent.toFixed(0)}%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm mb-1">Qoplash muddati</div>
                    <div className="text-xl sm:text-2xl font-bold text-accent">{results.payback_years} yil</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm mb-1">Yillik daromad</div>
                    <div className="text-lg sm:text-xl font-bold text-accent">${annualReturn.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs sm:text-sm mb-1">Jami daromad</div>
                    <div className="text-lg sm:text-xl font-bold text-green-400">${totalReturn.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="bg-dark/50 rounded-xl p-4 sm:p-6 border border-accent/10">
                <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">Ssenariylar bo&apos;yicha taqqoslash</div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-xs sm:text-sm">Optimistik</span>
                    <span className="text-green-400 font-bold text-sm sm:text-base">{results.scenarios.optimistic.roi}% ROI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-accent text-xs sm:text-sm">Realistik</span>
                    <span className="text-accent font-bold text-sm sm:text-base">{results.scenarios.realistic.roi}% ROI</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400 text-xs sm:text-sm">Pessimistik</span>
                    <span className="text-red-400 font-bold text-sm sm:text-base">{results.scenarios.pessimistic.roi}% ROI</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Hisob-kitoblar dastlabki baholash uchun. Yakuniy moliyaviy shartlar yozma tijoriy taklifda belgilanadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
