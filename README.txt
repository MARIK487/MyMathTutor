MYMATHTUTOR — STARTER PLATFORM

Obsah:
- index.html: kompletní responzivní web v češtině
- netlify/functions/tutor.js: bezpečné připojení OpenAI API přes server
- netlify.toml: konfigurace Netlify Functions

NASAZENÍ:
1. Rozbal ZIP.
2. Nahraj složku projektu do GitHubu a připoj repozitář v Netlify (doporučeno), nebo nahraj složku přes Netlify Drop.
3. DŮLEŽITÉ: Netlify Drop může fungovat pro statickou část, ale pro serverovou funkci je spolehlivější nasazení přes Git/Netlify CLI. Po deploy ověř /.netlify/functions/tutor.
4. V Netlify → Site configuration → Environment variables přidej:
   OPENAI_API_KEY = tvůj soukromý API klíč
5. Spusť nový deploy.

CO JE FUNKČNÍ I BEZ API:
- navigace, akademie a filtrování kapitol
- YouTube vyhledávání videí podle tématu
- lokální ukázkový kvíz s vysvětlením
- poslech přes hlas prohlížeče
- hra na vlastní vysvětlení tématu

CO VYŽADUJE API / DALŠÍ SLUŽBU:
- skutečné generativní AI odpovědi
- individuální kvízy generované AI
- scénáře výukových videí na míru
- automatické vytvoření hotového video souboru vyžaduje samostatnou video službu

NÁKLADY:
Web samotný a vestavěné lokální funkce lze používat zdarma. OpenAI API se platí zvlášť podle spotřeby; API není automaticky součástí ChatGPT tarifu. YouTube videa jsou externí obsah a jejich dostupnost určuje YouTube.
Bezpečnost: API klíč nikdy nevkládej do HTML/JavaScriptu v prohlížeči ani do veřejného GitHub repozitáře.
