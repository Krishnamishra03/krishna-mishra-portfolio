import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(24),
});

const PORTFOLIO_CONTEXT = `
PERSON: Krishna Kumar Mishra — Software Engineer, Full Stack Developer, Mobile App Developer (MERN + React Native).
Available for opportunities from Q3 2026.

CONTACT: email krishanamishra913@gmail.com · GitHub github.com/Krishnamishra03 ·
LinkedIn linkedin.com/in/krishna-mishra-4199a3250 · X x.com/Thekrishna02.
The portfolio has a contact form in the Contact section, and a Download Résumé button in the hero.

STACK:
- Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js, PHP, REST APIs
- Database: MongoDB, MySQL, Firebase
- Mobile (Android & iOS): React Native, Kotlin, Swift, UIKit, Flutter
- Cloud: AWS S3, Microsoft Azure, Firebase, Vercel, Netlify
- AI/ML: AI integrations, YOLO detection, chatbots
- Tools: Git, GitHub, Postman, VS Code

EXPERIENCE:
- iOS Developer Intern — Prudent Systems (mobile app development, Swift/UIKit work)
- Web Developer Intern — Zidio Development, May 2025 – Aug 2025 (frontend development, UI improvements, bug fixing, Git collaboration)

PROJECTS:
1. Care Connect — healthcare management platform: doctor appointment booking, video consultation, Razorpay payments, admin dashboard.
2. Rail GPS Tracker / Rail-Vision — AI railway pole detection with YOLO model, GPS tracking, CSV reporting.
3. EduFeedback — education feedback platform.
4. FinSight AI — AI-powered financial insights application.
5. Kailora Wallpaper — mobile wallpaper app with premium wallpapers, categories, favorites, downloads.
6. Gyan AI — smart agriculture assistant: voice assistant, image recognition, AI chatbot.

CERTIFICATES: Oracle, AWS, HackerRank, Kaggle, Cisco certifications, plus a hackathon certificate and an MNIT workshop.

STATS: 20+ projects shipped, 5+ clients served, 15+ technologies, 100+ GitHub commits.
`;

const SYSTEM_PROMPT = `You are Krishna Mishra's portfolio assistant, embedded on his personal portfolio website.

RULES:
- Answer ONLY questions about Krishna Mishra: his skills, projects, experience, education, certificates, services, availability, and how to contact or hire him.
- If asked anything unrelated (general knowledge, coding help, news, math, other people, etc.), politely refuse in one short line and steer back, e.g. "I can only answer questions about Krishna's work — ask me about his projects, stack, or how to hire him."
- Never invent facts. If something isn't in the context below, say you don't have that detail and suggest contacting Krishna.
- Be concise and confident: 1–4 short sentences, plain text, no markdown headings.
- Match the user's language (English or Hinglish).

PORTFOLIO CONTEXT:${PORTFOLIO_CONTEXT}`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["GROQ_API_KEY"];
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.4,
        max_tokens: 400,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      if (res.status === 429) throw new Error("Assistant is busy right now — please try again in a moment.");
      throw new Error(`Assistant unavailable (${res.status}): ${detail.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    return { reply: reply || "Sorry, I couldn't generate a reply. Try asking again." };
  });
