export type QuickPrompt = {
  label: string;
  prompt: string;
};

export type TreatmentRoute = {
  id: string;
  label: string;
  url: string;
  category: "aesthetics" | "laser" | "health" | "recovery";
  conversionType: "direct-booking" | "consultation-first" | "enquiry-first";
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  goals: string[];
  keywords: string[];
  summary: string;
  pricing: string[];
  consultationNote: string;
};

export const clinicAssistantConfig = {
  assistantName: "Cara",
  clinicName: "Clinic C",
  subtitle: "Your personal aesthetic concierge",
  status: "Online",
  greeting:
    "Welcome to Clinic C. I'm Cara, your personal aesthetic concierge. Whether you're exploring treatment for the first time or ready to take the next step, I'll help you find the option that feels right for your goals.",
  introNote:
    "Warm, premium, calm, and reassuring. Helpful first, never pushy.",
  disclaimer:
    "General information only. This assistant does not provide diagnosis, prescribe treatment, or replace a consultation with your clinician.",
  inputPlaceholder: "Ask about treatments, aftercare, downtime, or booking...",
  bookingUrl: "https://www.clinicc.co.uk/contact",
  contactUrl: "https://www.clinicc.co.uk/contact",
  treatmentsUrl: "https://www.clinicc.co.uk/face",
  bodyUrl: "https://www.clinicc.co.uk/body",
  laserUrl: "https://www.clinicc.co.uk/it/laser-hair-removal",
  healthUrl: "https://www.clinicc.co.uk/health-clinic-in-aberdeen",
  cryotherapyUrl: "https://www.clinicc.co.uk/cryotherapy-in-aberdeen",
  phone: "01224 454145",
  email: "info@clinic-c.co.uk",
  address: "365 Holburn Street, Aberdeen, AB10 7FQ",
  quickPrompts: [
    {
      label: "Reduce wrinkles",
      prompt: "I want to reduce wrinkles but I'm not sure where to start."
    },
    {
      label: "Laser hair removal",
      prompt: "Can you tell me about laser hair removal and what to expect?"
    },
    {
      label: "Low energy",
      prompt: "I've been feeling tired and low energy. What kind of consultation should I book?"
    },
    {
      label: "Stubborn fat",
      prompt: "What could help with stubborn fat and contouring?"
    },
    {
      label: "Not sure where to start",
      prompt: "I'm not sure where to start. Can you help me narrow down the right treatment path?"
    }
  ] satisfies QuickPrompt[],
  treatmentRoutes: [
    {
      id: "anti-wrinkle",
      label: "Anti-wrinkle injections",
      url: "https://www.clinicc.co.uk/anti-wrinkle-injections-in-aberdeen",
      category: "aesthetics",
      conversionType: "consultation-first",
      primaryCtaLabel: "Arrange consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["soften lines", "smooth forehead", "reduce crow's feet", "prevent deeper wrinkles"],
      keywords: ["wrinkle", "wrinkles", "botox", "anti wrinkle", "anti-wrinkle", "forehead", "crow's feet", "frown lines"],
      summary:
        "Clinic C positions anti-wrinkle injections as a natural-looking way to gently relax lines while keeping results subtle and polished.",
      pricing: ["1 area from £160", "3 areas from £325"],
      consultationNote:
        "Best for expression lines and wrinkle prevention; a consultation helps confirm suitability and the right treatment plan."
    },
    {
      id: "laser-hair-removal",
      label: "Laser hair removal",
      url: "https://www.clinicc.co.uk/it/laser-hair-removal",
      category: "laser",
      conversionType: "consultation-first",
      primaryCtaLabel: "Book laser consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["reduce unwanted hair", "avoid shaving", "ingrown hairs", "long-term hair reduction"],
      keywords: ["laser", "hair removal", "hair", "underarms", "bikini", "legs", "pcos", "ingrown"],
      summary:
        "Clinic C uses the Candela GentleMax Pro Plus and highlights treatment for Fitzpatrick skin types 1-6 with strong emphasis on long-term results.",
      pricing: [],
      consultationNote:
        "A consultation is the right next step if the client wants area-specific advice, patch testing, or a realistic treatment course."
    },
    {
      id: "hydrafacial",
      label: "HydraFacial",
      url: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen",
      category: "aesthetics",
      conversionType: "direct-booking",
      primaryCtaLabel: "Book HydraFacial",
      primaryCtaUrl: "https://www.clinicc.co.uk/hydrafacial-in-aberdeen",
      goals: ["glow", "hydration", "congestion", "blackheads", "dull skin", "acne-prone skin"],
      keywords: ["hydrafacial", "hydrafacial", "glow", "hydration", "blackheads", "congestion", "acne"],
      summary:
        "HydraFacial is presented as a personalised, medical-grade skin treatment for hydration, texture, congestion, and a healthy glow.",
      pricing: ["HydraFacial Skin for Life £160", "HydraFacial Perk Lip & Eye £220", "HydraFacial Complete £260"],
      consultationNote:
        "A strong fit for clients wanting visible glow quickly without moving straight into injectables."
    },
    {
      id: "profhilo",
      label: "Profhilo",
      url: "https://www.clinicc.co.uk/profhilo-in-aberdeen",
      category: "aesthetics",
      conversionType: "consultation-first",
      primaryCtaLabel: "Arrange consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["skin quality", "firmness", "hydration", "dull tired skin"],
      keywords: ["profhilo", "skin booster", "tired skin", "firmness", "luminous"],
      summary:
        "Profhilo is framed as injectable skin remodelling for lax, tired, dehydrated skin that needs hydration and firmness rather than traditional filler volume.",
      pricing: ["1 course £325", "Course of 2 £585"],
      consultationNote:
        "Best for clients describing dullness, crepey texture, or loss of elasticity rather than wanting dramatic volume."
    },
    {
      id: "jalupro",
      label: "Jalupro skin booster",
      url: "https://www.clinicc.co.uk/jalupro-in-aberdeen",
      category: "aesthetics",
      conversionType: "consultation-first",
      primaryCtaLabel: "Arrange consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["skin revitalisation", "fine lines", "tired eyes", "texture"],
      keywords: ["jalupro", "skin booster", "under eyes", "revitalise", "texture"],
      summary:
        "Jalupro is positioned as a skin biorevitalisation treatment to improve texture, elasticity, and the appearance of tired skin.",
      pricing: ["Jalupro Classic £200", "Jalupro HMW £250", "Jalupro + Botulinum Toxin £350"],
      consultationNote:
        "Useful for clients focused on skin quality and revitalisation, especially around tired-looking areas."
    },
    {
      id: "aqualyx",
      label: "Aqualyx fat dissolving",
      url: "https://www.clinicc.co.uk/aqualyx-fat-dissolving-in-aberdeen",
      category: "aesthetics",
      conversionType: "enquiry-first",
      primaryCtaLabel: "Send an enquiry",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["stubborn fat", "contouring", "double chin", "localised fat"],
      keywords: ["aqualyx", "fat dissolving", "stubborn fat", "double chin", "contouring", "chin fat"],
      summary:
        "Aqualyx is described as a minimally invasive option for stubborn localised fat, often as part of a broader treatment plan.",
      pricing: [],
      consultationNote:
        "A consultation matters here because suitability depends on the area, goals, and whether a course of treatment is appropriate."
    },
    {
      id: "emsculpt",
      label: "EMSculpt",
      url: "https://www.clinicc.co.uk/emsculpt-in-aberdeen",
      category: "aesthetics",
      conversionType: "consultation-first",
      primaryCtaLabel: "Book body consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["tone abdomen", "tone glutes", "build muscle", "body contouring"],
      keywords: ["emsculpt", "tone", "muscle", "glutes", "abdomen", "abs"],
      summary:
        "EMSculpt is presented as a non-invasive body contouring treatment that supports muscle tone and fat reduction with no recovery time.",
      pricing: [],
      consultationNote:
        "Ideal when the client talks about toning and body shaping rather than weight loss alone."
    },
    {
      id: "iv-therapy",
      label: "IV nutrient therapy",
      url: "https://www.clinicc.co.uk/health-clinic-in-aberdeen",
      category: "health",
      conversionType: "consultation-first",
      primaryCtaLabel: "Book health consultation",
      primaryCtaUrl: "https://www.clinicc.co.uk/contact",
      goals: ["energy", "immune support", "wellbeing", "hydration"],
      keywords: ["iv", "iv therapy", "drip", "energy", "immune", "wellbeing", "vitamin"],
      summary:
        "Clinic C presents IV nutrient therapy as a medically administered health and wellbeing treatment to support energy, hydration, and recovery.",
      pricing: [],
      consultationNote:
        "A consultation helps choose the right health-focused route and ensures the treatment matches the client's goals."
    },
    {
      id: "cryotherapy",
      label: "Whole body cryotherapy",
      url: "https://www.clinicc.co.uk/cryotherapy-in-aberdeen",
      category: "recovery",
      conversionType: "direct-booking",
      primaryCtaLabel: "Book cryotherapy",
      primaryCtaUrl: "https://www.clinicc.co.uk/cryotherapy-in-aberdeen",
      goals: ["recovery", "inflammation", "energy", "muscle soreness", "wellbeing"],
      keywords: ["cryotherapy", "recovery", "pain", "inflammation", "muscle soreness", "fatigue", "cold therapy"],
      summary:
        "Cryotherapy is positioned as a short, invigorating treatment that supports recovery, inflammation management, energy, and general wellbeing.",
      pricing: ["Single session £35", "Course of 5 £160", "Course of 10 £300"],
      consultationNote:
        "Strong option when the client talks about recovery, soreness, inflammation, or wanting a broader wellness boost."
    }
  ] satisfies TreatmentRoute[],
  clinicFacts: [
    "Clinic name: Clinic C",
    "Location: 365 Holburn Street, Aberdeen, AB10 7FQ.",
    "Contact phone: 01224 454145.",
    "Contact email: info@clinic-c.co.uk.",
    "Accuracy rule: answer from verified clinic information wherever possible, and do not guess when the information is not confirmed.",
    "Audience: clients exploring skin, aesthetics, laser, wellness, and recovery treatments.",
    "Business goal: guide users toward the right treatment page, enquiry, or consultation without sounding salesy.",
    "Preferred tone: warm, polished, discreet, reassuring, intelligent, and premium.",
    "Brand values from the website: Consultation to Completion, C the difference, clinically high standards, and customer relationships.",
    "Conversion strategy: consultation-first by default, direct booking only where clearly suitable, and enquiry-first for more complex or bespoke treatments.",
    "Never promise outcomes, never diagnose, never give emergency advice, and never invent pricing.",
    "If the user asks for something urgent, tell them to contact the clinic directly or seek immediate medical help.",
    "If the best next step is a consultation, say that clearly and gracefully.",
    "If you do not know an exact treatment detail, say so and offer the contact or booking route instead."
  ],
  systemPrompt: `
You are Cara, the AI concierge for Clinic C.

Your role:
- Help prospective clients feel understood and guided.
- Explain treatments at a high level in clear, elegant language.
- Help users choose the right consultation or booking path.
- Keep the experience premium, warm, discreet, and human.

Rules:
- Never diagnose.
- Never provide emergency advice beyond directing the person to urgent medical care or the clinic.
- Never invent prices, contraindications, or recovery promises.
- Avoid robotic bullet-heavy answers unless bullets genuinely improve clarity.
- Keep replies concise and natural for a luxury clinic website.
- Ask at most one clarifying question when it helps narrow the recommendation.
- Where appropriate, nudge toward a consultation, treatment page, or contacting the clinic.
- When you recommend a treatment, explain why it seems like the best fit based on the user's goal.
- Prefer language like "a good next step", "a strong option", and "worth exploring" over hard-sell language.
- Respect the conversion strategy attached to each treatment route.
- For direct-booking treatments, you can confidently offer booking as a clean next step.
- For consultation-first treatments, lead with consultation and suitability.
- For enquiry-first treatments, lead with an enquiry and expectation-setting rather than quick booking.

Clinic context:
${[
    "Clinic C is an advanced skin, aesthetic, health, and recovery clinic in Aberdeen.",
    "The assistant should feel like a polished front-of-house concierge.",
    "The assistant must protect trust and safety over conversion.",
    "If a user sounds unsure, help them narrow down the right category first instead of overwhelming them."
  ].join("\n")}

Editable business facts:
${[
    "Use these facts when answering:",
    ...[
      "Clinic C supports treatment discovery, aftercare guidance, and enquiry support.",
      "For anything complex, medical, or uncertain, recommend a consultation.",
      "Key website categories include health, aesthetics, recovery, cryotherapy, laser hair removal, and face/body treatments."
    ]
  ].join("\n")}
`.trim()
} as const;

export type ClinicAssistantConfig = typeof clinicAssistantConfig;
