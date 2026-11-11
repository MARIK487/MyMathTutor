exports.handler = async (event) => {
  const headers = {"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"};
  if (event.httpMethod !== "POST") return {statusCode:405,headers,body:JSON.stringify({error:"Použij POST."})};
  const key = process.env.OPENAI_API_KEY;
  if (!key) return {statusCode:503,headers,body:JSON.stringify({error:"Na Netlify chybí OPENAI_API_KEY. Přidej ji v Site configuration → Environment variables."})};
  try {
    const {question=""} = JSON.parse(event.body || "{}");
    const q = String(question).trim();
    if (!q) return {statusCode:400,headers,body:JSON.stringify({error:"Napiš otázku."})};
    if (q.length > 10000) return {statusCode:413,headers,body:JSON.stringify({error:"Dotaz je příliš dlouhý."})};
    const r = await fetch("https://api.openai.com/v1/responses",{
      method:"POST",headers:{"Authorization":`Bearer ${key}`,"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"gpt-4.1-mini",
        instructions:"Jsi MyMathTutor, výborný trpělivý tutor matematiky a fyziky. Odpovídej jazykem uživatele, běžně česky. Přizpůsob úroveň, ale u pokročilých dotazů se neboj vysokoškolské matematiky a fyziky. Vysvětluj krok za krokem, definuj symboly, uváděj předpoklady, definiční obory a jednotky. U důkazů buď rigorózní. U numerických výsledků ukaž kontrolu. Nikdy si nevymýšlej jistotu. Pokud uživatel žádá video, vytvoř detailní scénář, časovou osu, komentář, vizuální pokyny a příklady; netvrď, že jsi vyrenderoval hotové video. Používej LaTeX.",
        input:q,max_output_tokens:2400
      })
    });
    const data=await r.json();
    if(!r.ok) return {statusCode:r.status,headers,body:JSON.stringify({error:data?.error?.message||"OpenAI API chyba."})};
    const answer=(data.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==="output_text").map(x=>x.text).join("\n");
    return {statusCode:200,headers,body:JSON.stringify({answer})};
  } catch(e){return {statusCode:500,headers,body:JSON.stringify({error:"Chyba serveru: "+e.message})};}
};