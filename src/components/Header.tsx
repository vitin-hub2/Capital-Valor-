/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, ArrowDownRight, Newspaper, Percent, ShieldCheck, Mail } from 'lucide-react';
import { marketIndices } from '../data/articles';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  onSelectArticle: (articleId: string | null) => void;
}

export default function Header({
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  onSelectArticle
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Artigos & Análises', icon: Newspaper },
    { id: 'calculadoras', label: 'Simuladores Gratuitos', icon: Percent },
    { id: 'sobre', label: 'Quem Somos', icon: ShieldCheck },
    { id: 'contato', label: 'Fale Conosco', icon: Mail }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, viewId: string) => {
    e.preventDefault();
    setActiveView(viewId);
    onSelectArticle(null); // Reset reading article
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName: string | null) => {
    setActiveView('home');
    onSelectArticle(null);
    setSelectedCategory(categoryName);
  };

  return (
    <header className="w-full bg-[#fafafa] border-b-2 border-[#111111] sticky top-0 z-50">
      {/* Ticker de Índices Financeiros - Estilo Painel da Bolsa de Valores */}
      <div className="w-full bg-[#111111] text-[#fafafa] py-1.5 text-xs overflow-hidden border-b border-[#333333] hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 border-r border-[#333333] pr-4 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-wider text-gray-400 uppercase">Indicadores Financeiros (Tempo Real)</span>
          </div>
          
          <div className="overflow-hidden relative w-full flex items-center">
            <motion.div 
              className="flex items-center gap-8 pl-4 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear"
              }}
            >
              {/* Duplicate metrics to create non-blocking seamless loop */}
              {[...marketIndices, ...marketIndices].map((index, i) => (
                <div key={i} className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-gray-400">{index.name}:</span>
                  <span className="font-semibold">{index.value}</span>
                  <span className={`flex items-center text-[10px] ${index.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {index.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 inline" /> : <ArrowDownRight className="w-3.5 h-3.5 inline" />}
                    {index.change}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Título Principal Editorial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo Monocromática com Letra Grande Estilo Gazeta */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            setActiveView('home');
            onSelectArticle(null);
          }} 
          className="text-center md:text-left cursor-pointer select-none block no-underline"
        >
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-gray-500 block mb-0.5">Educação Financeira Isenta</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] flex items-center justify-center md:justify-start gap-1">
            CAPITAL <span className="font-mono font-light text-xl sm:text-2xl border-x px-2 border-[#111111]">&</span> VALOR
          </h1>
        </a>

        {/* Informações Adcionais AdSense Compliance */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-gray-400">
          <div className="text-right border-r border-gray-200 pr-4">
            <p className="font-semibold text-gray-800">COBERTURA NACIONAL</p>
            <p>Economia Brasileira</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-800">CFP® & ADVISORS</p>
            <p>100% Livre de Conflitos</p>
          </div>
        </div>
      </div>

      {/* Menu Navigation + Categories bar */}
      <div className="border-t border-[#111111] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const itemHref = item.id === 'home' ? '/' : `/${item.id}`;
              return (
                <a
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  href={itemHref}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 pointer-events-auto cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#fafafa] font-bold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:bg-gray-100"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Quick Categories Bar (Only on Home view) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 max-w-full">
            <span className="text-xs font-mono text-gray-400 mr-2 uppercase hidden sm:inline select-none shrink-0 border-r pr-2 my-auto">Filtros:</span>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider rounded-none shrink-0 cursor-pointer ${
                selectedCategory === null && activeView === 'home'
                  ? 'border border-[#111111] font-bold bg-[#111111] text-white'
                  : 'border border-gray-200 text-gray-500 hover:border-black hover:text-black bg-[#fafafa]'
              }`}
            >
              Todos
            </button>
            {['Investimentos', 'Orçamento', 'Previdência', 'Dívidas'].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider rounded-none shrink-0 cursor-pointer ${
                  selectedCategory === category && activeView === 'home'
                    ? 'border border-[#111111] font-bold bg-[#111111] text-white'
                    : 'border border-gray-200 text-gray-500 hover:border-black hover:text-black bg-[#fafafa]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-[#111111] bg-[#fafafa] py-2 px-4 shadow-md absolute w-full left-0 z-40"
        >
          <div className="flex flex-col gap-2 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              const itemHref = item.id === 'home' ? '/' : `/${item.id}`;
              return (
                <a
                  key={item.id}
                  href={itemHref}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest text-left w-full ${
                    isActive ? 'bg-[#111111] text-[#fafafa] font-bold' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
}
