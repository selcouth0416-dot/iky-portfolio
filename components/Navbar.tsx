 ""use client";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
const links = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["contacts", "Contact"],
];
export default function Navbar() {
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const sections = links
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            return b.intersectionRatio - a.intersectionRatio;
          });
        if (visibleSections.length > 0) {
          setActive(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5, 0.75],
      }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);
  const handleNavigation = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <nav
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
        aria-label="Primary navigation"
      >
        <a
          href="#home"
          className="brand"
          onClick={handleNavigation}
          aria-label="Go to home"
        >
          IKY<span>.</span>
        </a>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="navbar-actions">
          <button
            type="button"
            className="theme-btn"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
            onClick={() => setDark((value) => !value)}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>
      <div
        className={`mobile-nav ${mobileOpen ? "mobile-nav-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-nav-inner">
          {links.map(([id, label], index) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              onClick={handleNavigation}
              style={{
                transitionDelay: mobileOpen
                  ? `${index * 45}ms`
                  : "0ms",
              }}
            >
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
