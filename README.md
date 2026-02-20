# Sustainable IT — Il metodo pratico per la sostenibilità digitale

Sito web del libro **[Sustainable IT](https://leanpub.com/sustainable-it)** di Francesco Fullone.

Trasforma la sostenibilità digitale da slogan a pratica quotidiana. Framework operativi, metriche reali e strumenti pronti all'uso — dal codice all'infrastruttura.

## Sito live

**https://fullo.github.io/sustainable-it-site**

## Stack tecnico

Il sito è costruito seguendo le [W3C Web Sustainability Guidelines (WSG)](https://w3c.github.io/sustainableweb-wsg/), praticando ciò che il libro insegna:

- **Jekyll** — generatore di siti statici, hosting su GitHub Pages
- **HTML semantico** — struttura accessibile con ARIA, skip-link, navigazione da tastiera
- **CSS custom properties** — dark mode nativo via `prefers-color-scheme`
- **System font stack** — zero download di font esterni
- **Vanilla JavaScript** — ~60 righe totali, nessun framework
- **SVG inline** — icone senza librerie esterne
- **`prefers-reduced-motion`** — rispetto delle preferenze utente

### Nessuna dipendenza JS

Il sito non utilizza React, Three.js, Framer Motion o altre librerie JavaScript. Tutte le animazioni sono CSS-only. L'interattività (menu mobile, tab, scroll observer) è implementata in vanilla JS.

## Struttura

```
├── index.html              # Pagina principale (HTML + JS inline)
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet completo con dark mode
│   └── img/
│       └── author-avatar.png
├── _config.yml             # Configurazione Jekyll
├── _layouts/
│   └── default.html        # Layout Jekyll
└── README.md
```

## Sviluppo locale

**Prerequisiti:** Ruby, Bundler, Jekyll

```bash
gem install jekyll bundler
jekyll serve
```

Il sito sarà disponibile su `http://localhost:4000/sustainable-it-site/`.

## Il libro

**Sustainable IT — The Practical Way** è disponibile su [Leanpub](https://leanpub.com/sustainable-it) in formato PDF, EPUB e MOBI.

Cosa troverai:

- Impatto ambientale reale dell'ICT e come misurarlo
- Framework SOFT (Strategia, Operazioni, Feedback, Trasformazione)
- Triple Bottom Line: Pianeta, Persone, Profitto
- Green Coding e CI/CD sostenibile
- Metriche standard (SCI, TCS) della Green Software Foundation
- OKR per la sostenibilità e conformità CSRD
- Strumenti pronti all'uso e casi reali

## Autore

**Francesco Fullone** — Business Designer, Consulente, Imprenditore

- [Green Software Champion](https://champions.greensoftware.foundation/champions/francesco-fullone/) — Green Software Foundation
- Presidente di [GrUSP.org](https://www.grusp.org/)
- Fondatore di Apropos, Digitiamo, Ideato
- Newsletter: [Sustainable ITC](https://sustainableitc.substack.com/)
- [KodamaHQ](https://kodamahq.it/)

## Licenza

Quest'opera è distribuita con Licenza [Creative Commons Attribuzione - Non commerciale 4.0 Internazionale (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/deed.it).

Tu sei libero di:

- **Condividere** — riprodurre, distribuire, comunicare al pubblico il materiale
- **Modificare** — remixare, trasformare il materiale e basarti su di esso

Alle seguenti condizioni:

- **Attribuzione** — Devi riconoscere una menzione di paternità adeguata, fornire un link alla licenza e indicare se sono state effettuate delle modifiche.
- **Non commerciale** — Non puoi utilizzare il materiale per scopi commerciali.

[![CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc/4.0/deed.it)
