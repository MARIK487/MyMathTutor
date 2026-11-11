exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };

  const reply = (statusCode, payload) => ({
    statusCode,
    headers,
    body: JSON.stringify(payload)
  });

  if (event.httpMethod !== "POST") {
    return reply(405, { error: "Použij POST." });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return reply(503, {
      error: "Na Netlify zatím není nastaven GEMINI_API_KEY. Přidej ho v Project configuration → Environment variables a potom znovu nasaď web."
    });
  }

  try {
    let body;
    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return reply(400, { error: "Požadavek neobsahuje platná data." });
    }

    const q = String(body.question || "").trim();
    if (!q) return reply(400, { error: "Napiš otázku." });
    if (q.length > 10000) return reply(413, { error: "Dotaz je příliš dlouhý." });

    const systemInstruction = `Jsi MyMathTutor, výborný a trpělivý tutor matematiky a fyziky. Odpovídej jazykem uživatele, běžně česky. Přizpůsob úroveň znalostem uživatele. Vysvětluj krok za krokem, definuj symboly, uváděj předpoklady, definiční obory a jednotky. U důkazů buď rigorózní. U numerických výsledků ukaž kontrolu. Nikdy si nevymýšlej jistotu; pokud zadání není jasné, polož doplňující otázku. Pokud uživatel žádá video, vytvoř detailní scénář, časovou osu, komentář, vizuální pokyny a příklady; netvrď, že jsi vyrenderoval hotové video. Matematické zápisy piš přehledně.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(key)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: q }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 2400 }
      })
    });

    const raw = await response.text();
    let data = {};
    try { data = raw ? JSON.parse(raw) : {}; } catch {
      return reply(502, { error: "Google AI vrátila nečitelnou odpověď. Zkus to prosím znovu." });
    }

    if (!response.ok) {
      const message = data?.error?.message || `Google AI vrátila chybu (${response.status}).`;
      return reply(response.status >= 400 && response.status < 600 ? response.status : 502, { error: message });
    }

    const answer = (data.candidates?.[0]?.content?.parts || [])
      .map(part => part.text || "")
      .join("\n")
      .trim();

    if (!answer) {
      const reason = data.candidates?.[0]?.finishReason;
      return reply(502, { error: reason ? `AI nevytvořila odpověď (důvod: ${reason}). Zkus otázku přeformulovat.` : "AI zatím nevrátila žádnou odpověď. Zkus to znovu." });
    }

    return reply(200, { answer });
  } catch (error) {
    return reply(500, { error: "Chyba serveru při komunikaci s AI. Zkus to prosím znovu." });
  }
};
