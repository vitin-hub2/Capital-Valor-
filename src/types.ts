/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CategoryType = 'Investimentos' | 'Orçamento' | 'Previdência' | 'Dívidas';

export interface ArticleSection {
  type: 'paragraph' | 'heading' | 'list' | 'takeaway';
  text?: string;
  items?: string[];
  headingLevel?: 2 | 3;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  sections: ArticleSection[];
  image: string;
  category: CategoryType;
  date: string;
  author: string;
  authorRole: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  consentsToTerms: boolean;
}
