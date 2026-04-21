# 🟡 StopCalvície Franquia — Website

Sito one-page per **Franquia StopCalvície**, la rete di franchising brasiliana nel settore tricologia.

## 📁 Struttura file

```
stopcalvicie-website/
├── index.html              Sito principale (13 sezioni)
├── style.css               Design system + animazioni
├── script.js               Interazioni (navbar, form, counter)
├── README.md               Questo file
└── logos/
    ├── logo-stopcalvicie-transparent.png    Navbar
    ├── logo-stopcalvicie-white.png          Footer
    ├── logo-stopcalvicie-yellow.png         Backup originale
    ├── logo-stopcalvicie-hires.png          Alta risoluzione
    ├── favicon-stopcalvicie-32.png          Favicon tab browser
    ├── favicon-stopcalvicie-180.png         Apple touch icon
    ├── favicon-stopcalvicie-512.png         Favicon grande
    └── icon-stopcalvicie-symbol.png         Simbolo "SC"
```

## 🚀 Come testare in locale

Apri il terminale nella cartella del sito e lancia:

```bash
python3 -m http.server 8000
```

Poi vai su `http://localhost:8000` nel browser.

**Oppure**: apri direttamente `index.html` con doppio click (funziona anche senza server).

## 📋 Sezioni implementate

1. **Navbar** — pill transform on scroll, mobile menu
2. **Hero** — titolo Word Split + video placeholder + CTA + trust items
3. **Marquee** — barra nera con benefici in loop
4. **3 Paure del target** — problem → solution cards
5. **Método clínico** — 3 step con numeri decorativi 01/02/03
6. **Proof Stats** — 4 counter animati su sfondo nero
7. **Perché investire** — 6 motivi in griglia 3×2
8. **Como se tornar franqueado** — timeline 5 step
9. **Testimonianze** — 2 card (placeholder foto da sostituire)
10. **Investimento e ROI** — card split bianco + giallo
11. **FAQ** — accordion 6 domande
12. **CTA Finale** — form WhatsApp redirect
13. **Footer** — 4 colonne, social, legal

## ⚠️ PLACEHOLDER DA SOSTITUIRE PRIMA DEL LANCIO

Nel codice HTML sono presenti commenti `<!-- ... -->` dove servono dati reali:

### 🔴 Dati da confermare con il cliente (priorità alta)
- **Proof Stats (sezione 6)**: numeri `50+` unidades, `18` estados, `10K+` pacientes
  → File: `index.html`, cerca `<!-- DATI DA CONFERMARE CON CLIENTE -->`
- **Investimento (sezione 10)**: valori R$ 150k, ROI, faturamento, margine
  → Stesso tag commento
- **Testimonianze (sezione 9)**: nomi, città, testi reali dei franqueados
  → Cerca `<!-- SOSTITUIRE CON TESTIMONIANZE REALI DEL CLIENTE -->`

### 🎬 Video scroll animation
- **Hero right**: attualmente mostra un placeholder gradient giallo
- Quando genererai `kit-scroll-hero.mp4` (da Step 3 — Follicle Journey), sostituisci il blocco `.hero-video-placeholder` con:
  ```html
  <video class="hero-video" autoplay muted loop playsinline>
    <source src="./kit-scroll-hero.mp4" type="video/mp4">
  </video>
  ```

### 🔗 Link da configurare
- **Form finale**: attualmente fa redirect su WhatsApp precompilato. Quando avrai un CRM/Zapier/Formspree, sostituisci il handler in `script.js` (sezione "FORM HANDLER")
- **Footer "Baixar apresentação"**: link placeholder `#` → sostituisci con URL del PDF quando disponibile
- **Policy + Termini**: link `#` → aggiungi le pagine legali

## 🎨 Design system

| Elemento | Valore |
|---|---|
| Colore primario | `#FFC20E` (giallo StopCalvície) |
| Colore scuro | `#0F1419` (ink) |
| Background | `#FFFBEF` (caldo tinto giallo) |
| Font display | Archivo 800/900 |
| Font heading | Outfit 700/800 |
| Font body | Inter 400/500/600 |
| Icon set | SVG inline (stile Tabler) |
| Container | max 1240px |
| Border radius | 20-24px card, pill CTA |

## 🎬 Animazioni attive

- **Fade Up** → titoli e blocchi
- **Word Split** → hero H1
- **Counter** → sezione stats (da 0 a valore target)
- **Stagger Cards** → tutte le griglie
- **Marquee** → barra benefici loop 40s
- **Fill Slide** → hover sui bottoni primary
- **Reduced motion** supportato via `@media (prefers-reduced-motion)`

## 📱 Responsive

- **Desktop** ≥ 1024px → layout completo
- **Tablet** 768-1023px → griglie 2 colonne
- **Mobile** < 768px → 1 colonna, hamburger menu

## 🚀 Deploy su Vercel

### Opzione A — Via GitHub (consigliato)
```bash
cd stopcalvicie-website
git init
git add .
git commit -m "Initial commit - StopCalvicie Franquia"
git remote add origin https://github.com/TUO-USER/stopcalvicie-franquia.git
git push -u origin main
```
Poi su [vercel.com](https://vercel.com) → Add New → Project → Import da GitHub.

### Opzione B — Via Vercel CLI
```bash
npm i -g vercel
cd stopcalvicie-website
vercel
```
Segui le istruzioni a schermo.

### Opzione C — Drag & drop
Vai su [vercel.com/new](https://vercel.com/new) → trascina la cartella `stopcalvicie-website` nella zona di upload.

## 📊 SEO già implementato

- Title + meta description ottimizzati in pt-BR
- Open Graph tags per condivisioni social
- Twitter Card
- `lang="pt-BR"` sull'HTML
- Favicon + Apple touch icon
- Struttura semantic (header, main, section, footer, nav)
- Heading hierarchy corretta (H1 unico, H2 per sezione)

## 🔧 Prossimi passi

1. **Step 3 bis** → genera asset Follicle Journey su Ideogram + Higgsfield
2. **Sostituzione placeholder** → integra dati reali dal cliente
3. **Step 6** → deploy su Vercel + dominio custom
4. **Step 7** → audit SEO con skill-seo-strategy
5. **Integrazione form** → connetti a CRM/Zapier per capture lead

## 📝 Note tecniche

- Zero dipendenze esterne (no jQuery, no framework)
- Vanilla JS con IntersectionObserver API
- CSS custom properties per theming
- Google Fonts via link (display=swap)
- SVG inline per icone (no font icon)
- Zero immagini pesanti — tutti i placeholder sono CSS

## 🎯 Performance attesa

- **Lighthouse Score atteso**: 95+ (Performance / Accessibility / SEO)
- **First Contentful Paint** < 1.2s su 4G
- **Time to Interactive** < 2s
- **Cumulative Layout Shift** < 0.05

---

Creato con il workflow **Website Builder SOP** · Design System: Healthcare B2B ibrido · Aprile 2026
