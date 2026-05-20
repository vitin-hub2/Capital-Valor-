/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, FileText, UserCheck } from 'lucide-react';
import { ContactMessage } from '../types';

/* ==========================================================================
   COMPONENT 1: SOBRE NÓS
   ========================================================================== */
export function SobreNos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10 border-b-2 border-black pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Nossa Identidade</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black mt-2">Quem Somos & Nosso Compromisso</h2>
      </div>

      <div className="bg-white border border-gray-200 p-6 md:p-10 space-y-6 text-[#111111]">
        <p className="font-sans text-base sm:text-lg leading-relaxed text-gray-700">
          O portal <strong>Capital & Valor</strong> nasceu no ano de 2026 com o firme propósito de preencher a lacuna da educação financeira séria, isenta e verdadeiramente democrática no Brasil. Diante de um mercado saturado por promessas de ganhos fáceis e conflitos de interesse velados, defendemos que o conhecimento estruturado é a ferramenta mais revolucionária de libertação socioeconômica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 pt-6 border-t border-gray-100">
          <div>
            <h3 className="font-serif font-bold text-lg text-black mb-3">★ Proposta de Valor</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Diferente de portais de bancos e corretoras cujo interesse final é incentivar o giro constante de ativos para cobrar comissões ocultas, o nosso veículo não comercializa produtos de investimento. O nosso lucro decorre exclusivamente de audiência digital isenta (AdSense) e parcerias transparentes de mídia, garantindo total liberdade editorial e independência de análises.
            </p>
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-black mb-3">★ Metodologia Didática</h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Todo o nosso conteúdo é revisado e estruturado de acordo com preceitos rigorosos de planejadores CFP® e consultores de investimentos credenciados à CVM. Traduzimos termos hiper-complexos do economês clássico para guias visuais simplificados, impulsionando a inclusão de cidadãos comuns de todos os níveis de renda no mercado financeiro nacional.
            </p>
          </div>
        </div>

        <div className="bg-black text-white p-6 md:p-8 rounded-none mt-8">
          <h3 className="font-serif font-bold text-xl mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-gray-300" /> Nossos Pilares Operacionais
          </h3>
          <ul className="space-y-3 font-mono text-xs text-gray-300">
            <li><strong>✓ ISENÇÃO ABSOLUTA:</strong> Desvinculados de qualquer corretora, banco comercial ou assessoria de investimentos.</li>
            <li><strong>✓ FONTES PRECISAS:</strong> Informações extraídas de dados oficiais do Banco Central, CVM, Secretaria do Tesouro e B3.</li>
            <li><strong>✓ INTEGRIDADE DO LEITOR:</strong> Proibição rigorosa de "clickbaits" ou títulos absurdos para angariar cliques falsos.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   COMPONENT 2: CONTATO
   ========================================================================== */
export function ContatoForm() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: 'Geral',
    message: '',
    consentsToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subjects = ['Dúvidas de Conteúdo', 'Parceria Comercial', 'Suporte Técnico', 'Sugestões', 'Outros'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, consentsToTerms: e.target.checked }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field Verifications
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios do formulário.');
      return;
    }

    if (!formData.consentsToTerms) {
      setErrorMsg('Você precisa autorizar o processamento de correspondência conforme os Termos e Políticas.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Geral',
        message: '',
        consentsToTerms: false
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10 border-b-2 border-black pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Correspondência</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black mt-2">Canal de Atendimento ao Leitor</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (Left) */}
        <div className="lg:col-span-5 bg-[#111111] text-white border-2 border-black p-8 flex flex-col gap-6 font-sans shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase border border-gray-700 px-2 py-0.5 inline-block mb-3">Comunicação Oficial</span>
            <h3 className="font-serif font-bold text-xl text-white mb-2">Contato Direto</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Esclareça dúvidas editoriais, apresente propostas comerciais ou submeta sugestões para nossos simuladores. Nossa mesa de redação retornará sua mensagem em poucas horas de forma individualizada.
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-850 pt-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">E-mail de Contato & Negócios</p>
                <a 
                  href="mailto:apoloferreira450@gmail.com" 
                  className="text-sm font-semibold text-white break-all hover:underline hover:text-gray-300 transition-colors cursor-pointer block mt-0.5"
                >
                  apoloferreira450@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 bg-white/5 p-4 text-[11px] text-gray-300 space-y-2">
            <p className="font-semibold text-white flex items-center gap-1.5 font-mono uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-gray-400" /> Segurança do Leitor (Anti-Fraude):
            </p>
            <p className="leading-relaxed">
              O portal Capital & Valor preza pela segurança digital completa de seus visitantes. <strong>Nunca</strong> enviamos mensagens cobrando tarifas, vendendo cursos, captando depósitos Pix ou solicitando senhas pessoais bancárias.
            </p>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 p-6 md:p-8">
          
          {submitSuccess ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-center py-10 space-y-4 font-sans"
            >
              <CheckCircle className="w-12 h-12 text-black mx-auto animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-black">Mensagem Enviada!</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Agradecemos sua correspondência. Nossa equipe editorial ou técnica irá analisar seu pedido e responderemos no e-mail informado o mais breve possível.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 px-4 py-2 border border-black font-mono text-xs uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                Nova Mensagem
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-sm">
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-mono">
                  ⚠ {errorMsg}
                </div>
              )}

              {/* Name field */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-gray-500 block">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none"
                  placeholder="Seu nome"
                />
              </div>

              {/* Email field */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-gray-500 block">Endereço de E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none"
                  placeholder="nome@exemplo.com"
                />
              </div>

              {/* Subject dropdown */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-gray-500 block">Assunto da Mensagem</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none bg-white font-mono text-xs"
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* Message text area */}
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-gray-500 block">Mensagem ou Comentário *</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black rounded-none resize-none"
                  placeholder="Escreva sua consulta..."
                />
              </div>

              {/* Consent check */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consentCheckbox"
                  checked={formData.consentsToTerms}
                  onChange={handleCheckboxChange}
                  className="mt-1 accent-black h-4 w-4 shrink-0 rounded-none cursor-pointer"
                />
                <label id="consentLabel" htmlFor="consentCheckbox" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                  Eu concordo que meus dados fornecidos acima sejam tratados unicamente para responder a este e-mail, de acordo com as diretrizes da <strong>Política de Privacidade</strong> e proteção de dados LGPD.
                </label>
              </div>

              {/* Send button with motion feedback */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-3 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer pointer-events-auto"
              >
                {isSubmitting ? (
                  <>Aguarde...</>
                ) : (
                  <>
                    Transmitir Mensagem <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </motion.div>
  );
}

/* ==========================================================================
   COMPONENT 3: POLÍTICA DE PRIVACIDADE
   ========================================================================== */
export function PoliticaPrivacidade() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10 border-b-2 border-black pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Privacidade LGPD & Cookies</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black mt-2">Diretrizes de Privacidade</h2>
      </div>

      <div className="bg-white border border-gray-200 p-6 md:p-10 space-y-6 text-[#111111] font-sans text-sm leading-relaxed text-gray-700">
        
        <p className="text-xs font-mono text-gray-400">Última atualização: 20 de Maio de 2026</p>

        <p>
          No portal <strong>Capital & Valor</strong>, a privacidade e a segurança das informações dos nossos leitores constituem prioridades absolutas. Elaboramos este documento em rigorosa conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e com as exigências técnicas impostas pelo programa de monetização <strong>Google AdSense</strong>.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">1. Coleta e Tratamento de Dados Pessoais</h3>
        <p>
          Nosso portal opera majoritariamente de forma aberta e informativa. Coletamos informações unicamente quando o usuário as insere ativamente em nosso formulário de contato (nome, e-mail e dados da mensagem). Esses dados são mantidos em ambiente seguro de correio eletrônico apenas pelo período necessário para responder à consulta inicial e nunca são vendidos ou distribuídos a organizações terceiras.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">2. Arquivos de Log e Endereço IP</h3>
        <p>
          Como padrão na infraestrutura de servidores de alta escalabilidade na nuvem, coletamos informações anonimizadas sobre padrões de uso do site. Isso inclui o tipo de navegador (Browser), o endereço de IP (completamente ofuscado), o provedor de serviços de Internet (ISP), registros de páginas de entrada e saída brasileiras, e contagem de cliques globais de navegação para análise estatística de comportamento e usabilidade.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">3. Diretriz de Cookies e Navegação Google AdSense</h3>
        <p>
          Este site exibe anúncios publicitários distribuídos de forma autônoma pela rede do <strong>Google AdSense</strong>. O Google utiliza tecnologias de rastreamento denominadas <strong>Cookies</strong> para gerenciar e segmentar anúncios apropriados ao perfil do usuário final:
        </p>
        <ul className="list-disc pl-5 space-y-2.5 text-xs text-gray-600">
          <li><strong>Cookie DART / DoubleClick:</strong> O Google utiliza o cookie DART para exibir anúncios direcionados ao usuário com base em suas visitas anteriores ao portal Capital & Valor ou outros websites na Internet brasileira.</li>
          <li><strong>Anúncios de Interesse Compartilhado:</strong> Os cookies de terceiros registram suas preferências de navegação coletadas de maneira anônima e segmentam anúncios de serviços relevantes, no intuito de prover publicidade útil e reduzir anúncios invasivos ou irrelevantes.</li>
          <li><strong>Controle e Desativação:</strong> Os usuários detêm o direito soberano de desativar os cookies direcionados nas configurações do seu navegador ou visitando diretamente a página de desativação de cookies de publicidade do Google (Ad Settings oficial).</li>
        </ul>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-700" /> 4. Direitos Legais do Titular (LGPD)
        </h3>
        <p>
          De acordo com o artigo 18 da LGPD, o titular dos dados possui o direito absoluto de requisitar, a qualquer momento, a confirmação do tratamento, cópia integral dos dados salvos, correção de dados incompletos ou a imediata eliminação de seus registros de contato históricos em nossos bancos. Para exercer esses direitos, entre em contato imediatamente enviando uma mensagem pelo assunto "Suporte Técnico" no nosso canal oficial.
        </p>

      </div>
    </motion.div>
  );
}

/* ==========================================================================
   COMPONENT 4: TERMOS DE USO
   ========================================================================== */
export function TermosDeUso() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <div className="text-center mb-10 border-b-2 border-black pb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Cláusulas de Utilização</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-black mt-2">Termos e Condições de Uso</h2>
      </div>

      <div className="bg-white border border-gray-200 p-6 md:p-10 space-y-6 text-[#111111] font-sans text-sm leading-relaxed text-gray-700">
        
        <p className="text-xs font-mono text-gray-400">Última atualização: 20 de Maio de 2026</p>

        <p>
          Seja bem-vindo ao portal <strong>Capital & Valor</strong>. Ao navegar por nossas páginas, acessar nossos simuladores interativos e ler nossas matérias educacionais, você expressa sua irrestrita concordância de cumprimento com os seguintes Termos de Condições de Uso. Caso não concorde com qualquer uma das condições estabelecidas, recomendamos suspender o uso de nossas plataformas.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">1. Licença de Uso do Conteúdo</h3>
        <p>
          Todo o conteúdo intelectual publicado no site (textos opinativos, notícias, códigos dos simuladores de juros e orçamento, e layouts gerais) está integralmente protegido por leis federais de propriedade intelectual e direitos de autor. Fica estritamente vedada a republicação, cópia parcial, cópia integral e reprodução comercial de nossos textos em outros blogs ou veículos digitais sem prévia autorização formal por escrito, sob pena das sanções legais cabíveis.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">2. Isenção Extrema de Garantias e Responsabilidade Financeira</h3>
        <p>
          Embora nossa equipe de CFP® envide esforços hercúleos para garantir a exatidão, precisão matemática e atualidade dos dados econômicos simulados, o portal <strong>não se responsabiliza por decisões individuais e alocações de investimentos de terceiros</strong>. Os resultados de rentabilidade líquida exibidos em nossos simuladores de juros representam projeções geométricas e nunca devem ser encarados como promessas rígidas de rendimentos assegurados. O mercado financeiro possui riscos reais e a escolha de carteiras de ativos é de exclusiva e restrita responsabilidade civil do investidor.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1">3. Monitoramento e Publicidade (Google AdSense)</h3>
        <p>
          O usuário reconhece expressamente que o site exibe recursos de monetização de anúncios operados pelo Google. O portal adota rigorosas defesas de usabilidade e restringe anúncios de baixo valor, violentos, fraudulentos ou impróprios ao contexto das finanças domésticas.
        </p>

        <h3 className="font-serif font-bold text-lg text-black pt-4 border-b pb-1 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-gray-700" /> 4. Modificações de Termos e Atualizações
        </h3>
        <p>
          Reservamo-nos o direito unilateral de prorrogar, modificar, remover ou acrescentar cláusulas a estes Termos de Uso e à Política de Privacidade a qualquer título e sem aviso prévio. Recomendamos visitas regulares a este endereço para verificar atualizações. A continuidade no uso ativa automaticamente a concordância tácita às regras revisadas em vigor.
        </p>

      </div>
    </motion.div>
  );
}
