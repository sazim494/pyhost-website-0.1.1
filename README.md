# PyHost Cloud — Starter Monorepo

This repository is a professional starter for PyHost Cloud: backend API (Lumen), frontend (React + Vite + TypeScript + Tailwind), and a minimal Agent (Python/Flask). It includes a Docker Compose setup to run everything locally.

Quick start:
1. Copy files into a new repository (or add me as collaborator and I can push them).
2. Edit `backend/.env` from `.env.example`.
3. Run: `docker-compose up --build`
4. Backend API: http://localhost:8000
   Frontend: http://localhost:5173
   Agent: http://localhost:9000

Components:
- backend/: Lumen-based API server
- frontend/: React TypeScript + Tailwind UI skeleton
- agent/: Python Flask agent prototype with HMAC auth
- api.yaml: OpenAPI v3 spec

Next recommended steps:
- Wire DB migrations into Lumen migrations or run provided SQL.
- Implement CI/CD (GitHub Actions) and Terraform for infra.
- Add tests and generate clients from `api.yaml`.
