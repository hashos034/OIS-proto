# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Learner Journey UU
**Updated:** 2026-03-21
**Category:** Education / University Platform
**Matches:** Real UU App (powered by StuComm)

---

## Global Rules

### Color Palette (UU App Branding)

| Role | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| UU Yellow | `#FFCD00` | `bg-uu-yellow` | Headers, focus rings, primary accent |
| UU Black | `#1B1B1B` | `bg-uu-black`, `text-uu-black` | Primary buttons, text, icons |
| UU Red | `#C00A35` | `bg-uu-red`, `text-uu-red` | Notification badges, destructive actions ONLY |
| UU Red Dark | `#9B0828` | `bg-uu-red-dark` | Red hover states |
| Surface | `#F5F5F5` | `bg-uu-surface` | Page backgrounds |
| Card | `#FFFFFF` | `bg-uu-card` | Card backgrounds |
| Border | `#E5E7EB` | `border-uu-border` | Subtle card/section borders |
| Text | `#1B1B1B` | `text-uu-text` | Primary text |
| Text Secondary | `#9CA3AF` | `text-uu-text-secondary` | Muted/secondary text |
| Success | `#16A34A` | `bg-uu-success`, `text-uu-success` | Completed items, checkmarks |
| Warning | `#F59E0B` | `bg-uu-warning`, `text-uu-warning` | In-progress items |

**Color Rules:**
- Yellow headers with black text on ALL pages
- Black primary buttons (`bg-uu-black text-white`)
- Black progress bar fills
- Red ONLY for notification badges and destructive actions
- Focus rings use yellow (`focus:ring-uu-yellow`)
- Selected radio/checkbox states use black

### Typography

- **Font:** Inter (400, 500, 600, 700 weights)
- **Loaded via:** `next/font/google`
- **Mood:** Clean, professional, modern, academic
- **Body:** 16px minimum on mobile
- **Headings:** 600-700 weight

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```
/* Primary Button — Tailwind */
bg-uu-black text-white rounded-xl px-6 py-3 font-semibold
transition-colors duration-200 cursor-pointer
hover:bg-opacity-90 active:bg-opacity-80

/* Secondary/Outlined Button */
bg-white text-uu-black border border-uu-black rounded-xl px-6 py-3 font-semibold
transition-colors duration-200 cursor-pointer

/* Destructive Button (rare — delete actions) */
text-uu-red hover:text-uu-red-dark cursor-pointer
```

### Cards

```
/* Standard Card — Tailwind */
bg-uu-card rounded-2xl border border-uu-border p-4
/* No shadow or shadow-sm at most. Lots of whitespace. */
```

### Inputs

```
/* Text Input — Tailwind */
w-full px-4 py-3 rounded-xl border border-uu-border bg-white
text-uu-text placeholder:text-uu-text-secondary
focus:outline-none focus:ring-2 focus:ring-uu-yellow focus:border-transparent
transition-colors duration-200
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Clean & Minimal (University Platform)

**Keywords:** Clean, professional, minimal, academic, institutional, trustworthy, accessible

**Matches:** Real UU App (StuComm) — yellow header, white cards, black text, minimal shadows

**Key Effects:** Subtle transitions (150-200ms), no scale transforms on hover, minimal shadows, generous whitespace

### Layout Pattern

**Mobile (Student):** Single column, 375px target width, phone frame wrapper on desktop
**Desktop (Docent):** To be built — wider layout with sidebar navigation
**Headers:** Full-width yellow (`bg-uu-yellow`) with black text, back arrow navigation
**Cards:** White rounded-2xl with subtle border, grouped in sections
**Tab bar:** Bottom navigation with 5 tabs (Learner Journey, Timetable, Results, Cards, More)

---

## Anti-Patterns (Do NOT Use)

- ❌ Flat design without depth
- ❌ Text-heavy pages

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
