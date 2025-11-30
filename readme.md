

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
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\frontend"
npm install
npm run dev
```

> Not: Mesaj kalıcılığı için MongoDB gereklidir; Docker kullanmıyorsanız yerel MongoDB çalıştırın veya bağlantınızı `MONGO_URI` ile ayarlayın.

## Kısa API & Socket Dokümantasyonu

- GET `/api/hello` — Sağlık kontrolü.
- GET `/api/messages` — Son 50 mesajı döner.
- POST `/api/auth/register` — Kayıt. Body: `{ "username": "", "password": "" }` — Dönen: `{ token, user }`.
- POST `/api/auth/login` — Giriş. Body: `{ "username": "", "password": "" }` — Dönen: `{ token, user }`.

Socket.IO davranışı:

- Bağlanırken token gönderin: `io(url, { auth: { token } })`.
- Gönderme: `socket.emit('chat:message', { text: 'Merhaba' })`.
- Dinleme: `socket.on('chat:message', (msg) => ...)` — sunucudan yayınlanan `{ id, text, from, ts }` şekli.

### Örnek: curl ile auth & mesajlar

```bash
# Kayıt
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'

# Giriş
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'

# Mesajları al (token varsa Authorization header ekleyin)
curl http://localhost:5000/api/messages
```

## WebSocket Örneği (Client)

```js
import { io } from 'socket.io-client'

const token = localStorage.getItem('token') // veya bir değişkenden alın
[![CI](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml/badge.svg)](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml) [![Codecov](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![CI](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml/badge.svg)](https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App/actions/workflows/ci.yml) [![Codecov](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App/branch/main/graph/badge.svg?token=)](https://codecov.io/gh/bahattinyunus/NovaChat-Real-Time-Messaging-App) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# NovaChat — Real‑Time Messaging App

![](assets/logo.svg)

NovaChat bu repo içinde gösterilen, öğrenme ve geliştirme amaçlı bir real‑time chat scaffold'udur. Proje, üretim seviyesindeki karmaşıklığın küçük bir örneğini sunar:

- Backend: Node.js + Express, Socket.IO, JWT auth, MongoDB (mongoose)
- Frontend: Vite + React (+ Tailwind'den basit stil)
- DevOps: Docker Compose ile tek komutla yerel ortam

Bu README proje ile hızlıca çalışmaya başlamanız, API'leri denemeniz ve katkıda bulunmanız için gereken her şeyi içerir.

## İçindekiler

- [Hızlı Başlangıç (Docker)](#hızlı-başlangıç-docker)
- [Yerel Geliştirme (Docker olmadan)](#yerel-geliştirme-docker-olmadan)
- [Kısa API & WebSocket Dokümantasyonu](#kısa-api--websocket-dokümantasyonu)
- [Örnekler (curl & Socket.IO)](#örnekler-curl--socketio)
- [Testler & CI](#testler--ci)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Proje Yapısı](#proje-yapısı)
- [Güvenlik Notları](#güvenlik-notları)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## Hızlı Başlangıç (Docker)

En kolay yol Docker Compose ile tüm servisleri çalıştırmaktır:

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App"
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

Uygulama çalışırken README başında gösterilen animasyon demo görünümünde mesaj akışını görebilirsiniz.

## Yerel Geliştirme (Docker olmadan)

1) Backend

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\backend"
npm install
npm run dev
```

2) Frontend

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\frontend"
npm install
npm run dev
```

Not: MongoDB'ye bağlanmak için `MONGO_URI` ortam değişkenini ayarlayın veya Docker Compose ile birlikte gelen Mongo'yu kullanın.

## Kısa API & WebSocket Dokümantasyonu

- GET `/api/hello` — sağlık kontrolü, örnek yanıt: `{ message: 'Hello from NovaChat backend' }`.
- GET `/api/messages` — son mesajları getirir (maks 50).
- POST `/api/auth/register` — kayıt: `{ username, password }` → dönen: `{ token, user }`.
- POST `/api/auth/login` — giriş: `{ username, password }` → dönen: `{ token, user }`.

Socket.IO

- Bağlanırken token gönderin: `io(origin, { auth: { token } })`.
- Gönderme: `socket.emit('chat:message', { text })` — server DB'ye kaydeder ve tüm client'lara broadcast eder.
- Dinleme: `socket.on('chat:message', (msg) => ...)` — `{ id, text, from, ts }` şeklinde gelir.

## Örnekler (curl & Socket.IO)

Kayıt / Giriş (curl):

```powershell
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'

curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"alice","password":"secret"}'
```

Mesajları alma:

```powershell
curl http://localhost:5000/api/messages
```

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

