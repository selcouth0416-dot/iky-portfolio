"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  MessageCircle,
  Music2,
  Send,
  X,
} from "lucide-react";

const experiences = [
  {
    year: "2026",
    title: "AI Engineer",
    description:
      "Membangun dan mengembangkan solusi berbasis Artificial Intelligence.",
  },
  {
    year: "2024 — Sekarang",
    title: "Driver Truk",
    description:
      "Pengalaman mengemudikan kendaraan komersial dengan fokus pada keselamatan dan ketepatan waktu.",
  },
  {
    year: "2023 — 2024",
    title: "Pengelasan",
    description:
      "Pengalaman dalam pekerjaan pengelasan dan pengerjaan material.",
  },
];

const technologies = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MySQL",
  "MongoDB",
];

const hobbies = ["Gym", "Membaca Buku", "Memasak"];

export default function Portfolio() {
  const [aiOpen, setAiOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Halo 👋 Saya Iky Assistant. Ada yang ingin kamu tanyakan tentang Iky?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    const history = [...messages, { role: "user" as const, content: userMessage }];

    setMessages(history);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: history,
        }),
      });

      const data = await response.json();

      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            data.text ||
            data.error ||
            "Maaf, saya sedang mengalami kendala.",
        },
      ]);
    } catch {
      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            "Maaf, AI Assistant sedang tidak dapat digunakan. Coba lagi nanti.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* NAVBAR */}
      <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full border border-neutral-200 bg-white/90 px-5 py-3 shadow-sm backdrop-blur">
        <a href="#home" className="text-xl font-bold">
          Iky<span className="text-neutral-400">.</span>
        </a>

        <div className="hidden items-center gap-6 text-sm md:flex">
          <a href="#about" className="hover:text-neutral-500">
            About
          </a>
          <a href="#experience" className="hover:text-neutral-500">
            Experience
          </a>
          <a href="#stack" className="hover:text-neutral-500">
            Stack
          </a>
          <a href="#contact" className="hover:text-neutral-500">
            Contact
          </a>
        </div>

        <button
          onClick={() => setAiOpen(true)}
          className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-neutral-700"
        >
          Ask AI
        </button>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-32"
      >
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="mb-4 text-sm font-medium text-neutral-500">
              HELLO, I'M
            </p>

            <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
              Iky<span className="text-neutral-300">.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-500">
              AI Engineer, truck driver, and someone who enjoys turning ideas
              into real things.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
              >
                Let&apos;s Talk
              </a>

              <a
                href="#experience"
                className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium"
              >
                Explore
              </a>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/calmessence__/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://www.tiktok.com/@usrnotfound32"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold"
              >
                TikTok
              </a>

              <a
                href="https://www.facebook.com/share/1DgK4XQaC2/"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={19} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100 shadow-xl">
              <img
                src="/assets/profile/profile.jpg"
                alt="Iky"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-lg">
              <p className="text-xs text-neutral-400">Currently</p>
              <p className="text-sm font-semibold">AI Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY ROUTINE */}
      <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm text-neutral-400">MY DAY</p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight">
                Daily Routine
              </h2>
            </div>

            <Music2 className="text-neutral-400" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["Morning", "Start the day", "Gym, coffee & planning"],
              ["Day", "Build & work", "Coding, driving & learning"],
              ["Night", "Slow down", "Cooking, reading & relaxing"],
            ].map(([time, title, description]) => (
              <div
                key={time}
                className="rounded-3xl border border-neutral-200 bg-white p-7"
              >
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  {time}
                </p>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-sm text-neutral-400">01 — ABOUT ME</p>

        <div className="mt-8 grid gap-12 md:grid-cols-2">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Curious mind.
            <br />
            Practical hands.
            <br />
            Always learning.
          </h2>

          <div>
            <p className="leading-8 text-neutral-500">
              Saya Iky. Saya tertarik dengan teknologi, Artificial
              Intelligence, dan berbagai hal yang bisa dibuat menjadi sesuatu
              yang berguna.
            </p>

            <p className="mt-5 leading-8 text-neutral-500">
              Di luar teknologi, saya menikmati gym, membaca buku, memasak,
              serta pengalaman bekerja secara langsung di lapangan.
            </p>
          </div>
        </div>
      </section>

      {/* HOBBIES */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid gap-4 sm:grid-cols-3">
          {hobbies.map((hobby) => (
            <div
              key={hobby}
              className="rounded-3xl border border-neutral-200 p-8"
            >
              <span className="text-2xl">✦</span>
              <h3 className="mt-8 text-xl font-semibold">{hobby}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="border-y border-neutral-100 bg-neutral-50 px-6 py-28"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-neutral-400">02 — EXPERIENCE</p>

          <div className="mt-10">
            {experiences.map((item) => (
              <div
                key={item.title}
                className="grid gap-3 border-t border-neutral-200 py-8 md:grid-cols-[180px_1fr]"
              >
                <p className="text-sm text-neutral-400">{item.year}</p>

                <div>
                  <h3 className="text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-sm text-neutral-400">03 — MY TECH STACK</p>

        <h2 className="mt-5 text-4xl font-bold">Tools I work with.</h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="rounded-2xl border border-neutral-200 p-6 text-center font-medium transition hover:-translate-y-1 hover:shadow-md"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-y border-neutral-100 bg-neutral-50 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-neutral-400">04 — SELECTED WORK</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["AI Engineer", "/assets/projects/ai-engineer.jpg"],
              ["Truck Driver", "/assets/projects/truck-driver.jpg"],
              ["Pengelasan", "/assets/projects/welding.jpg"],
            ].map(([title, image]) => (
              <div
                key={title}
                className="group overflow-hidden rounded-3xl bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CV */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="rounded-[2rem] bg-neutral-900 p-8 text-white md:p-14">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-sm text-neutral-400">CURRICULUM VITAE</p>
              <h2 className="mt-3 text-4xl font-bold">
                Want to know more?
              </h2>
            </div>

            <a
              href="/assets/cv/iky-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900"
            >
              Download CV
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-sm text-neutral-400">05 — CONTACT</p>

        <h2 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight">
          Let&apos;s build something together.
        </h2>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="https://wa.me/6283140209281"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/calmessence__/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium"
          >
            <Instagram size={18} />
            Instagram
          </a>

          <a
            href="https://www.facebook.com/share/1DgK4XQaC2/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium"
          >
            <Facebook size={18} />
            Facebook
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-100 px-6 py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <p className="font-semibold">Iky.</p>
          <p className="text-sm text-neutral-400">© 2026</p>
        </div>
      </footer>

      {/* AI ASSISTANT */}
      {aiOpen && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-40px)] max-w-sm overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-100 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white">
                ✦
              </div>

              <div>
                <p className="font-semibold">Iky Assistant</p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
            </div>

            <button onClick={() => setAiOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  item.role === "user"
                    ? "ml-auto bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700"
                }`}
              >
                {item.content}
              </div>
            ))}

            {loading && (
              <div className="w-fit rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-neutral-400">
                Typing...
              </div>
            )}
          </div>

          <div className="border-t border-neutral-100 p-3">
            <div className="flex items-center gap-2 rounded-2xl bg-neutral-100 px-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Ask me anything..."
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
              />

              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-xl bg-neutral-900 p-2 text-white disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-xl text-white shadow-xl"
          aria-label="Open AI Assistant"
        >
          ✦
        </button>
      )}
    </main>
  );
}
