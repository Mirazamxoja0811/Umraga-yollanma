import { useState, useEffect } from "react";
import { MessageCircle, Phone, Send, X, Headphones, ArrowUpRight } from "lucide-react";
import type { SiteConfig } from "../lib/types";

interface Props {
  site: SiteConfig["site"];
  onOpenBooking: () => void;
}

export default function FloatingContact({ site, onOpenBooking }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneClean = site.phone ? site.phone.replace(/[^\d+]/g, "") : "";
  const telegramHref = site.telegram || "https://t.me/";

  return (
    <aside
      className={`floating-contact-wrap ${hasScrolled ? "is-visible" : ""}`}
      aria-label="Tezkor aloqa"
    >
      {isOpen && (
        <div className="floating-menu" role="dialog" aria-label="Bog‘lanish variantlari">
          <div className="floating-menu-header">
            <div className="floating-agent-info">
              <span className="agent-avatar">
                <Headphones size={18} />
              </span>
              <div>
                <strong>Savollaringiz bormi?</strong>
                <p>Operatorlarimiz aloqada</p>
              </div>
            </div>
            <button
              type="button"
              className="floating-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Menyuni yopish"
            >
              <X size={16} />
            </button>
          </div>

          <div className="floating-links">
            <a
              href={telegramHref}
              target="_blank"
              rel="noreferrer"
              className="floating-item floating-telegram"
            >
              <span className="floating-icon">
                <Send size={18} />
              </span>
              <div className="floating-text">
                <strong>Telegram orqali yozish</strong>
                <small>Tezkor javob beramiz</small>
              </div>
              <ArrowUpRight size={15} className="floating-arrow" />
            </a>

            {phoneClean && (
              <a
                href={`tel:${phoneClean}`}
                className="floating-item floating-phone"
              >
                <span className="floating-icon">
                  <Phone size={18} />
                </span>
                <div className="floating-text">
                  <strong>Telefon qilish</strong>
                  <small>{site.phone}</small>
                </div>
                <ArrowUpRight size={15} className="floating-arrow" />
              </a>
            )}

            <button
              type="button"
              className="floating-item floating-action"
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
            >
              <span className="floating-icon">
                <MessageCircle size={18} />
              </span>
              <div className="floating-text">
                <strong>Ariza qoldirish</strong>
                <small>Mutaxassisimiz sizga qo‘ng‘iroq qiladi</small>
              </div>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`floating-main-trigger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Tezkor aloqa oynasini ochish"
      >
        <span className="pulse-ring" />
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
        {!isOpen && <span className="floating-badge-text">Aloqa</span>}
      </button>
    </aside>
  );
}

