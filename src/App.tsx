/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { articles } from './data/articles';
import Header from './components/Header';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import ArticleCard from './components/ArticleCard';
import ArticleView from './components/ArticleView';
import { 
  SobreNos, 
  ContatoForm, 
  PoliticaPrivacidade, 
  TermosDeUso 
} from './components/Institutional';
import { Sparkles, ArrowRight, HelpCircle, GraduationCap, Coins } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  // Parse initial paths or params on load and popstate
  useEffect(() => {
    const handleUrlRouting = () => {
      const pathname = window.location.pathname;
      const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
      
      const validViews = ['home', 'calculadoras', 'sobre', 'contato', 'privacidade', 'termos'];

      if (!cleanPath) {
        setActiveView('home');
        setSelectedArticleId(null);
        return;
      }

      // 1. Check article paths e.g. /artigo/regra-50-30-20 or /artigo/tesouro-direto-2026
      if (cleanPath.startsWith('artigo/')) {
        const slug = cleanPath.substring(7);
        const articleId = slug === 'regra-50-30-20' ? 'regra-50-30-20-placar' : slug;
        if (articles.some(a => a.id === articleId)) {
          setActiveView('home');
          setSelectedArticleId(articleId);
          return;
        }
      }

      // 2. Check clear institutional views
      if (validViews.includes(cleanPath)) {
        setActiveView(cleanPath);
        setSelectedArticleId(null);
        return;
      }

      // 3. Check bare paths matching an article slug directly e.g. /regra-50-30-20 or /tesouro-direto-2026
      const possibleArticleId = cleanPath === 'regra-50-30-20' ? 'regra-50-30-20-placar' : cleanPath;
      if (articles.some(a => a.id === possibleArticleId)) {
        setActiveView('home');
        setSelectedArticleId(possibleArticleId);
        return;
      }

      // 4. Backwards compatibility fallback for query params (?view= or ?article=)
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const articleParam = params.get('article');

      if (articleParam) {
        const targetId = articleParam === 'regra-50-30-20' ? 'regra-50-30-20-placar' : articleParam;
        if (articles.some(a => a.id === targetId)) {
          setActiveView('home');
          setSelectedArticleId(targetId);
          return;
        }
      }

      if (viewParam && validViews.includes(viewParam)) {
        setActiveView(viewParam);
        setSelectedArticleId(null);
        return;
      }

      // Fallback
      setActiveView('home');
      setSelectedArticleId(null);
    };

    handleUrlRouting();

    window.addEventListener('popstate', handleUrlRouting);
    return () => window.removeEventListener('popstate', handleUrlRouting);
  }, []);

  // Synchronize state changes to clean paths URLs
  useEffect(() => {
    let targetPath = '/';
    if (selectedArticleId) {
      const slug = selectedArticleId === 'regra-50-30-20-placar' ? 'regra-50-30-20' : selectedArticleId;
      targetPath = `/artigo/${slug}`;
    } else if (activeView !== 'home') {
      targetPath = `/${activeView}`;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ activeView, selectedArticleId }, '', targetPath);
    }
  }, [activeView, selectedArticleId]);

  // Memoized filter for articles
  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles;
    return articles.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  // Find currently read article
  const currentReadingArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find(a => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Determine featured vs standard list
  const { featuredArticle, remainingArticles } = useMemo(() => {
    if (selectedCategory) {
      // If filtered, don't separate featured prominently, just show standard cards
      return { featuredArticle: null, remainingArticles: filteredArticles };
    }
    const featured = articles.find(a => a.featured) || articles[0];
    const remaining = articles.filter(a => a.id !== featured.id);
    return { featuredArticle: featured, remainingArticles: remaining };
  }, [selectedCategory, filteredArticles]);

  const handleSelectArticleId = (id: string | null) => {
    setSelectedArticleId(id);
    if (id) {
      // Ensure we scroll to the top of the article
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const transitionConfig = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.4, ease: 'easeOut' }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] flex flex-col font-sans selection:bg-[#111111] selection:text-[#fafafa] antialiased">
      
      {/* Header Controller */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSelectArticle={handleSelectArticleId}
      />

      {/* Main Layout Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <AnimatePresence mode="wait">
          
          {/* VIEW: HOME / BLOG */}
          {activeView === 'home' && (
            <motion.div key="home" {...transitionConfig} className="space-y-12">
              
              {currentReadingArticle ? (
                /* Full Screen Article Reader */
                <ArticleView
                  article={currentReadingArticle}
                  onBack={() => handleSelectArticleId(null)}
                  onSelectArticle={handleSelectArticleId}
                />
              ) : (
                /* Landing News Feed */
                <div className="space-y-12">
                  
                  {/* Hero Intro Widget */}
                  <div className="border-b-2 border-black pb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8">
                      <span className="font-mono text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                        <GraduationCap className="w-4 h-4 text-black" /> Portal de Práticas e Conceituação Financeira
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-[#111111]">
                        Construindo Liberdade e Decisões Seguras
                      </h2>
                      <p className="font-sans text-sm sm:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed font-light">
                        Explore nosso feed técnico e use simuladores profissionais gratuitos. Oferecemos clareza matemática livre de opiniões comerciais ou conflitos, ajudando você a estruturar seu patrimônio com seriedade.
                      </p>
                    </div>
                    <div className="md:col-span-4 bg-white border border-gray-200 p-5 flex flex-col justify-between h-full">
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-black animate-pulse" /> SIMULADOR EM ALTA
                      </span>
                      <h3 className="font-serif font-bold text-base text-black mt-2 leading-tight">
                        Cálculo de Juros Compostos & IR Regressivo
                      </h3>
                      <p className="font-sans text-[11px] text-gray-500 mt-1 mb-4 leading-normal">
                        Preveja com precisão centavos de retorno projetando deduções regulatórias do Brasil.
                      </p>
                      <a
                        href="/calculadoras"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveView('calculadoras');
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="w-full bg-[#111111] hover:bg-black text-white font-mono text-[10px] uppercase py-2 tracking-widest text-center cursor-pointer block no-underline"
                      >
                        Acessar Simulador &rarr;
                      </a>
                    </div>
                  </div>

                  {/* SPOTLIGHT FEATURED PIECE - Rendered only when looking at ALL CATEGORIES */}
                  {featuredArticle && (
                    <div className="space-y-6">
                      <span className="font-mono text-xs uppercase tracking-wider text-gray-500 block border-l-2 border-black pl-2">
                        Análise de Destaque
                      </span>
                      <ArticleCard
                        article={featuredArticle}
                        onSelect={() => handleSelectArticleId(featuredArticle.id)}
                        isFeatured={true}
                      />
                    </div>
                  )}

                  {/* REST OF FEED IN 2 OR 3 COLUMNS */}
                  <div className="space-y-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-gray-500 block border-l-2 border-black pl-2">
                      {selectedCategory ? `Artigos em ${selectedCategory}` : 'Outras Publicações Recentes'}
                    </span>
                    
                    {remainingArticles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {remainingArticles.map((art) => (
                          <div key={art.id}>
                            <ArticleCard
                              article={art}
                              onSelect={() => handleSelectArticleId(art.id)}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-gray-200 bg-white p-12 text-center">
                        <p className="font-serif text-lg text-gray-500">Nenhum artigo encontrado para esta categoria.</p>
                      </div>
                    )}
                  </div>

                  {/* Recirculation Promo Banner (Improving session duration - AdSense value!) */}
                  <div className="bg-[#111111] text-[#fafafa] p-6 md:p-10 border border-black grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8">
                      <span className="text-[10px] bg-white text-black font-mono font-bold tracking-widest px-2.5 py-0.5 uppercase">
                        Ferramentas Práticas
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#111111] mt-4">
                        Organize seu orçamento familiar em menos de 2 minutos
                      </h3>
                      <p className="font-sans text-xs text-gray-400 mt-2 max-w-xl leading-relaxed">
                        Esqueça planilhas hiper complexas e cansativas. Descubra como fragmentar suas receitas líquidas mensais com a régua estratégica dos 50/30/20 em nossa ferramenta dedicada.
                      </p>
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                      <a
                        href="/calculadoras"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveView('calculadoras');
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="bg-white text-black hover:bg-gray-100 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 w-full md:w-auto text-center justify-center cursor-pointer block no-underline"
                      >
                        Descobrir Simulador <ArrowRight className="w-4 h-4 inline" />
                      </a>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* VIEW: CALCULADORAS */}
          {activeView === 'calculadoras' && (
            <motion.div key="calculadoras" {...transitionConfig}>
              <Calculator />
            </motion.div>
          )}

          {/* VIEW: SOBRE NÓS */}
          {activeView === 'sobre' && (
            <motion.div key="sobre" {...transitionConfig}>
              <SobreNos />
            </motion.div>
          )}

          {/* VIEW: CONTATO */}
          {activeView === 'contato' && (
            <motion.div key="contato" {...transitionConfig}>
              <ContatoForm />
            </motion.div>
          )}

          {/* VIEW: PRIVACIDADE */}
          {activeView === 'privacidade' && (
            <motion.div key="privacidade" {...transitionConfig}>
              <PoliticaPrivacidade />
            </motion.div>
          )}

          {/* VIEW: TERMOS */}
          {activeView === 'termos' && (
            <motion.div key="termos" {...transitionConfig}>
              <TermosDeUso />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Controller */}
      <Footer 
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
        onSelectArticle={handleSelectArticleId}
      />

    </div>
  );
}
