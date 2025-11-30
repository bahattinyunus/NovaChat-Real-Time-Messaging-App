

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
[![CI](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml/badge.svg)](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml) [![Codecov](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# NovaChat — Real-Time Messaging App


<p align="center">
  <img src="assets/logo.svg" alt="NovaChat logo" width="560" />
</p>

Bu repo, proje fikrini göstermek ve hızlıca yerel veya Docker tabanlı geliştirme yapmanızı sağlamak için sade, çalışır bir örnek içerir.

## İçindekiler

- [Öne Çıkanlar](#öne-çıkanlar)
- [Canlı Başlangıç (Docker)](#canlı-başlangıç-docker)
- [Yerel Geliştirme (Docker olmadan)](#yerel-geliştirme-docker-olmadan)
- [Kısa API & Socket Dokümantasyonu](#kısa-api--socket-dokümantasyonu)
- [WebSocket Örneği (Client)](#websocket-örneği-client)
- [Proje Yapısı](#proje-yapısı)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Güvenlik Notları](#güvenlik-notları)
- [Katkıda Bulunma](#katkıda-bulunma)
- [License](#license)

## Öne Çıkanlar

- Basit, çalışır `backend` + `frontend` scaffold.
- Gerçek zamanlı ileti: `Socket.IO`.
- Mesajlar MongoDB'ye kaydedilir (`mongoose`).
- JWT tabanlı auth: `/api/auth/register` ve `/api/auth/login`.
- Frontend'de login/register + token saklama + chat UI.

## Canlı Başlangıç (Docker)

Önerilen yol: Docker Compose ile tüm servisleri ayağa kaldırın.

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App"
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

<p align="center">
  <img src="assets/demo-animation.svg" alt="NovaChat animated demo" width="800" />
</p>

## Yerel Geliştirme (Docker olmadan)

1) Backend:

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\backend"
npm install
npm start
```

2) Frontend:

```powershell
<!--
  README: Full rewrite for NovaChat project
  - Completely new, project-focused, Turkish-language README
  - Contains badges, quick start, API & Socket examples, testing/CI notes, env vars, security, contribution
-->

[![CI](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml/badge.svg)](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml) [![Codecov](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# NovaChat — Real‑Time Messaging App

![NovaChat Logo](assets/logo.svg)

NovaChat, öğrenme ve hızlı prototipleme amacıyla hazırlanmış, gerçek‑zamanlı mesajlaşma özellikleri barındıran bir full‑stack scaffold uygulamasıdır. Bu repo; backend, frontend, gerçek‑zaman katmanı, temel auth ve Docker Compose ile tek komutla çalıştırılabilecek bir yerel ortam içerir.

Ana hedefler

- Hızlı başlangıç: minimal ama çalışır bir backend + frontend iskeleti.
- Gerçek‑zamanlı altyapı: Socket.IO ile mesajlaşma, presence ve bildirim akışı.
- Kolay geliştirilebilir: MongoDB ile mesajların kalıcılığı, JWT ile basit auth.

---

## İçindekiler

- [Hızlı Başlangıç (Docker)](#hızlı-başlangıç-docker)
- [Yerel Geliştirme (Docker olmadan)](#yerel-geliştirme-docker-olmadan)
- [API & WebSocket (kısa)](#api--websocket-kısa)
- [Örnekler: curl & Socket.IO](#örnekler-curl--socketio)
- [Testler ve CI](#testler-ve-ci)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Proje Yapısı](#proje-yapısı)
- [Güvenlik Notları](#güvenlik-notları)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

---

## Hızlı Başlangıç (Docker)

1. Depoyu klonlayın ve köke gidin:

```powershell
git clone https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App.git
cd "NovaChat – Real-Time Messaging App"
```

2. Docker Compose ile tüm servisleri ayağa kaldırın:

```powershell
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`

Animasyonlu demo README başında gösterilir; uygulama çalışırken benzer bir akışı frontend üzerinde gözlemleyebilirsiniz.

---

## Yerel Geliştirme (Docker olmadan)

Backend ve frontend’i ayrı ayrı geliştirmek isterseniz:

Backend

```powershell
cd backend
npm install
npm run dev
```

Frontend

```powershell
cd frontend
npm install
npm run dev
```

Not: Mesajların kalıcılığı için MongoDB gereklidir. Docker kullanmıyorsanız yerel bir MongoDB çalıştırın veya `MONGO_URI` ile uzak bir DB’ye bağlanın.

---

## API & WebSocket (kısa)

HTTP Endpoints

- `GET /api/hello` — sağlık kontrolü. Örnek: `{ message: 'Hello from NovaChat backend' }`.
- `GET /api/messages` — son mesajları listeler (maks 50).
- `POST /api/auth/register` — kayıt: `{ username, password }` → `{ token, user }`.
- `POST /api/auth/login` — giriş: `{ username, password }` → `{ token, user }`.

WebSocket davranışı (Socket.IO)

- Bağlantı: `io(origin, { auth: { token } })` (token opsiyonel; auth yapılırsa `socket.user` atanır).
- Gönderme: `socket.emit('chat:message', { text })` — server mesajı kaydeder ve `chat:message` ile tüm client'lara gönderir.
- Dinleme: `socket.on('chat:message', (msg) => ...)` — `{ id, text, from, ts }` yapısında mesaj alırsınız.

---

## Örnekler: curl & Socket.IO

Kayıt / Giriş (curl)

```powershell
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'
```

Mesajları alma

```powershell
curl http://localhost:5000/api/messages
```

Socket.IO kısa örnek (browser/client)

```js
import { io } from 'socket.io-client'
const token = localStorage.getItem('token')
const socket = io('http://localhost:5000', { auth: { token } })
socket.on('connect', () => console.log('connected', socket.id))
socket.on('chat:message', (m) => console.log('msg', m))
socket.emit('chat:message', { text: 'Merhaba NovaChat' })
```

---

## Testler ve CI

- Backend: Supertest ile temel entegrasyon testleri ve `c8` ile coverage.
- Frontend: Vitest + React Testing Library.
- GitHub Actions workflow: install, cache, lint, test, build, coverage upload ve Codecov entegrasyonu.

CI çıktıları ve coverage artefaktları Actions üzerinden indirilebilir. Codecov badge README’de yer alır; eğer private repo iseniz `CODECOV_TOKEN` secret eklemeniz gerekir.

---

## Ortam Değişkenleri

Kökte `.env.example` bulunmaktadır — geliştirirken kopyalayıp `.env` oluşturun.

- `PORT` — backend port, default `5000`
- `MONGO_URI` — MongoDB bağlantı stringi (örn. `mongodb://mongo:27017/novachat`)
- `REDIS_URL` — Redis bağlantısı (opsiyonel)
- `JWT_SECRET` — JWT gizli anahtar (üretimde güçlü bir değer kullanın)

---

## Proje Yapısı (kısa)

```
├── backend/        # Express + Socket.IO + Mongoose + routes
├── frontend/       # Vite + React + Tailwind
├── .github/workflows/ci.yml
├── docker-compose.yml
├── assets/         # logo + demo SVG
└── README.md
```

---

## Güvenlik Notları

Bu repo eğitim/demo amaçlıdır. Üretime taşımadan önce:

- Girdi doğrulama ve sanitizasyon ekleyin.
- Rate limiting ve brute‑force koruması uygulayın.
- HTTPS kullanın ve güvenli cookie/CSRF önlemleri alın.
- JWT secret’ınızı güvenle yönetin; refresh token stratejisi kullanın.

---

## Katkıda Bulunma

Destek, hata bildirimi veya PR’lar için çok memnun oluruz. Basit bir yol:

1. Fork/clone yapın
2. Yeni bir branch açın: `git checkout -b feat/isim`
3. Değişiklikleri commit/push yapıp PR açın

Detaylar için `CONTRIBUTING.md` dosyasına bakın.

---

## Lisans

MIT — detaylar için `LICENSE` dosyasına bakın.

---

İsterseniz README’ye aşağıdaki eklemeleri otomatik yapabilirim:

- Örnek Postman koleksiyonu / Swagger/OpenAPI dökümanı
- Deploy rehberi (Docker Production, Vercel/Heroku örnekleri)
- Daha kapsamlı örnek testler ve socket entegrasyon testleri

Hangi eklemeyi otomatik yapmamı istersiniz? 


Socket.IO client (kısa):

```js
import { io } from 'socket.io-client'
const token = localStorage.getItem('token')
const socket = io('http://localhost:5000', { auth: { token } })
socket.on('chat:message', (m) => console.log(m))
socket.emit('chat:message', { text: 'Merhaba' })
```

## Testler & CI

Bu repo için temel test ve CI adımları eklendi:

- Backend: Jest/Supertest (basit entegrasyon), coverage to `backend/coverage`.
- Frontend: Vitest + React Testing Library, coverage to `frontend/coverage`.
- GitHub Actions workflow: install, lint, test, build, upload coverage ve Codecov entegrasyonu.

CI badge ve coverage badge README başına eklendi; Codecov kullanımı için public/private ayarlarınıza göre `CODECOV_TOKEN` eklemeniz gerekebilir.

## Ortam Değişkenleri

- `PORT` — backend port (default: `5000`)
- `MONGO_URI` — MongoDB bağlantı string'i (örn. `mongodb://mongo:27017/novachat`)
- `REDIS_URL` — Redis bağlantısı (opsiyonel)
- `JWT_SECRET` — JWT için gizli anahtar (üretimde güçlü bir değer kullanın)

Kök dizinde `.env.example` bulunmaktadır; üretim değerlerinizi buradan kopyalayıp `.env`'ye ekleyin.

## Proje Yapısı

```
├── backend/        # Express + Socket.IO + Mongoose
├── frontend/       # Vite + React + Tailwind
├── docker-compose.yml
├── .env.example
├── assets/         # logo + demo SVG
└── README.md
```

## Güvenlik Notları

Bu scaffold öğrenme/demo amaçlıdır. Üretim kullanımına hazırlarken şunları uygulayın:

- Input doğrulama ve sanitizasyon
- Rate limiting / brute‑force koruması
- HTTPS ve güvenli cookie/CSRF koruması
- Güçlü `JWT_SECRET` ve oturum yönetimi (refresh token stratejisi)
- Loglama, hata izleme ve donanım kaynak sınırlandırmaları

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır. Küçük, odaklı bir değişiklik yapıp PR açın. Test eklemek ve açıklayıcı commit mesajı yazmak çok yardımcı olur.

1. Fork repo
2. Yeni bir branch açın: `git checkout -b feat/isim`
3. Değişiklikleri commitleyin ve PR açın

Detaylı katkı rehberi için `CONTRIBUTING.md` dosyasına bakın.

## Lisans

MIT — detaylar için `LICENSE` dosyasına bakın.

---

Herhangi bir bölümü daha genişletmemi isterseniz (ör. Auth örnekleri, endpoint swagger, deployment rehberi), söyleyin; ben ekleyeyim.

