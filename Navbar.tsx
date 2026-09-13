 "use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const links = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["contacts", "Contacts"],
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const ids = links.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.35, 0.7] }
    );
    ids.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <a href="#home" className="brand">PORTFOLIO.</a>
      <div className="nav-links">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
            {label}
          </a>
        ))}
      </div>
      <button
        className="theme-btn"
        aria-label={dark ? "Use light theme" : "Use dark theme"}
        onClick={() => setDark((v) => !v)}
      >
        {dark ? <Sun size={17} /> : <Moon size={17} />}
      </button>
    </nav>
  );
}