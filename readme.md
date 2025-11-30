

## **NovaChat – Real-Time Messaging App**

NovaChat, modern full-stack geliştirme pratikleri kullanılarak hazırlanmış gerçek zamanlı bir mesajlaşma uygulamasıdır.
Socket.IO, Redis, MongoDB ve React üzerine inşa edilmiştir.

### 🚀 **Features**

* Real-time DM & grup sohbetleri
* Online/offline takip
* Typing indicator
* Mesaj silme ve düzenleme
* JWT tabanlı kimlik doğrulama
* Dosya gönderme
* Redis ile presence yönetimi
* Docker Compose ile tek komut deploy

---

### 🛠️ **Tech Stack**

* **Frontend:** React, Tailwind
│   │   ├── config/
# NovaChat — Real-Time Messaging App

NovaChat, gerçek zamanlı sohbet özellikleri olan modern bir full‑stack örnek uygulamadır. Bu repository, asıl proje fikrinin yanı sıra hızlı bir başlangıç (scaffold) sundu: minimal `backend` (Express + Socket.IO + MongoDB + JWT auth) ve `frontend` (Vite + React) uygulamaları ile `docker-compose` tanımı.

Bu README, repo içindeki scaffold değişikliklerini, çalışma talimatlarını ve kısa API dokümantasyonunu içerir — GitHub üzerinde güzel görünecek şekilde düzenlendi.

## Öne çıkanlar
- Minimal, çalışır halde bir `backend` ve `frontend` scaffold eklendi.
- Gerçek zamanlı mesajlaşma: Socket.IO ile chat event'leri.
- Mesajlar MongoDB'ye kaydedilir (`mongoose`).
- JWT tabanlı auth: `/api/auth/register` ve `/api/auth/login`.
- Basit frontend login/register ve chat UI (token saklanır ve socket bağlantısına eklenir).

## Hızlı Başlangıç (Docker, önerilen)

1) Klasör kökünde şu komutla tüm servisleri ayağa kaldırın:

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App"
docker compose up --build
```

- Frontend (NGINX): http://localhost:3000
- Backend API: http://localhost:5000/api

## Yerel geliştirme (Docker olmadan)

1) Backend bağımlılıklarını yükleyin ve başlatın:

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\backend"
npm install
npm start
```

2) Frontend bağımlılıklarını yükleyin ve başlatın:

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\frontend"
npm install
npm run dev
```

Not: Docker olmadan MongoDB çalışmıyorsa mesaj depolama başarısız olur; yerel Mongo çalıştırın veya Docker kullanın.

## Önemli Dosyalar / Yapı

- `docker-compose.yml` — `backend`, `frontend`, `mongo`, `redis` servislerini tanımlar.
- `backend/` — Express + Socket.IO backend
  - `backend/src/index.js` — sunucu, socket ve Mongo bağlantısı
  - `backend/src/models/message.js` — `Message` mongoose modeli
  - `backend/src/models/user.js` — `User` mongoose modeli
  - `backend/src/routes/auth.js` — `/api/auth/register` ve `/api/auth/login`
  - `backend/src/middleware/auth.js` — token doğrulama yardımcıları
- `frontend/` — Vite + React uygulaması
  - `frontend/src/App.jsx` — login/register + chat UI ve socket istemcisi

## Kısa API Dokümantasyonu

- GET `/api/hello` — Sağlıklı olduğuna dair basit mesaj.
- GET `/api/messages` — Son mesajları getirir (maks 50). Authorization optional; authenticated kullanıcı ile çağırmak tercih edilir.
- POST `/api/auth/register` — Body: `{ "username": "", "password": "" }` — Kayıt olur, JWT token döner.
- POST `/api/auth/login` — Body: `{ "username": "", "password": "" }` — Giriş yapar, JWT token döner.

Socket.IO (client-side):
- Bağlanırken handshake auth içinde token gönderin: `io(url, { auth: { token } })`.
- Olaylar:
  - `chat:message` — client -> server: `{ text }` ; server DB'ye kaydeder ve tüm client'lara `{ id, text, from, ts }` yayınlar.

## Ortam Değişkenleri

Kök dizinde ` .env.example` bulunur. Önemli değişkenler:
- `PORT` — backend port (default `5000`)
- `MONGO_URI` — MongoDB bağlantısı (ör: `mongodb://mongo:27017/novachat`)
- `REDIS_URL` — Redis URL (scaffold hazır, ama şu an demo için minimal kullanılıyor)
- `JWT_SECRET` — JWT için gizli anahtar, üretimde güçlü bir değer kullanın

## Güvenlik ve Notlar

- Bu scaffold demo amaçlıdır. Üretimde eklemeniz gerekenler:
  - Input validasyonu ve sanitizasyon
  - Rate limiting
  - HTTPS zorunluluğu
  - Güçlü `JWT_SECRET` kullanımı ve oturum yönetimi
  - Testler ve CI

## Neler Eklendi (kısa)

- Backend: `Message` model, `User` modeli, auth rotaları, socket token doğrulama, Mongo persist.
- Frontend: Login/Register UI, token saklama (`localStorage`), socket token ile bağlantı, basit chat UI.

## Sonraki Adımlar / Öneriler

1. Tailwind ile UI iyileştirmesi ve responsive tasarım.
2. Jest + Supertest ile backend testleri; React Testing Library ile frontend testleri.
3. GitHub Actions workflow ekleyip `README`'e CI badge yerleştirme.
4. Mesajlar için paging, silme/düzenleme yetenekleri.

---

If you want, I can also create a CI workflow and add a build/test badge to this README (ask me to proceed).
