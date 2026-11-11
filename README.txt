MYMATHTUTOR — GEMINI AI VERZE

Obsah:
- index.html: web MyMathTutor
- netlify/functions/tutor.js: bezpečné serverové připojení Google Gemini API
- netlify.toml: konfigurace Netlify Functions

NASAZENÍ:
1. Nahraj obsah této složky do svého Netlify projektu (ne samotný ZIP jako soubor na web).
2. V Google AI Studio vytvoř API klíč: https://aistudio.google.com/app/apikey
3. V Netlify otevři Project configuration → Environment variables.
4. Přidej proměnnou GEMINI_API_KEY a jako hodnotu vlož svůj Google AI Studio klíč.
5. Ulož a spusť nový deploy.
6. Otevři web a vyzkoušej AI tutora.

DŮLEŽITÉ:
- API klíč nikdy nevkládej do index.html ani do veřejného GitHubu.
- Bezplatný tarif Gemini má limity a podmínky se mohou měnit. U bezplatného tarifu může Google používat odeslaný obsah ke zlepšování produktů; neposílej citlivé osobní údaje.
- Pokud se zobrazí chyba 429, byl pravděpodobně dosažen limit požadavků; zkus to později.
- Pokud se zobrazí chyba 403/404, zkontroluj platnost klíče a dostupnost modelu pro svůj účet.

FUNKCE BEZ AI:
- navigace, akademie a filtrování kapitol
- YouTube vyhledávání videí podle tématu
- lokální kvíz s vysvětlením
- poslech přes hlas prohlížeče
- hra na vlastní vysvětlení tématu
