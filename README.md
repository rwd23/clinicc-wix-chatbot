# Clinic C Wix Chatbot

This is a Vercel-ready Next.js chatbot widget designed to be embedded into the existing Wix website for `www.clinicc.co.uk`.

## What this gives you

- A premium standalone widget page at `/widget`
- A server-side API route at `/api/chat`
- A single config file for editing branding, copy, prompts, and links
- A safer clinic-style prompt with consultation and medical guardrails
- A Wix-friendly embed path that does not require rebuilding the main site

## Main files to edit

- `lib/clinic-config.ts`: assistant name, greeting, tone, quick prompts, links, business facts
- `components/chat-widget.tsx`: widget structure and UX
- `app/globals.css`: premium styling and responsive layout
- `app/api/chat/route.ts`: server-side AI behavior

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your OpenAI key to `.env.local`.

4. Start the app:

```bash
npm run dev
```

5. Open:

- `http://localhost:3000/`
- `http://localhost:3000/widget`

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repo into Vercel.
3. Add:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional, defaults to `gpt-4.1-mini`)
4. Deploy.

## Embed into Wix

Use a Custom Embed or HTML iframe block in Wix and paste:

```html
<iframe
  src="https://YOUR-VERCEL-DOMAIN.vercel.app/widget"
  width="100%"
  height="760"
  style="border:0; border-radius:24px; overflow:hidden;"
  loading="lazy"
></iframe>
```

## Recommended next improvements

- Add lead capture before booking
- Add a treatment knowledge base from your own approved copy
- Log conversations to a CRM or Google Sheet
- Add source-backed treatment answers instead of prompt-only answers
- Add an admin config panel for non-technical edits
