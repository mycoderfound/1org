# 🌐 MyCoder Foundation | myCoderFound.org

Empowering communities through **digital innovation, AI learning, and collaboration**.  
This repository powers the **official MyCoder Foundation website and membership portal**, built with modern tools for speed, scalability, and design cohesion across the myCoder ecosystem.

---

## 🧭 Ecosystem Overview

| Site | Purpose | Tech |
|------|----------|------|
| **myCoderFound.org** | Foundation + Membership Hub | Next.js, Firebase, Typeform |
| **myCoderFound.ai** | Agency + AI Automation Showcase | Next.js, Vertex AI, Cloud Run |
| **myCoderFound.me** | Member Profiles + Portfolio Hub | Next.js, Firestore, Auth |

All three sites share a unified **design system**, **theme**, and **component library** managed through the `/shared` directory for consistent branding.

---

## ⚙️ Tech Stack

### 🎯 Core Framework
- **Next.js 15** – App Router + Server Actions
- **TypeScript 5** – Strict type safety
- **Tailwind CSS 4** – Unified brand styling
- **Prisma ORM** – Data modeling for Firestore or Postgres
- **Firebase Auth** – Secure user authentication

### 🧩 UI & Animation
- **shadcn/ui** – Reusable component primitives
- **Lucide Icons** – Clean, scalable SVG icons
- **Framer Motion** – Smooth transitions
- **Next Themes** – Built-in dark mode

### 🔄 Data & State
- **React Query (TanStack)** – API sync and caching
- **Zustand** – Lightweight state management
- **Axios** – API requests
- **Typeform API** – Membership onboarding automation

### 🤖 AI Integrations
- **Z.ai + Gemini Code Assist** – AI code review and automation
- **Google Vertex AI** – Backend AI agent training
- **Firebase Functions** – Serverless endpoints for AI workflows

---

## 🧠 Key Features
- 🪪 Membership portal with role-based access (Club, Pro, Enterprise)
- 💡 Integrated Typeform onboarding + Cloud automation
- 🧩 Reusable shared components across `.org`, `.ai`, and `.me`
- 🌈 Fully branded theme system (`/shared/tailwind.theme.ts`)
- 🔄 Real-time data sync with Firebase + Cloud Run
- 🧭 Gemini VS Code automation support

---

## 🚀 Getting Started

Clone and install dependencies:
```bash
git clone https://github.com/mycoderfound/org.git
cd org
npm install
npm run dev
Your dev server will start at:

http://localhost:3000

☁️ Deployment (Google Cloud Run)

Build and deploy:

gcloud run deploy mycoderfound-org \
  --source . \
  --region us-central1 \
  --allow-unauthenticated


For Firebase hosting:

firebase deploy

🎨 Design System

The unified Tailwind + CSS theme lives in:

/shared/tailwind.theme.ts
/src/styles/global.css


Use the shared brand utilities:

<div className="bg-brand-gradient text-white rounded-xl p-6">
  Empowering the Next Generation of Developers 🚀
</div>

🤝 Contributing

Contributions are welcome!
To contribute:

Fork this repo

Create a new branch (feature/new-component)

Submit a pull request

🧑🏽‍💻 Developed by

Hannah Harrington
Founder, MyCoder Foundation

With ❤️ for community, education, and AI innovation.
Powered by Google Cloud, Firebase, and Z.ai.

⚖️ License

Licensed under the MIT License
.
