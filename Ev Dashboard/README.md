## Project Overview
A React + TailwindCSS single-page application that simulates Caprae Capital’s platform for connecting business buyers and sellers. The app includes:
- Separate buyer & seller onboarding flows
- Buyer discovery cards (Accept / Reject)
- Matched workflow with a 4-step acquisition process
- AI-like Financial Document Analyzer UI (simulated)
- Clean, approachable UI and routing (Signup → Onboarding → Discovery → Matched)

This codebase demonstrates front-end engineering skills, UI/UX design, and product thinking for M&A workflows.

---

## Live / Demo
> (If you deploy, add the demo URL here. Example: `https://your-deploy-url`)

---

## Getting started (local)

**Prerequisites**
- Node.js (>=16) and npm or yarn

**Install**
```bash
npm install
# or
yarn
```

**Run (dev)**
```bash
npm start


**Build**
```bash
npm run build


---

## Project Structure
```
src/
├─ components/       # Reusable UI components (BuyerCard, Workflow, Analyzer)
├─ pages/            # Route pages (Home, Signup, Onboarding, Discovery, Matched)
├─ App.jsx
└─ index.jsx
docs/
└─ Caprae_Capital_Assignment.pdf  # Submission-ready PDF with documentation
```

---

## How to use / test
1. Open the app.
2. Signup (email + password) — data is stored to `localStorage`.
3. Complete Onboarding (choose Buyer or Seller).
4. Sellers reach Buyer Discovery, accept a buyer to proceed to the matched workflow.

---

