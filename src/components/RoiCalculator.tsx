import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAudit: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAudit }) => {
  const [teamSize, setTeamSize] = useState<number>(6);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(18);
  const [hourlyWage, setHourlyWage] = useState<number>(45);
  const [errorRate, setErrorRate] = useState<number>(8);

  // Calculations
  const weeklyManualHours = teamSize * hoursPerWeek;
  const annualManualHours = weeklyManualHours * 52;
  const annualDirectLaborCost = annualManualHours * hourlyWage;
  
  // Cost of errors & rework (est. 1.8x labor overhead)
  const annualErrorCost = annualDirectLaborCost * (errorRate / 100) * 1.8;
  const totalAnnualOperationalLoss = Math.round(annualDirectLaborCost + annualErrorCost);
  
  // UpFrama recovers 90% of manual hours and 98% of errors
  const estimatedAnnualSavings = Math.round(totalAnnualOperationalLoss * 0.88);
  const hoursRecovered = Math.round(annualManualHours * 0.90);
  const estimatedPaybackWeeks = Math.max(2, Math.round(12 / (estimatedAnnualSavings / 50000)));

  return (
    <section className="py-20 bg-[#0A0402] relative border-t border-orange-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
            <Calculator className="w-3.5 h-3.5" />
            ROI & COST IMPACT ENGINE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Calculate Your Operations Automation ROI
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-3">
            See how much your company spends on manual re-keying, document sorting, and operational error resolution each year.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-3xl bg-[#120703] border border-orange-500/25 p-6 sm:p-10 shadow-2xl shadow-orange-950/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Side (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-300 font-medium">Operations Team Members</span>
                  <span className="text-orange-400 font-mono font-bold text-base">{teamSize} People</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#220E06] rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>1 person</span>
                  <span>20 people</span>
                  <span>40 people</span>
                </div>
              </div>

              {/* Slider 2: Hours/week per person */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-300 font-medium">Manual Hours / Person / Week</span>
                  <span className="text-amber-400 font-mono font-bold text-base">{hoursPerWeek} hrs/wk</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-[#220E06] rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>4 hrs (light)</span>
                  <span>20 hrs (moderate)</span>
                  <span>40 hrs (heavy entry)</span>
                </div>
              </div>

              {/* Slider 3: Hourly Cost */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-300 font-medium">Avg. Hourly Cost (Loaded Wage)</span>
                  <span className="text-orange-300 font-mono font-bold text-base">${hourlyWage}/hr</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  step="5"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(Number(e.target.value))}
                  className="w-full h-2 bg-[#220E06] rounded-lg appearance-none cursor-pointer accent-orange-400"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>$20/hr</span>
                  <span>$60/hr</span>
                  <span>$120/hr</span>
                </div>
              </div>

              {/* Slider 4: Error Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-300 font-medium">Document / Entry Error Rate</span>
                  <span className="text-rose-400 font-mono font-bold text-base">{errorRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={errorRate}
                  onChange={(e) => setErrorRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#220E06] rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>1% (Low)</span>
                  <span>10% (Average)</span>
                  <span>20% (High friction)</span>
                </div>
              </div>

            </div>

            {/* Calculated Output Card (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#1A0C06] border border-orange-500/30 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-orange-400/80 font-semibold block mb-2">
                  Projected Annual Impact
                </span>

                {/* Big Number Savings */}
                <div className="mt-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 font-display">
                    ${estimatedAnnualSavings.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-stone-400 block mt-1">
                    Est. Annual Cost Reduction
                  </span>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-orange-500/15">
                  <div className="p-3 rounded-xl bg-[#100603] border border-orange-500/20">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      <span>Hours Reclaimed</span>
                    </div>
                    <strong className="text-white font-mono text-base font-bold">
                      {hoursRecovered.toLocaleString()} hrs/yr
                    </strong>
                  </div>

                  <div className="p-3 rounded-xl bg-[#100603] border border-orange-500/20">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                      <span>Payback Period</span>
                    </div>
                    <strong className="text-amber-400 font-mono text-base font-bold">
                      ~{estimatedPaybackWeeks} Weeks
                    </strong>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>Includes 99.4% elimination of manual re-keying</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>Based on actual UpFrama enterprise client averages</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-7 pt-4 border-t border-orange-500/15">
                <button
                  id="roi-claim-savings-btn"
                  onClick={onOpenAudit}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F26522] via-[#FF7A1A] to-[#EA580C] hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Claim Your Free Audit Blueprint</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
