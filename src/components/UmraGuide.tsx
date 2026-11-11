import { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Heart,
  ChevronRight,
  Info,
  Footprints,
  Scissors,
  Building,
} from "lucide-react";

interface Step {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  location: string;
  icon: typeof Compass;
  summary: string;
  points: string[];
  duaText?: string;
  duaTranslit?: string;
  duaMeaning?: string;
  tips: string;
}

const steps: Step[] = [
  {
    id: 1,
    number: "01",
    title: "Ehrom va Niyat",
    subtitle: "Safarning boshlanishi va muqaddas holatga kirish",
    location: "Miqot hududida",
    icon: Compass,
    summary:
      "Umra ziyoratining birinchi va asosiy sharti ehromga kirishdir. Ziyoratchi poklanib, maxsus kiyim kiyadi va qalbida samimiy niyat bilan Talbiya aytadi.",
    points: [
      "G‘usl yoki tahorat olinadi, xushbo‘ylik faqat badanga surtiladi (kiyimga emas).",
      "Erkaklar ikki parcha oq mato (rizo va izor) bog‘laydilar, ayollar esa shar’iy odatiy kiyimda bo‘ladilar.",
      "Miqotda 2 rakat ehrom namozi o‘qiladi va Umra niyati qilinadi.",
      "Niyatdan so‘ng Talbiya aytish boshlanadi.",
    ],
    duaText: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
    duaTranslit: "Labbaykallohumma ‘umratan",
    duaMeaning: "«Yo Alloh, Sening chorlovingga labbay deb, Umra niyat qildim.»",
    tips: "Ehromda kishilarga ozor bermaslik, xushbo‘y vositalardan tiyilish va xotirjamlikni saqlash talab etiladi.",
  },
  {
    id: 2,
    number: "02",
    title: "Ka’batulloh Tavofi",
    subtitle: "Baytulloh atrofida 7 bor aylanib ibodat qilish",
    location: "Masjid al-Haram (Makka)",
    icon: Footprints,
    summary:
      "Makkaga yetib borgach, Masjid al-Haramga o‘ng oyoq bilan salovat aytib kiriladi va Ka’ba atrofida Hajarul Asvaddan boshlab soat millariga teskari yo‘nalishda 7 bor tavof qilinadi.",
    points: [
      "Tavof Hajarul Asvad burchagidan (yashil chiroq ro‘parasidan) boshlanadi.",
      "Har bir aylana boshida Hajarul Asvadga qarab «Bismilloh, Allohu Akbar» deyiladi.",
      "Tavof davomida istalgan ezgu duolarni, salovatlarni va Qur’on oyatlarini o‘qish mumkin.",
      "7 aylana yakunlangach, Maqomi Ibrohim orqasida 2 rakat tavof namozi o‘qiladi va to‘yib Zamzam suvi ichiladi.",
    ],
    duaText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    duaTranslit: "Robbanaa aatinaa fid-dunyaa hasanatan va fil-aaxiroti hasanatan va qinaa ‘azaaban-naar.",
    duaMeaning: "«Parvardigoro, bizga bu dunyoda ham, oxiratda ham yaxshilik bergin va bizni do‘zax azobidan saqlagin.»",
    tips: "Zamzam ichganda qiblaga qarab, turib va ezgu niyatlar bilan to‘yib ichish sunnatdir.",
  },
  {
    id: 3,
    number: "03",
    title: "Safo va Marva Sa’yi",
    subtitle: "Hojar onamizning sabr va iymon yo‘llaridan 7 marotaba o‘tish",
    location: "Mas’a yo‘lagi",
    icon: Heart,
    summary:
      "Tavof va Zamzam ichilgach, Safo tepaligiga chiqiladi. Safo va Marva o‘rtasidagi masofa 7 bor bosib o‘tiladi: Safodan Marvaga (1), Marvadan Safoga (2) va hokazo, 7-aylana Marvada tugaydi.",
    points: [
      "Safoga chiqib qiblaga qarab takbir, tahlil va duolar qilinadi.",
      "Sa’y doim Safodan boshlanib, Marva tepaligida tugallanadi.",
      "Yo‘lakdagi yashil chiroqlar oralig‘ida erkaklar biroz chaqqonroq (harvala) yuradilar.",
      "Har safar tepalikka chiqqanda duo qilish mustahab hisoblanadi.",
    ],
    duaText: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
    duaTranslit: "Innas-Sofaa val-Marvata min sha’aa’irillaah",
    duaMeaning: "«Albatta Safo va Marva Allohning (ibodat) belgilaridandir.»",
    tips: "Sa’y paytida telefon bilan band bo‘lmasdan, qalb bilan o‘zingiz va oilangiz uchun ko‘proq duo qiling.",
  },
  {
    id: 4,
    number: "04",
    title: "Halq yoki Taqsiir",
    subtitle: "Sochni qisqartirish va ehromdan chiqish",
    location: "Makka sartaroshxonalari",
    icon: Scissors,
    summary:
      "Marvada Sa’y yakunlangach, erkaklar sochlarini butunlay oldiradilar (halq) yoki baravar qisqartiradilar (taqsiir). Ayollar esa soch uchidan barmoq bo‘g‘ini miqdorida qirqadilar. Shuning bilan Umra amallari to‘liq ado etilgan bo‘ladi.",
    points: [
      "Erkaklar uchun sochni butunlay oldirish (halq) ko‘proq savoblidir.",
      "Soch oldirilishi bilan ehromning barcha cheklovlari yechiladi.",
      "Ziyoratchi oddiy kiyimlarini kiyib, odatiy hayotiga qaytadi.",
      "Umra qabul bo‘lishi uchun shukronalik duolari qilinadi.",
    ],
    tips: "Haram atrofida ko‘plab rasmiy va gigiyenik toza sartaroshxonalar faoliyat yuritadi.",
  },
  {
    id: 5,
    number: "05",
    title: "Madinai Munavvara Ziyorati",
    subtitle: "Payg‘ambarimiz (s.a.v.) shahrida xotirjamlik va salovatlar",
    location: "Madina shahri",
    icon: Building,
    summary:
      "Garchi Madina ziyorati Umraning farzi bo‘lmasa-da, har bir mo‘min-musulmon uchun Rasululloh sollallohu alayhi vasallamning masjidlarini va ravzalarini ziyorat qilish buyuk saodatdir.",
    points: [
      "Masjid an-Nabaviyda namoz o‘qish va Ravzai Muborakada ibodat qilish.",
      "Payg‘ambarimiz (s.a.v.), hazrati Abu Bakr va hazrati Umarga salom yo‘llash.",
      "Islom tarixidagi birinchi masjid — Qubo masjidida 2 rakat namoz (Umra savobiga teng).",
      "Uhud tog‘i va Uhud shahidlarini ziyorat qilish.",
    ],
    duaText: "الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ",
    duaTranslit: "Assolaatu vassalaamu ‘alayka yaa Rasuulallooh",
    duaMeaning: "«Sizga salot va salomlar bo‘lsin, ey Allohning Rasuli!»",
    tips: "Madinada o‘tkazilgan har bir soat tinchlik, odob va zikr bilan o‘tishi tavsiya etiladi.",
  },
];

export default function UmraGuide() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];
  const StepIcon = activeStep.icon;

  return (
    <section className="container section guide-section" id="umra-qollanma">
      <div className="section-heading" data-reveal>
        <div>
          <div className="eyebrow">
            <BookOpen size={16} /> BOSQICHMA-BOSQICH YO‘RIQNOMA
          </div>
          <h2>
            Umra ziyorati <span>amallari qanday bajariladi?</span>
          </h2>
          <p>
            Muqaddas amallarni to‘g‘ri, xotirjam va sunnatga muvofiq ado etishingiz uchun
            asosiy bosqichlar va foydali maslahatlar.
          </p>
        </div>
      </div>

      <div className="guide-wrapper" data-reveal>
        {/* Bosqichlar navigatsiyasi */}
        <div className="guide-nav">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                type="button"
                className={`guide-nav-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveStepId(step.id)}
              >
                <span className="step-num">{step.number}</span>
                <span className="step-nav-icon">
                  <Icon size={18} />
                </span>
                <div className="step-nav-text">
                  <strong>{step.title}</strong>
                  <small>{step.location}</small>
                </div>
                <ChevronRight size={16} className="step-nav-arrow" />
              </button>
            );
          })}
        </div>

        {/* Tanlangan bosqich tafsiloti */}
        <div className="guide-content-card">
          <div className="guide-card-header">
            <div className="guide-badge-row">
              <span className="guide-number-badge">Bosqich {activeStep.number}</span>
              <span className="guide-location-badge">{activeStep.location}</span>
            </div>
            <h3>{activeStep.title}</h3>
            <p className="guide-subtitle">{activeStep.subtitle}</p>
          </div>

          <p className="guide-summary">{activeStep.summary}</p>

          <div className="guide-points-box">
            <h4>Asosiy qoidalar va tartib:</h4>
            <ul>
              {activeStep.points.map((point, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={18} className="point-icon" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {activeStep.duaText && (
            <div className="guide-dua-box">
              <div className="dua-badge">
                <Sparkles size={14} /> Tavsiya etilgan duo
              </div>
              <div className="arabic-text" dir="rtl">
                {activeStep.duaText}
              </div>
              <p className="dua-translit">
                <strong>O‘qilishi:</strong> {activeStep.duaTranslit}
              </p>
              <p className="dua-meaning">
                <strong>Ma’nosi:</strong> {activeStep.duaMeaning}
              </p>
            </div>
          )}

          <div className="guide-tip-box">
            <Info size={18} className="tip-icon" />
            <div>
              <strong>Yo‘lboshchi maslahati:</strong>
              <p>{activeStep.tips}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

