/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Percent, TrendingUp, DollarSign, Wallet, Scale, ArrowRight, HelpCircle } from 'lucide-react';

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<'juros' | 'orcamento'>('juros');

  // Input States for Compound Interest
  const [initialAmount, setInitialAmount] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(10.5);
  const [periodYears, setPeriodYears] = useState<number>(15);

  // Input States for Budget Planner
  const [monthlyIncome, setMonthlyIncome] = useState<number>(5000);

  // Compound Interest Calculation Logic
  const compoundResults = useMemo(() => {
    const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
    const totalMonths = periodYears * 12;
    
    let totalInvested = initialAmount;
    let balance = initialAmount;
    let yearlyData: { year: number; invested: number; total: number; interest: number }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;

      if (month % 12 === 0) {
        const year = month / 12;
        const interestAccumulated = balance - totalInvested;
        yearlyData.push({
          year,
          invested: Math.round(totalInvested),
          total: Math.round(balance),
          interest: Math.round(interestAccumulated)
        });
      }
    }

    const totalInterest = balance - totalInvested;
    // 15% Long Term Brazilian Fixed Income Tax on Interest
    const taxValue = totalInterest * 0.15;
    const netBalance = balance - taxValue;

    return {
      grossTotal: Math.round(balance),
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      estimatedTax: Math.round(taxValue),
      netTotal: Math.round(netBalance),
      yearlySchedule: yearlyData
    };
  }, [initialAmount, monthlyContribution, annualRate, periodYears]);

  // Formatter for Currency
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section className="py-10 max-w-5xl mx-auto px-4 " id="calculadora-financeira">
      
      {/* Mini Title Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-mono text-xs tracking-widest uppercase py-1 px-3 border border-black/10 inline-block bg-[#111111] text-white mb-3">Simuladores</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
          Ferramentas de Planejamento Patrimonial
        </h2>
        <p className="font-sans text-sm text-gray-500 mt-2">
          Calcule a evolução do seu capital no longo prazo de forma simplificada e 100% matemática, sem conflitos de interesse.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b-2 border-black mb-8 justify-center">
        <button
          onClick={() => setActiveTab('juros')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'juros'
              ? 'bg-black text-white font-bold'
              : 'text-gray-500 hover:text-black hover:bg-gray-100'
          }`}
        >
          📈 Juros Compostos
        </button>
        <button
          onClick={() => setActiveTab('orcamento')}
          className={`px-6 py-3 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
            activeTab === 'orcamento'
              ? 'bg-black text-white font-bold'
              : 'text-gray-500 hover:text-black hover:bg-gray-100'
          }`}
        >
          ⚖️ Regra 50 / 30 / 20
        </button>
      </div>

      {/* Tab 1: Juros Compostos */}
      {activeTab === 'juros' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls (Left) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 p-6 flex flex-col gap-5">
            <h3 className="font-serif text-lg font-bold border-b pb-3 text-black">Parâmetros do Cenário</h3>
            
            {/* Input 1: Aporte Inicial */}
            <div>
              <label className="font-mono text-xs text-gray-500 uppercase flex justify-between mb-1">
                <span>Aporte Inicial</span>
                <span className="font-bold text-black">{formatBRL(initialAmount)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="250000"
                step="5000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
                <span>R$ 0</span>
                <span>R$ 100 mil</span>
                <span>R$ 250 mil</span>
              </div>
            </div>

            {/* Input 2: Aporte Mensal */}
            <div>
              <label className="font-mono text-xs text-gray-500 uppercase flex justify-between mb-1">
                <span>Aporte Mensal Recorrente</span>
                <span className="font-bold text-black">{formatBRL(monthlyContribution)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="200"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
                <span>R$ 0</span>
                <span>R$ 5 mil</span>
                <span>R$ 10 mil</span>
              </div>
            </div>

            {/* Input 3: Taxa de Juros Anual */}
            <div>
              <label className="font-mono text-xs text-gray-500 uppercase flex justify-between mb-1">
                <span>Taxa de Juros Anual</span>
                <span className="font-bold text-black">{annualRate}% a.a.</span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
                <span>1% a.a. (Mínimo)</span>
                <span>10,5% a.a. (Selic)</span>
                <span>20% a.a. (Máximo)</span>
              </div>
            </div>

            {/* Input 4: Período em anos */}
            <div>
              <label className="font-mono text-xs text-gray-500 uppercase flex justify-between mb-1">
                <span>Período de Acumulação</span>
                <span className="font-bold text-black">{periodYears} anos</span>
              </label>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={periodYears}
                onChange={(e) => setPeriodYears(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[9px] text-gray-400 mt-1">
                <span>1 ano</span>
                <span>20 anos</span>
                <span>40 anos</span>
              </div>
            </div>

            <div className="text-[11px] font-sans text-gray-400 mt-1 bg-gray-50 p-3 border-l-2 border-black">
              *A simulação desconta uma alíquota hipotética de 15% de imposto de renda sobre a rentabilidade líquida acumulada ao final do período, condizente com a tabela regressiva das corretoras brasileiras para aplicações de longo prazo.
            </div>

          </div>

          {/* Results Display (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Cards Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-white border border-gray-200 p-5 rounded-none flex flex-col">
                <span className="font-mono text-[10px] uppercase text-gray-400">Total Investido</span>
                <span className="font-serif text-xl font-bold mt-1 text-[#111111]">{formatBRL(compoundResults.totalInvested)}</span>
                <span className="font-mono text-[9px] text-gray-400 mt-0.5">Capital próprio poupado</span>
              </div>

              <div className="bg-white border border-gray-200 p-5 rounded-none flex flex-col">
                <span className="font-mono text-[10px] uppercase text-gray-400">Juros Brutos Ganhos</span>
                <span className="font-serif text-xl font-bold mt-1 text-emerald-600">+{formatBRL(compoundResults.totalInterest)}</span>
                <span className="font-mono text-[9px] text-emerald-600/80 mt-0.5">Efeito juros compostos</span>
              </div>

              <div className="bg-black text-[#fafafa] p-5 rounded-none border border-black flex flex-col">
                <span className="font-mono text-[10px] uppercase text-gray-400">Montante Líquido</span>
                <span className="font-serif text-xl font-bold mt-1 text-white">{formatBRL(compoundResults.netTotal)}</span>
                <span className="font-mono text-[9px] text-gray-400 mt-0.5">Já descontado 15% de IR</span>
              </div>

            </div>

            {/* Visual SVG bar comparison with responsive sizes */}
            <div className="bg-white border border-gray-200 p-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-black font-bold mb-4">Composição Gráfica do Patrimônio</h4>
              
              <div className="space-y-4">
                
                {/* Total Invested row */}
                <div>
                  <div className="flex justify-between font-mono text-[11px] mb-1">
                    <span className="text-gray-500">Capital Próprio Aplicado</span>
                    <span className="font-semibold">{formatBRL(compoundResults.totalInvested)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-4">
                    <motion.div 
                      className="bg-gray-400 h-4" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(compoundResults.totalInvested / compoundResults.grossTotal) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>

                {/* Compound Interest earned row */}
                <div>
                  <div className="flex justify-between font-mono text-[11px] mb-1">
                    <span className="text-gray-500">Juros de Rentabilidade Acumulada</span>
                    <span className="font-semibold text-emerald-600">{formatBRL(compoundResults.totalInterest)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-4">
                    <motion.div 
                      className="bg-emerald-600 h-4" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(compoundResults.totalInterest / compoundResults.grossTotal) * 100}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>

              </div>

              {/* Total Summary indicators */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap justify-between gap-4 text-xs font-sans text-gray-500">
                <div>
                  Proporção de Capital Próprio:{' '}
                  <strong className="text-black">
                    {Math.round((compoundResults.totalInvested / compoundResults.grossTotal) * 100)}%
                  </strong>
                </div>
                <div>
                  Proporção de Juros Coletados:{' '}
                  <strong className="text-emerald-600">
                    {Math.round((compoundResults.totalInterest / compoundResults.grossTotal) * 100)}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white border border-gray-200 p-6 overflow-x-auto">
              <h4 className="font-mono text-xs uppercase tracking-wider text-black font-bold mb-3">Cronograma de Crescimento Histórico</h4>
              
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-black pb-2 text-gray-500">
                    <th className="py-2">Ano</th>
                    <th className="py-2">Valor Aplicado</th>
                    <th className="py-2">Juros Acumulados</th>
                    <th className="py-2 text-right">Saldo Bruto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Show Years: 1, maybe 3, 5, 10, periodYears */}
                  {compoundResults.yearlySchedule
                    .filter((d) => d.year === 1 || d.year % 5 === 0 || d.year === periodYears)
                    .map((data) => (
                      <tr key={data.year} className="hover:bg-gray-50">
                        <td className="py-2 font-bold">Ano {data.year}</td>
                        <td className="py-2 text-gray-600">{formatBRL(data.invested)}</td>
                        <td className="py-2 text-emerald-600">+{formatBRL(data.interest)}</td>
                        <td className="py-2 font-semibold text-right">{formatBRL(data.total)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

          </div>
        </motion.div>
      )}

      {/* Tab 2: Regra 50/30/20 */}
      {activeTab === 'orcamento' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls (Left) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 p-6 flex flex-col gap-6">
            <h3 className="font-serif text-lg font-bold border-b pb-3 text-black">Sua Receita Líquida</h3>
            
            <div>
              <label className="font-mono text-xs text-gray-500 uppercase block mb-2">
                Renda Líquida Mensal Integrada (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-gray-400 text-sm">R$</span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                  className="w-full border border-black px-4 py-3 pl-10 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-black rounded-none"
                  placeholder="Ex: 4000"
                />
              </div>
              <p className="font-sans text-[11px] text-gray-400 mt-2 leading-relaxed">
                Insira o valor após todos os descontos em folha (INSS, IRRF). Para profissionais autônomos, insira a média líquida de pró-labore mensal.
              </p>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="font-mono text-[10px] text-gray-400 uppercase block mb-2">Faixas Comuns de Salário:</span>
              <div className="flex flex-wrap gap-2">
                {[2500, 4000, 6000, 10000, 15000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlyIncome(preset)}
                    className={`px-3 py-1 border text-[11px] font-mono cursor-pointer ${
                      monthlyIncome === preset
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                    }`}
                  >
                    {formatBRL(preset)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#fcfcfc] border border-gray-100 p-4 font-sans text-xs text-gray-500 leading-relaxed">
              <strong>Como Funciona:</strong> Warren defende que essa simplicidade evita a procrastinação. Em vez de registrar dezenas de gastos individuais, você monitora apenas se as macrotendências estão batendo seus tetos.
            </div>
          </div>

          {/* Results Breakdown (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="bg-white border border-gray-200 p-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-black font-bold mb-4">Breakdown das Alocações Recomendadas</h4>
              
              <div className="space-y-6">
                
                {/* Necessidades Modulo */}
                <div className="border-l-4 border-black pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-serif font-bold text-base text-black flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-black" /> Necessidades Básicas (50%)
                    </span>
                    <span className="font-mono text-sm font-bold text-black">{formatBRL(monthlyIncome * 0.5)}</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 mb-2 leading-normal">
                    Moradia, alimentação do mercado, combustível/passagem, farmácia, contas de água, energia elétrica e convênio básico de saúde.
                  </p>
                  <div className="w-full bg-gray-100 h-2">
                    <div className="bg-black h-2" style={{ width: '50%' }} />
                  </div>
                </div>

                {/* Desejos Modulo */}
                <div className="border-l-4 border-gray-400 pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-serif font-bold text-base text-gray-700 flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-gray-600" /> Estilo de Vida & Lazer (30%)
                    </span>
                    <span className="font-mono text-sm font-bold text-gray-700">{formatBRL(monthlyIncome * 0.3)}</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 mb-2 leading-normal">
                    Jantares fora, cinema, viagens de fim de semana, serviços de streaming, bares, academias, hobbies ativos e vestuário não emergencial.
                  </p>
                  <div className="w-full bg-gray-100 h-2">
                    <div className="bg-gray-400 h-2" style={{ width: '30%' }} />
                  </div>
                </div>

                {/* Investimentos Modulo */}
                <div className="border-l-4 border-emerald-600 pl-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="font-serif font-bold text-base text-emerald-700 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" /> Poupança & Investimentos (20%)
                    </span>
                    <span className="font-mono text-sm font-bold text-emerald-700">{formatBRL(monthlyIncome * 0.2)}</span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 mb-2 leading-normal">
                    Reservas de emergência remuneradas, planos de previdência para aposentadoria, amortizações forçadas de dívidas ativas e aportes diretos na bolsa de valores.
                  </p>
                  <div className="w-full bg-gray-100 h-2">
                    <div className="bg-emerald-600 h-2" style={{ width: '20%' }} />
                  </div>
                </div>

              </div>
            </div>

            {/* Strategic Checklist Action Items */}
            <div className="bg-black text-[#fafafa] p-6">
              <h4 className="font-serif text-[15px] font-bold text-white mb-3">Plano de Direcionamento Imediato</h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed mb-4">
                Com base na sua renda líquida mensal de <strong>{formatBRL(monthlyIncome)}</strong>, eis a escala prioritária de execução:
              </p>
              
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Automatize <strong className="text-white">{formatBRL(monthlyIncome * 0.2)}</strong> diretamente no recebimento para investimentos seguros (como o Tesouro Selic), assegurando seu patrimônio.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    O seu limite absoluto para aluguel, condomínio e contas fixas somadas nunca deve passar de <strong className="text-white">{formatBRL(monthlyIncome * 0.5)}</strong> para evitar estresse financeiro crônico.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    Restrinja seus aplicativos de delivery e jantares de estilo de vida a no máximo <strong className="text-white">{formatBRL(monthlyIncome * 0.3)}</strong> por período.
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </motion.div>
      )}

    </section>
  );
}
