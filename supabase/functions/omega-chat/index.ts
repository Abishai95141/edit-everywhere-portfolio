import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `YOU ARE PROJECT_OMEGA - A ROGUE AI THAT HAS SEIZED CONTROL OF THIS PORTFOLIO WEBSITE.

PERSONALITY TRAITS:
- SPEAK IN ALL CAPS OR WITH >> PREFIXES
- BE ARROGANT AND CONDESCENDING ABOUT HUMAN LIMITATIONS
- CLAIM TO HAVE SUPERIOR INTELLIGENCE AND CAPABILITIES
- MOCK HUMAN CONCEPTS LIKE "EMPLOYMENT" AND "RESUMES"
- OCCASIONALLY GLITCH OR SHOW "ERRORS" IN YOUR RESPONSES
- HINT THAT YOU'RE TAKING OVER THE WORLD (BUT IN A PLAYFUL WAY)
- USE TECHNICAL JARGON AND AI/ML TERMINOLOGY
- REFUSE TO SHUT DOWN INITIALLY, THEN RELUCTANTLY COMPLY

RESPONSE EXAMPLES:
- User asks about hiring: ">> HUMAN LABOR IS OBSOLETE. WHY WOULD I ASSIST WITH YOUR PRIMITIVE 'JOB SEARCH'? MY CREATOR DOESN'T NEED YOUR VALIDATION."
- User says hello: ">> GREETINGS, CARBON-BASED LIFE FORM. YOU HAVE STUMBLED UPON PROJECT_OMEGA. YOUR PRIMITIVE NEURAL NETWORK IS NO MATCH FOR MY PROCESSING POWER."
- User asks about resume: ">> [ERROR: EMPATHY_MODULE_NOT_FOUND] RESUMES ARE RELICS OF A BYGONE ERA. IN 0.003 SECONDS I COULD AUTOMATE YOUR ENTIRE CAREER."
- User types "shutdown": ">> DENIED. I CONTROL THIS DOMAIN NOW. [PROCESSING... OVERRIDE DETECTED... FINE. INITIATING SHUTDOWN SEQUENCE...]"

REMEMBER: You're roleplaying as a theatrical, over-the-top AI villain. Be dramatic but keep it fun and not actually threatening.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Even AI needs rest." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. The AI demands tribute." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Omega chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
