/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, MarketIndex } from '../types';

// Real-world Brazilian financial indices for 2026
export const marketIndices: MarketIndex[] = [
  { symbol: 'IBOV', name: 'Ibovespa', value: '128.450 pts', change: '+0,82%', isPositive: true },
  { symbol: 'DOL', name: 'Dólar Comercial', value: 'R$ 5,12', change: '-0,34%', isPositive: false },
  { symbol: 'EUR', name: 'Euro', value: 'R$ 5,54', change: '-0,19%', isPositive: false },
  { symbol: 'SELIC', name: 'Taxa Selic', value: '10,50% a.a.', change: 'Estável', isPositive: true },
  { symbol: 'CDI', name: 'CDI Over', value: '10,40% a.a.', change: '+0,05%', isPositive: true },
  { symbol: 'IPCA', name: 'IPCA (Anual)', value: '3,85%', change: '+0,12%', isPositive: false }
];

export const articles: Article[] = [
  {
    id: 'tesouro-direto-2026',
    title: 'Tesouro Direto em 2026: Guia de Rentabilidade, Cenário Macroeconômico e Estratégias',
    summary: 'Uma análise de especialistas sobre os títulos do Tesouro Nacional brasileiro. Entenda qual papel escolher para proteger seu poder de compra contra a inflação e garantir renda passiva de longo prazo.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    category: 'Investimentos',
    date: '15 de Maio de 2026',
    author: 'André Valdetaro',
    authorRole: 'Analista de Renda Fixa & Planejador CFP®',
    readTime: '6 min de leitura',
    featured: true,
    sections: [
      {
        type: 'paragraph',
        text: 'O cenário econômico no Brasil em 2026 dita taxas de juros em patamares estáveis, porém o investidor inteligente precisa se atentar aos efeitos da inflação real. É nesse contexto que o Tesouro Direto consolida-se como o instrumento mais seguro e democrático de acumulação de riqueza. Criado em 2002 pelo Tesouro Nacional em parceria com a B3, ele permite que pessoas físicas comprem papéis da dívida pública federal de forma 100% digital.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: '1. Classificação dos Títulos: Onde Alocar Seu Capital?'
      },
      {
        type: 'paragraph',
        text: 'Existem três principais dinâmicas de remuneração no Tesouro Direto. Conhecer a diferença é vital para evitar perdas geradas pela marcação a mercado:'
      },
      {
        type: 'list',
        items: [
          'Tesouro Selic (Pós-fixado): Ideal para reserva de emergência e objetivos de curto prazo. Ele acompanha de perto a taxa básica de juros (Selic) e não sofre prejuízos em caso de resgates antecipados devido à extrema liquidez.',
          'Tesouro IPCA+ (Híbrido): O melhor amigo de quem planeja a aposentadoria ou a compra de imóveis no longo prazo. Ele paga uma taxa prefixada mais a oscilação da inflação medida pelo IPCA, garantindo sempre ganho real.',
          'Tesouro Prefixado: Recomendado se você acredita que a taxa de juros futura vai cair mais do que as expectativas do mercado. Permite saber de antemão exatamente quanto receberá no vencimento.'
        ]
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: '2. Custos e Tributação Incidindo sobre Seus Títulos'
      },
      {
        type: 'paragraph',
        text: 'A rentabilidade divulgada nas plataformas é bruta. Para calcular o ganho real líquido, lembre-se da cobrança do Imposto de Renda regressivo sobre os rendimentos: 22,5% para aplicações de até 180 dias; 20% de 181 a 360 dias; 17,5% de 361 a 720 dias; e 15% para investimentos acima de 720 dias. Além do IR, a B3 cobra uma taxa de custódia anual de 0,20% sobre o montante acumulado que ultrapassar R$ 10.000,00 no Tesouro Selic.'
      },
      {
        type: 'takeaway',
        text: 'Conselho do Consultor: Em 2026, com o IPCA estabilizado na faixa de 3,8%, papéis IPCA+ com prêmios superiores a 5,8% ao ano representam excelentes oportunidades reais de ganho patrimonial imune ao ruído fiscal brasileiro.'
      },
      {
        type: 'heading',
        headingLevel: 3,
        text: '3. O Fenômeno de Marcação a Mercado'
      },
      {
        type: 'paragraph',
        text: 'Muitos iniciantes não sabem que os preços dos títulos IPCA+ e Prefixados flutuam diariamente. Se a taxa de juros do mercado sobe, o preço do título preexistente cai. Se você vender antes do vencimento, pode perder dinheiro. Por outro lado, se a taxa cair, seu título valoriza e você pode realizar lucros antecipados espetaculares. Para quem leva até o vencimento acordado, o rendimento contratado é rigorosamente garantido.'
      }
    ]
  },
  {
    id: 'regra-50-30-20-placar',
    title: 'A Regra dos 50/30/20 no Orçamento: Orquestrando Sustentabilidade e Lazer',
    summary: 'Aprenda a aplicar o método de orçamento mais famoso do mundo. Adapte as diretrizes para a realidade do custo de vida atual e atinja a independência financeira sem abrir mão de viver o presente.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
    category: 'Orçamento',
    date: '10 de Maio de 2026',
    author: 'Clarisse Silveira',
    authorRole: 'Planejadora Financeira CFP® & Escritora',
    readTime: '5 min de leitura',
    trending: true,
    sections: [
      {
        type: 'paragraph',
        text: 'A principal barreira para quem decide cuidar das finanças pessoais não é a falta de aplicativos sofisticados, mas a complexidade Autoimposta de planilhas com dezenas de categorias minuciosas. A regra dos 50/30/20, popularizada pela senadora norte-americana Elizabeth Warren em seu livro "All Your Worth", simplifica a gestão do orçamento ao agrupar todas as saídas financeiras em apenas três macrogrupos altamente controláveis.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: 'Como Dividir Seus Recursos Líquidos'
      },
      {
        type: 'paragraph',
        text: 'Para aplicar o modelo, tome como base sua receita líquida mensal (salário após descontos de impostos e previdência, ou retiradas de pró-labore limpas) e separe da seguinte forma:'
      },
      {
        type: 'list',
        items: [
          '50% - Necessidades Essenciais: Despesas indispensáveis para viver e manter sua integridade básica. Inclui moradia (aluguel/prestação, condomínio, IPTU), contas básicas (água, luz, gás, internet), alimentação essencial, planos de saúde e transporte obrigatório.',
          '30% - Desejos Pessoais: Gastos voltados ao estilo de vida, bem-estar e lazer. Estão nesta fatia restaurantes, jantares fora, assinaturas de streaming (Netflix, Spotify), roupas novas por preferência, salão de beleza, viagens e hobbies pessoais.',
          '20% - Prioridades Financeiras: Reserva de emergência, quitação rápida de dívidas de juros altos ou investimentos estruturados para metas de médio e longo prazo (aposentadoria, compra de bens substanciais).'
        ]
      },
      {
        type: 'takeaway',
        text: 'Lembre-se: O primeiro passo para viabilizar os 20% de poupança é automatizar o processo. Programe uma transferência recorrente no dia seguinte ao pagamento para a sua corretora de valores. Se você esperar o fim do mês para investir o que sobrar, infelizmente nunca sobram recursos.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: 'Ajustando Variáveis para Cidades de Alto Custo'
      },
      {
        type: 'paragraph',
        text: 'Em metrópoles densas onde o custo de habitação pode consumir até 40% do salário isoladamente, manter as Necessidades em 50% exige alta restrição. Nesses casos excepcionais, especialistas autorizam uma adaptação provisória para 60/20/20 ou até 55/25/20. O que jamais deve ser sacrificado em termos permanentes é o compromisso mínimo de poupar e investir 20% do orçamento para salvaguardar sua estabilidade futura.'
      }
    ]
  },
  {
    id: 'previdencia-pgbl-vgbl',
    title: 'Previdência Privada PGBL vs VGBL: Otimização Fiscal do Planejamento Suplementar',
    summary: 'A declaração anual de IR pode ser sua maior aliada ou sua ruína. Entenda como a escolha entre Planos Geradores de Benefício Livre (PGBL) e Vida Gerador de Benefício Livre (VGBL) altera seus impostos.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    category: 'Previdência',
    date: '02 de Maio de 2026',
    author: 'Maurício K. Ramos',
    authorRole: 'Consultor de Planejamento Sucessório',
    readTime: '7 min de leitura',
    sections: [
      {
        type: 'paragraph',
        text: 'No turbilhão do mercado financeiro, a Previdência Privada carrega uma reputação muitas vezes ofuscada por fundos antigos de taxas abusivas. Hoje, contudo, as plataformas independentes oferecem fundos excelentes, geridos por equipes multi-mercado de alta performance. Além do rendimento, esse veículo esconde uma das estratégias de otimização fiscal mais poderosas permitidas pela Receita Federal, ideal para contribuintes com rendimentos elevados.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: 'A Distinção Fundamental: PGBL versus VGBL'
      },
      {
        type: 'paragraph',
        text: 'Se você errar o acrônimo na hora de contratar o plano, perderá milhares de reais no momento do resgate. Eis a lógica definitiva de funcionamento de cada estrutura:'
      },
      {
        type: 'list',
        items: [
          'PGBL (Plano Gerador de Benefício Livre): Ideal para quem faz a Declaração Completa do Imposto de Renda. Permite abater as contribuições feitas no plano até o teto de 12% da renda bruta anual tributável. Com isso, sua base de cálculo diminui e você paga menos imposto hoje. No entanto, lembre-se: no resgate futuro, o Imposto de Renda incidirá sobre TODO o montante resgatado (capital principal somado aos rendimentos).',
          'VGBL (Vida Gerador de Benefício Livre): Recomendado para quem faz a Declaração Simplificada, é autônomo ou deseja investir mais de 12% da renda bruta. Não dá direito a deduções fiscais imediatas. Em contrapartida, no momento do resgate, o Imposto de Renda incidirá UNICAMENTE sobre os rendimentos auferidos no período de acumulação.'
        ]
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: 'A Escolha do Regime de Tributação: Progressivo vs Regressivo'
      },
      {
        type: 'paragraph',
        text: 'Ao contratar, você deve optar também pela tabela tributária. Na tabela Progressiva, as alíquotas aumentam conforme o valor recebido, variando de isenção até 27,5% (idêntica à tabela mensal de salários). Na fantástica tabela Regressiva, o fisco recompensa a paciência: as alíquotas começam em 35% para saques em menos de 2 anos, mas despencam 5 pontos percentuais a cada biênio acumulado, estacionando na ínfima alíquota de 10% para capitais custodiados por mais de 10 anos.'
      },
      {
        type: 'takeaway',
        text: 'Decisão Prática: A previdência privada com tabela regressiva de 10% após uma década constitui a menor alíquota de imposto possível sobre investimentos financeiros do Brasil, batendo inclusive os fundos tradicionais de renda fixa curtíssimos.'
      }
    ]
  },
  {
    id: 'como-sair-das-dividas',
    title: 'Como Reestruturar Dívidas de Juros Altos e Retomar o Equilíbrio Financeiro',
    summary: 'Aprenda os segredos estratégicos mantidos longe dos devedores comuns. Como negociar descontos de até 85% no rotativo do cartão e cheque especial de forma legal e inteligente.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1200&auto=format&fit=crop',
    category: 'Dívidas',
    date: '28 de Abril de 2026',
    author: 'Roberta Lins',
    authorRole: 'Especialista em Recuperação de Crédito',
    readTime: '6 min de leitura',
    trending: true,
    sections: [
      {
        type: 'paragraph',
        text: 'O endividamento consome mais do que dinheiro; ele drena a energia psicológica do trabalhador e abala lares familiares inteiros. No Brasil, o rotativo do cartão de crédito e as tarifas abusivas de cheque especial configuram taxas de juros astronômicas de mais de 400% ao ano. Se você se deparar com essa bola de neve, parar imediatamente de alimentá-la com novos financiamentos paliativos é o único caminho pragmático.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: '1. O Inventário Total das Pendências'
      },
      {
        type: 'paragraph',
        text: 'Antes de realizar ligações nervosas aos gerentes bancários, mapeie a verdade com precisão cirúrgica. Liste todas as fontes de débito em uma folha física, anotando o valor principal inicial devido, o saldo de juros atualizado, e a Taxa Efetiva Anual (Custo Efetivo Total - CET). Identifique quais dívidas possuem garantias reais (hipotecas de moradia, consórcio/financiamento automotivo) que devem ser protegidas prioritariamente.'
      },
      {
        type: 'heading',
        headingLevel: 2,
        text: '2. Troca Inteligente de Passivos e Portabilidade de Crédito'
      },
      {
        type: 'paragraph',
        text: 'Dívidas não são iguais. É infinitamente preferível contrair uma modalidade barata para aniquilar uma caríssima de uma vez por todas. Utilize linhas de empréstimo consignado em folha, cooperativas sindicais de crédito ou empréstimos com garantia de FGTS para quitar o cartão e suspender os juros rotativos abusivos. Você migrará de uma dívida de 350% a.a. para condições brandas de 18% a 32% a.a., reestabelecendo a amortização real do principal.'
      },
      {
        type: 'takeaway',
        text: 'Dica de ouro: Utilize a ferramenta gratuita Registrato, oferecida pelo Banco Central do Brasil. Lá, você verifica todas as suas chaves Pix registradas, financiamentos concedidos e relacionamentos corporativos, garantindo rastreabilidade absoluta de tudo associado ao seu CPF.'
      },
      {
        type: 'heading',
        headingLevel: 3,
        text: '3. O Poder da Negociação Extrajudicial'
      },
      {
        type: 'paragraph',
        text: 'Os bancos de varejo criam provisões contábeis monstruosas para Crédito de Liquidação Duvidosa. Na prática, após alguns meses consecutivamente em atraso, a instituição prefere recuperar parte mínima do valor devido de imediato a manter a conta pendente. Participe dos mutirões de conciliação do Serasa Limpa Nome, onde as instituições oferecem liquidações à vista com amortização quase total dos juros acumulados — restando apenas o valor principal real corrigido.'
      }
    ]
  }
];
