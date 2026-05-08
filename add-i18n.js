const fs = require('fs');
const path = 'C:/Users/samue/royalbinary-lp/index.html';
let html = fs.readFileSync(path, 'utf8');

// Map of old string -> { attr, key, translations }
// attr: 'data-i18n' for textContent, 'data-i18n-html' for innerHTML
const replacements = [
  // === STORIES BADGES ===
  {
    old: '<span class="mono text-[10px] uppercase tracking-widest text-mute2">vídeos</span>',
    new: '<span class="mono text-[10px] uppercase tracking-widest text-mute2" data-i18n="stories.videos">vídeos</span>',
    key: 'stories.videos',
    t: { en:'videos', es:'videos', fr:'vidéos', de:'Videos', it:'video', ar:'فيديوهات', zh:'视频', ja:'動画', ko:'영상', ru:'видео', tr:'videolar' }
  },
  {
    old: '<span class="text-em">&#x2713;</span> verificados\n          </span>',
    new: '<span class="text-em">&#x2713;</span> <span data-i18n="stories.verified">verificados</span>\n          </span>',
    key: 'stories.verified',
    t: { en:'verified', es:'verificados', fr:'vérifiés', de:'verifiziert', it:'verificati', ar:'موثّق', zh:'已验证', ja:'認証済み', ko:'인증됨', ru:'проверено', tr:'doğrulandı' }
  },
  // === DOWNLOAD BUTTON ===
  {
    old: '<span>&#x2B07;</span> Baixar video de compartilhamento',
    new: '<span>&#x2B07;</span> <span data-i18n="dl.btn">Baixar video de compartilhamento</span>',
    key: 'dl.btn',
    t: { en:'Download sharing video', es:'Descargar video para compartir', fr:'Télécharger la vidéo de partage', de:'Teilvideo herunterladen', it:'Scarica video di condivisione', ar:'تحميل فيديو المشاركة', zh:'下载分享视频', ja:'共有動画をダウンロード', ko:'공유 영상 다운로드', ru:'Скачать видео для публикации', tr:'Paylaşım videosunu indir' }
  },
  // === WHATSAPP GROUP LABEL ===
  {
    old: '<span class="mono text-[10px] uppercase tracking-widest text-mute2">Grupo do WhatsApp</span>',
    new: '<span class="mono text-[10px] uppercase tracking-widest text-mute2" data-i18n="how.wagroup">Grupo do WhatsApp</span>',
    key: 'how.wagroup',
    t: { en:'WhatsApp Group', es:'Grupo de WhatsApp', fr:'Groupe WhatsApp', de:'WhatsApp-Gruppe', it:'Gruppo WhatsApp', ar:'مجموعة واتساب', zh:'WhatsApp群组', ja:'WhatsAppグループ', ko:'WhatsApp 그룹', ru:'Группа WhatsApp', tr:'WhatsApp Grubu' }
  },
  // === CEO CARD ===
  {
    old: '<div class="text-lg font-bold">Sidnei Oliveira</div>',
    new: '<div class="text-lg font-bold">Sidnei Oliveira</div>',
    skip: true
  },
  {
    old: '<div class="mono text-[11px] uppercase tracking-widest text-em mt-1">Fundador · CEO · Trader</div>',
    new: '<div class="mono text-[11px] uppercase tracking-widest text-em mt-1" data-i18n="how.ceorole">Fundador · CEO · Trader</div>',
    key: 'how.ceorole',
    t: { en:'Founder · CEO · Trader', es:'Fundador · CEO · Trader', fr:'Fondateur · PDG · Trader', de:'Gründer · CEO · Trader', it:'Fondatore · CEO · Trader', ar:'مؤسس · مدير تنفيذي · متداول', zh:'创始人 · CEO · 交易员', ja:'創業者 · CEO · トレーダー', ko:'창립자 · CEO · 트레이더', ru:'Основатель · CEO · Трейдер', tr:'Kurucu · CEO · Trader' }
  },
  // === CEO DESCRIPTION ===
  {
    old: 'Ex-sargento da Aeronáutica com 7+ anos operando no mercado financeiro. Presente diariamente na comunidade, opera ao vivo e responde dúvidas.',
    new: '<span data-i18n="how.ceodesc">Ex-sargento da Aeronáutica com 7+ anos operando no mercado financeiro. Presente diariamente na comunidade, opera ao vivo e responde dúvidas.</span>',
    key: 'how.ceodesc',
    t: { en:'Former Air Force sergeant with 7+ years in the financial market. Present daily in the community, trades live and answers questions.', es:'Ex-sargento de la Aeronáutica con 7+ años operando en el mercado financiero. Presente a diario en la comunidad, opera en vivo y responde dudas.', fr:'Ancien sergent de l\'armée de l\'air avec 7+ ans sur les marchés financiers. Présent quotidiennement dans la communauté, opère en direct et répond aux questions.', de:'Ehemaliger Unteroffizier der Luftwaffe mit über 7 Jahren Erfahrung an den Finanzmärkten. Täglich in der Community präsent, handelt live und beantwortet Fragen.', it:'Ex-sergente dell\'Aeronautica con oltre 7 anni di esperienza nel mercato finanziario. Presente quotidianamente nella comunità, opera in diretta e risponde alle domande.', ar:'رقيب سابق في سلاح الجو مع أكثر من 7 سنوات في الأسواق المالية. متواجد يومياً في المجتمع، يتداول مباشرة ويجيب على الأسئلة.', zh:'前空军军士，拥有7年以上金融市场经验。每天活跃在社区中，实时交易并回答问题。', ja:'元空軍曹長。金融市場で7年以上の経験。毎日コミュニティに参加し、ライブ取引を行い、質問に答えます。', ko:'전 공군 부사관, 7년 이상의 금융 시장 경력. 매일 커뮤니티에 참여하며 실시간 거래와 질문 답변.', ru:'Бывший сержант ВВС с 7+ годами на финансовом рынке. Ежедневно присутствует в сообществе, торгует в прямом эфире и отвечает на вопросы.', tr:'7+ yıllık finans piyasası deneyimine sahip eski Hava Kuvvetleri çavuşu. Toplulukta her gün aktif, canlı işlem yapar ve soruları yanıtlar.' }
  },
  // === WHO OPERATES P1 ===
  {
    old: 'O CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento da Aeronáutica e trader profissional, executa todas as operações manualmente no mercado financeiro, compra e venda de ativos diariamente.',
    new: '<span data-i18n-html="how.who.p1">O CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento da Aeronáutica e trader profissional, executa todas as operações manualmente no mercado financeiro, compra e venda de ativos diariamente.</span>',
    key: 'how.who.p1',
    isHtml: true,
    t: { en:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, former Air Force sergeant and professional trader, manually executes all operations in the financial market, buying and selling assets daily.', es:'El CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento de la Aeronáutica y trader profesional, ejecuta todas las operaciones manualmente en el mercado financiero, comprando y vendiendo activos a diario.', fr:'Le PDG <span class="text-ink font-medium">Sidnei Oliveira</span>, ancien sergent de l\'armée de l\'air et trader professionnel, exécute toutes les opérations manuellement sur le marché financier, achetant et vendant des actifs quotidiennement.', de:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ehemaliger Unteroffizier und professioneller Trader, führt alle Operationen manuell am Finanzmarkt durch, kauft und verkauft täglich Vermögenswerte.', it:'Il CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sergente dell\'Aeronautica e trader professionista, esegue tutte le operazioni manualmente nel mercato finanziario, comprando e vendendo asset giornalmente.', ar:'الرئيس التنفيذي <span class="text-ink font-medium">سيدني أوليفيرا</span>، رقيب سابق في سلاح الجو ومتداول محترف، ينفذ جميع العمليات يدوياً في السوق المالي، بيعاً وشراءً يومياً.', zh:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>，前空军军士和专业交易员，在金融市场手动执行所有操作，每天买卖资产。', ja:'CEO <span class="text-ink font-medium">シドネイ・オリヴェイラ</span>は元空軍曹長でプロトレーダー。金融市場で全ての取引を手動で行い、日々資産の売買を実行しています。', ko:'CEO <span class="text-ink font-medium">시드네이 올리베이라</span>는 전 공군 부사관이자 전문 트레이더로, 금융 시장에서 모든 거래를 수동으로 실행하며 매일 자산을 매매합니다.', ru:'Генеральный директор <span class="text-ink font-medium">Сидней Оливейра</span>, бывший сержант ВВС и профессиональный трейдер, вручную выполняет все операции на финансовом рынке, ежедневно покупая и продавая активы.', tr:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, eski Hava Kuvvetleri çavuşu ve profesyonel trader, finansal piyasada tüm işlemleri manuel olarak gerçekleştirir, her gün varlık alım satımı yapar.' }
  },
];

// Since the file is huge, let me take a different approach.
// I'll directly modify the file by adding data-i18n attributes to specific elements,
// and then append all missing translations to the existing translation dictionaries.

// First, let's make targeted replacements in the HTML
const htmlReplacements = [
  // Stories badges
  ['<span class="mono text-[10px] uppercase tracking-widest text-mute2">vídeos</span>',
   '<span class="mono text-[10px] uppercase tracking-widest text-mute2" data-i18n="stories.videos">vídeos</span>'],

  // Verified badge - need to handle the multiline
  ['<span class="text-em">&#x2713;</span> verificados',
   '<span class="text-em">&#x2713;</span> <span data-i18n="stories.verified">verificados</span>'],

  // Download button
  ['<span>&#x2B07;</span> Baixar video de compartilhamento',
   '<span>&#x2B07;</span> <span data-i18n="dl.btn">Baixar video de compartilhamento</span>'],

  // WhatsApp Group label
  ['<span class="mono text-[10px] uppercase tracking-widest text-mute2">Grupo do WhatsApp</span>',
   '<span class="mono text-[10px] uppercase tracking-widest text-mute2" data-i18n="how.wagroup">Grupo do WhatsApp</span>'],

  // CEO card role
  ['<div class="mono text-[11px] uppercase tracking-widest text-em mt-1">Fundador · CEO · Trader</div>',
   '<div class="mono text-[11px] uppercase tracking-widest text-em mt-1" data-i18n="how.ceorole">Fundador · CEO · Trader</div>'],

  // CEO bio paragraph
  ['Ex-sargento da Aeronáutica com 7+ anos operando no mercado financeiro. Presente diariamente na comunidade, opera ao vivo e responde dúvidas.',
   '<span data-i18n="how.ceodesc">Ex-sargento da Aeronáutica com 7+ anos operando no mercado financeiro. Presente diariamente na comunidade, opera ao vivo e responde dúvidas.</span>'],

  // Who operates paragraph 1
  ['O CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento da Aeronáutica e trader profissional, executa todas as operações manualmente no mercado financeiro, compra e venda de ativos diariamente.',
   '<span data-i18n-html="how.who.p1">O CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento da Aeronáutica e trader profissional, executa todas as operações manualmente no mercado financeiro, compra e venda de ativos diariamente.</span>'],

  // Who operates paragraph 2
  ['As operações acontecem todos os dias, com duração de 1 minuto cada, no mercado de opções binárias. Sem robô, sem algoritmo. Decisão humana baseada em análise técnica e estudos de um profissional há 7 anos no mercado.',
   '<span data-i18n="how.who.p2">As operações acontecem todos os dias, com duração de 1 minuto cada, no mercado de opções binárias. Sem robô, sem algoritmo. Decisão humana baseada em análise técnica e estudos de um profissional há 7 anos no mercado.</span>'],

  // How you profit paragraph 1
  ['Você investe junto com o CEO. Quando a operação dá lucro, <span class="text-em font-medium">tanto você quanto a empresa lucram</span>. Quando a operação não performa, <span class="text-ink font-medium">ninguém lucra</span>. Nem você, nem a Royal Binary.',
   '<span data-i18n-html="how.profit.p1">Você investe junto com o CEO. Quando a operação dá lucro, <span class="text-em font-medium">tanto você quanto a empresa lucram</span>. Quando a operação não performa, <span class="text-ink font-medium">ninguém lucra</span>. Nem você, nem a Royal Binary.</span>'],

  // How you profit paragraph 2
  ['A empresa só fatura quando gera resultado para o investidor. Esse alinhamento de interesses é o que garante que o foco esteja sempre na performance real do mercado.',
   '<span data-i18n="how.profit.p2">A empresa só fatura quando gera resultado para o investidor. Esse alinhamento de interesses é o que garante que o foco esteja sempre na performance real do mercado.</span>'],

  // Video CTA
  ['<h4 class="text-lg font-semibold">Tire suas dúvidas <span class="text-em">com o CEO aqui</span></h4>',
   '<h4 class="text-lg font-semibold" data-i18n-html="how.videocta">Tire suas dúvidas <span class="text-em">com o CEO aqui</span></h4>'],

  // Origin of profit
  ['<h4 class="mt-4 text-lg font-semibold">Origem do lucro</h4>',
   '<h4 class="mt-4 text-lg font-semibold" data-i18n="how.origin">Origem do lucro</h4>'],

  // Origin p1
  ['Seu rendimento vem exclusivamente das operações no mercado financeiro. Compra e venda real de ativos. Não depende da entrada de novos membros.',
   '<span data-i18n="how.origin.p1">Seu rendimento vem exclusivamente das operações no mercado financeiro. Compra e venda real de ativos. Não depende da entrada de novos membros.</span>'],

  // Same risk text
  ['Em pirâmides, quem está no topo sempre ganha. Aqui, se o mercado não performa, ninguém ganha. A empresa assume o mesmo risco que você.',
   '<span data-i18n="how.samerisk">Em pirâmides, quem está no topo sempre ganha. Aqui, se o mercado não performa, ninguém ganha. A empresa assume o mesmo risco que você.</span>'],

  // Transparency
  ['<h4 class="mt-4 text-lg font-semibold">Transparência total</h4>',
   '<h4 class="mt-4 text-lg font-semibold" data-i18n="how.transparency">Transparência total</h4>'],

  // Pyramid label
  ['<div class="mono text-[11px] uppercase tracking-widest text-red">Pirâmide financeira</div>',
   '<div class="mono text-[11px] uppercase tracking-widest text-red" data-i18n="how.pyramid">Pirâmide financeira</div>'],

  // Pyramid list items
  ['<span class="text-red">&#x2717;</span> Lucro vem de novos participantes',
   '<span class="text-red">&#x2717;</span> <span data-i18n="how.pyr1">Lucro vem de novos participantes</span>'],
  ['<span class="text-red">&#x2717;</span> Sem produto ou operação real',
   '<span class="text-red">&#x2717;</span> <span data-i18n="how.pyr2">Sem produto ou operação real</span>'],
  ['<span class="text-red">&#x2717;</span> Nenhuma transparência nas operações',
   '<span class="text-red">&#x2717;</span> <span data-i18n="how.pyr3">Nenhuma transparência nas operações</span>'],

  // Royal Binary list items
  ['<span class="text-em">&#x2713;</span> Lucro vem de operações reais no mercado',
   '<span class="text-em">&#x2713;</span> <span data-i18n="how.rb1">Lucro vem de operações reais no mercado</span>'],
  ['<span class="text-em">&#x2713;</span> Compra e venda diária de ativos financeiros',
   '<span class="text-em">&#x2713;</span> <span data-i18n="how.rb2">Compra e venda diária de ativos financeiros</span>'],
  ['<span class="text-em">&#x2713;</span> Todos recebem com base na mesma operação',
   '<span class="text-em">&#x2713;</span> <span data-i18n="how.rb3">Todos recebem com base na mesma operação</span>'],

  // Operation grid labels
  ['<div class="mono text-[11px] uppercase tracking-widest text-mute">Mercado</div>',
   '<div class="mono text-[11px] uppercase tracking-widest text-mute" data-i18n="how.grid.market">Mercado</div>'],
  ['<div class="mt-3 text-xl font-semibold">Opções Binárias</div>',
   '<div class="mt-3 text-xl font-semibold" data-i18n="how.grid.binary">Opções Binárias</div>'],
  ['<div class="mt-1 text-[13px] text-mute2">CEO · trader manual</div>',
   '<div class="mt-1 text-[13px] text-mute2" data-i18n="how.grid.ceotrader">CEO · trader manual</div>'],
  ['<div class="mono text-[11px] uppercase tracking-widest text-mute">Frequência</div>',
   '<div class="mono text-[11px] uppercase tracking-widest text-mute" data-i18n="how.grid.freq">Frequência</div>'],
  ['<div class="mt-3 text-xl font-semibold text-em">Diária</div>',
   '<div class="mt-3 text-xl font-semibold text-em" data-i18n="how.grid.daily">Diária</div>'],
  ['<div class="mt-1 text-[13px] text-mute2">Múltiplas operações / dia</div>',
   '<div class="mt-1 text-[13px] text-mute2" data-i18n="how.grid.multi">Múltiplas operações / dia</div>'],
  ['<div class="mono text-[11px] uppercase tracking-widest text-mute">Duração</div>',
   '<div class="mono text-[11px] uppercase tracking-widest text-mute" data-i18n="how.grid.duration">Duração</div>'],
  ['<div class="mt-1 text-[13px] text-mute2">por operação</div>',
   '<div class="mt-1 text-[13px] text-mute2" data-i18n="how.grid.perop">por operação</div>'],

  // CTA button
  ['Abrir minha conta gratuita <span aria-hidden="true">&#x2192;</span>',
   '<span data-i18n="how.cta">Abrir minha conta gratuita</span> <span aria-hidden="true">&#x2192;</span>'],

  // Provas Sociais stats
  ['<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute">Operações / mês</div>',
   '<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute" data-i18n="proof.opsmonth">Operações / mês</div>'],
  ['<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute">Anos de mercado</div>',
   '<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute" data-i18n="proof.years">Anos de mercado</div>'],
  ['<div class="mt-2 text-[13px] text-mute2">Experiência do fundador</div>',
   '<div class="mt-2 text-[13px] text-mute2" data-i18n="proof.founderexp">Experiência do fundador</div>'],
  ['<div class="mt-2 text-[13px] text-mute2">No Substack oficial</div>',
   '<div class="mt-2 text-[13px] text-mute2" data-i18n="proof.substack">No Substack oficial</div>'],
  ['<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute">Operações públicas</div>',
   '<div class="mt-3 mono text-[11px] uppercase tracking-widest text-mute" data-i18n="proof.pubops">Operações públicas</div>'],

  // Trust section
  ['<div class="mono text-[10px] uppercase tracking-widest text-em">razão social</div>',
   '<div class="mono text-[10px] uppercase tracking-widest text-em" data-i18n="trust.company">razão social</div>'],
  ['<div class="mono text-[12px] text-mute mt-1">São Paulo · SP · BR</div>',
   '<div class="mono text-[12px] text-mute mt-1">São Paulo · SP · BR</div>'],
  ['<div class="mono text-[10px] uppercase tracking-widest text-em">execução</div>',
   '<div class="mono text-[10px] uppercase tracking-widest text-em" data-i18n="trust.execution">execução</div>'],
  ['<div class="mono text-[12px] text-mute mt-1">cadeia regulatória br</div>',
   '<div class="mono text-[12px] text-mute mt-1" data-i18n="trust.regulatory">cadeia regulatória br</div>'],
  ['<div class="mono text-[10px] uppercase tracking-widest text-em">reputação</div>',
   '<div class="mono text-[10px] uppercase tracking-widest text-em" data-i18n="trust.reputation">reputação</div>'],
  ['<div class="mono text-[12px] text-mute mt-1">sem reclamações</div>',
   '<div class="mono text-[12px] text-mute mt-1" data-i18n="trust.noclaims">sem reclamações</div>'],

  // Sticky CTA
  ['Abrir conta gratuita <span aria-hidden="true">→</span>',
   '<span data-i18n="sticky.cta">Abrir conta gratuita</span> <span aria-hidden="true">→</span>'],

  // Footer links
  ['class="hover:text-cy transition">sobre</a>',
   'class="hover:text-cy transition" data-i18n="footer.about">sobre</a>'],
  ['class="hover:text-cy transition">cadastro</a>',
   'class="hover:text-cy transition" data-i18n="footer.signup">cadastro</a>'],
];

// Apply HTML replacements
for (const [oldStr, newStr] of htmlReplacements) {
  if (html.includes(oldStr)) {
    html = html.replace(oldStr, newStr);
  } else {
    console.log('NOT FOUND: ' + oldStr.substring(0, 80));
  }
}

// Now build the new translations to add to each language
const newTranslations = {
  'stories.videos': { en:'videos', es:'videos', fr:'vidéos', de:'Videos', it:'video', ar:'فيديوهات', zh:'视频', ja:'動画', ko:'영상', ru:'видео', tr:'videolar' },
  'stories.verified': { en:'verified', es:'verificados', fr:'vérifiés', de:'verifiziert', it:'verificati', ar:'موثّق', zh:'已验证', ja:'認証済み', ko:'인증됨', ru:'проверено', tr:'doğrulandı' },
  'dl.btn': { en:'Download sharing video', es:'Descargar video para compartir', fr:'Télécharger la vidéo de partage', de:'Teilvideo herunterladen', it:'Scarica video di condivisione', ar:'تحميل فيديو المشاركة', zh:'下载分享视频', ja:'共有動画をダウンロード', ko:'공유 영상 다운로드', ru:'Скачать видео', tr:'Paylaşım videosunu indir' },
  'how.wagroup': { en:'WhatsApp Group', es:'Grupo de WhatsApp', fr:'Groupe WhatsApp', de:'WhatsApp-Gruppe', it:'Gruppo WhatsApp', ar:'مجموعة واتساب', zh:'WhatsApp群组', ja:'WhatsAppグループ', ko:'WhatsApp 그룹', ru:'Группа WhatsApp', tr:'WhatsApp Grubu' },
  'how.ceorole': { en:'Founder · CEO · Trader', es:'Fundador · CEO · Trader', fr:'Fondateur · PDG · Trader', de:'Gründer · CEO · Trader', it:'Fondatore · CEO · Trader', ar:'مؤسس · مدير تنفيذي · متداول', zh:'创始人 · CEO · 交易员', ja:'創業者 · CEO · トレーダー', ko:'창립자 · CEO · 트레이더', ru:'Основатель · CEO · Трейдер', tr:'Kurucu · CEO · Trader' },
  'how.ceodesc': { en:'Former Air Force sergeant with 7+ years in the financial market. Present daily in the community, trades live and answers questions.', es:'Ex-sargento de la Aeronáutica con 7+ años en el mercado financiero. Presente a diario en la comunidad, opera en vivo y responde dudas.', fr:'Ancien sergent de l\'armée de l\'air avec 7+ ans sur les marchés financiers. Présent quotidiennement, opère en direct et répond aux questions.', de:'Ehemaliger Unteroffizier der Luftwaffe mit über 7 Jahren Erfahrung. Täglich in der Community präsent, handelt live und beantwortet Fragen.', it:'Ex-sergente dell\'Aeronautica con oltre 7 anni nel mercato finanziario. Presente ogni giorno nella comunità, opera in diretta e risponde alle domande.', ar:'رقيب سابق في سلاح الجو مع أكثر من 7 سنوات في الأسواق المالية. متواجد يومياً في المجتمع، يتداول مباشرة ويجيب على الأسئلة.', zh:'前空军军士，拥有7年以上金融市场经验。每天活跃在社区中，实时交易并回答问题。', ja:'元空軍曹長。金融市場で7年以上の経験。毎日コミュニティに参加し、ライブ取引を行い、質問に答えます。', ko:'전 공군 부사관, 7년 이상의 금융 시장 경력. 매일 커뮤니티에 참여하며 실시간 거래와 질문 답변.', ru:'Бывший сержант ВВС с 7+ годами на финансовом рынке. Ежедневно в сообществе, торгует в прямом эфире и отвечает на вопросы.', tr:'7+ yıllık finans piyasası deneyimine sahip eski Hava Kuvvetleri çavuşu. Her gün toplulukta aktif, canlı işlem yapar ve soruları yanıtlar.' },
  'how.who.p1': { en:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, former Air Force sergeant and professional trader, manually executes all operations in the financial market, buying and selling assets daily.', es:'El CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sargento de la Aeronáutica y trader profesional, ejecuta todas las operaciones manualmente en el mercado financiero, comprando y vendiendo activos a diario.', fr:'Le PDG <span class="text-ink font-medium">Sidnei Oliveira</span>, ancien sergent et trader professionnel, exécute toutes les opérations manuellement, achetant et vendant des actifs quotidiennement.', de:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ehemaliger Unteroffizier und professioneller Trader, führt alle Operationen manuell am Finanzmarkt durch.', it:'Il CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, ex-sergente e trader professionista, esegue tutte le operazioni manualmente nel mercato finanziario.', ar:'الرئيس التنفيذي <span class="text-ink font-medium">سيدني أوليفيرا</span>، رقيب سابق ومتداول محترف، ينفذ جميع العمليات يدوياً في السوق المالي.', zh:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>，前空军军士和专业交易员，在金融市场手动执行所有操作，每天买卖资产。', ja:'CEO <span class="text-ink font-medium">シドネイ・オリヴェイラ</span>は元空軍曹長でプロトレーダー。金融市場で全ての取引を手動で実行しています。', ko:'CEO <span class="text-ink font-medium">시드네이 올리베이라</span>는 전 공군 부사관이자 전문 트레이더로, 금융 시장에서 모든 거래를 수동으로 실행합니다.', ru:'Генеральный директор <span class="text-ink font-medium">Сидней Оливейра</span>, бывший сержант ВВС и профессиональный трейдер, вручную выполняет все операции на финансовом рынке.', tr:'CEO <span class="text-ink font-medium">Sidnei Oliveira</span>, eski Hava Kuvvetleri çavuşu ve profesyonel trader, finansal piyasada tüm işlemleri manuel olarak gerçekleştirir.' },
  'how.who.p2': { en:'Operations happen every day, each lasting 1 minute, in the binary options market. No bots, no algorithms. Human decision based on technical analysis and 7 years of professional experience.', es:'Las operaciones ocurren todos los días, con duración de 1 minuto cada una, en el mercado de opciones binarias. Sin robots, sin algoritmos. Decisión humana basada en análisis técnico y 7 años de experiencia.', fr:'Les opérations ont lieu chaque jour, d\'une durée de 1 minute chacune, sur le marché des options binaires. Pas de robot, pas d\'algorithme. Décision humaine basée sur l\'analyse technique et 7 ans d\'expérience.', de:'Operationen finden täglich statt, jeweils 1 Minute lang, am Markt für binäre Optionen. Kein Bot, kein Algorithmus. Menschliche Entscheidung basierend auf technischer Analyse und 7 Jahren Erfahrung.', it:'Le operazioni avvengono ogni giorno, della durata di 1 minuto ciascuna, nel mercato delle opzioni binarie. Nessun robot, nessun algoritmo. Decisione umana basata sull\'analisi tecnica e 7 anni di esperienza.', ar:'تتم العمليات يومياً، كل منها بمدة دقيقة واحدة، في سوق الخيارات الثنائية. بدون روبوتات، بدون خوارزميات. قرار بشري قائم على التحليل الفني و7 سنوات من الخبرة.', zh:'交易每天进行，每次1分钟，在二元期权市场。没有机器人，没有算法。基于技术分析和7年专业经验的人工决策。', ja:'取引は毎日行われ、各1分間、バイナリーオプション市場で。ロボットなし、アルゴリズムなし。テクニカル分析と7年の経験に基づく人間の判断。', ko:'거래는 매일 바이너리 옵션 시장에서 각 1분씩 진행됩니다. 로봇 없이, 알고리즘 없이. 기술적 분석과 7년의 경험에 기반한 인간의 판단.', ru:'Операции проводятся ежедневно, каждая длится 1 минуту, на рынке бинарных опционов. Без ботов, без алгоритмов. Человеческое решение на основе технического анализа и 7 лет опыта.', tr:'İşlemler her gün, her biri 1 dakika süren ikili opsiyon piyasasında gerçekleşir. Robot yok, algoritma yok. Teknik analize ve 7 yıllık deneyime dayalı insan kararı.' },
  'how.profit.p1': { en:'You invest alongside the CEO. When the operation profits, <span class="text-em font-medium">both you and the company profit</span>. When it doesn\'t perform, <span class="text-ink font-medium">nobody profits</span>. Not you, not Royal Binary.', es:'Inviertes junto con el CEO. Cuando la operación da lucro, <span class="text-em font-medium">tanto tú como la empresa ganan</span>. Cuando no rinde, <span class="text-ink font-medium">nadie gana</span>. Ni tú, ni Royal Binary.', fr:'Vous investissez aux côtés du PDG. Quand l\'opération est rentable, <span class="text-em font-medium">vous et l\'entreprise en profitez</span>. Quand non, <span class="text-ink font-medium">personne ne gagne</span>. Ni vous, ni Royal Binary.', de:'Sie investieren zusammen mit dem CEO. Wenn die Operation Gewinn macht, <span class="text-em font-medium">profitieren Sie und das Unternehmen</span>. Wenn nicht, <span class="text-ink font-medium">gewinnt niemand</span>.', it:'Investi insieme al CEO. Quando l\'operazione genera profitto, <span class="text-em font-medium">sia tu che l\'azienda guadagnate</span>. Quando non performa, <span class="text-ink font-medium">nessuno guadagna</span>.', ar:'تستثمر بجانب المدير التنفيذي. عندما تربح العملية، <span class="text-em font-medium">أنت والشركة تربحان</span>. عندما لا تنجح، <span class="text-ink font-medium">لا أحد يربح</span>.', zh:'您与CEO一起投资。当交易盈利时，<span class="text-em font-medium">您和公司都盈利</span>。当交易不盈利时，<span class="text-ink font-medium">没有人盈利</span>。', ja:'CEOと一緒に投資します。取引が利益を出せば、<span class="text-em font-medium">あなたも会社も利益を得ます</span>。利益が出なければ、<span class="text-ink font-medium">誰も利益を得ません</span>。', ko:'CEO와 함께 투자합니다. 거래가 수익을 내면 <span class="text-em font-medium">당신과 회사 모두 수익</span>을 얻습니다. 그렇지 않으면 <span class="text-ink font-medium">아무도 수익을 얻지 못합니다</span>.', ru:'Вы инвестируете вместе с CEO. Когда операция приносит прибыль, <span class="text-em font-medium">зарабатываете и вы, и компания</span>. Когда нет — <span class="text-ink font-medium">никто не зарабатывает</span>.', tr:'CEO ile birlikte yatırım yaparsınız. İşlem kâr ettiğinde <span class="text-em font-medium">siz ve şirket kazanır</span>. Etmediğinde <span class="text-ink font-medium">kimse kazanmaz</span>.' },
  'how.profit.p2': { en:'The company only earns when it generates results for the investor. This alignment of interests ensures the focus is always on real market performance.', es:'La empresa solo gana cuando genera resultados para el inversor. Este alineamiento de intereses garantiza que el foco esté siempre en la performance real del mercado.', fr:'L\'entreprise ne gagne que lorsqu\'elle génère des résultats pour l\'investisseur. Cet alignement d\'intérêts garantit que le focus reste sur la performance réelle du marché.', de:'Das Unternehmen verdient nur, wenn es Ergebnisse für den Investor generiert. Diese Interessenausrichtung stellt sicher, dass der Fokus immer auf der echten Marktperformance liegt.', it:'L\'azienda guadagna solo quando genera risultati per l\'investitore. Questo allineamento di interessi garantisce che il focus sia sempre sulla performance reale del mercato.', ar:'الشركة تكسب فقط عندما تحقق نتائج للمستثمر. هذا التوافق في المصالح يضمن أن التركيز دائماً على الأداء الحقيقي للسوق.', zh:'公司只有在为投资者创造收益时才能盈利。这种利益一致确保了始终专注于真实的市场表现。', ja:'会社は投資家に成果を出した時のみ利益を得ます。この利益の一致が、常に実際の市場パフォーマンスに焦点を当てることを保証します。', ko:'회사는 투자자에게 수익을 창출할 때만 수익을 얻습니다. 이러한 이해관계의 일치가 항상 실제 시장 성과에 집중하도록 보장합니다.', ru:'Компания зарабатывает только когда приносит результаты инвестору. Это совпадение интересов гарантирует, что фокус всегда на реальной рыночной эффективности.', tr:'Şirket yalnızca yatırımcı için sonuç ürettiğinde kazanır. Bu çıkar uyumu, odağın her zaman gerçek piyasa performansında olmasını sağlar.' },
  'how.videocta': { en:'Ask the CEO <span class="text-em">your questions here</span>', es:'Resuelve tus dudas <span class="text-em">con el CEO aquí</span>', fr:'Posez vos questions <span class="text-em">au PDG ici</span>', de:'Stellen Sie Ihre Fragen <span class="text-em">dem CEO hier</span>', it:'Fai le tue domande <span class="text-em">al CEO qui</span>', ar:'اطرح أسئلتك <span class="text-em">على المدير التنفيذي هنا</span>', zh:'在这里向CEO <span class="text-em">提问</span>', ja:'CEOに<span class="text-em">質問はこちら</span>', ko:'CEO에게 <span class="text-em">질문하세요</span>', ru:'Задайте вопросы <span class="text-em">CEO здесь</span>', tr:'CEO\'ya sorularınızı <span class="text-em">burada sorun</span>' },
  'how.origin': { en:'Origin of profits', es:'Origen del lucro', fr:'Origine des bénéfices', de:'Herkunft der Gewinne', it:'Origine dei profitti', ar:'مصدر الأرباح', zh:'利润来源', ja:'利益の源泉', ko:'수익의 원천', ru:'Происхождение прибыли', tr:'Kâr kaynağı' },
  'how.origin.p1': { en:'Your returns come exclusively from financial market operations. Real buying and selling of assets. It does not depend on new members joining.', es:'Tu rendimiento proviene exclusivamente de las operaciones en el mercado financiero. Compra y venta real de activos. No depende de la entrada de nuevos miembros.', fr:'Vos rendements proviennent exclusivement des opérations sur le marché financier. Achat et vente réels d\'actifs. Ne dépend pas de l\'entrée de nouveaux membres.', de:'Ihre Rendite stammt ausschließlich aus Finanzmarktoperationen. Echter Kauf und Verkauf von Vermögenswerten. Nicht abhängig von neuen Mitgliedern.', it:'I tuoi rendimenti provengono esclusivamente dalle operazioni nel mercato finanziario. Compravendita reale di asset. Non dipende dall\'ingresso di nuovi membri.', ar:'عوائدك تأتي حصرياً من عمليات السوق المالي. شراء وبيع حقيقي للأصول. لا يعتمد على انضمام أعضاء جدد.', zh:'您的收益完全来自金融市场操作。真实的资产买卖。不依赖新成员加入。', ja:'収益は金融市場の取引からのみ発生します。実際の資産の売買です。新規メンバーの参加に依存しません。', ko:'수익은 금융 시장 운영에서만 발생합니다. 실제 자산 매매입니다. 새로운 회원 가입에 의존하지 않습니다.', ru:'Ваш доход поступает исключительно от операций на финансовом рынке. Реальная покупка и продажа активов. Не зависит от привлечения новых участников.', tr:'Getiriniz yalnızca finansal piyasa işlemlerinden gelir. Gerçek varlık alım satımı. Yeni üye girişine bağlı değildir.' },
  'how.samerisk': { en:'In pyramids, those at the top always win. Here, if the market doesn\'t perform, nobody wins. The company takes the same risk as you.', es:'En pirámides, quien está arriba siempre gana. Aquí, si el mercado no rinde, nadie gana. La empresa asume el mismo riesgo que tú.', fr:'Dans les pyramides, ceux au sommet gagnent toujours. Ici, si le marché ne performe pas, personne ne gagne. L\'entreprise prend le même risque que vous.', de:'In Pyramiden gewinnen die an der Spitze immer. Hier gewinnt niemand, wenn der Markt nicht liefert. Das Unternehmen trägt das gleiche Risiko wie Sie.', it:'Nelle piramidi, chi sta in cima vince sempre. Qui, se il mercato non performa, nessuno vince. L\'azienda assume lo stesso rischio.', ar:'في المخططات الهرمية، من في القمة يربح دائماً. هنا، إذا لم يؤدِ السوق، لا أحد يربح. الشركة تتحمل نفس المخاطر.', zh:'在传销中，顶层的人总是赢。在这里，如果市场表现不佳，没有人赢。公司承担与您相同的风险。', ja:'ピラミッドでは、上位の人が常に勝ちます。ここでは、市場が好調でなければ誰も勝ちません。会社はあなたと同じリスクを負います。', ko:'피라미드에서는 정상에 있는 사람이 항상 이깁니다. 여기서는 시장이 좋지 않으면 아무도 이기지 못합니다. 회사가 같은 리스크를 부담합니다.', ru:'В пирамидах выигрывают те, кто наверху. Здесь, если рынок не работает, никто не выигрывает. Компания берёт на себя тот же риск.', tr:'Piramitlerde, tepedekiler her zaman kazanır. Burada piyasa performans göstermezse kimse kazanmaz. Şirket sizinle aynı riski üstlenir.' },
  'how.transparency': { en:'Total transparency', es:'Transparencia total', fr:'Transparence totale', de:'Totale Transparenz', it:'Trasparenza totale', ar:'شفافية كاملة', zh:'完全透明', ja:'完全な透明性', ko:'완전한 투명성', ru:'Полная прозрачность', tr:'Tam şeffaflık' },
  'how.pyramid': { en:'Financial pyramid', es:'Pirámide financiera', fr:'Pyramide financière', de:'Finanzpyramide', it:'Piramide finanziaria', ar:'هرم مالي', zh:'金融传销', ja:'金融ピラミッド', ko:'금융 피라미드', ru:'Финансовая пирамида', tr:'Finansal piramit' },
  'how.pyr1': { en:'Profits come from new participants', es:'Lucro viene de nuevos participantes', fr:'Les profits viennent de nouveaux participants', de:'Gewinne kommen von neuen Teilnehmern', it:'I profitti vengono da nuovi partecipanti', ar:'الأرباح تأتي من مشاركين جدد', zh:'利润来自新参与者', ja:'利益は新しい参加者から', ko:'수익은 새 참여자에게서 발생', ru:'Прибыль от новых участников', tr:'Kâr yeni katılımcılardan gelir' },
  'how.pyr2': { en:'No product or real operation', es:'Sin producto u operación real', fr:'Pas de produit ni d\'opération réelle', de:'Kein Produkt oder echte Operation', it:'Nessun prodotto o operazione reale', ar:'لا منتج أو عملية حقيقية', zh:'没有产品或真实操作', ja:'商品も実際の取引もなし', ko:'제품이나 실제 운영 없음', ru:'Нет продукта или реальных операций', tr:'Ürün veya gerçek işlem yok' },
  'how.pyr3': { en:'No transparency in operations', es:'Ninguna transparencia en las operaciones', fr:'Aucune transparence dans les opérations', de:'Keine Transparenz bei den Operationen', it:'Nessuna trasparenza nelle operazioni', ar:'لا شفافية في العمليات', zh:'操作没有透明度', ja:'取引に透明性なし', ko:'운영의 투명성 없음', ru:'Никакой прозрачности в операциях', tr:'İşlemlerde şeffaflık yok' },
  'how.rb1': { en:'Profits come from real market operations', es:'Lucro viene de operaciones reales en el mercado', fr:'Les profits viennent d\'opérations réelles sur le marché', de:'Gewinne kommen von echten Marktoperationen', it:'I profitti vengono da operazioni reali di mercato', ar:'الأرباح تأتي من عمليات سوق حقيقية', zh:'利润来自真实的市场操作', ja:'利益は実際の市場取引から', ko:'수익은 실제 시장 운영에서 발생', ru:'Прибыль от реальных рыночных операций', tr:'Kâr gerçek piyasa işlemlerinden gelir' },
  'how.rb2': { en:'Daily buying and selling of financial assets', es:'Compra y venta diaria de activos financieros', fr:'Achat et vente quotidiens d\'actifs financiers', de:'Täglicher Kauf und Verkauf von Finanzanlagen', it:'Compravendita giornaliera di asset finanziari', ar:'شراء وبيع يومي للأصول المالية', zh:'每日买卖金融资产', ja:'金融資産の日次売買', ko:'금융 자산의 일일 매매', ru:'Ежедневная покупка и продажа финансовых активов', tr:'Finansal varlıkların günlük alım satımı' },
  'how.rb3': { en:'Everyone earns based on the same operation', es:'Todos ganan con base en la misma operación', fr:'Tout le monde gagne sur la même opération', de:'Alle verdienen an derselben Operation', it:'Tutti guadagnano sulla stessa operazione', ar:'الجميع يكسب بناءً على نفس العملية', zh:'每个人都基于相同的操作获利', ja:'全員が同じ取引で収益を得る', ko:'모두 같은 거래를 기반으로 수익', ru:'Все зарабатывают на одной и той же операции', tr:'Herkes aynı işleme göre kazanır' },
  'how.grid.market': { en:'Market', es:'Mercado', fr:'Marché', de:'Markt', it:'Mercato', ar:'السوق', zh:'市场', ja:'市場', ko:'시장', ru:'Рынок', tr:'Piyasa' },
  'how.grid.binary': { en:'Binary Options', es:'Opciones Binarias', fr:'Options Binaires', de:'Binäre Optionen', it:'Opzioni Binarie', ar:'الخيارات الثنائية', zh:'二元期权', ja:'バイナリーオプション', ko:'바이너리 옵션', ru:'Бинарные опционы', tr:'İkili Opsiyonlar' },
  'how.grid.ceotrader': { en:'CEO · manual trader', es:'CEO · trader manual', fr:'PDG · trader manuel', de:'CEO · manueller Trader', it:'CEO · trader manuale', ar:'مدير تنفيذي · متداول يدوي', zh:'CEO · 手动交易员', ja:'CEO · 手動トレーダー', ko:'CEO · 수동 트레이더', ru:'CEO · ручной трейдер', tr:'CEO · manuel trader' },
  'how.grid.freq': { en:'Frequency', es:'Frecuencia', fr:'Fréquence', de:'Häufigkeit', it:'Frequenza', ar:'التردد', zh:'频率', ja:'頻度', ko:'빈도', ru:'Частота', tr:'Sıklık' },
  'how.grid.daily': { en:'Daily', es:'Diaria', fr:'Quotidienne', de:'Täglich', it:'Giornaliera', ar:'يومي', zh:'每日', ja:'毎日', ko:'매일', ru:'Ежедневно', tr:'Günlük' },
  'how.grid.multi': { en:'Multiple operations / day', es:'Múltiples operaciones / día', fr:'Plusieurs opérations / jour', de:'Mehrere Operationen / Tag', it:'Operazioni multiple / giorno', ar:'عمليات متعددة / يوم', zh:'每日多次操作', ja:'1日複数回の取引', ko:'하루 여러 거래', ru:'Множество операций / день', tr:'Günde birden fazla işlem' },
  'how.grid.duration': { en:'Duration', es:'Duración', fr:'Durée', de:'Dauer', it:'Durata', ar:'المدة', zh:'持续时间', ja:'取引時間', ko:'기간', ru:'Длительность', tr:'Süre' },
  'how.grid.perop': { en:'per operation', es:'por operación', fr:'par opération', de:'pro Operation', it:'per operazione', ar:'لكل عملية', zh:'每次操作', ja:'1取引あたり', ko:'거래당', ru:'за операцию', tr:'işlem başına' },
  'how.cta': { en:'Open my free account', es:'Abrir mi cuenta gratuita', fr:'Ouvrir mon compte gratuit', de:'Mein kostenloses Konto eröffnen', it:'Apri il mio conto gratuito', ar:'فتح حسابي المجاني', zh:'开设我的免费账户', ja:'無料アカウントを開設', ko:'무료 계정 개설', ru:'Открыть бесплатный аккаунт', tr:'Ücretsiz hesabımı aç' },
  'proof.opsmonth': { en:'Operations / month', es:'Operaciones / mes', fr:'Opérations / mois', de:'Operationen / Monat', it:'Operazioni / mese', ar:'عمليات / شهر', zh:'操作 / 月', ja:'取引 / 月', ko:'거래 / 월', ru:'Операций / месяц', tr:'İşlem / ay' },
  'proof.years': { en:'Years of experience', es:'Años de mercado', fr:'Années d\'expérience', de:'Jahre Erfahrung', it:'Anni di esperienza', ar:'سنوات خبرة', zh:'市场经验年限', ja:'市場経験年数', ko:'시장 경력', ru:'Лет на рынке', tr:'Piyasa deneyimi' },
  'proof.founderexp': { en:'Founder\'s experience', es:'Experiencia del fundador', fr:'Expérience du fondateur', de:'Erfahrung des Gründers', it:'Esperienza del fondatore', ar:'خبرة المؤسس', zh:'创始人经验', ja:'創業者の経験', ko:'창립자 경력', ru:'Опыт основателя', tr:'Kurucunun deneyimi' },
  'proof.substack': { en:'On official Substack', es:'En el Substack oficial', fr:'Sur le Substack officiel', de:'Im offiziellen Substack', it:'Sul Substack ufficiale', ar:'على Substack الرسمي', zh:'在官方Substack上', ja:'公式Substackにて', ko:'공식 Substack에서', ru:'На официальном Substack', tr:'Resmi Substack\'te' },
  'proof.pubops': { en:'Public operations', es:'Operaciones públicas', fr:'Opérations publiques', de:'Öffentliche Operationen', it:'Operazioni pubbliche', ar:'عمليات عامة', zh:'公开操作', ja:'公開取引', ko:'공개 거래', ru:'Публичные операции', tr:'Halka açık işlemler' },
  'trust.company': { en:'company name', es:'razón social', fr:'raison sociale', de:'Firmenname', it:'ragione sociale', ar:'اسم الشركة', zh:'公司名称', ja:'会社名', ko:'회사명', ru:'название компании', tr:'şirket adı' },
  'trust.execution': { en:'execution', es:'ejecución', fr:'exécution', de:'Ausführung', it:'esecuzione', ar:'التنفيذ', zh:'执行', ja:'取引執行', ko:'실행', ru:'исполнение', tr:'işlem' },
  'trust.regulatory': { en:'BR regulatory chain', es:'cadena regulatoria BR', fr:'chaîne réglementaire BR', de:'BR Regulierungskette', it:'catena regolamentare BR', ar:'السلسلة التنظيمية البرازيلية', zh:'巴西监管链', ja:'BR規制チェーン', ko:'BR 규제 체인', ru:'регуляторная цепочка BR', tr:'BR düzenleyici zincir' },
  'trust.reputation': { en:'reputation', es:'reputación', fr:'réputation', de:'Reputation', it:'reputazione', ar:'السمعة', zh:'声誉', ja:'評判', ko:'평판', ru:'репутация', tr:'itibar' },
  'trust.noclaims': { en:'no complaints', es:'sin reclamaciones', fr:'aucune plainte', de:'keine Beschwerden', it:'nessun reclamo', ar:'بدون شكاوى', zh:'无投诉', ja:'クレームなし', ko:'불만 없음', ru:'без жалоб', tr:'şikayet yok' },
  'footer.about': { en:'about', es:'sobre', fr:'à propos', de:'über uns', it:'chi siamo', ar:'حول', zh:'关于', ja:'会社概要', ko:'소개', ru:'о нас', tr:'hakkında' },
  'footer.signup': { en:'sign up', es:'registro', fr:'inscription', de:'registrieren', it:'registrati', ar:'تسجيل', zh:'注册', ja:'登録', ko:'가입', ru:'регистрация', tr:'kayıt' },
};

// Now inject these new translations into the existing T object in the JS
// Find each language block and add the new keys
const languages = ['en', 'es', 'fr', 'de', 'it', 'ar', 'zh', 'ja', 'ko', 'ru', 'tr'];

for (const lang of languages) {
  // Build the entries to add
  const entries = [];
  for (const [key, translations] of Object.entries(newTranslations)) {
    if (translations[lang]) {
      const val = translations[lang].replace(/'/g, "\\'");
      entries.push(`      '${key}': '${val}'`);
    }
  }

  // Find the closing of this language block and add before it
  // The pattern is: 'gate.close': '...' followed by }, for the next lang or end
  const gateClosePattern = new RegExp(`('gate\\.close':\\s*'[^']*')\\s*\\n(\\s*\\},?\\s*\\n\\s*(?:${lang === 'tr' ? '\\};' : "'" }))`);

  // Simpler approach: find the last entry before the closing brace of each lang
  // Find 'gate.close': '...' in the lang block
  const langBlockRegex = new RegExp(`'gate\\.close':\\s*'[^']*'\\n\\s+\\}`, 'g');

  // Actually the simplest: just add before 'gate.close' line for each language
  const gateKey = `gate.close`;
  // Find pattern like: 'gate.close': 'Close'\n    },
  // And replace with: 'gate.close': 'Close',\n      NEW ENTRIES\n    },
}

// Simpler approach: find each lang's gate.close entry and append new keys after it
for (const lang of languages) {
  const entries = [];
  for (const [key, translations] of Object.entries(newTranslations)) {
    if (translations[lang]) {
      const val = translations[lang].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      entries.push(`      '${key}': '${val}'`);
    }
  }

  // Find the gate.close entry for this language and add comma + new entries
  // Pattern: 'gate.close': 'Xxxxx'\n    }
  const regex = new RegExp(`('gate\\.close': '[^']*')\\n(\\s+\\})`);
  const match = html.match(regex);
  if (match) {
    // Only replace the first occurrence we haven't handled yet
    // We need to find the right language block
  }
}

// Most reliable approach: find each language section by its opening
for (const lang of languages) {
  const entries = [];
  for (const [key, translations] of Object.entries(newTranslations)) {
    if (translations[lang]) {
      const val = translations[lang].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      entries.push(`      '${key}': '${val}'`);
    }
  }
  const entriesStr = ',\n' + entries.join(',\n');

  // Find 'gate.close': 'XXXX' that belongs to this lang
  // Each lang block starts with:  langCode: {
  // We need to find the gate.close within the right block

  // Find the lang block boundaries
  const langStart = html.indexOf(`    ${lang}: {`);
  if (langStart === -1) continue;

  // Find the next closing brace for this block
  let braceCount = 0;
  let langEnd = -1;
  for (let i = langStart; i < html.length; i++) {
    if (html[i] === '{') braceCount++;
    if (html[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        langEnd = i;
        break;
      }
    }
  }
  if (langEnd === -1) continue;

  // Find 'gate.close' within this block
  const blockContent = html.substring(langStart, langEnd);
  const gateIdx = blockContent.lastIndexOf("'gate.close'");
  if (gateIdx === -1) continue;

  // Find the end of the gate.close value (the closing quote)
  const absoluteGateIdx = langStart + gateIdx;
  const afterGate = html.indexOf("'", html.indexOf("'", html.indexOf(":", absoluteGateIdx) + 1) + 1);

  // Insert new entries after gate.close line
  html = html.substring(0, afterGate + 1) + entriesStr + html.substring(afterGate + 1);
}

fs.writeFileSync(path, html, 'utf8');
console.log('Done! Added i18n attributes and translations.');
