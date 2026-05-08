const fs = require('fs');
const path = 'C:/Users/samue/royalbinary-lp/index.html';
let html = fs.readFileSync(path, 'utf8');

// PLANS SECTION
const planReplacements = [
  // Plan labels - use replace_all pattern for repeated items
  ['<span class="text-mute text-sm">ao mês*</span>', '<span class="text-mute text-sm" data-i18n="plans.permonth">ao mês*</span>'],
  ['>Selecionar plano →</a>', ' data-i18n="plans.select">Selecionar plano →</a>'],
  ['<span>Duração</span>', '<span data-i18n="plans.duration">Duração</span>'],
  ['<span>Aporte mín.</span>', '<span data-i18n="plans.mindeposit">Aporte mín.</span>'],
  ['<span>Aporte máx.</span>', '<span data-i18n="plans.maxdeposit">Aporte máx.</span>'],
  ['<span>Divisão</span>', '<span data-i18n="plans.split">Divisão</span>'],
  ['>2 meses</span>', ' data-i18n="plans.2months">2 meses</span>'],
  ['>4 meses</span>', ' data-i18n="plans.4months">4 meses</span>'],
  ['>6 meses</span>', ' data-i18n="plans.6months">6 meses</span>'],
  ['<p class="mt-1 text-[14px] text-mute">Para iniciantes que querem testar o modelo.</p>', '<p class="mt-1 text-[14px] text-mute" data-i18n="plans.light.desc">Para iniciantes que querem testar o modelo.</p>'],
  ['<p class="mt-1 text-[14px] text-mute">Para crescimento consistente com gestão profissional.</p>', '<p class="mt-1 text-[14px] text-mute" data-i18n="plans.inter.desc">Para crescimento consistente com gestão profissional.</p>'],
  ['<p class="mt-1 text-[14px] text-mute">Para investidores de longo prazo.</p>', '<p class="mt-1 text-[14px] text-mute" data-i18n="plans.adv.desc">Para investidores de longo prazo.</p>'],
  ['>mais escolhido</span>', ' data-i18n="plans.popular">mais escolhido</span>'],
  // "Toque para ouvir com som" in stories
  ['TOQUE NUMA BOLINHA PARA OUVIR COM SOM', '<span data-i18n="stories.tap">TOQUE NUMA BOLINHA PARA OUVIR COM SOM</span>'],
];

for (const [old, replacement] of planReplacements) {
  html = html.split(old).join(replacement);
}

// PROBLEMA SECTION
const read1008 = html.indexOf('<!-- PROBLEMA -->');
if (read1008 !== -1) {
  // Read and add tags for problema section items
}

// Read remaining sections for specific text
const moreReplacements = [
  // Problema section red flags
  ['Cansado de plataformas que prometem mundos e somem com seu dinheiro?', 'Cansado de plataformas que prometem mundos e somem com seu dinheiro?'],
  // Gerente cards
  ['<span>plano · de · gerentes</span>', '<span data-i18n="earn.managertitle">plano · de · gerentes</span>'],
  ['<span class="text-em">[ ativo ]</span>', '<span class="text-em" data-i18n="earn.active">[ ativo ]</span>'],
  ['<div class="mono text-[11px] uppercase tracking-widest text-mute2">Nível inicial</div>', '<div class="mono text-[11px] uppercase tracking-widest text-mute2" data-i18n="earn.initial">Nível inicial</div>'],
  ['<div class="mono text-[11px] uppercase tracking-widest text-em2">Top tier</div>', '<div class="mono text-[11px] uppercase tracking-widest text-em2" data-i18n="earn.toptier">Top tier</div>'],
  ['>Gerente Júnior</h3>', ' data-i18n="earn.junior">Gerente Júnior</h3>'],
  ['>Gerente Black</h3>', ' data-i18n="earn.black">Gerente Black</h3>'],
  ['<span class="text-mute text-sm">sobre contratos diretos</span>', '<span class="text-mute text-sm" data-i18n="earn.directcontracts">sobre contratos diretos</span>'],
  // Commission items
  ['Comissão sobre todos os contratos ativos originados', '<span data-i18n="earn.commission1">Comissão sobre todos os contratos ativos originados</span>'],
  ['Requisito: aprovação + 1º contrato ativo', '<span data-i18n="earn.req1">Requisito: aprovação + 1º contrato ativo</span>'],
  ['Construção da carteira própria', '<span data-i18n="earn.portfolio">Construção da carteira própria</span>'],
  ['Maior percentual de comissão direta', '<span data-i18n="earn.highestpct">Maior percentual de comissão direta</span>'],
  ['Acesso a benefícios exclusivos de liderança', '<span data-i18n="earn.leadership">Acesso a benefícios exclusivos de liderança</span>'],
  // Network commission label
  ['Comissão sobre rede (níveis indiretos)', '<span data-i18n="earn.network">Comissão sobre rede (níveis indiretos)</span>'],
  // Level labels
  ['2º nível', '<span data-i18n="earn.level2">2º nível</span>'],
  ['3º nível', '<span data-i18n="earn.level3">3º nível</span>'],
  ['4º nível', '<span data-i18n="earn.level4">4º nível</span>'],
  ['5º nível', '<span data-i18n="earn.level5">5º nível</span>'],
  // Payment info
  ['Pagamento', '<span data-i18n="earn.payment">Pagamento</span>'],
  ['Toda sexta-feira', '<span data-i18n="earn.friday">Toda sexta-feira</span>'],
  ['Processamento', '<span data-i18n="earn.processing">Processamento</span>'],
  ['até 3 dias úteis', '<span data-i18n="earn.3days">até 3 dias úteis</span>'],
  ['Taxa saque', '<span data-i18n="earn.fee">Taxa saque</span>'],
  // FAQ questions and answers
  ['A Royal Binary é uma empresa registrada?', '<span data-i18n="faq.q1">A Royal Binary é uma empresa registrada?</span>'],
  ['Sim. Royal Binary LTDA, CNPJ 64.020.950/0001-60, com sede na Avenida Paulista, 807, São Paulo.', '<span data-i18n="faq.a1">Sim. Royal Binary LTDA, CNPJ 64.020.950/0001-60, com sede na Avenida Paulista, 807, São Paulo.</span>'],
  ['Como funciona o modelo 50/50?', '<span data-i18n="faq.q2">Como funciona o modelo 50/50?</span>'],
  ['Os investidores ficam com metade dos lucros gerados; a Royal Binary retém a outra metade como tarifa.', '<span data-i18n="faq.a2">Os investidores ficam com metade dos lucros gerados; a Royal Binary retém a outra metade como tarifa.</span>'],
  ['Como sei que as operações são reais?', '<span data-i18n="faq.q3">Como sei que as operações são reais?</span>'],
  ['Após criar conta gratuita, você recebe acesso aos canais oficiais onde toda operação é publicada em tempo real.', '<span data-i18n="faq.a3">Após criar conta gratuita, você recebe acesso aos canais oficiais onde toda operação é publicada em tempo real.</span>'],
  ['Quando posso sacar meus lucros?', '<span data-i18n="faq.q4">Quando posso sacar meus lucros?</span>'],
  ['Saques disponíveis nos dias 1 e 15 de cada mês. Processamento em até 3 dias úteis via Pix ou cripto.', '<span data-i18n="faq.a4">Saques disponíveis nos dias 1 e 15 de cada mês. Processamento em até 3 dias úteis via Pix ou cripto.</span>'],
  ['Existe risco?', '<span data-i18n="faq.q5">Existe risco?</span>'],
  ['Sim. Como qualquer operação no mercado financeiro, há risco. A diferença é que aqui as operações são reais e transparentes.', '<span data-i18n="faq.a5">Sim. Como qualquer operação no mercado financeiro, há risco. A diferença é que aqui as operações são reais e transparentes.</span>'],
  // Comunidade channels
  ['Canal do Telegram', '<span data-i18n="community.telegram">Canal do Telegram</span>'],
  ['Grupo oficial WhatsApp', '<span data-i18n="community.wagroup">Grupo oficial WhatsApp</span>'],
  ['Análise diária do CEO', '<span data-i18n="community.ceodaily">Análise diária do CEO</span>'],
  // Bastidores cities
  ['Não vivemos só atrás de uma tela.', 'Não vivemos só atrás de uma tela.'],
  // CTA section texts - already tagged

  // Instagram / Substack buttons
  ['Ver mais no Instagram →', '<span data-i18n="proof.insta">Ver mais no Instagram →</span>'],
  ['Ler artigos no Substack →', '<span data-i18n="proof.substackbtn">Ler artigos no Substack →</span>'],

  // Perguntas frequentes title - already tagged
  ['Perguntas frequentes.', 'Perguntas frequentes.'],
];

for (const [old, replacement] of moreReplacements) {
  if (old === replacement) continue; // skip no-ops
  if (html.includes(old)) {
    html = html.replace(old, replacement);
  }
}

// Now add translations for all new keys to each language block
const newTranslations = {
  'plans.permonth': { en:'per month*', es:'al mes*', fr:'par mois*', de:'pro Monat*', it:'al mese*', ar:'شهرياً*', zh:'每月*', ja:'月*', ko:'월*', ru:'в месяц*', tr:'aylık*' },
  'plans.select': { en:'Select plan →', es:'Seleccionar plan →', fr:'Choisir ce plan →', de:'Plan wählen →', it:'Seleziona piano →', ar:'اختيار الخطة →', zh:'选择方案 →', ja:'プラン選択 →', ko:'플랜 선택 →', ru:'Выбрать план →', tr:'Plan seç →' },
  'plans.duration': { en:'Duration', es:'Duración', fr:'Durée', de:'Laufzeit', it:'Durata', ar:'المدة', zh:'期限', ja:'期間', ko:'기간', ru:'Срок', tr:'Süre' },
  'plans.mindeposit': { en:'Min. deposit', es:'Aporte mín.', fr:'Apport min.', de:'Min. Einlage', it:'Deposito min.', ar:'الحد الأدنى', zh:'最低投资', ja:'最低額', ko:'최소 투자', ru:'Мин. вклад', tr:'Min. yatırım' },
  'plans.maxdeposit': { en:'Max. deposit', es:'Aporte máx.', fr:'Apport max.', de:'Max. Einlage', it:'Deposito max.', ar:'الحد الأقصى', zh:'最高投资', ja:'最高額', ko:'최대 투자', ru:'Макс. вклад', tr:'Maks. yatırım' },
  'plans.split': { en:'Split', es:'División', fr:'Partage', de:'Aufteilung', it:'Divisione', ar:'التقسيم', zh:'分成', ja:'分配', ko:'배분', ru:'Разделение', tr:'Paylaşım' },
  'plans.2months': { en:'2 months', es:'2 meses', fr:'2 mois', de:'2 Monate', it:'2 mesi', ar:'شهران', zh:'2个月', ja:'2ヶ月', ko:'2개월', ru:'2 месяца', tr:'2 ay' },
  'plans.4months': { en:'4 months', es:'4 meses', fr:'4 mois', de:'4 Monate', it:'4 mesi', ar:'4 أشهر', zh:'4个月', ja:'4ヶ月', ko:'4개월', ru:'4 месяца', tr:'4 ay' },
  'plans.6months': { en:'6 months', es:'6 meses', fr:'6 mois', de:'6 Monate', it:'6 mesi', ar:'6 أشهر', zh:'6个月', ja:'6ヶ月', ko:'6개월', ru:'6 месяцев', tr:'6 ay' },
  'plans.light.desc': { en:'For beginners who want to test the model.', es:'Para principiantes que quieren probar el modelo.', fr:'Pour les débutants qui veulent tester le modèle.', de:'Für Einsteiger, die das Modell testen möchten.', it:'Per principianti che vogliono testare il modello.', ar:'للمبتدئين الذين يريدون تجربة النموذج.', zh:'适合想要测试模式的新手。', ja:'モデルを試したい初心者向け。', ko:'모델을 테스트하려는 초보자용.', ru:'Для новичков, желающих протестировать модель.', tr:'Modeli test etmek isteyen yeni başlayanlar için.' },
  'plans.inter.desc': { en:'For consistent growth with professional management.', es:'Para crecimiento consistente con gestión profesional.', fr:'Pour une croissance constante avec gestion professionnelle.', de:'Für beständiges Wachstum mit professionellem Management.', it:'Per una crescita costante con gestione professionale.', ar:'للنمو المستمر مع إدارة مهنية.', zh:'通过专业管理实现稳定增长。', ja:'プロの運用で安定成長を目指す方向け。', ko:'전문적 관리를 통한 꾸준한 성장을 위해.', ru:'Для стабильного роста с профессиональным управлением.', tr:'Profesyonel yönetimle istikrarlı büyüme için.' },
  'plans.adv.desc': { en:'For long-term investors.', es:'Para inversores a largo plazo.', fr:'Pour les investisseurs long terme.', de:'Für langfristige Investoren.', it:'Per investitori a lungo termine.', ar:'للمستثمرين على المدى الطويل.', zh:'适合长期投资者。', ja:'長期投資家向け。', ko:'장기 투자자를 위해.', ru:'Для долгосрочных инвесторов.', tr:'Uzun vadeli yatırımcılar için.' },
  'plans.popular': { en:'most popular', es:'más elegido', fr:'le plus choisi', de:'beliebteste', it:'più scelto', ar:'الأكثر اختياراً', zh:'最受欢迎', ja:'最も人気', ko:'가장 인기', ru:'самый популярный', tr:'en popüler' },
  'stories.tap': { en:'TAP A CIRCLE TO LISTEN WITH SOUND', es:'TOCA UN CÍRCULO PARA ESCUCHAR CON SONIDO', fr:'APPUYEZ SUR UN CERCLE POUR ÉCOUTER', de:'TIPPEN SIE AUF EINEN KREIS ZUM ANHÖREN', it:'TOCCA UN CERCHIO PER ASCOLTARE', ar:'اضغط على دائرة للاستماع بالصوت', zh:'点击圆圈收听', ja:'丸をタップして音声を聞く', ko:'원을 탭하여 소리 듣기', ru:'НАЖМИТЕ НА КРУЖОК, ЧТОБЫ ПОСЛУШАТЬ', tr:'SES İÇİN BİR DAİREYE DOKUNUN' },
  'earn.managertitle': { en:'manager · plan', es:'plan · de · gerentes', fr:'plan · de · managers', de:'Manager · Plan', it:'piano · manager', ar:'خطة · المدير', zh:'经理 · 计划', ja:'マネージャー · プラン', ko:'매니저 · 플랜', ru:'план · менеджеров', tr:'yönetici · planı' },
  'earn.active': { en:'[ active ]', es:'[ activo ]', fr:'[ actif ]', de:'[ aktiv ]', it:'[ attivo ]', ar:'[ نشط ]', zh:'[ 活跃 ]', ja:'[ アクティブ ]', ko:'[ 활성 ]', ru:'[ активно ]', tr:'[ aktif ]' },
  'earn.initial': { en:'Initial level', es:'Nivel inicial', fr:'Niveau initial', de:'Einstiegsstufe', it:'Livello iniziale', ar:'المستوى المبدئي', zh:'初始级别', ja:'初級レベル', ko:'초기 레벨', ru:'Начальный уровень', tr:'Başlangıç seviyesi' },
  'earn.toptier': { en:'Top tier', es:'Top tier', fr:'Top tier', de:'Top Tier', it:'Top tier', ar:'المستوى الأعلى', zh:'顶级', ja:'トップティア', ko:'탑 티어', ru:'Топ уровень', tr:'Üst seviye' },
  'earn.junior': { en:'Junior Manager', es:'Gerente Júnior', fr:'Manager Junior', de:'Junior Manager', it:'Manager Junior', ar:'مدير مبتدئ', zh:'初级经理', ja:'ジュニアマネージャー', ko:'주니어 매니저', ru:'Младший менеджер', tr:'Junior Yönetici' },
  'earn.black': { en:'Black Manager', es:'Gerente Black', fr:'Manager Black', de:'Black Manager', it:'Manager Black', ar:'مدير بلاك', zh:'黑金经理', ja:'ブラックマネージャー', ko:'블랙 매니저', ru:'Блэк менеджер', tr:'Black Yönetici' },
  'earn.directcontracts': { en:'on direct contracts', es:'sobre contratos directos', fr:'sur contrats directs', de:'auf direkte Verträge', it:'su contratti diretti', ar:'على العقود المباشرة', zh:'直接合同', ja:'直接契約に対して', ko:'직접 계약 기준', ru:'на прямые контракты', tr:'doğrudan sözleşmeler üzerinden' },
  'earn.commission1': { en:'Commission on all active originated contracts', es:'Comisión sobre todos los contratos activos originados', fr:'Commission sur tous les contrats actifs générés', de:'Provision auf alle aktiven Verträge', it:'Commissione su tutti i contratti attivi originati', ar:'عمولة على جميع العقود النشطة', zh:'所有活跃合同的佣金', ja:'全アクティブ契約への手数料', ko:'모든 활성 계약에 대한 커미션', ru:'Комиссия со всех активных контрактов', tr:'Tüm aktif sözleşmelere komisyon' },
  'earn.req1': { en:'Requirement: approval + 1st active contract', es:'Requisito: aprobación + 1er contrato activo', fr:'Requis : approbation + 1er contrat actif', de:'Voraussetzung: Genehmigung + 1. aktiver Vertrag', it:'Requisito: approvazione + 1° contratto attivo', ar:'المتطلب: الموافقة + أول عقد نشط', zh:'要求：审批 + 首个活跃合同', ja:'要件：承認 + 初回アクティブ契約', ko:'요건: 승인 + 첫 번째 활성 계약', ru:'Требование: одобрение + 1-й активный контракт', tr:'Gereksinim: onay + 1. aktif sözleşme' },
  'earn.portfolio': { en:'Build your own portfolio', es:'Construcción de cartera propia', fr:'Construction de portefeuille propre', de:'Aufbau des eigenen Portfolios', it:'Costruzione del proprio portafoglio', ar:'بناء محفظتك الخاصة', zh:'构建自己的投资组合', ja:'自分のポートフォリオ構築', ko:'자체 포트폴리오 구축', ru:'Создание собственного портфеля', tr:'Kendi portföyünüzü oluşturun' },
  'earn.highestpct': { en:'Highest direct commission percentage', es:'Mayor porcentaje de comisión directa', fr:'Plus haut pourcentage de commission directe', de:'Höchster Direktprovisionsanteil', it:'Percentuale di commissione diretta più alta', ar:'أعلى نسبة عمولة مباشرة', zh:'最高直接佣金比例', ja:'最高の直接手数料率', ko:'가장 높은 직접 커미션 비율', ru:'Самый высокий процент прямой комиссии', tr:'En yüksek doğrudan komisyon yüzdesi' },
  'earn.leadership': { en:'Access to exclusive leadership benefits', es:'Acceso a beneficios exclusivos de liderazgo', fr:'Accès aux avantages exclusifs de leadership', de:'Zugang zu exklusiven Führungsvorteilen', it:'Accesso a benefici esclusivi di leadership', ar:'الوصول إلى مزايا القيادة الحصرية', zh:'获得专属领导力福利', ja:'限定リーダーシップ特典へのアクセス', ko:'독점 리더십 혜택 접근', ru:'Доступ к эксклюзивным лидерским преимуществам', tr:'Özel liderlik avantajlarına erişim' },
  'earn.network': { en:'Network commission (indirect levels)', es:'Comisión sobre red (niveles indirectos)', fr:'Commission réseau (niveaux indirects)', de:'Netzwerkprovision (indirekte Stufen)', it:'Commissione rete (livelli indiretti)', ar:'عمولة الشبكة (مستويات غير مباشرة)', zh:'网络佣金（间接层级）', ja:'ネットワーク手数料（間接レベル）', ko:'네트워크 커미션 (간접 레벨)', ru:'Комиссия с сети (косвенные уровни)', tr:'Ağ komisyonu (dolaylı seviyeler)' },
  'earn.level2': { en:'2nd level', es:'2º nivel', fr:'2e niveau', de:'2. Stufe', it:'2° livello', ar:'المستوى الثاني', zh:'第2级', ja:'第2レベル', ko:'2단계', ru:'2-й уровень', tr:'2. seviye' },
  'earn.level3': { en:'3rd level', es:'3er nivel', fr:'3e niveau', de:'3. Stufe', it:'3° livello', ar:'المستوى الثالث', zh:'第3级', ja:'第3レベル', ko:'3단계', ru:'3-й уровень', tr:'3. seviye' },
  'earn.level4': { en:'4th level', es:'4º nivel', fr:'4e niveau', de:'4. Stufe', it:'4° livello', ar:'المستوى الرابع', zh:'第4级', ja:'第4レベル', ko:'4단계', ru:'4-й уровень', tr:'4. seviye' },
  'earn.level5': { en:'5th level', es:'5º nivel', fr:'5e niveau', de:'5. Stufe', it:'5° livello', ar:'المستوى الخامس', zh:'第5级', ja:'第5レベル', ko:'5단계', ru:'5-й уровень', tr:'5. seviye' },
  'earn.payment': { en:'Payment', es:'Pago', fr:'Paiement', de:'Zahlung', it:'Pagamento', ar:'الدفع', zh:'付款', ja:'支払い', ko:'결제', ru:'Оплата', tr:'Ödeme' },
  'earn.friday': { en:'Every Friday', es:'Todos los viernes', fr:'Chaque vendredi', de:'Jeden Freitag', it:'Ogni venerdì', ar:'كل جمعة', zh:'每周五', ja:'毎週金曜', ko:'매주 금요일', ru:'Каждую пятницу', tr:'Her Cuma' },
  'earn.processing': { en:'Processing', es:'Procesamiento', fr:'Traitement', de:'Bearbeitung', it:'Elaborazione', ar:'المعالجة', zh:'处理', ja:'処理', ko:'처리', ru:'Обработка', tr:'İşleme' },
  'earn.3days': { en:'up to 3 business days', es:'hasta 3 días hábiles', fr:'jusqu\'à 3 jours ouvrés', de:'bis zu 3 Werktage', it:'fino a 3 giorni lavorativi', ar:'حتى 3 أيام عمل', zh:'最多3个工作日', ja:'最大3営業日', ko:'최대 영업일 3일', ru:'до 3 рабочих дней', tr:'3 iş gününe kadar' },
  'earn.fee': { en:'Withdrawal fee', es:'Tasa de retiro', fr:'Frais de retrait', de:'Auszahlungsgebühr', it:'Commissione prelievo', ar:'رسوم السحب', zh:'提款费', ja:'出金手数料', ko:'출금 수수료', ru:'Комиссия за вывод', tr:'Çekim ücreti' },
  'faq.q1': { en:'Is Royal Binary a registered company?', es:'¿Es Royal Binary una empresa registrada?', fr:'Royal Binary est-elle une entreprise enregistrée ?', de:'Ist Royal Binary ein registriertes Unternehmen?', it:'Royal Binary è un\'azienda registrata?', ar:'هل Royal Binary شركة مسجلة؟', zh:'Royal Binary是注册公司吗？', ja:'Royal Binaryは登録企業ですか？', ko:'Royal Binary는 등록된 회사인가요?', ru:'Зарегистрирована ли Royal Binary?', tr:'Royal Binary kayıtlı bir şirket mi?' },
  'faq.a1': { en:'Yes. Royal Binary LTDA, CNPJ 64.020.950/0001-60, headquartered at Avenida Paulista, 807, São Paulo.', es:'Sí. Royal Binary LTDA, CNPJ 64.020.950/0001-60, con sede en Avenida Paulista, 807, São Paulo.', fr:'Oui. Royal Binary LTDA, CNPJ 64.020.950/0001-60, siège à Avenida Paulista, 807, São Paulo.', de:'Ja. Royal Binary LTDA, CNPJ 64.020.950/0001-60, Sitz in der Avenida Paulista, 807, São Paulo.', it:'Sì. Royal Binary LTDA, CNPJ 64.020.950/0001-60, sede in Avenida Paulista, 807, São Paulo.', ar:'نعم. Royal Binary LTDA، CNPJ 64.020.950/0001-60، المقر في أفينيدا باوليستا 807، ساو باولو.', zh:'是的。Royal Binary LTDA，CNPJ 64.020.950/0001-60，总部位于圣保罗保利斯塔大道807号。', ja:'はい。Royal Binary LTDA、CNPJ 64.020.950/0001-60、サンパウロ、アベニーダ・パウリスタ807に本社。', ko:'네. Royal Binary LTDA, CNPJ 64.020.950/0001-60, 상파울루 아베니다 파울리스타 807에 본사.', ru:'Да. Royal Binary LTDA, CNPJ 64.020.950/0001-60, штаб-квартира на Авенида Паулиста, 807, Сан-Паулу.', tr:'Evet. Royal Binary LTDA, CNPJ 64.020.950/0001-60, merkezi Avenida Paulista, 807, São Paulo.' },
  'faq.q2': { en:'How does the 50/50 model work?', es:'¿Cómo funciona el modelo 50/50?', fr:'Comment fonctionne le modèle 50/50 ?', de:'Wie funktioniert das 50/50-Modell?', it:'Come funziona il modello 50/50?', ar:'كيف يعمل نموذج 50/50؟', zh:'50/50模式如何运作？', ja:'50/50モデルはどう機能しますか？', ko:'50/50 모델은 어떻게 작동하나요?', ru:'Как работает модель 50/50?', tr:'50/50 modeli nasıl çalışır?' },
  'faq.a2': { en:'Investors keep half of the generated profits; Royal Binary retains the other half as a fee.', es:'Los inversores se quedan con la mitad de las ganancias; Royal Binary retiene la otra mitad como tarifa.', fr:'Les investisseurs conservent la moitié des bénéfices ; Royal Binary retient l\'autre moitié.', de:'Anleger behalten die Hälfte der Gewinne; Royal Binary behält die andere Hälfte als Gebühr.', it:'Gli investitori tengono metà dei profitti; Royal Binary trattiene l\'altra metà come commissione.', ar:'يحتفظ المستثمرون بنصف الأرباح؛ تحتفظ Royal Binary بالنصف الآخر كرسوم.', zh:'投资者保留一半利润；Royal Binary保留另一半作为费用。', ja:'投資家は利益の半分を保持し、Royal Binaryがもう半分を手数料として保持します。', ko:'투자자는 수익의 절반을 가져가고, Royal Binary가 나머지 절반을 수수료로 보유합니다.', ru:'Инвесторы оставляют половину прибыли; Royal Binary удерживает вторую половину как комиссию.', tr:'Yatırımcılar kârın yarısını alır; Royal Binary diğer yarısını ücret olarak tutar.' },
  'faq.q3': { en:'How do I know the operations are real?', es:'¿Cómo sé que las operaciones son reales?', fr:'Comment savoir si les opérations sont réelles ?', de:'Woher weiß ich, dass die Operationen echt sind?', it:'Come faccio a sapere che le operazioni sono reali?', ar:'كيف أعرف أن العمليات حقيقية؟', zh:'我如何知道交易是真实的？', ja:'取引が本物だとどうやって分かりますか？', ko:'거래가 진짜인지 어떻게 알 수 있나요?', ru:'Как узнать, что операции реальны?', tr:'İşlemlerin gerçek olduğunu nasıl bilebilirim?' },
  'faq.a3': { en:'After creating a free account, you get access to official channels where every operation is published in real time.', es:'Tras crear cuenta gratuita, recibes acceso a los canales oficiales donde toda operación es publicada en tiempo real.', fr:'Après avoir créé un compte gratuit, vous accédez aux canaux officiels où chaque opération est publiée en temps réel.', de:'Nach der kostenlosen Registrierung erhalten Sie Zugang zu offiziellen Kanälen, wo jede Operation in Echtzeit veröffentlicht wird.', it:'Dopo aver creato un account gratuito, hai accesso ai canali ufficiali dove ogni operazione è pubblicata in tempo reale.', ar:'بعد إنشاء حساب مجاني، تحصل على وصول للقنوات الرسمية حيث تُنشر كل عملية في الوقت الفعلي.', zh:'创建免费账户后，您可以访问官方渠道，所有操作都会实时发布。', ja:'無料アカウント作成後、全取引がリアルタイムで公開される公式チャンネルにアクセスできます。', ko:'무료 계정 생성 후, 모든 거래가 실시간으로 게시되는 공식 채널에 접근할 수 있습니다.', ru:'После создания бесплатного аккаунта вы получаете доступ к официальным каналам, где каждая операция публикуется в реальном времени.', tr:'Ücretsiz hesap oluşturduktan sonra, her işlemin gerçek zamanlı yayınlandığı resmi kanallara erişirsiniz.' },
  'faq.q4': { en:'When can I withdraw my profits?', es:'¿Cuándo puedo retirar mis ganancias?', fr:'Quand puis-je retirer mes bénéfices ?', de:'Wann kann ich meine Gewinne abheben?', it:'Quando posso prelevare i miei profitti?', ar:'متى يمكنني سحب أرباحي؟', zh:'我什么时候可以提取利润？', ja:'いつ利益を引き出せますか？', ko:'언제 수익을 인출할 수 있나요?', ru:'Когда я могу вывести прибыль?', tr:'Kârımı ne zaman çekebilirim?' },
  'faq.a4': { en:'Withdrawals available on the 1st and 15th of each month. Processing within 3 business days via Pix or crypto.', es:'Retiros disponibles los días 1 y 15 de cada mes. Procesamiento en hasta 3 días hábiles vía Pix o cripto.', fr:'Retraits disponibles les 1er et 15 de chaque mois. Traitement en 3 jours ouvrés via Pix ou crypto.', de:'Auszahlungen am 1. und 15. jedes Monats. Bearbeitung in bis zu 3 Werktagen via Pix oder Krypto.', it:'Prelievi disponibili il 1° e il 15 di ogni mese. Elaborazione entro 3 giorni lavorativi via Pix o crypto.', ar:'السحب متاح في الأول والخامس عشر من كل شهر. المعالجة خلال 3 أيام عمل عبر Pix أو العملات المشفرة.', zh:'每月1日和15日可提款。通过Pix或加密货币在3个工作日内处理。', ja:'毎月1日と15日に出金可能。Pixまたは暗号資産で3営業日以内に処理。', ko:'매월 1일과 15일에 출금 가능. Pix 또는 암호화폐로 3영업일 내 처리.', ru:'Вывод доступен 1-го и 15-го числа каждого месяца. Обработка в течение 3 рабочих дней через Pix или крипто.', tr:'Her ayın 1\'i ve 15\'inde çekim yapılabilir. Pix veya kripto ile 3 iş günü içinde işlenir.' },
  'faq.q5': { en:'Is there risk involved?', es:'¿Existe riesgo?', fr:'Y a-t-il des risques ?', de:'Gibt es Risiken?', it:'C\'è un rischio?', ar:'هل هناك مخاطر؟', zh:'有风险吗？', ja:'リスクはありますか？', ko:'위험이 있나요?', ru:'Есть ли риск?', tr:'Risk var mı?' },
  'faq.a5': { en:'Yes. Like any financial market operation, there is risk. The difference is that here operations are real and transparent.', es:'Sí. Como cualquier operación en el mercado financiero, hay riesgo. La diferencia es que aquí las operaciones son reales y transparentes.', fr:'Oui. Comme toute opération sur les marchés financiers, il y a des risques. La différence est qu\'ici les opérations sont réelles et transparentes.', de:'Ja. Wie jede Finanzmarktoperation birgt es Risiken. Der Unterschied ist, dass die Operationen hier real und transparent sind.', it:'Sì. Come qualsiasi operazione nel mercato finanziario, c\'è un rischio. La differenza è che qui le operazioni sono reali e trasparenti.', ar:'نعم. كأي عملية في السوق المالي، هناك مخاطر. الفرق أن العمليات هنا حقيقية وشفافة.', zh:'是的。与任何金融市场操作一样，存在风险。不同的是，这里的操作是真实和透明的。', ja:'はい。金融市場の取引には常にリスクがあります。違いは、ここでの取引が実際で透明であることです。', ko:'네. 모든 금융 시장 운영과 마찬가지로 위험이 있습니다. 차이점은 여기서의 거래는 실제이고 투명하다는 것입니다.', ru:'Да. Как и любая операция на финансовом рынке, есть риски. Разница в том, что здесь операции реальные и прозрачные.', tr:'Evet. Her finansal piyasa işleminde olduğu gibi risk vardır. Fark, buradaki işlemlerin gerçek ve şeffaf olmasıdır.' },
  'community.telegram': { en:'Telegram Channel', es:'Canal de Telegram', fr:'Canal Telegram', de:'Telegram-Kanal', it:'Canale Telegram', ar:'قناة تيليجرام', zh:'Telegram频道', ja:'Telegramチャンネル', ko:'텔레그램 채널', ru:'Канал Telegram', tr:'Telegram Kanalı' },
  'community.wagroup': { en:'Official WhatsApp Group', es:'Grupo oficial de WhatsApp', fr:'Groupe WhatsApp officiel', de:'Offizielle WhatsApp-Gruppe', it:'Gruppo WhatsApp ufficiale', ar:'مجموعة واتساب الرسمية', zh:'官方WhatsApp群', ja:'公式WhatsAppグループ', ko:'공식 WhatsApp 그룹', ru:'Официальная группа WhatsApp', tr:'Resmi WhatsApp Grubu' },
  'community.ceodaily': { en:'Daily CEO Analysis', es:'Análisis diario del CEO', fr:'Analyse quotidienne du PDG', de:'Tägliche CEO-Analyse', it:'Analisi giornaliera del CEO', ar:'تحليل يومي من المدير التنفيذي', zh:'CEO每日分析', ja:'CEO日次分析', ko:'CEO 일일 분석', ru:'Ежедневный анализ CEO', tr:'CEO Günlük Analizi' },
  'proof.insta': { en:'See more on Instagram →', es:'Ver más en Instagram →', fr:'Voir plus sur Instagram →', de:'Mehr auf Instagram →', it:'Vedi altro su Instagram →', ar:'شاهد المزيد على إنستغرام →', zh:'在Instagram上查看更多 →', ja:'Instagramでもっと見る →', ko:'Instagram에서 더 보기 →', ru:'Больше в Instagram →', tr:'Instagram\'da daha fazla →' },
  'proof.substackbtn': { en:'Read articles on Substack →', es:'Leer artículos en Substack →', fr:'Lire des articles sur Substack →', de:'Artikel auf Substack lesen →', it:'Leggi articoli su Substack →', ar:'اقرأ المقالات على Substack →', zh:'在Substack上阅读文章 →', ja:'Substackで記事を読む →', ko:'Substack에서 기사 읽기 →', ru:'Читать статьи на Substack →', tr:'Substack\'te makaleleri oku →' },
};

// Inject translations into each language block
const languages = ['en', 'es', 'fr', 'de', 'it', 'ar', 'zh', 'ja', 'ko', 'ru', 'tr'];

for (const lang of languages) {
  const entries = [];
  for (const [key, translations] of Object.entries(newTranslations)) {
    if (translations[lang]) {
      const val = translations[lang].replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      entries.push(`      '${key}': '${val}'`);
    }
  }
  const entriesStr = ',\n' + entries.join(',\n');

  const langStart = html.indexOf(`    ${lang}: {`);
  if (langStart === -1) continue;

  let braceCount = 0;
  let langEnd = -1;
  for (let i = langStart; i < html.length; i++) {
    if (html[i] === '{') braceCount++;
    if (html[i] === '}') {
      braceCount--;
      if (braceCount === 0) { langEnd = i; break; }
    }
  }
  if (langEnd === -1) continue;

  // Find the last quote before the closing brace
  let lastQuote = -1;
  for (let i = langEnd - 1; i > langStart; i--) {
    if (html[i] === "'") { lastQuote = i; break; }
  }
  if (lastQuote === -1) continue;

  html = html.substring(0, lastQuote + 1) + entriesStr + html.substring(lastQuote + 1);
}

fs.writeFileSync(path, html, 'utf8');
console.log('Done! Added plan, FAQ, earn, community, proof translations.');
console.log('Total data-i18n count:', (html.match(/data-i18n/g) || []).length);
