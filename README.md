# Umraga yo‘llanma

O‘zbek tilidagi Umra landing sahifasi va serverga ulangan admin panel.
React, TypeScript, Vite, Framer Motion va Node.js SQLite ishlatilgan.
LMS ilovalari va ularning ma’lumotlariga bog‘liq emas.

## Ishga tushirish

Node.js **24+**, npm va ushbu papkada:

```powershell
npm ci
npm run dev -- --port 5180
```

- Sayt: <http://127.0.0.1:5180>.
- Admin panel: <http://127.0.0.1:5180/admin>.
- API: lokal 5182 port. Vite `/api` so‘rovlarini shu yerga uzatadi.
- Birinchi kirishda o‘z login va parolingizni yarating. Parol kamida 12 belgi.
  Tayyor umumiy parol mavjud emas.

Server birinchi admin hisobini faqat loopback ulanishda yaratadi. Ixtiyoriy
`UMRA_ADMIN_USERNAME` va `UMRA_ADMIN_PASSWORD` environment qiymatlari birinchi
ishga tushirishda hisob yaratishi mumkin. Parollarni Gitga qo‘shmang.
`.env` mavjud bo‘lsa avtomatik o‘qiladi; uni yaratish majburiy emas.

```powershell
npm run build
npm start
```

Bu holda <http://127.0.0.1:5182> tayyor build va API’ni birga xizmat qiladi.
`npm run preview` faqat statik build uchun: API uchun `npm start`dan foydalaning.
Tashqi nashr/deploy alohida bajariladi; Git push uni avtomatik nashr qilmaydi.
HTTPS reverse proxy ishlatilganda `UMRA_SECURE_COOKIES=1` belgilang.

## Admin imkoniyatlari

- Haqiqiy arizalardan hisoblanadigan ko‘rsatkichlar va 7 kunlik diagramma.
- Arizalarni qidirish, filtrlash, holati va ichki izohini o‘zgartirish, CSV eksport.
- 3/4/5 yulduzli paketlar, narx, tavsif, xona va joylashuvni tahrirlash.
- Mehmonxona suratlarini yuklash (JPG/PNG/WebP, 5 MB), nom va qulayliklarni tahrirlash.
- Brend, bosh sarlavha, aloqa, sanalar va to‘lov usullarini sozlash.
- Savol-javob qo‘shish va tahrirlash, administrator parolini o‘zgartirish.

Saytdagi ariza SQLite bazaga saqlanadi va admin panelga tushadi. Avtomatik
bron yoki to‘lov yaratilmaydi. Email/Telegram xabarnoma integratsiyasi yo‘q.

## Bulutga joylash (Render.com Deploy)

Loyiha bulutda 24/7 ishlashi uchun Render bilan to‘liq moslashtirilgan (`render.yaml` mavjud):

1. [Render.com](https://render.com) saytida GitHub orqali kiring.
2. **New +** -> **Blueprint** orqali `Umraga-yollanma` repozitoriyasini tanlang.
3. Loyiha avtomatik ravishda Node.js 22 muhitida build qilinadi va ishga tushadi.

---
*Loyiha faol rivojlantirilmoqda va yangilanmoqda.*

## Ma’lumotlar

`.local/safar.sqlite3` — konfiguratsiya, arizalar va admin hisobi;
`.local/uploads/` — yuklangan rasmlar. Bu katalog Gitdan chiqarilgan.
Baza va rasmlarni birga zaxiralang. `UMRA_DB_PATH` va `UMRA_API_PORT` bilan
alohida muhit/port belgilash mumkin.

Parollar scrypt bilan xeshlanadi. Seanslar HttpOnly/SameSite cookie orqali,
serverda xeshlangan token va 12 soatlik muddat bilan ishlaydi. Yozish so‘rovlari
Origin tekshiruvi, autentifikatsiya va server validatsiyasidan o‘tadi.
Sozlamalarni parallel tahrirlash revision nazorati bilan himoyalangan.

Nom, aloqa va tariflar foydalanuvchi topshirig‘iga ko‘ra namuna qiymatlar.
`+998900000000` va `hello@example.com`ni haqiqiy ma’lumotga almashtiring.
Mehmonxona namunalari agentlikning tasdiqlangan hamkorlari degani emas.
Yakuniy xizmatlar va narxlar yozma taklifda kelishiladi.

## Tekshirish

```powershell
npm run build
npm run test:server
npm test
```

Brauzer testlari o‘rnatilgan Google Chrome bilan desktop va mobil ko‘rinishda
ishlaydi. Testlar alohida vaqtinchalik `.local/e2e-*.sqlite3` bazalariga yozadi;
haqiqiy arizalarni o‘zgartirmaydi. Login, CSRF, paketlarni saqlash, real ariza
qabul qilish, rasmlar, filtrlar, eksport va responsiv ko‘rinish tekshiriladi.

## Manbalar

Shriftlar lokal `public/fonts/` ichida. Ularning SIL Open Font License matnlari
shu papkada. Interfeys tarmoqdan Google Fonts yuklanishini kutmaydi.

Asosiy suratlar uchun [Unsplash litsenziyasi](https://unsplash.com/license):

- [Sam Riz — Ka’ba](https://unsplash.com/photos/kaaba-at-masjid-al-haram-in-mecca-ceNCWYqL8DY).
- [Haidan — Masjid an-Nabaviy](https://unsplash.com/photos/al-masjid-an-nabawi-mosque-in-medina-Qec3HPaHWTI).
- [Makka, Abraj al-Bayt](https://images.unsplash.com/photo-1565552645632-d725f8bfc19a).

Boshlang‘ich sayt ma’lumotlari `shared/default-config.json`da. Ular faqat yangi
baza yaratilganda kiritiladi. Keyingi yangilashlar admin paneldan bajariladi.

### Mehmonxona suratlari

Villa suratlari Makka mehmonxonalarining xona suratlariga almashtirilgan:

- [Al Kiswah Towers — Standard Quadruple Room](https://alkiswah-towers.com/standard-quadruple-room/).
- [Elaf Bakkah Hotel — rasmiy galereya](https://www.elafhotels.com/elaf-bakkah/gallery).
- [Swissôtel Makkah — Classic Room va Makka manzarasi](https://www.swissotel.com/hotels/makkah/accommodation/classic-room/).

Manbalar sayt va admin panelda ko‘rsatiladi. Suratlar joylashuv namunalari;
aniq xona turi, yulduz toifasi va agentlik hamkorligi bronlashda tasdiqlanadi.
Eski boshlang‘ich suratlar avtomatik yangilanadi, maxsus yuklangan rasmlar saqlanadi.

### Namoz vaqtlari va ob-havo

Namoz jadvali [AlAdhan API](https://aladhan.com/prayer-times-api) orqali olinadi:
Toshkent uchun MWL/Hanafiy, Makka va Madina uchun Umm al-Qura. Hisobiy usul
interfeysda ko‘rsatiladi. Sana va soat har bir shaharning vaqt zonasiga mos.
Xizmat ishlamasa, taxminiy yoki eski namoz vaqtlarini ko‘rsatmaydi.

Ob-havo [Open-Meteo](https://open-meteo.com/)dan olinadi; harorat yaxlitlangan.
Lokal baholash/prototip uchun ochiq endpoint ishlaydi. Tijoriy nashrda
[Open-Meteo tarifiga](https://open-meteo.com/en/pricing) mos API kalitini
`UMRA_WEATHER_API_KEY` orqali kiriting: server mijoz endpointini tanlaydi.
Kalit brauzerga yuborilmaydi. Tashqi xizmatlar uchun 8 soniyalik timeout va
10 daqiqalik muvaffaqiyatli natija keshi mavjud. Manba ishlamasa bo‘limda
ma’lumot mavjud emasligi ko‘rsatiladi.

Safar oldidan tekshiruv tugmasi [rasmiy davlat xizmatiga](https://oldmy.gov.uz/oz/service/412)
olib boradi. Sayt pasport/JSHSHIR yig‘maydi. To‘lov bo‘limi ma’lumot beradi;
naqd pul, bank kartalari va bank o‘tkazmasi usullari ko‘rsatiladi.
QR to‘lov varianti sayt va admin paneldan olib tashlangan. Eski bazalardagi
QR sozlamalari ham server ishga tushganda yangilanadi.
