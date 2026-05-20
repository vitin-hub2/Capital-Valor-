/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'motion/react';
import { ChevronLeft, Share2, Clipboard, Heart, Bookmark, Eye, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { articles } from '../data/articles';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
}

export default function ArticleView({ article, onBack, onSelectArticle }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [viewsCount, setViewsCount] = useState(148);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();

  // Increment simulated organic views
  useEffect(() => {
    setViewsCount(Math.floor(Math.random() * 80) + 120);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.id]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback
      alert('Link copiado!');
    });
  };

  // Find related articles (excluding current)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative" id={`article-reader-${article.id}`}>
      
      {/* Scroll indicator bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#111111] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Breadcrumbs / Back button */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors cursor-pointer pointer-events-auto"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar aos Artigos
        </button>

        <span className="font-mono text-xs text-gray-400 capitalize">{article.category} / Leitura Completa</span>
      </div>

      {/* Main Container with Motion */}
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-200 p-6 md:p-10 mb-12"
      >
        {/* Category Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-black font-semibold border border-black px-2.5 py-0.5 bg-gray-50">
            {article.category}
          </span>
          <div className="flex items-center gap-2 font-mono text-[11px] text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {viewsCount} visualizações</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight mb-6">
          {article.title}
        </h1>

        {/* Bio Info Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-gray-100 py-5 mb-8 font-mono text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-[#fafafa] font-serif flex items-center justify-center font-bold text-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-black font-semibold">{article.author}</p>
              <p className="text-[10px] text-gray-400">{article.authorRole}</p>
            </div>
          </div>
          <div className="flex items-start sm:items-end flex-col">
            <p className="text-black">Publicado em {article.date}</p>
            <p className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 mt-0.5">{article.readTime}</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="overflow-hidden border border-gray-200 bg-gray-100 h-[250px] sm:h-[400px] mb-8 relative">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-[#111111]/3 pointer-events-none" />
        </div>

        {/* Sections Content Renderer */}
        <div className="font-serif text-base sm:text-lg text-gray-800 leading-relaxed space-y-6">
          {article.sections.map((section, index) => {
            switch (section.type) {
              case 'paragraph':
                return (
                  <p key={index} className="text-justify font-sans text-sm sm:text-base text-gray-700 leading-relaxed font-light">
                    {section.text}
                  </p>
                );
              case 'heading':
                if (section.headingLevel === 3) {
                  return (
                    <h3 key={index} className="font-serif font-bold text-[#111111] text-lg sm:text-xl pt-4">
                      {section.text}
                    </h3>
                  );
                }
                return (
                  <h2 key={index} className="font-serif font-bold text-[#111111] text-2xl sm:text-3xl pt-6 border-b border-gray-100 pb-2">
                    {section.text}
                  </h2>
                );
              case 'list':
                return (
                  <ul key={index} className="list-disc pl-5 space-y-2.5 font-sans text-xs sm:text-sm text-gray-600">
                    {section.items?.map((item, idy) => {
                      const [strongKey, rest] = item.split(': ');
                      return (
                        <li key={idy} className="leading-relaxed">
                          {rest ? (
                            <>
                              <strong className="text-black">{strongKey}:</strong> {rest}
                            </>
                          ) : (
                            item
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              case 'takeaway':
                return (
                  <div key={index} className="bg-gray-100 border-l-4 border-black p-5 my-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-black font-bold mb-1">
                      Conclusão Prática do Autor
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Actions bar at bottom of article */}
        <div className="border-t border-gray-100 mt-10 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 border rounded-none transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer ${
                liked ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current text-white' : ''}`} />
              {liked ? 'Curtido' : 'Curtir'}
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 border rounded-none transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer ${
                bookmarked ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black bg-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current text-white' : ''}`} />
              {bookmarked ? 'Salvo' : 'Salvar'}
            </button>
          </div>

          <button
            onClick={handleCopyLink}
            className={`p-2 border rounded-none transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer ${
              copied ? 'bg-emerald-600 text-white border-emerald-650' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black bg-white'
            }`}
          >
            {copied ? <Clipboard className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link Copiado!' : 'Compartilhar'}
          </button>
        </div>

      </motion.article>

      {/* Related Content (AdSense friendly - recirculation widget) */}
      <div className="bg-gray-50 border border-gray-200 p-6 md:p-8">
        <h3 className="font-serif text-lg font-bold text-black border-b border-gray-200 pb-3 mb-6 uppercase tracking-wider font-mono text-xs">
          Análises Relacionadas de Educação Financeira
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectArticle(rel.id)}
              className="bg-white border border-gray-200 p-4 hover:border-black cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-1">
                  {rel.category}
                </span>
                <h4 className="font-serif text-base font-bold text-black group-hover:underline line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mt-4 border-t border-gray-50 pt-2">
                <span>Por {rel.author}</span>
                <span className="flex items-center gap-0.5 text-black font-semibold">
                  Ler <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
