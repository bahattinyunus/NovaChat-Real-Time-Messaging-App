This scaffold was added by the assistant to provide a minimal runnable example for NovaChat.

Quick start (Windows PowerShell):

1) Copy example env and install dependencies

```powershell
cd "c:\github repolarım\NovaChat – Real-Time Messaging App\backend"
npm install
cd "..\frontend"
npm install
```

2) Run with Docker Compose (recommended)

```powershell
docker compose up --build
```

- Frontend will be available at http://localhost:3000
- Backend API at http://localhost:5000/api

If you prefer running locally without Docker, run `npm run dev` in the `frontend` folder and `node src/index.js` in the `backend` folder.
