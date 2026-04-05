# Cursusevaluatie 2.0 — De Learner Journey

Interactive prototype for the Utrecht University (UU) course evaluation redesign. Built as a front-end only clickable prototype — all data is hardcoded/mock, no backend or database.

## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Framer Motion** for animations
- **Recharts** for charts

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

The prototype has three main sections:

### Student Side (`app/(student)/`)
Mobile-first student flow for filling in course evaluations:
- Login & password recovery
- Dashboard with active courses
- Course detail with linked surveys
- Survey flow (intro, questions, overview, submit)
- Profile management
- Notifications

### Docent Side (`app/(docent)/`)
Desktop teacher dashboard for viewing evaluation results:
- Course overview with response statistics
- Survey builder and question management
- Response data with charts and tables

### Wrapped (`app/wrapped/`)
A "Spotify Wrapped"-style story experience summarizing a student's evaluation activity.

## Mock Data

All data lives in `data/`:
- `mock.ts` — student-side courses, surveys, questions
- `mock-docent.ts` — teacher-side courses, responses, statistics
- `wrapped-mock.ts` — wrapped experience data
- `answers-store.ts` — in-memory answer state for survey flow
