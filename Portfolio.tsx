 "use client";

import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Instagram,
  Facebook,
  Music2,
  MessageCircle,
  Mail,
  MapPin,
  Phone,
  BookOpen,
  Dumbbell,
  ChefHat,
  Truck,
  Wrench,
  Sparkles,
} from "lucide-react";
import Navbar from "./Navbar";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";
import DailyRoutine from "./DailyRoutine";
import AIAssistant from "./AIAssistant";
import { education, experiences, projects, socialLinks, techStack } from "@/data/site";

export default function Portfolio() {
  const backgroundAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = backgroundAudio.current;
    if (!audio) return;

    const tryPlay = () => {
      audio.volume = 0.16;
      audio.play().catch(() => {});
    };

    tryPlay();
    window.addEventListener("pointerdown", tryPlay, { once: true, passive: true });
    return () => window.removeEventListener("pointerdown", tryPlay);
  }, []);

  return (
    <>
      <audio ref={backgroundAudio} src="/assets/music/background.mp3" loop preload="metadata" aria-hidden="true" />
      <Navbar />

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow">PORTFOLIO</p>
              <h1>
                Turning Ideas
                <br />
                <span>Into Reality.</span>
              </h1>
              <p className="hero-lead">
                Saya Iky, seorang AI Engineer yang terus belajar, membangun,
                dan mengubah ide menjadi pengalaman digital yang sederhana,
                cepat, dan fungsional.
              </p>
              <div className="hero-actions">
                <a className="primary-btn" href="#projects">
                  Selected Work <ArrowUpRight size={16} />
                </a>
                <a className="secondary-btn" href="#contacts">
                  Contact Me <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="hero-mini-links">
                <span>FIND ME</span>
                <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
                <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={16} /></a>
                <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-side" delay={0.12}>
            <div className="profile-card">
              <div className="profile-photo-wrap">
                <img src="/assets/profile/profile.jpg" alt="Foto profil Iky" className="profile-photo" />
              </div>
              <div className="profile-bottom">
                <div>
                  <span className="eyebrow">HELLO, I'M</span>
                  <h2>Iky</h2>
                  <p>AI Engineer · Builder</p>
                </div>
                <a href="#about" className="circle-arrow" aria-label="Go to about"><ArrowDown size={18} /></a>
              </div>
            </div>
            <DailyRoutine />
          </Reveal>
        </section>

        <section id="about" className="section">
          <Reveal>
            <div className="section-title">
              <p className="eyebrow">DISCOVER</p>
              <h2>About Me</h2>
            </div>
          </Reveal>

          <div className="about-grid">
            <Reveal className="about-photo">
              <img src="/assets/profile/profile.jpg" alt="Iky profile" />
            </Reveal>

            <div className="about-content">
              <Reveal>
                <div className="two-column">
                  <div>
                    <h3>Who Am I</h3>
                    <p>Saya Iky, berfokus pada menciptakan tampilan dan pengalaman pengguna yang sederhana, cepat, dan fungsional.</p>
                  </div>
                  <div>
                    <h3>My Approach</h3>
                    <p>Saya mengutamakan clean code, desain responsif, dan pengalaman pengguna yang intuitif dalam setiap proyek.</p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="detail-block">
                  <h3>Personal Details</h3>
                  <div className="details">
                    <div><span>Nama</span><strong>Muhammad Risky</strong></div>
                    <div><span>Lahir</span><strong>4 November 2002</strong></div>
                    <div><span>Lokasi</span><strong>Samarinda, Kalimantan Timur</strong></div>
                    <div><span>Email</span><strong>muhammadrzky101@gmail.com</strong></div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="education-block">
                  <h3>Education</h3>
                  {education.map(([school, year]) => (
                    <div className="education-row" key={school}>
                      <span>{school}</span><strong>{year}</strong>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section hobbies-section">
          <Reveal>
            <div className="section-title left">
              <p className="eyebrow">LIFESTYLE</p>
              <h2>Hobbies</h2>
            </div>
          </Reveal>
          <div className="hobby-grid">
            {[
              [Dumbbell, "Gym", "Fitness, discipline, and staying active."],
              [BookOpen, "Reading", "Membaca untuk belajar ide dan perspektif baru."],
              [ChefHat, "Cooking", "Bereksperimen dengan makanan dan resep baru."],
            ].map(([Icon, title, desc], i) => {
              const I = Icon as typeof Dumbbell;
              return (
                <Reveal key={title as string} delay={i * 0.08}>
                  <article className="hobby-card">
                    <I size={22} />
                    <h3>{title as string}</h3>
                    <p>{desc as string}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section id="experience" className="section">
          <Reveal>
            <div className="section-title">
              <p className="eyebrow">CAREER</p>
              <h2>Experience</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {experiences.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.1}>
                <article className="timeline-item">
                  <div className="timeline-dot">
                    {i === 0 ? <Sparkles size={15} /> : i === 1 ? <Truck size={15} /> : <Wrench size={15} />}
                  </div>
                  <div className="timeline-card">
                    <div className="timeline-top">
                      <span className="period">{item.period}</span>
                      <span className="index">0{i + 1}</span>
                    </div>
                    <h3>{item.role}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section tech-section">
          <Reveal>
            <div className="section-title left">
              <p className="eyebrow">TOOLS</p>
              <h2>My Tech Stack</h2>
            </div>
          </Reveal>
          <div className="stack-layout">
            {["Frontend", "Backend Core"].map((group) => (
              <Reveal key={group} className="stack-row">
                <div className="stack-copy">
                  <h3>{group}</h3>
                  <p>{group === "Frontend" ? "The tools I use to build beautiful, responsive, and interactive user interfaces." : "The foundations of the APIs and services I build for web apps and bots."}</p>
                </div>
                <div className="stack-grid">
                  {techStack.filter((item) => item.group === group).map((item) => (
                    <article className="tech-card" key={item.name}>
                      <TechIcon name={item.icon as never} />
                      <strong>{item.name}</strong>
                    </article>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <Reveal>
            <div className="section-title">
              <p className="eyebrow">PORTFOLIO</p>
              <h2>Selected Work</h2>
            </div>
          </Reveal>
          <div className="project-grid">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <article className="project-card">
                  <div className="project-image-wrap">
                    <img src={project.image} alt={`${project.title} project`} className="project-image" />
                    <span>{project.period}</span>
                  </div>
                  <div className="project-info">
                    <div>
                      <p className="eyebrow">EXPERIENCE</p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <span className="circle-arrow"><ArrowUpRight size={17} /></span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contacts" className="section contact-section">
          <Reveal>
            <div className="section-title">
              <p className="eyebrow">LET'S CONNECT</p>
              <h2>Contacts</h2>
            </div>
          </Reveal>

          <div className="contact-grid">
            <Reveal className="contact-card">
              <h3>Have a project or just want to say hi?</h3>
              <p>Hubungi Iky lewat salah satu channel di bawah.</p>
              <div className="contact-meta">
                <div><Mail size={16} /> muhammadrzky101@gmail.com</div>
                <div><Phone size={16} /> +62 831-4020-9281</div>
                <div><MapPin size={16} /> Samarinda, Kalimantan Timur</div>
              </div>
              <a className="primary-btn" href="/assets/cv/iky-cv.pdf" download>
                Download CV <ArrowDown size={16} />
              </a>
            </Reveal>

            <Reveal className="social-card" delay={0.1}>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer"><Instagram /> <span>Instagram</span><ArrowUpRight size={16} /></a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> <span>WhatsApp</span><ArrowUpRight size={16} /></a>
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer"><Facebook /> <span>Facebook</span><ArrowUpRight size={16} /></a>
              <a href={socialLinks.tiktok} target="_blank" rel="noreferrer"><Music2 /> <span>TikTok</span><ArrowUpRight size={16} /></a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Iky.</span>
        <span>Built with React · Next.js · TypeScript</span>
      </footer>

      <AIAssistant />
    </>
  );
}