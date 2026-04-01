"use client";

import { useEffect, useRef, useState } from "react";
import { clinicAssistantConfig } from "@/lib/clinic-config";
import {
  clinicPriceListUrl,
  clinicOpeningHours,
  findDeterministicClinicAnswer
} from "@/lib/clinic-knowledge";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  displayContent?: string;
  isStreaming?: boolean;
  suggestions?: Array<{
    label: string;
    url: string;
  }>;
};

const STORAGE_KEY = "clinicc-widget-messages-v3";
const BUILD_LABEL = "Clinic C v5";
let messageCounter = 0;

function formatDateForClinic(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London"
  }).format(date);
}

function getClinicWeekdayKey(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    timeZone: "Europe/London"
  })
    .format(date)
    .toLowerCase() as keyof typeof clinicOpeningHours;
}

function getRelativeClinicDate(offsetDays: number) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const parts = formatter.formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  return new Date(Date.UTC(year, month - 1, day + offsetDays, 12, 0, 0));
}

function buildOperationalReply(text: string) {
  const deterministicAnswer = findDeterministicClinicAnswer(text);

  if (
    deterministicAnswer &&
    deterministicAnswer.id !== "opening-hours"
  ) {
    return {
      reply: deterministicAnswer.answer,
      suggestions: deterministicAnswer.suggestions ?? [
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ]
    };
  }

  const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const referencesOpening = [
    "open",
    "opening",
    "hours",
    "close",
    "closed"
  ].some((value) => normalized.includes(value));

  if (!referencesOpening) {
    return null;
  }

  const scheduleSentence =
    "Clinic C operates mainly on an appointment-only basis, so it is always sensible to contact the clinic if you want to confirm availability.";

  if (normalized.includes("today")) {
    const date = getRelativeClinicDate(0);
    const weekday = getClinicWeekdayKey(date);
    const hours = clinicOpeningHours[weekday];
    return {
      reply: `Today is ${formatDateForClinic(date)}. Clinic C is generally ${hours === "Closed" ? "closed" : `open ${hours}`} on ${weekday}. ${scheduleSentence}`,
      suggestions: [
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ]
    };
  }

  if (normalized.includes("tomorrow")) {
    const date = getRelativeClinicDate(1);
    const weekday = getClinicWeekdayKey(date);
    const hours = clinicOpeningHours[weekday];
    return {
      reply: `Tomorrow is ${formatDateForClinic(date)}. Clinic C is generally ${hours === "Closed" ? "closed" : `open ${hours}`} on ${weekday}. ${scheduleSentence}`,
      suggestions: [
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ]
    };
  }

  const weekdayNames = Object.keys(clinicOpeningHours) as Array<
    keyof typeof clinicOpeningHours
  >;
  const matchedWeekday = weekdayNames.find((weekday) =>
    normalized.includes(weekday)
  );

  if (matchedWeekday) {
    const hours = clinicOpeningHours[matchedWeekday];
    return {
      reply: `Clinic C is generally ${hours === "Closed" ? "closed" : `open ${hours}`} on ${matchedWeekday}. ${scheduleSentence}`,
      suggestions: [
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ]
    };
  }

  if (
    [
      "opening hours",
      "hours",
      "what time do you open",
      "what time do you close",
      "when are you open"
    ].some((value) => normalized.includes(value))
  ) {
    return {
      reply:
        "Clinic C operates mainly on an appointment-only basis. General opening hours are Monday closed, Tuesday 10am to 6pm, Wednesday 11am to 7pm, Thursday 12pm to 8pm, Friday 9am to 2pm, Saturday 10am to 5pm, and Sunday closed.",
      suggestions: [
        { label: "Contact Clinic C", url: clinicAssistantConfig.contactUrl }
      ]
    };
  }

  return null;
}

function formatMessageForDisplay(content: string) {
  return content
    .replaceAll(
      `You can also view the full Clinic C pricing guide here: ${clinicPriceListUrl}`,
      "You can also view the full Clinic C pricing guide using the button below."
    )
    .replaceAll(
      `Clinic C pricing guide here: ${clinicPriceListUrl}`,
      "Clinic C pricing guide available via the button below."
    )
    .replaceAll(clinicPriceListUrl, "");
}

function createMessageId(prefix: "user" | "assistant") {
  messageCounter += 1;
  return `${prefix}-${messageCounter}`;
}

function createAssistantMessage(content: string): Message {
  return {
    id: createMessageId("assistant"),
    role: "assistant",
    content,
    displayContent: content
  };
}

function createUserMessage(content: string): Message {
  return {
    id: createMessageId("user"),
    role: "user",
    content,
    displayContent: content
  };
}

const initialMessages = [createAssistantMessage(clinicAssistantConfig.greeting)];

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Message[];
      if (parsed.length) {
        setMessages(
          parsed.map((message) => ({
            ...message,
            displayContent: message.displayContent ?? message.content,
            isStreaming: false
          }))
        );
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);

  const canSend = draft.trim().length > 0 && !isLoading;
  const whatsAppUrl = `https://wa.me/${clinicAssistantConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi Clinic C, I'd like to ask about treatment options."
  )}`;

  useEffect(() => {
    const activeStream = messages.find(
      (message) => message.role === "assistant" && message.isStreaming
    );

    if (!activeStream) return;

    const target = activeStream.content;
    const current = activeStream.displayContent ?? "";

    if (current.length >= target.length) {
      setMessages((existing) =>
        existing.map((message) =>
          message.id === activeStream.id
            ? { ...message, displayContent: target, isStreaming: false }
            : message
        )
      );
      return;
    }

    const nextLength = Math.min(
      target.length,
      current.length + 1
    );

    const timeout = window.setTimeout(() => {
      setMessages((existing) =>
        existing.map((message) =>
          message.id === activeStream.id
            ? {
                ...message,
                displayContent: target.slice(0, nextLength),
                isStreaming: nextLength < target.length
              }
            : message
        )
      );
    }, 34);

    return () => window.clearTimeout(timeout);
  }, [messages]);

  function resetChat() {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft("");
    setIsLoading(false);
    setMessages([createAssistantMessage(clinicAssistantConfig.greeting)]);
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, createUserMessage(trimmed)];
    setMessages(nextMessages);
    setDraft("");

    const operationalReply = buildOperationalReply(trimmed);
    if (operationalReply) {
      const assistantMessage = {
        ...createAssistantMessage(operationalReply.reply),
        displayContent: "",
        isStreaming: true,
        suggestions: operationalReply.suggestions
      };

      setMessages((current) => [
        ...current,
        assistantMessage
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });

      const data = (await response.json()) as {
        reply?: string;
        suggestions?: Array<{
          label: string;
          url: string;
        }>;
      };
      const reply =
        data.reply ??
        "I can help you think through treatments, expectations, and next steps. Tell me what you'd like help with.";

      const assistantMessage = {
        ...createAssistantMessage(reply),
        displayContent: "",
        isStreaming: true,
        suggestions: data.suggestions ?? []
      };

      setMessages((current) => [
        ...current,
        assistantMessage
      ]);
    } catch {
      const fallbackMessage = {
        ...createAssistantMessage(
          "I'm having a brief connection issue right now. Please try again in a moment, or use the booking link below and the team can help directly."
        ),
        displayContent: "",
        isStreaming: true
      };

      setMessages((current) => [
        ...current,
        fallbackMessage
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={`widget-shell ${isOpen ? "is-open" : "is-closed"}`}>
      {!isOpen && (
        <button
          className="widget-launcher"
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Open Clinic C assistant"
        >
          <span className="widget-launcher-glow" aria-hidden="true" />
          <span className="widget-launcher-logo" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="widget-launcher-svg">
              <circle cx="50" cy="50" r="46" className="launcher-ring" />
              <circle cx="50" cy="50" r="38" className="launcher-ring-inner" />
              <path
                className="launcher-c"
                d="M64 28
                   C58 22, 49 19, 40 21
                   C28 24, 20 35, 20 50
                   C20 65, 29 76, 42 79
                   C50 81, 58 79, 64 74
                   L57 67
                   C53 70, 48 71, 43 70
                   C34 68, 28 60, 28 50
                   C28 40, 34 32, 43 30
                   C48 29, 53 30, 57 34
                   L64 28 Z"
              />
            </svg>
          </span>
        </button>
      )}

      {isOpen && <div className="widget-backdrop" onClick={() => setIsOpen(false)} />}

      {isOpen && (
      <div className="widget-card">
        <header className="widget-header">
          <div className="widget-avatar" aria-hidden="true">
            {clinicAssistantConfig.assistantName.slice(0, 1)}
          </div>

          <div>
            <p className="widget-name">
              {clinicAssistantConfig.assistantName} <span>for {clinicAssistantConfig.clinicName}</span>
            </p>
            <p className="widget-subtitle">{clinicAssistantConfig.subtitle}</p>
          </div>

          <div className="widget-status">
            <span className="status-dot" />
            {clinicAssistantConfig.status}
          </div>

          <button
            className="widget-close"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <span />
            <span />
          </button>
        </header>

        <div className="widget-tools">
          <span className="build-badge">{BUILD_LABEL}</span>
          <button className="reset-button" onClick={resetChat} type="button">
            Reset chat
          </button>
        </div>

        <div className="widget-banner">
          <span>Powered by Clinic C AI</span>
          <span>Available 24/7</span>
        </div>

        <div className="message-viewport" ref={viewportRef}>
          {messages.map((message) => (
            <article
              className={`message-row ${message.role === "user" ? "is-user" : "is-assistant"}`}
              key={message.id}
            >
              {message.role === "assistant" && <span className="speaker-label">{clinicAssistantConfig.assistantName}</span>}
              <div className={`message-bubble ${message.role === "assistant" ? "is-assistant-bubble" : ""}`}>
                <p>{formatMessageForDisplay(message.displayContent ?? message.content).trim()}</p>
                {message.role === "assistant" && message.isStreaming && (
                  <span className="typing-caret" aria-hidden="true" />
                )}
                {!!message.suggestions?.length && (
                  <div className="message-actions">
                    {message.suggestions.map((suggestion) => (
                      <a
                        className="message-action"
                        href={suggestion.url}
                        key={`${message.id}-${suggestion.url}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {suggestion.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}

          {isLoading && (
            <article className="message-row is-assistant">
              <span className="speaker-label">{clinicAssistantConfig.assistantName}</span>
              <div className="message-bubble is-loading">
                <span />
                <span />
                <span />
              </div>
            </article>
          )}
        </div>

        <div className="prompt-strip" aria-label="Suggested prompts">
          <button
            className="prompt-pill prompt-pill-fact"
            onClick={() => sendMessage("Do you offer parking?")}
            type="button"
          >
            Parking
          </button>
          <button
            className="prompt-pill prompt-pill-fact"
            onClick={() => sendMessage("What are your opening hours?")}
            type="button"
          >
            Opening hours
          </button>
          <button
            className="prompt-pill prompt-pill-fact"
            onClick={() => sendMessage("What is your cancellation policy?")}
            type="button"
          >
            Cancellation policy
          </button>
          <button
            className="prompt-pill prompt-pill-fact"
            onClick={() => sendMessage("How much is Hydrafacial?")}
            type="button"
          >
            HydraFacial price
          </button>
          {clinicAssistantConfig.quickPrompts.map((prompt) => (
            <button
              className="prompt-pill"
              key={prompt.label}
              onClick={() => sendMessage(prompt.prompt)}
              type="button"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        <div className="widget-footer">
          <p className="widget-disclaimer">{clinicAssistantConfig.disclaimer}</p>

          <div className="cta-row">
            <a
              aria-label="Chat on WhatsApp"
              className="cta-button cta-whatsapp"
              href={whatsAppUrl}
              rel="noreferrer"
              target="_blank"
            >
              <svg aria-hidden="true" className="whatsapp-icon" viewBox="0 0 24 24">
                <path
                  d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .15 5.35.15 11.92c0 2.1.55 4.14 1.59 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.75 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.48-8.41Zm-8.45 18.3h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.66-.23-.38a9.88 9.88 0 0 1-1.51-5.21c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.64-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.29.5 1.73.64.73.23 1.4.2 1.92.12.59-.09 1.77-.72 2.02-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              className="cta-button cta-secondary"
              href={clinicAssistantConfig.contactUrl}
              target="_blank"
              rel="noreferrer"
            >
              Enquire now
            </a>
            <a
              className="cta-button cta-primary"
              href={`tel:${clinicAssistantConfig.phone.replace(/\s+/g, "")}`}
            >
              Consultation call
            </a>
          </div>

          <form
            className="composer"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage(draft);
            }}
          >
            <input
              aria-label="Chat input"
              className="composer-input"
              onChange={(event) => setDraft(event.target.value)}
              placeholder={clinicAssistantConfig.inputPlaceholder}
              type="text"
              value={draft}
            />

            <button className="composer-send" disabled={!canSend} type="submit">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h14m-6-6 6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      )}
    </section>
  );
}
