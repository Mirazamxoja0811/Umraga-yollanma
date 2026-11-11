import { useState } from "react";
import {
  Heart,
  MessageSquareQuote,
  ShieldCheck,
  Star,
  UserCheck,
  MapPin,
  Calendar,
  ThumbsUp,
  Quote,
} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  city: string;
  pkg: string;
  date: string;
  rating: number;
  avatarText: string;
  avatarBg: string;
  text: string;
  highlight: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Hoji Qobiljon ota va onaxon",
    role: "Oila bilan birgalikda",
    city: "Toshkent shahri",
    pkg: "Komfort · 14 kun",
    date: "2026-yil fevral",
    rating: 5,
    avatarText: "QO",
    avatarBg: "#087f65",
    highlight: "“Ota-onamizning duolarini olishimizga sababchi bo‘ldingiz”",
    text: "Ota-onamni ilk bor Umraga yuborayotganimda juda xavotirda edim — ularning yoshi kattaroq bo‘lgani uchun mehmonxonaning yaqinligi va guruh rahbarining e’tibori muhim edi. Agentlik barcha aytgan shartlarini a’lo darajada bajardi. Makka va Madinadagi mehmonxonalar shinam, yo‘lboshchimiz har bir amalni sabr bilan o‘rgatib bordilar. Rahmat sizlarga!",
  },
  {
    id: 2,
    name: "Dilshodbek va Shahnoza",
    role: "Yosh oila",
    city: "Samarqand",
    pkg: "Premium · 14 kun",
    date: "2026-yil yanvar",
    rating: 5,
    avatarText: "DS",
    avatarBg: "#b3832b",
    highlight: "“Har bir detal puxta o‘ylangan, transferlar juda qulay”",
    text: "Tezyurar Haramain poyezdida Makka va Madina orasidagi yo‘l 2 soatda sezilmay o‘tdi. Besh yulduzli mehmonxona Haramga juda yaqin — istagan vaqtimizda ibodatga chiqib kela oldik. O‘zbek milliy taomlari bilan ta’minlangani ham katta qulaylik berdi. Safarimiz haqiqatan ham unutilmas bo‘ldi.",
  },
  {
    id: 3,
    name: "Ilhomjon aka Karimov",
    role: "Yakka tartibda",
    city: "Andijon",
    pkg: "Standart · 10 kun",
    date: "2025-yil dekabr",
    rating: 5,
    avatarText: "IK",
    avatarBg: "#083e36",
    highlight: "“Hamyonbop narxda shunday tartibli tashkilot — katta rahmat”",
    text: "Men Standart paketni tanlagan edim, ammo ko‘rsatilgan xizmat darajasi kutganimdan ancha yuqori bo‘ldi. Shattl avtobuslar 24 soat to‘xtovsiz Haramga qatnab turdi, hech qanday qiyinchilik sezmadik. Viza, aviachiptalar va kutib olish hammasi vaqtida va aniq tashkil etildi.",
  },
  {
    id: 4,
    name: "Gulbahor opa Rahmonova",
    role: "Ayollar guruhi bilan",
    city: "Farg‘ona",
    pkg: "Komfort · 14 kun",
    date: "2026-yil bahor",
    rating: 5,
    avatarText: "GR",
    avatarBg: "#607d8b",
    highlight: "“Ayniqsa yo‘lboshchi ustozimizning darslari juda manzur bo‘ldi”",
    text: "Ayollar uchun alohida e’tibor va amallarni tushuntirib berish borasida juda katta ish qilindi. Tarixiy ziyoratgohlar — Uhud tog‘i, Qubo masjidi va Xandaq hududlariga sayohatlar davomida juda ko‘p yangi ma’lumotlarni bildik. Qalblarimiz taskin topdi.",
  },
];

export default function Testimonials({ items }: { items?: any[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const list = items && items.length > 0 ? items : testimonials;

  const filtered = activeFilter === "all"
    ? list
    : list.filter((t) => (t.pkg || "").toLowerCase().includes(activeFilter));

  return (
    <section className="container section testimonials-section" id="fikrlar">
      <div className="section-heading" data-reveal>
        <div>
          <div className="eyebrow">
            <MessageSquareQuote size={16} /> SAMIMIY TAASSUROTlar
          </div>
          <h2>
            Ziyoratchilarimizning <span>dil so‘zlari</span>
          </h2>
          <p>
            Har bir ziyoratchining xotirjamligi va roziligi — bizning eng oliy maqsadimizdir.
            Safarimizda bo‘lgan yurtdoshlarimizning haqiqiy fikrlari bilan tanishing.
          </p>
        </div>

        <div className="segmented">
          <button
            type="button"
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => setActiveFilter("all")}
          >
            Barchasi ({testimonials.length})
          </button>
          <button
            type="button"
            className={activeFilter === "komfort" ? "active" : ""}
            onClick={() => setActiveFilter("komfort")}
          >
            Komfort
          </button>
          <button
            type="button"
            className={activeFilter === "premium" ? "active" : ""}
            onClick={() => setActiveFilter("premium")}
          >
            Premium
          </button>
          <button
            type="button"
            className={activeFilter === "standart" ? "active" : ""}
            onClick={() => setActiveFilter("standart")}
          >
            Standart
          </button>
        </div>
      </div>

      <div className="testimonials-grid" data-reveal>
        {filtered.map((item, index) => {
          const bg = item.avatarBg || (item.rating === 5 ? "#087f65" : "#b3832b");
          const initials =
            item.avatarText ||
            item.name
              .split(" ")
              .map((w: string) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
          return (
            <article key={item.id || index} className="testimonial-card">
              <div className="testimonial-header">
                <div
                  className="testimonial-avatar"
                  style={{ backgroundColor: bg }}
                >
                  {initials}
                </div>
              <div className="testimonial-author">
                <h4>{item.name}</h4>
                <div className="testimonial-meta">
                  <span>
                    <MapPin size={13} /> {item.city}
                  </span>
                  <span>·</span>
                  <span>{item.role}</span>
                </div>
              </div>
              <div className="testimonial-stars" aria-label={`Baho: ${item.rating} yulduz`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="#b3832b" color="#b3832b" />
                ))}
              </div>
            </div>

            <div className="testimonial-highlight">
              <Quote size={20} className="quote-icon" />
              <span>{item.highlight}</span>
            </div>

            <p className="testimonial-body">{item.text}</p>

            <div className="testimonial-footer">
              <span className="testimonial-pkg">
                <ShieldCheck size={14} /> {item.pkg}
              </span>
              <span className="testimonial-date">
                <Calendar size={13} /> {item.date}
              </span>
            </div>
          </article>
        );
      })}
      </div>

      <div className="testimonials-trust-bar" data-reveal>
        <div className="trust-item">
          <strong>99.4%</strong>
          <span>Mamnun ziyoratchilar</span>
        </div>
        <div className="trust-item">
          <strong>5 000+</strong>
          <span>Muborak ziyoratga yetkazilgan hojilar</span>
        </div>
        <div className="trust-item">
          <strong>24 / 7</strong>
          <span>O‘zbek tilidagi doimiy qo‘llab-quvvatlash</span>
        </div>
      </div>
    </section>
  );
}

