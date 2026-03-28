import OpenAI from "openai";
import { NextResponse } from "next/server";
import { clinicAssistantConfig } from "@/lib/clinic-config";
import { groundingRules, verifiedAnswers } from "@/lib/clinic-knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Suggestion = {
  label: string;
  url: string;
};

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const runtime = "nodejs";

function buildConversationTranscript(messages: ChatMessage[]) {
  return messages
    .slice(-12)
    .map((message) => `${message.role === "user" ? "Client" : "Cara"}: ${message.content}`)
    .join("\n\n");
}

function normalize(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function findVerifiedAnswer(userMessage: string) {
  const normalized = normalize(userMessage);

  return verifiedAnswers.find((entry) =>
    entry.questionPatterns.some((pattern) => normalized.includes(normalize(pattern)))
  );
}

function getMatchedRoutes(userMessage: string) {
  const normalized = normalize(userMessage);

  return clinicAssistantConfig.treatmentRoutes.filter((route) =>
    route.keywords.some((keyword) => normalized.includes(normalize(keyword)))
  );
}

function buildRouteContext(userMessage: string) {
  const matches = getMatchedRoutes(userMessage).slice(0, 3);

  if (!matches.length) {
    return {
      contextBlock: [
        "No exact route matched.",
        "If the user is unsure, help them choose between skin/aesthetics, laser hair removal, body contouring, health support, and recovery."
      ].join("\n"),
      suggestions: [
        { label: "Explore face treatments", url: clinicAssistantConfig.treatmentsUrl },
        { label: "Explore body treatments", url: clinicAssistantConfig.bodyUrl },
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ] satisfies Suggestion[]
    };
  }

  return {
    contextBlock: matches
      .map(
        (route) => `
Treatment route: ${route.label}
URL: ${route.url}
Category: ${route.category}
Conversion strategy: ${route.conversionType}
Primary CTA: ${route.primaryCtaLabel} -> ${route.primaryCtaUrl}
Goals: ${route.goals.join(", ")}
Summary: ${route.summary}
Pricing signals: ${route.pricing.length ? route.pricing.join(" | ") : "No exact price should be quoted unless asked and confirmed from site copy."}
Consultation note: ${route.consultationNote}
`.trim()
      )
      .join("\n\n"),
    suggestions: [
      ...matches.flatMap((route) => [
        { label: route.primaryCtaLabel, url: route.primaryCtaUrl },
        { label: `View ${route.label}`, url: route.url }
      ]),
      { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
    ].slice(0, 3)
  };
}

function buildFallbackReply(userMessage: string) {
  const normalized = normalize(userMessage);
  const { suggestions } = buildRouteContext(userMessage);

  if (normalized.includes("urgent") || normalized.includes("emergency") || normalized.includes("pain")) {
    return {
      reply:
        "If this feels urgent or medically concerning, please contact Clinic C directly on 01224 454145 or seek urgent medical care. I can help with general treatment guidance, but not emergency advice.",
      suggestions: [{ label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }]
    };
  }

  if (normalized.includes("wrinkle") || normalized.includes("botox") || normalized.includes("anti wrinkle")) {
    return {
      reply:
        "If your main goal is softening expression lines, anti-wrinkle injections are a strong option at Clinic C. They’re positioned as a subtle, natural-looking treatment, so the best next step is usually a consultation to confirm the right areas and plan for you.",
      suggestions
    };
  }

  if (normalized.includes("laser") || normalized.includes("hair removal") || normalized.includes("hair")) {
    return {
      reply:
        "For unwanted hair, Clinic C’s laser hair removal service is likely the right place to start. It’s designed for long-term reduction, and a consultation helps confirm the right plan based on the area, skin type, and your goals.",
      suggestions
    };
  }

  if (normalized.includes("energy") || normalized.includes("tired") || normalized.includes("immune") || normalized.includes("vitamin")) {
    return {
      reply:
        "If you’re thinking more about energy, hydration, or general wellbeing, the health side of Clinic C sounds like the better fit than an aesthetic treatment. A consultation can help narrow down whether IV nutrient therapy or another health-focused option makes most sense.",
      suggestions
    };
  }

  if (normalized.includes("fat") || normalized.includes("chin") || normalized.includes("contour") || normalized.includes("tone")) {
    return {
      reply:
        "If the goal is stubborn fat or body contouring, Clinic C has a few different routes depending on whether you want fat reduction, shaping, or muscle tone. Aqualyx is often more relevant for localised pockets of fat and usually suits an enquiry-first conversation, while EMSculpt is better when the focus is more on tone and definition.",
      suggestions
    };
  }

  return {
    reply:
      "I can help you narrow things down based on your goal, whether that’s skin, laser hair removal, body contouring, recovery, or overall wellbeing. Tell me what you’d most like to improve and I’ll guide you toward the best next step.",
    suggestions
  };
}

export async function POST(request: Request) {
  let latestUserMessage = "";

  try {
    const body = (await request.json()) as { messages?: ChatMessage[] };
    const messages = body.messages ?? [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "No conversation provided." },
        { status: 400 }
      );
    }

    latestUserMessage =
      [...messages].reverse().find((message) => message.role === "user")?.content ?? "";
    const { contextBlock, suggestions } = buildRouteContext(latestUserMessage);
    const verifiedAnswer = findVerifiedAnswer(latestUserMessage);

    if (verifiedAnswer) {
      return NextResponse.json({
        reply: verifiedAnswer.answer,
        suggestions: verifiedAnswer.suggestions ?? suggestions
      });
    }

    if (!client) {
      const fallback = buildFallbackReply(latestUserMessage);
      return NextResponse.json(fallback);
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      instructions: `${clinicAssistantConfig.systemPrompt}\n\n${clinicAssistantConfig.clinicFacts.join("\n")}\n\nGrounding rules:\n${groundingRules.join("\n")}\n\nRelevant treatment guidance:\n${contextBlock}`,
      input: `Conversation so far:\n\n${buildConversationTranscript(messages)}\n\nWrite the next assistant reply as Cara for the Clinic C website widget. Keep it concise, premium, reassuring, and conversion-aware. Follow the route conversion strategy carefully when deciding whether to suggest direct booking, consultation, or enquiry. If the answer is not verified, avoid stating uncertain operational details as fact.`,
      max_output_tokens: 400
    });

    const reply = typeof response.output_text === "string" ? response.output_text.trim() : "";

    if (!reply) {
      return NextResponse.json(buildFallbackReply(latestUserMessage));
    }

    return NextResponse.json({ reply, suggestions });
  } catch (error) {
    console.error("Chat route failed", error);

    return NextResponse.json(buildFallbackReply(latestUserMessage), { status: 200 });
  }
}
