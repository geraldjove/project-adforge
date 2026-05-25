# AdForge — Creative Pipeline

An AI-assisted ad creative workflow tool for creative directors. Manages the full
pipeline from brand inputs to approved, production-ready creative:

> Inputs → Messaging Map → Ad Concepts → Inspiration Library → Image Prompts → Figma Briefs → Human Revisions

## Stack
- React 18 + Vite + TypeScript
- Tailwind CSS (shadcn-style hand-built UI components — no CLI/registry needed)
- React Router
- Local mock data (`src/data/mockData.ts`) — no backend yet

## Getting started
```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Pages
1. **Dashboard** — workflow progress, stats, pending reviews, projects
2. **Project Setup** — campaign basics + planned integrations
3. **Brand Inputs** — brand/product source of truth
4. **Messaging Map** — pillars with promise, proof points, emotion
5. **Concepts & Headlines** — split into *with product* / *without product*
6. **Ads Inspiration Library** — tagged, filterable reference cards
7. **Image Generation Prompts** — model-ready prompt builder + saved prompts
8. **Figma Design Briefs** — copy blocks, assets, layout notes, status
9. **Human Revisions** — Approved / Needs Revision / Rejected / Pending

## Project structure
```
src/
  components/
    ui/        reusable primitives (Button, Card, Badge, Input, Tabs, …)
    layout/    Sidebar, Topbar, AppLayout, nav config
    shared/    PageHeader, StatCard, StatusBadge, WorkflowProgress, EmptyState, SectionCard
  data/        mockData.ts (types + sample data — swap for API later)
  pages/       one file per route
  lib/         utils (cn, formatDate)
```

## Wiring up a backend later
The mock data shapes in `src/data/mockData.ts` are intentionally close to a future
database schema. Planned integrations (surfaced as "Planned" badges in the UI):
- **Claude / OpenAI** — concept, copy, and image-prompt generation
- **Supabase** — project + asset storage
- **n8n** — workflow automation
- **Figma** — design brief sync
