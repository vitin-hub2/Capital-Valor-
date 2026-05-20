/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Mail, FileText, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
  setSelectedCategory: (category: string | null) => void;
  onSelectArticle: (articleId: string | null) => void;
}

export default function Footer({
  setActiveView,
  setSelectedCategory,
  onSelectArticle
}: FooterProps) {
  
  const handleFootLink = (viewId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView(viewId);
    onSelectArticle(null);
  };

  const handleCategoryNav = (cat: string | null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView('home');
    setSelectedCategory(cat);
    onSelectArticle(null);
  };

  return (
    <footer className="bg-[#111111] text-[#fafafa] border-t-4 border-[#333333] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-[#222222]">
          
          {/* Coluna 1: Manifesto */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl font-bold tracking-tight mb-4 flex items-center gap-1.5">
              CAPITAL <span className="font-mono font-light text-sm px-1.5 border border-[#fafafa]">&</span> VALOR
            </h3>
            <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-sm">
              Um portal independente dedicado exclusivamente à democratização da educação financeira de alto padrão. Produzimos artigos técnicos fundamentados e ferramentas de simulação gratuitas para que o investidor tome decisões lúcidas, independentes e seguras.
            </p>
          </div>

          {/* Coluna 2: Categorias */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Editórias</h4>
            <ul className="space-y-2 font-mono text-xs text-gray-400">
              {['Investimentos', 'Orçamento', 'Previdência', 'Dívidas'].map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => handleCategoryNav(cat)}
                    className="hover:text-white transition-colors duration-200 cursor-pointer pointer-events-auto"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Institucional (AdSense Keys) */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Institucional</h4>
            <ul className="space-y-2 font-mono text-xs text-gray-400">
              <li>
                <button 
                  onClick={() => handleFootLink('sobre')}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootLink('contato')}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                >
                  Fale Conosco
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootLink('privacidade')}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                >
                  Política de Privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFootLink('termos')}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-left"
                >
                  Termos de Uso
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer de Finanças Obrigatório (CVM compliance style) */}
        <div className="bg-[#181818] border border-[#222222] p-5 mb-8">
          <p className="font-mono text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider mb-2">
            Isenção de Responsabilidade (Disclaimer Legal):
          </p>
          <p className="font-sans text-[11px] text-gray-400 leading-relaxed">
            As análises, notícias, tabelas, simuladores, ferramentas e artigos informativos veiculados no portal <strong>Capital & Valor</strong> destinam-se exclusivamente a propósitos educativos e didáticos. O nosso veículo não fornece conselhos formais sobre portfólios, recomendações proprietárias de compra ou venda de ações e derivativos, nem atua como assessoria de câmbio regulamentada. Investimentos no mercado financeiro (renda fixa, renda variável, ações, fundos imobiliários, títulos públicos e fundos de pensão) envolvem riscos inerentes de perda de patrimônio. Sempre consulte um consultor autorizado pela CVM (Comissão de Valores Mobiliários) ou planejador CFP® certificado para desenhar sua alocação estratégica de ativos de acordo com seu perfil de risco e horizonte temporal pessoal.
          </p>
        </div>

        {/* Linha Final de Direitos Reservados */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-400 pt-6 border-t border-[#222222]">
          <p>&copy; {new Date().getFullYear()} Capital & Valor. Todos os direitos reservados. CNPJ sob auditoria.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Site Seguro SSL</span>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-1.5 border border-gray-600 hover:border-white hover:text-white transition-colors cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
