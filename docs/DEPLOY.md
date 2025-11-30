# Deploy Guide — NovaChat (Minimal)

Bu dosya, NovaChat uygulamasını basit bir Docker tabanlı üretim / staging ortamında nasıl çalıştıracağınıza dair örnek adımları içerir. Bu rehber minimaldir; kendi güvenlik, monitoring ve ölçekleme ihtiyaçlarınızı ekleyin.

Önkoşullar

- Docker Engine ve Docker Compose
- Bir host/sunucu (VM, bulut instance vb.)

1) Ortam değişkenleri

Kök dizinde `.env` dosyası oluşturun veya environment secrets olarak ayarlayın. Örnek değerler ` .env.example` içinde bulunur. Üretimde `JWT_SECRET` güçlü bir değer olmalı, `MONGO_URI` uzak bir managed Mongo (Atlas vb.) veya yerel bir Mongo bağlantısı olabilir.

2) Docker Compose (production example)

Docker Compose dosyasında production için gerekli image ve environment ayarlarını kontrol edin. Basit bir üretim çalıştırma örneği:

```powershell
docker compose -f docker-compose.yml up -d --build
```

3) Reverse proxy & HTTPS

Üretimde mutlaka bir reverse proxy (Nginx, Traefik) ve TLS (Let's Encrypt gibi) kullanın. Backend için HTTP→HTTPS yönlendirmesi yapın.

4) Logging & monitoring

Log yönetimi (ELK, Loki) ve temel monitoring (Prometheus/Grafana) ekleyin.

5) Database & backups

MongoDB için yedekleme stratejisi belirleyin (mongodump, managed backups). Redis varsa persistence ve yedeklemeyi göz önüne alın.

6) Güvenlik önlemleri

- Çevre değişkenlerini gizli tutun (secrets manager veya swarm/kubernetes secrets).
- Rate limiter ve doğrulama ekleyin.

7) Rolling updates (opsiyonel)

Kubernetes/Swarm gibi orkestrasyon ile rolling deploy ve health checks ekleyin.

Bu rehberi genişletmemi ister misin? Örneğin: `docker-compose.prod.yml` örneği, Nginx reverse proxy config veya Kubernetes manifestleri ekleyebilirim.
