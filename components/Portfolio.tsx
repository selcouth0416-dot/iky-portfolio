"use client";

import { useEffect, useState } from "react";
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
  {
    year: "2026",
    title: "AI Engineer",
    text: "Building AI-powered applications and exploring modern artificial intelligence technologies.",
  },
  {
    year: "2024 — Sekarang",
    title: "Driver Truk",
    text: "Professional truck driving with focus on safety, responsibility, time management, and vehicle care.",
  },
  {
    year: "2023 — 2024",
    title: "Pengelasan",
    text: "Experience in welding work with attention to precision, safety, and practical problem solving.",
  },
];

const technologies = [
  { name: "React", type: "Frontend", symbol: "R" },
  { name: "Next.js", type: "Frontend", symbol: "N" },
  { name: "Tailwind CSS", type: "Frontend", symbol: "T" },
  { name: "TypeScript", type: "Frontend", symbol: "TS" },
  { name: "Node.js", type: "Backend", symbol: "N" },
  { name: "Express.js", type: "Backend", symbol: "E" },
  { name: "MySQL", type: "Database", symbol: "M" },
  { name: "MongoDB", type: "Database", symbol: "M" },
];

const works = [
  {
    title: "AI Engineer",
    category: "Artificial Intelligence",
    image: "/assets/projects/ai-engineer.jpg",
  },
  {
    title: "Driver Truk",
    category: "Professional Experience",
    image: "/assets/projects/truck-driver.jpg",
  },
  {
    title: "Pengelasan",
    category: "Technical Experience",
    image: "/assets/projects/welding.jpg",
  },
];

const routines = [
  ["Morning", "Gym & Start the Day"],
  ["Day", "Work & Build"],
  ["Evening", "Learning & Reading"],
  ["Night", "Relax & Reset"],
];

export default function Portfolio() {
  const [aiOpen, setAiOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Halo! Saya Iky Assistant. Ada yang ingin kamu ketahui tentang Iky?",
    },
  ]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => {
      section.classList.add("scroll-hidden");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  async function sendMessage() {
    const text = input.trim();

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            data.text ||
            "Maaf, saya sedang mengalami kendala. Coba beberapa saat lagi.",
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: "Maaf, AI Assistant sedang tidak dapat digunakan.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="portfolio">
      {/* NAVBAR */}
      <nav className="floating-nav">
        <a href="#home" className="nav-logo">
          Iky<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#stack">Stack</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>

        <a href="#contact" className="nav-contact">
          Let&apos;s Talk <ArrowUpRight size={15} />
        </a>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">PORTFOLIO · 2026</p>

          <h1>
            Turning
            <br />
            ideas into
            <br />
            <span>reality.</span>
          </h1>

          <p className="hero-description">
            AI Engineer, truck driver, and lifelong learner. I enjoy building
            things, learning new technology, and turning ideas into something
            real.
          </p>

          <div className="hero-actions">
            <a href="#work" className="primary-button">
              Explore my work <ArrowDown size={17} />
            </a>

            <a href="#contact" className="secondary-button">
              Get in touch <ArrowUpRight size={17} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              src="/assets/profile/profile.jpg"
              alt="Iky"
              className="hero-image"
            />
          </div>

          <div className="hero-floating-card">
            <span className="status-dot" />
            <div>
              <strong>Available</strong>
              <small>for new opportunities</small>
            </div>
          </div>

     <div className="hero-number">01</div>
        </div>
      </section>

      {/* DAILY ROUTINE */}
  <section className="routine-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A DAY IN MY LIFE</p>
            <h2>Daily Routine<span>.</span></h2>
          </div>

          <p>
            Small habits, consistent effort, and time spent learning shape my
            everyday life.
          </p>
        </div>

        <div className="routine-layout">
          <div className="routine-cover">
            <img
              src="/assets/routine/cover.jpg"
              alt="Daily routine"
            />

            <div className="routine-cover-overlay">
              <span>DAILY ROTATION</span>
              <strong>Keep moving.</strong>
            </div>
          </div>

          <div className="routine-list">
            {routines.map(([time, activity], index) => (
              <div className="routine-item" key={time}>
                <span className="routine-index">
                  0{index + 1}
                </span>

                <div>
                  <small>{time}</small>
                  <strong>{activity}</strong>
                </div>

                <ArrowUpRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="section-number">02</div>

        <div className="about-content">
          <p className="eyebrow">ABOUT ME</p>

          <h2>
            Curious mind.
            <br />
            <span>Practical hands.</span>
          </h2>

          <p className="large-text">
            I&apos;m Iky — someone who enjoys combining technology with real
            world experience. From driving trucks to learning AI engineering,
            I believe every experience can become a foundation for something
            better.
          </p>

          <div className="about-bottom">
            <div>
              <small>BASED IN</small>
              <strong>Indonesia</strong>
            </div>

            <div>
              <small>INTERESTS</small>
              <strong>AI · Technology · Learning</strong>
            </div>

            <div>
              <small>HOBBIES</small>
              <strong>Gym · Books · Cooking</strong>
            </div>
          </div>
        </div>
      </section>
       
      {/* EXPERIENCE */}
       <section id="experience" className="experience-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MY JOURNEY</p>
            <h2>Experience<span>.</span></h2>
          </div>

          <span className="section-label">03</span>
        </div>

        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-card" key={item.title}>
              <span className="experience-year">{item.year}</span>

              <div className="experience-main">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <ArrowUpRight size={21} />
            </article>
          ))}
        </div>
      </section>
      
      {/* TECH STACK */}
      <section id="stack" className="stack-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHAT I USE</p>
            <h2>My Tech Stack<span>.</span></h2>
          </div>

          <p>
            Technologies I&apos;m learning and using to build modern digital
            experiences.
          </p>
        </div>

        <div className="tech-grid">
          {technologies.map((tech) => (
            <div className="tech-card" key={tech.name}>
              <div className="tech-symbol">{tech.symbol}</div>

              <div>
                <small>{tech.type}</small>
                <strong>{tech.name}</strong>
              </div>

              <ArrowUpRight size={17} />
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="work-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Things I&apos;ve done<span>.</span></h2>
          </div>

          <span className="section-label">04</span>
        </div>

        <div className="work-grid">
          {works.map((work, index) => (
            <article
              className={`work-card ${
                index === 1 ? "work-card-large" : ""
              }`}
              key={work.title}
            >
              <div className="work-image">
                <img src={work.image} alt={work.title} />

                <div className="work-overlay">
                  <span>VIEW EXPERIENCE</span>
                  <ArrowUpRight size={22} />
                </div>
              </div>

              <div className="work-info">
                <div>
                  <small>{work.category}</small>
                  <h3>{work.title}</h3>
                </div>

                <span>0{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CV */}
      <section className="cv-section">
        <div className="cv-card">
          <div>
            <p className="eyebrow">CURRICULUM VITAE</p>
            <h2>Want to know more?</h2>
            <p>
              Download my CV to see my background, experience, and skills.
            </p>

            <a
              href="/assets/cv/iky-cv.pdf"
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
              Download CV <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="cv-photo">
            <img src="/assets/cv/photo.JPG" alt="Iky CV" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="section-number">05</div>

        <div className="contact-content">
          <p className="eyebrow">GET IN TOUCH</p>

          <h2>
            Let&apos;s create
            <br />
            something <span>great.</span>
          </h2>

          <p className="contact-description">
            Have an idea, opportunity, or simply want to say hello? Feel free
            to reach out.
          </p>

          <div className="social-links">
            <a
              href="https://www.instagram.com/calmessence__/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={19} />
              Instagram
              <ArrowUpRight size={16} />
            </a>

            <a
              href="https://wa.me/6283140209281"
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={19} />
              WhatsApp
              <ArrowUpRight size={16} />
            </a>

            <a
              href="https://www.facebook.com/share/1DgK4XQaC2/"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook size={19} />
              Facebook
              <ArrowUpRight size={16} />
            </a>

            <a
              href="https://www.tiktok.com/@usrnotfound32"
              target="_blank"
              rel="noreferrer"
            >
              <span className="tiktok-icon">♪</span>
              TikTok
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */} 
     <footer className="footer">
        <strong>Iky<span>.</span></strong>
        <p>Designed & built with curiosity.</p>
        <span>© 2026</span>
      </footer>

      {/* AI BUTTON */}
      {!aiOpen && (
        <button
          className="ai-floating-button"
          onClick={() => setAiOpen(true)}
          aria-label="Open AI Assistant"
        >
          <span className="ai-orb">✦</span>
          <span>Ask Iky AI</span>
        </button>
      )}

      {/* AI PANEL */}
      {aiOpen && (
        <div className="ai-panel">
          <div className="ai-header">
            <div className="ai-title">
              <div className="ai-orb">✦</div>
              <div>
                <strong>Iky Assistant</strong>
                <small>
                  <span className="status-dot" />
                  Online
                </small>
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setAiOpen(false)}
              aria-label="Close AI Assistant"
            >
              <X size={20} />
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.role === "user" ? "user" : "assistant"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="ai-message assistant">
                Thinking...
              </div>
            )}
          </div>

          <div className="ai-input-wrap">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="Ask me anything..."
            />

            <button onClick={sendMessage} disabled={loading}>
              <Send size={17} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
