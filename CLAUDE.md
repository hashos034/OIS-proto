# Learner Journey UU — Interactive Prototype

## Project Overview
This is a **front-end only interactive prototype** (NO backend, NO database, NO API) for "Cursusevaluatie 2.0 — De Learner Journey", a Utrecht University (UU) project. All data is hardcoded/mock.

We are building the **student side first** — a mobile-first clickable prototype that demonstrates the full student flow for filling in course evaluations.

## Tech Stack
- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Lucide React** for icons (NO emojis as icons)
- Mobile-first, wrapped in a phone frame on desktop
- All text in **Dutch** (matching the lo-fi sketches)

## UU Platform Theme (matches the real UU app — StuComm)
This must look like it belongs in the **Utrecht University app ecosystem**. The design matches the real UU app (powered by StuComm).

### Colors (UU App Branding)
All colors are defined in `app/globals.css` via Tailwind `@theme` and available as `uu-*` classes.

| Role | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **UU Yellow (PRIMARY)** | `#FFCD00` | `bg-uu-yellow` | Headers, focus rings, primary brand color |
| **UU Black** | `#1B1B1B` | `bg-uu-black`, `text-uu-black` | Primary buttons, text, icons |
| **Surface** | `#F5F5F5` | `bg-uu-surface` | Page backgrounds |
| **Card** | `#FFFFFF` | `bg-uu-card` | Card backgrounds |
| **Border** | `#E5E7EB` | `border-uu-border` | Subtle card/section borders |
| **Text** | `#1B1B1B` | `text-uu-text` | Primary text |
| **Text Secondary** | `#9CA3AF` | `text-uu-text-secondary` | Secondary/muted text |
| **Success** | `#16A34A` | `text-uu-success`, `bg-uu-success` | Completed items, checkmarks |
| **Warning** | `#F59E0B` | `text-uu-warning`, `bg-uu-warning` | In-progress items |
| **UU Red (accent)** | `#C00A35` | `bg-uu-red`, `text-uu-red` | Notification badges, destructive actions ONLY |
| **UU Red Dark** | `#9B0828` | `bg-uu-red-dark` | Red hover states |

### Color Usage Rules
- **Yellow = PRIMARY brand color**: Yellow is the dominant color — used for headers, focus rings, and primary branding
- **Yellow header**: All page headers use `bg-uu-yellow` with black text
- **Black buttons**: Primary action buttons are `bg-uu-black text-white`
- **Black progress**: Progress bars use `bg-uu-black` fill
- **Red = minor accent only**: Red is ONLY for notification badges and destructive actions (e.g., "Verwijder foto"). Never use red as a primary or secondary color.
- **Focus rings**: Use `focus:ring-uu-yellow` (NOT red)
- **Selected states**: Use black (e.g., selected radio = black dot)

### Typography
- **Font:** Inter (400, 500, 600, 700 weights) via `next/font/google`
- **Headings:** Inter 600/700 weight
- **Body:** Inter 400/500 weight
- Minimum 16px body text on mobile

### Style
- **Clean & Minimal** — matches real UU app aesthetic
- Rounded corners: `rounded-2xl` (16px) for cards, `rounded-xl` (12px) for buttons
- White cards on light gray background (`bg-uu-surface`)
- Very subtle borders (`border-uu-border`), minimal/no shadows
- Lots of whitespace
- 44px minimum touch targets

## Architecture Rules

### ALWAYS use subagents to parallelize work
The main Claude session acts as an **orchestrator**. For any implementation work:
- Break tasks into independent units
- Launch multiple Agent subagents in parallel (up to 3 at a time)
- Each agent gets a clear, complete task description
- Use `isolation: "worktree"` for agents writing code in parallel to avoid conflicts

### Custom Subagents (in `.claude/agents/`)
| Agent | File | Purpose |
|-------|------|---------|
| `ui-setup-builder` | `agents/ui-setup-builder.md` | Project scaffolding, config, mock data, layout, global CSS |
| `ui-component-builder` | `agents/ui-component-builder.md` | Reusable shared components (Header, TabBar, Cards, etc.) |
| `ui-page-builder` | `agents/ui-page-builder.md` | Complete page files — one agent per screen or screen group |

### Workflow Pattern
1. **Phase 1**: Spawn `ui-setup-builder` to init project + config + mock data + layout
2. **Phase 2**: Spawn `ui-component-builder` (1-2 instances) to build all shared components in parallel
3. **Phase 3**: Spawn `ui-page-builder` (2-3 instances) to build pages in parallel, each handling a group of related screens
4. **Phase 4**: Integration — verify all pages work together, fix any routing/import issues

### ALL agents MUST use the UI/UX Pro Max skill
Every agent runs `python3 .claude/skills/ui-ux-pro-max/scripts/search.py` before writing code, then applies the UU theme overrides on top.

### File Structure
```
OIS-proto/
├── CLAUDE.md
├── package.json
├── next.config.js / next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── data/
│   └── mock.ts              # All hardcoded mock data
├── app/
│   ├── layout.tsx            # Root layout + phone frame
│   ├── globals.css           # Global styles + UU theme
│   ├── page.tsx              # Login screen
│   ├── wachtwoord-vergeten/
│   ├── uu-app/
│   ├── dashboard/
│   ├── meldingen/
│   ├── profiel/
│   │   ├── page.tsx
│   │   ├── bewerken/
│   │   └── foto/
│   └── cursus/
│       └── [id]/
│           ├── page.tsx
│           └── enquete/
│               └── [eid]/
│                   ├── intro/
│                   ├── vraag/[n]/
│                   ├── overzicht/
│                   └── submit/
├── components/
│   ├── PhoneFrame.tsx
│   ├── BottomTabBar.tsx
│   ├── Header.tsx
│   ├── CourseCard.tsx
│   ├── SurveyItem.tsx
│   ├── ProgressBar.tsx
│   ├── QuestionCard.tsx
│   ├── MultipleChoice.tsx
│   ├── OpenQuestion.tsx
│   └── Badge.tsx
└── design-system/           # Generated by UI/UX Pro Max skill
```

### Student Screens (13 total, from interaction diagram)
1. UU Login (`/`)
2. Wachtwoord vergeten (`/wachtwoord-vergeten`)
3. UU App omgeving (`/uu-app`)
4. Dashboard / Hoofdscherm (`/dashboard`)
5. Meldingen beheer (`/meldingen`)
6. Profiel (`/profiel`)
7. Wijzig Profiel (`/profiel/bewerken`)
8. Wijzig Profiel Foto (`/profiel/foto`)
9. Cursus enquetes (`/cursus/[id]`)
10. Enquete intro (`/cursus/[id]/enquete/[eid]/intro`)
11. Vragen schermen (`/cursus/[id]/enquete/[eid]/vraag/[n]`)
12. Vragen overzicht (`/cursus/[id]/enquete/[eid]/overzicht`)
13. Submit scherm (`/cursus/[id]/enquete/[eid]/submit`)

## UI/UX Pro Max Skill
Installed at `.claude/skills/ui-ux-pro-max/`. Use for:
- Design system reference: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`
- UX guidelines: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux`
- Stack guidelines: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs`

**IMPORTANT:** Always override the skill's color/typography suggestions with the UU theme defined above.

## Design Guidelines (from skill + UU overrides)
- [ ] No emojis as icons — use Lucide React
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] 44x44px minimum touch targets
- [ ] Responsive at 375px mobile width
- [ ] One question per screen in surveys
- [ ] Progress bar showing "Vraag X/Y" during surveys
- [ ] Vorige/Volgende (prev/next) navigation in surveys
