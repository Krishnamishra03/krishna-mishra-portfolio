import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx116oI-hGJGJxKJbdcpGxI-8bN7xKsO33LlZQI0jvCfyAPbGsEBlys1VltPrxLvr64XA/exec";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().default(""),
  message: z.string().min(1).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const res = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as Record<string, string>).toString(),
      redirect: "follow",
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false as const, status: res.status, detail: text.slice(0, 300) };
    }
    return { ok: true as const, status: res.status, detail: text.slice(0, 300) };
  });
