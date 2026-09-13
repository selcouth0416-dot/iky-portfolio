"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

const experience = [
  ["2026", "AI Engineer", "Building practical AI-powered solutions."],
  ["2024 — Now", "Truck Driver", "Commercial driving with safety and discipline."],
  ["2023 — 2024", "Welding", "Hands-on welding and fabrication experience."],
];

const stack = [
  ["React", "Frontend"],
  ["Next.js", "Frontend"],
  ["Tailwind CSS", "Frontend"],
  ["TypeScript", "Frontend"],
  ["Node.js", "Backend"],
  ["Express.js", "Backend"],
  ["MySQL", "Database"],
  ["MongoDB", "Database"],
];

const works = [
  ["AI Engineer", "/assets/projects/ai-engineer.jpg"],
  ["Truck Driver", "/assets/projects/truck-driver.jpg"],
  ["Welding", "/assets/projects/welding.jpg"],
];

export default function Portfolio() {
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Iky Assistant. Ask me anything about Iky.",
    },
  ]);

  async function askAI() {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    const newMessages = [
      ...messages,
      { role: "user", content: userText },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            data.text ||
            "Maaf, AI Assistant sedang mengalami kendala.",
        },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Maaf, coba lagi beberapa saat.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fafafa] text-[#111]">

      {/* NAVBAR */}
      <header className="fixed left-1/2 top-5 z-50 w-[92%] max-w-5xl -translate-x-1/2">
        <nav className="flex items-center justify-between rounded-full border border-black/10 bg-white/85 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          <a
            href="#home"
            className="text-xl font-bold tracking-tight"
          >
            Iky.
          </a>

          <div className="hidden items-center gap-7 text-sm text-black/60 md:flex">
            <a href="#about" className="transition hover:text-black">
              About
            </a>
            <a href="#experience" className="transition hover:text-black">
              Experience
            </a>
            <a href="#stack" className="transition hover:text-black">
              Stack
            </a>
            <a href="#work" className="transition hover:text-black">
              Work
            </a>
            <a href="#contact" className="transition hover:text-black">
              Contact
            </a>
          </div>

          <button
            onClick={() => setAiOpen(true)}
            className="rounded-full bg-black px-5 py-2 text-sm text-white transition hover:scale-105"
          >
            Ask AI
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pt-28"
      >
        <div className="grid items-center gap-16 md:grid-cols-[1.15fr_.85fr]">

          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[.3em] text-black/40">
              Hello, I'm
            </p>

            <h1 className="text-7xl font-bold tracking-[-.07em] sm:text-8xl md:text-[9rem]">
              Iky
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-black/50">
              AI Engineer with a practical mindset. I enjoy technology,
              learning new things, and turning ideas into something real.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Let&apos;s Talk
              </a>

              <a
                href="#about"
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium"
              >
                Explore
                <ArrowDown size={15} />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5 text-black/50">
              <a
                href="https://www.instagram.com/calmessence__/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-black"
              >
                <Instagram size={19} />
              </a>

              <a
                href="https://www.tiktok.com/@usrnotfound32"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold transition hover:text-black"
              >
                TikTok
              </a>

              <a
                href="https://www.facebook.com/share/1DgK4XQaC2/"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-black"
              >
                <Facebook size={19} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="overflow-hidden rounded-[2.5rem] bg-neutral-200 shadow-2xl">
              <img
                src="/assets/profile/profile.jpg"
                alt="Iky"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-xl">
              <p className="text-[10px] uppercase tracking-widest text-black/40">
                Currently
              </p>
              <p className="mt-1 text-sm font-semibold">
                AI Engineer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY ROUTINE */}
      <section className="border-y border-black/5 bg-white px-6 py-28">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.25em] text-black/35">
                My day
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
                Daily Routine
              </h2>
            </div>

            <div className="hidden rounded-full border border-black/10 px-4 py-2 text-xs text-black/50 sm:block">
              Daily Rotation
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "Morning", "Gym, coffee & planning"],
              ["02", "Day", "Coding, driving & learning"],
              ["03", "Night", "Cooking, reading & relaxing"],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="group rounded-[2rem] border border-black/10 bg-[#fafafa] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <span className="text-xs text-black/30">
                  {number}
                </span>

                <h3 className="mt-14 text-2xl font-semibold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/45">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-6xl px-6 py-32"
      >
        <p className="text-xs uppercase tracking-[.25em] text-black/35">
          01 — About Me
        </p>

        <div className="mt-10 grid gap-16 md:grid-cols-2">
          <h2 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Curious mind.
            <br />
            Practical hands.
            <br />
            Always learning.
          </h2>

          <div className="max-w-lg">
            <p className="text-lg leading-8 text-black/55">
              Saya Iky. Saya tertarik pada teknologi, Artificial
              Intelligence, dan proses membuat ide menjadi sesuatu
              yang benar-benar bisa digunakan.
            </p>

            <p className="mt-6 text-lg leading-8 text-black/55">
              Saya juga menikmati gym, membaca buku, memasak, dan
              berbagai pengalaman praktis di kehidupan sehari-hari.
            </p>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="border-y border-black/5 bg-white px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[.25em] text-black/35">
            02 — Experience
          </p>

          <div className="mt-12">
            {experience.map(([year, title, description]) => (
              <div
                key={title}
                className="grid gap-4 border-t border-black/10 py-9 md:grid-cols-[200px_1fr]"
              >
                <p className="text-sm text-black/35">
                  {year}
                </p>

                <div>
                  <h3 className="text-2xl font-semibold">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-xl leading-7 text-black/45">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section
        id="stack"
        className="mx-auto max-w-6xl px-6 py-32"
      >
        <p className="text-xs uppercase tracking-[.25em] text-black/35">
          03 — My Tech Stack
        </p>

        <h2 className="mt-5 text-5xl font-bold tracking-tight">
          Tools I work with.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stack.map(([name, category]) => (
            <div
              key={name}
              className="group rounded-[1.75rem] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-bold text-white">
                {name.charAt(0)}
              </div>

              <h3 className="mt-7 font-semibold">
                {name}
              </h3>

              <p className="mt-1 text-xs text-black/35">
                {category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section
        id="work"
        className="border-y border-black/5 bg-white px-6 py-32"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[.25em] text-black/35">
            04 — Selected Work
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {works.map(([title, image]) => (
              <article
                key={title}
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-[#fafafa]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between p-6">
                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <ArrowUpRight size={18} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CV */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-black p-9 text-white md:p-16">
          <div className="relative z-10 flex flex-col justify-between gap-10 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[.25em] text-white/40">
                Curriculum Vitae
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Want to know more?
              </h2>
            </div>

            <a
              href="/assets/cv/iky-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
            >
              Download CV
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 pb-32"
      >
        <p className="text-xs uppercase tracking-[.25em] text-black/35">
          05 — Contact
        </p>

        <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Let&apos;s build something together.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="https://wa.me/6283140209281"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <a
            href="https://www.instagram.com/calmessence__/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium"
          >
            <Instagram size={18} />
            Instagram
          </a>

          <a
            href="https://www.facebook.com/share/1DgK4XQaC2/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium"
          >
            <Facebook size={18} />
            Facebook
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="font-bold">Iky.</span>
          <span className="text-xs text-black/35">
            Built with Next.js
          </span>
        </div>
      </footer>

      {/* AI BUTTON */}
      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl text-white shadow-2xl transition hover:scale-110"
        >
          ✦
        </button>
      )}

      {/* AI ASSISTANT */}
      {aiOpen && (
        <div className="fixed bottom-5 right-5 z-[100] flex w-[calc(100%-40px)] max-w-[390px] flex-col overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl">

          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                ✦
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Iky Assistant
                </p>

                <p className="text-[11px] text-green-500">
                  ● Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setAiOpen(false)}
              className="text-black/40"
            >
              <X size={19} />
            </button>
          </div>

          <div className="flex h-[330px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  item.role === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-neutral-100 text-black/70"
                }`}
              >
                {item.content}
              </div>
            ))}

            {loading && (
              <div className="w-fit rounded-2xl bg-neutral-100 px-4 py-3 text-sm text-black/40">
                Thinking...
              </div>
            )}
          </div>

          <div className="border-t border-black/5 p-3">
            <div className="flex items-center rounded-2xl bg-neutral-100 px-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askAI();
                }}
                placeholder="Ask me anything..."
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
              />

              <button
                onClick={askAI}
                disabled={loading}
                className="rounded-xl bg-black p-2 text-white disabled:opacity-30"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
