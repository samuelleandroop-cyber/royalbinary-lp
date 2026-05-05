# Royal Binary - Landing Page

## Projeto
Landing page de conversao para a Royal Binary, empresa de investimento em opcoes binarias. CEO: Sidnei Oliveira.

## Stack
- HTML unico (`index.html`, ~1223 linhas)
- Tailwind CSS via CDN
- Fontes: Geist + Geist Mono (Google Fonts)
- Zero dependencias, zero build, arquivo estatico
- JS inline no final do arquivo (modal de stories, video facade, FAQ accordion)

## Tema / Design System
- Fundo escuro: `bg: #0F1311`, `bg2: #171B19`
- Verde principal: `em: #22E083`, `em2: #16A968`
- Texto: `ink: #F8FAFC`, `mute: #94A3B8`, `mute2: #64748B`
- Tipografia: font-sans = Geist, font-mono = Geist Mono
- Bordas: classe `hairline` (border-color: #2A2E2C)
- Botoes: `.btn-em` (verde solido), `.btn-ghost` (borda)

## Estrutura das secoes (ordem no HTML)
1. **Top Status Bar** (l.204) - MARKET LIVE, UTC-3, CNPJ
2. **Nav** (l.218) - Logo + links + CTA "Abrir conta"
3. **Hero** (l.238) - Titulo "Ganhe ate 30%" (esquerda) + Stories wall de depoimentos (direita)
4. **Ticker Mercado** (l.340) - Marquee com cotacoes
5. **Como Funciona** (l.378) - Modelo de operacao + provas do Telegram + fundador + diferencial piramide + video CEO
6. **Formas de Ganho** (l.658) - Indicacao, comissoes, niveis
7. **Problema** (l.765) - Comparacao com piramides
8. **Planos** (l.799) - Tabela de planos de investimento
9. **Bastidores** (l.884) - Fotos/videos do dia a dia
10. **Provas Sociais** (l.920) - Screenshots do Telegram
11. **Trust** (l.963) - CNPJ, transparencia
12. **Comunidade** (l.998) - Secao locked
13. **FAQ** (l.1051) - Accordion com perguntas
14. **CTA Final** (l.1067) - Ultimo botao de conversao
15. **Footer** (l.1087)
16. **Modal Stories** (l.1125) - Lightbox para 50 videos de depoimentos

## Assets
- `imagens/` - logo (3 versoes), sidnei.png, video-thumb.jpg
- `imagens/provas/` - Screenshot_1.png ate Screenshot_11.png
- `videos/` - 01_processed.mp4 ate 50_processed.mp4 (depoimentos)

## CSS customizado importante
- `.radar-card` - Borda animada com gradiente conico (efeito radar scan)
- `.stories-header-grain` - Overlay de textura grain via SVG
- `.scanline-overlay` - Linhas CRT sutis
- `.gradient-text-em` - Texto com gradiente verde animado
- `.stories-wall-mask` - Mask fade top/bottom nas colunas de stories
- `.anim-up`, `.anim-down`, `.anim-up-slow` - Scroll infinito das bolinhas de stories

## Regras de escrita
- NAO usar travessao (—) nos textos. Usar ponto final ou virgula.
- Linguagem direta, sem cara de IA.
- PT-BR informal mas profissional.

## Link de cadastro
https://app.royalbinary.io/pt-BR/auth/sign-up?ref=user
