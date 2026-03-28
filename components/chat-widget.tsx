"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clinicAssistantConfig } from "@/lib/clinic-config";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: Array<{
    label: string;
    url: string;
  }>;
};

const STORAGE_KEY = "clinicc-widget-messages";

function createAssistantMessage(content: string): Message {
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content
  };
}

function createUserMessage(content: string): Message {
  return {
    id: crypto.randomUUID(),
    role: "user",
    content
  };
}

const initialMessages = [createAssistantMessage(clinicAssistantConfig.greeting)];

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Message[];
      if (parsed.length) {
        setMessages(parsed);
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

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, createUserMessage(trimmed)];
    setMessages(nextMessages);
    setDraft("");
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

      setMessages((current) => [
        ...current,
        {
          ...createAssistantMessage(reply),
          suggestions: data.suggestions ?? []
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        createAssistantMessage(
          "I'm having a brief connection issue right now. Please try again in a moment, or use the booking link below and the team can help directly."
        )
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const quickPrompts = useMemo(() => clinicAssistantConfig.quickPrompts, []);

  return (
    <section className="widget-shell">
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
        </header>

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
              <div className="message-bubble">
                <p>{message.content}</p>
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
          {quickPrompts.map((prompt) => (
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
    </section>
  );
}
