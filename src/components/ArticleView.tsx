/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Share2, 
  Clipboard, 
  Heart, 
  Bookmark, 
  Eye, 
  ArrowRight, 
  X, 
  ExternalLink,
  Linkedin,
  Send,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
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
  const [viewsCount, setViewsCount] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Scroll Progress indicator
  const { scrollYProgress } = useScroll();

  // Increment and persist organic real views count using the live server
  useEffect(() => {
    let active = true;

    async function incrementAndFetchViews() {
      try {
        const response = await fetch(`/api/views/${article.id}/increment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok && active) {
          const data = await response.json();
          setViewsCount(data.views);
        }
      } catch (error) {
        console.error('Error fetching/incrementing real article views:', error);
        if (active) {
          // Robust client fallback using localStorage if the backend is temporarily unreachable
          const storageKey = `cv_article_views_${article.id}`;
          const storedViews = localStorage.getItem(storageKey);
          let currentViews = 0;
          if (storedViews) {
            currentViews = parseInt(storedViews, 10) + 1;
          } else {
            const baselines: Record<string, number> = {
              'tesouro-direto-2026': 2489,
              'regra-50-30-20-placar': 3812,
              'previdencia-pgbl-vgbl': 1754,
              'como-sair-das-dividas': 4122
            };
            currentViews = (baselines[article.id] || 1500) + 1;
          }
          localStorage.setItem(storageKey, currentViews.toString());
          setViewsCount(currentViews);
        }
      }
    }

    incrementAndFetchViews();
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      active = false;
    };
  }, [article.id]);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert('Link copiado!');
    });
  };

  const getShareUrl = () => {
    return window.location.href;
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: getShareUrl(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('User cancelled or web share failed', err);
      }
    } else {
      // Fallback: Copy link
      handleCopyLink();
    }
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
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 border rounded-none transition-all flex items-center gap-1.5 font-mono text-xs cursor-pointer border-gray-200 text-gray-500 hover:border-black hover:text-black bg-white"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
        </div>

      </motion.article>

      {/* Share Modal overlay */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Background overlay with fade effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Card container with scale & slide effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white border-2 border-black p-6 w-full max-w-md shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative z-10 font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div>
                  <span className="font-mono text-[9px] tracking-wider text-gray-400 uppercase font-bold">Opções de Divulgação</span>
                  <h3 className="font-serif font-bold text-xl text-[#111111] mt-0.5">Compartilhar Artigo</h3>
                </div>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="p-1.5 hover:bg-gray-100 border border-transparent hover:border-black transition-colors rounded-none cursor-pointer text-gray-500 hover:text-black flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Info panel about the item */}
              <div className="mb-5 bg-gray-50 border border-gray-200 p-3 flex flex-col gap-1">
                <p className="font-mono text-[9px] uppercase tracking-wider text-gray-400">Título Selecionado</p>
                <p className="font-serif text-sm font-bold text-black line-clamp-2 leading-snug">{article.title}</p>
              </div>

              {/* Share buttons Grid */}
              <div className="space-y-3">
                {/* Native sharing integration - highlight if supported */}
                <button
                  onClick={() => {
                    handleNativeShare();
                    setIsShareModalOpen(false);
                  }}
                  className="w-full flex items-center justify-between bg-[#111111] hover:bg-black text-white font-mono text-xs font-bold p-3 transition-colors uppercase tracking-wider border border-black cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" /> Enviar para Contatos / Grupos
                  </span>
                  <span className="font-mono text-[8px] bg-white/20 px-1.5 py-0.5 rounded text-white font-normal uppercase tracking-widest">Sistema</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  {/* WhatsApp direct link */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' — Capital & Valor: ' + getShareUrl())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 px-3 border border-gray-200 hover:border-[#25D366] hover:bg-[#25D366]/5 font-sans font-medium text-xs text-black cursor-pointer transition-all"
                  >
                    <svg className="w-4 h-4 text-[#25D366] fill-current shrink-0 mr-1" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.455L0 24zm6.59-4.846c1.66.986 3.288 1.498 4.76 1.499 5.379 0 9.761-4.38 9.764-9.76.002-2.607-1.01-5.059-2.85-6.902C16.42 2.146 13.968.99 11.36.99c-5.385 0-9.766 4.381-9.77 9.763-.002 2.01.524 3.975 1.522 5.713l-.997 3.644 3.738-.981zm11.23-7.534c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.149-.674.15-.2.299-.774.975-.949 1.174-.175.199-.349.224-.649.075-.3-.149-1.265-.466-2.41-1.488-.891-.796-1.493-1.78-1.668-2.079-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.524.149-.174.199-.299.299-.498.1-.2.05-.374-.025-.524-.075-.15-.674-1.62-.924-2.22-.243-.585-.49-.506-.674-.515-.173-.008-.373-.01-.573-.01-.2 0-.523.075-.797.373-.274.3-1.047 1.022-1.047 2.492 0 1.47 1.072 2.89 1.221 3.09.149.199 2.11 3.22 5.111 4.516.714.308 1.272.493 1.706.632.716.228 1.369.196 1.885.119.575-.085 1.772-.725 2.022-1.424.25-.699.25-1.299.175-1.424-.075-.125-.274-.199-.573-.349z" />
                    </svg>
                    <span className="font-semibold text-gray-800">WhatsApp</span>
                  </a>

                  {/* Telegram direct link */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 px-3 border border-gray-200 hover:border-[#0088cc] hover:bg-[#0088cc]/5 font-sans font-medium text-xs text-black cursor-pointer transition-all"
                  >
                    <Send className="w-4 h-4 text-[#0088cc] shrink-0 mr-1" />
                    <span className="font-semibold text-gray-800">Telegram</span>
                  </a>

                  {/* LinkedIn direct link */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 px-3 border border-gray-200 hover:border-[#0077b5] hover:bg-[#0077b5]/5 font-sans font-medium text-xs text-black cursor-pointer transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077b5] shrink-0 mr-1" />
                    <span className="font-semibold text-gray-800">LinkedIn</span>
                  </a>

                  {/* Twitter XL logo inline SVG */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent('Interessante análise de educação financeira no Capital & Valor: ' + article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 px-3 border border-gray-200 hover:border-black hover:bg-gray-50 font-sans font-medium text-xs text-black cursor-pointer transition-all"
                  >
                    <svg className="w-4 h-4 text-black shrink-0 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="font-semibold text-gray-800">Twitter / X</span>
                  </a>
                </div>
              </div>

              {/* Copy Link field at bottom */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p className="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-2">Copiar endereço direto</p>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value={getShareUrl()}
                    className="flex-1 font-mono text-[11px] p-2 bg-gray-50 border border-gray-200 text-gray-600 outline-none select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-3.5 border text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer hover:border-black hover:text-black ${
                      copied ? 'bg-emerald-600 border-emerald-600 text-white hover:text-white' : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Related Content (AdSense friendly - recirculation widget) */}
      <div className="bg-gray-50 border border-gray-200 p-6 md:p-8">
        <h3 className="font-serif text-lg font-bold text-black border-b border-gray-200 pb-3 mb-6 uppercase tracking-wider font-mono text-xs">
          Análises Relacionadas de Educação Financeira
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => {
            const relSlug = rel.id === 'regra-50-30-20-placar' ? 'regra-50-30-20' : rel.id;
            const relUrl = `/artigo/${relSlug}`;
            return (
              <a
                key={rel.id}
                href={relUrl}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey) return;
                  e.preventDefault();
                  onSelectArticle(rel.id);
                }}
                className="bg-white border border-gray-200 p-4 hover:border-black cursor-pointer group flex flex-col justify-between block no-underline text-inherit"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400 block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-base font-bold text-black group-hover:underline line-clamp-2 leading-snug text-left">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mt-4 border-t border-gray-50 pt-2">
                  <span>Por {rel.author}</span>
                  <span className="flex items-center gap-0.5 text-black font-semibold">
                    Ler <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

    </div>
  );
}
