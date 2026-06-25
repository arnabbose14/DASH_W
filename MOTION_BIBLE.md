# DASH·W Motion Bible & Animation Design System

This document outlines the motion principles, choreography, and standardized timing rules for all slide components in the DASH·W presentation engine. Consistent adherence to these principles ensures a premium, theatrical, and cohesive presentation experience.

---

## 1. Core Motion Principles

*   **Hierarchical Sequencing (Choreography)**: Elements must never animate in all at once. The slide headers (eyebrow, title, subtitle) must establish the context first, followed by structural layout containers, then detailed data components (KPIs, charts), and finally inner data elements.
*   **Settling Time**: Animations must feel natural and "settle" smoothly without abrupt stops. Avoid bouncy overshoot curves for professional data slides; instead, use long, smooth cubic-bezier transitions that decelerate gradually.
*   **Component Consistency**: Similar objects (e.g., all headers, all charts, all KPI cards) must share identical transitions, easing curves, and spatial movement directions.
*   **Jitter Prevention**: Never nest translating (`translateY`) animations. If a parent container animates spatially, child elements inside it must either fade in place (`opacity` transition only) or animate only after the parent transition has completely settled.

---

## 2. Animation Presets & Easing Curves

We define five distinct motion presets, each matching a specific presentation mood:

| Preset | Curve | Description | Timing / Easing |
| :--- | :--- | :--- | :--- |
| **Luxury** | Theatrical, majestic, slow | Blur-in with deep decay | `1.6s` / `cubic-bezier(0.19, 1, 0.22, 1)` |
| **Premium** (Default) | Elegant, balanced, smooth | Smooth slide-up | `1.0s` / `cubic-bezier(0.25, 1, 0.5, 1)` |
| **Executive** | Professional, clean, crisp | Quick slide-up | `0.65s` / `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Energetic** | Dynamic, springy, bold | Subtle scale/bounce | `0.75s` / `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **Minimal** | Simple, modern, fast | Pure crossfade | `0.4s` / `ease-out` |

---

## 3. Hierarchical Sequencing Guide (Default Stagger Delays)

To automate sequencing without hardcoding coordinates, components use the CSS custom property `--stagger-delay` to compute their delay offsets based on their role:

```
[Slide Mounts]
  │
  ├── 0.05s (Stagger 0.5) ── Eyebrow / Badges / Section Subtitles
  │
  ├── 0.15s (Stagger 1.5) ── Headline / Slide Titles (Main H2s)
  │
  ├── 0.30s (Stagger 3.0) ── Subline / Paragraphs / Quote Text
  │
  ├── 0.45s (Stagger 4.5) ── Layout Columns / Grid Containers (Fade only)
  │
  ├── 0.60s (Stagger 6.0) ── KPI Cards / Comparison Panels
  │
  └── 0.75s (Stagger 7.5) ── Chart Wrappers
        │
        └── +0.08s... (Stagger offset) ── Chart Inner Bars / Lines / Nodes (React-drawn)
```

---

## 4. Component Rules

### Text Components (`Headline`, `Paragraph`, `Hero`, `Quote`, `SectionDivider`)
*   **Slide Headings / Titles**: Must use `animate-fade-up` with `stagger` defaulting to `1.5` to ensure they enter prominently after any eyebrow labels.
*   **Paragraphs / Body Copy**: Must use `stagger` defaulting to `3.0` to enter after titles.
*   **Compound Elements (Hero, Quote)**: The outer card/wrapper must fade in without spatial translation (using `.animate-fade` or `.animate-container-fade`) to prevent double-translation jitter. The inner text blocks stagger in with sequential delays.

### Data Components (`KPICard`, `BarChart`, `DonutChart`, `LineChart`, `ComparisonChart`, `Timeline`)
*   **KPI Cards**: Outer card uses `animate-fade-up` with stagger `6.0`. Numbers count up dynamically over `1.5s`.
*   **Bar Charts**:
    *   **Vertical**: Outer container uses `animate-fade-up` with stagger `7.5`. Inner column tracks render with a default delay of `calc(var(--chart-stagger, 7.5) * 0.1s + 0.08s + index * 0.1s)`.
    *   **Horizontal**: Individual rows stagger in using `calc(var(--chart-stagger, 7.5) + index)`. Fills expand with transition delay `calc(var(--chart-stagger, 7.5) * 0.1s + 0.08s + index * 0.12s)`.
*   **Donut Charts**: Outer wrapper uses stagger `7.5`. SVG segments draw using `stroke-dashoffset` with transitions delayed by `calc(var(--chart-stagger, 7.5) * 0.1s + 0.15s + index * 0.18s)`.
*   **Line Charts**: Paths draw and node points fade in sequence using delay offsets added to the chart's base stagger.
*   **Timelines**: Connector draws first at stagger `6.0`, then milestones fade up sequentially.
