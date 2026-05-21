/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Calendar } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: () => void;
  isFeatured?: boolean;
}

export default function ArticleCard({ article, onSelect, isFeatured = false }: ArticleCardProps) {
  
  const slug = article.id === 'regra-50-30-20-placar' ? 'regra-50-30-20' : article.id;
  const articleUrl = `/artigo/${slug}`;

  const handleCardClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) {
      return;
    }
    e.preventDefault();
    onSelect();
  };

  const cardVariants = {
    hover: {
      y: -6,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.04,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  if (isFeatured) {
    return (
      <motion.a
        href={articleUrl}
        onClick={handleCardClick}
        variants={cardVariants}
        whileHover="hover"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-2 border-black bg-white p-6 md:p-8 cursor-pointer select-none relative group block no-underline text-inherit"
        id={`featured-card-${article.id}`}
      >
        {/* Absolute Ribbon for Featured tag */}
        <span className="absolute top-0 left-6 -translate-y-1/2 bg-black text-[#fafafa] font-mono text-[10px] tracking-widest uppercase px-3 py-1">
          ★ Destaque Editorial
        </span>

        {/* Big Image Frame (Left on lg screens) */}
        <div className="lg:col-span-7 overflow-hidden border border-black bg-gray-50 aspect-video md:aspect-[16/9] relative">
          <motion.img
            src={article.image}
            alt={article.title}
            variants={imageVariants}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Text Area (Right on lg screens) */}
        <div className="lg:col-span-5 flex flex-col justify-between py-1">
          <div>
            {/* Category Tag */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10px] font-mono text-black font-semibold border border-black px-2 py-0.5 uppercase bg-gray-50">
                {article.category}
              </span>
              <span className="text-xs font-mono text-gray-400">&bull;&nbsp; {article.readTime}</span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] leading-tight mb-4 group-hover:underline">
              {article.title}
            </h3>

            {/* Abstract */}
            <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">
              {article.summary}
            </p>
          </div>

          {/* Author footer */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between font-mono text-xs text-gray-400 font-normal">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black text-white font-serif flex items-center justify-center font-bold text-xs">
                {article.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-black font-semibold">{article.author}</p>
                <p className="text-[10px]">{article.authorRole}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-black font-semibold">{article.date}</p>
              <p className="text-[10px] uppercase tracking-wider flex items-center gap-1 justify-end">
                Ler Análise <BookOpen className="w-3.5 h-3.5" />
              </p>
            </div>
          </div>

        </div>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={articleUrl}
      onClick={handleCardClick}
      variants={cardVariants}
      whileHover="hover"
      className="border border-gray-200 bg-white p-5 flex flex-col justify-between cursor-pointer select-none group h-full block no-underline text-inherit"
      id={`article-card-${article.id}`}
    >
      <div>
        {/* Small Image Frame */}
        <div className="overflow-hidden border border-gray-100 bg-gray-50 aspect-video mb-4 relative">
          <motion.img
            src={article.image}
            alt={article.title}
            variants={imageVariants}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
          />
          {article.trending && (
            <span className="absolute top-2 left-2 bg-[#111111] text-white font-mono text-[9px] tracking-widest uppercase px-2 py-0.5">
              ✦ Tendência
            </span>
          )}
        </div>

        {/* Category Details */}
        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-left">
          <span className="text-black font-bold uppercase">{article.category}</span>
          <span className="text-gray-300">|</span>
          <span className="text-gray-400">{article.readTime}</span>
        </div>

        {/* Headline */}
        <h3 className="font-serif text-lg font-bold text-[#111111] tracking-tight leading-snug mb-3 group-hover:underline text-left">
          {article.title}
        </h3>

        {/* Abstract */}
        <p className="font-sans text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 text-left">
          {article.summary}
        </p>
      </div>

      {/* Author Footer */}
      <div className="border-t border-gray-50 pt-3 flex items-center justify-between font-mono text-[10px] text-gray-400 mt-2">
        <span className="text-black font-semibold">{article.author}</span>
        <span className="flex items-center gap-1 hover:text-black">
          Ler Artigo <BookOpen className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.a>
  );
}
