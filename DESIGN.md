# Geo Sentinel — Government-Grade Land Management

**Purpose**: Digital land ownership & dispute resolution platform inspired by Ardhi Sasa; serves government agencies, lawyers, investors, and citizens seeking secure, transparent land record access.

**Tone**: Professional, authoritative, trustworthy — inspired by secure fintech and government digitization. Not casual or playful.

## Color Palette

| Context | Light | Dark | Land-Gold | Futuristic |
|---------|-------|------|-----------|------------|
| Primary (Action) | 55% C:0.18 H:240° | 65% C:0.18 H:240° | 55% C:0.15 H:80° | 70% C:0.25 H:280° |
| Success (Verified) | 60% C:0.15 H:145° | 60% C:0.15 H:145° | 60% C:0.15 H:145° | 60% C:0.15 H:145° |
| Warning (Pending) | 70% C:0.15 H:85° | 70% C:0.15 H:85° | 70% C:0.15 H:85° | 70% C:0.15 H:85° |
| Destructive (Rejected) | 55% C:0.22 H:25° | 55% C:0.22 H:25° | 55% C:0.22 H:25° | 55% C:0.22 H:25° |
| Background | 98% | 18% | 96% | 12% |
| Card | 100% | 22% | 98% | 16% |
| Foreground Text | 20% | 95% | 25% | 92% |

## Typography

- **Display/Headings**: Inter (system sans-serif), weights 600–700, size scale 24px–40px
- **Body**: Inter, weight 400–500, size 14px–16px
- **Mono**: System monospace, weight 400, size 12px–13px for code/identifiers

## Elevation & Depth

- **Glassmorphism**: Opacity 18%, Blur 24px, border opacity 25% — frosted glass effect for cards, overlays, sidebar
- **Shadow Hierarchy**: Soft (2px), Depth (4–6px), Depth-lg (10–15px), Glass (elevated 20px + inset glow)
- **Border Radius**: Base 8px (all corners), scaled 4px, 12px, 16px, 24px, full (pills & badges)
- **Transitions**: All 0.3s cubic-bezier(0.4, 0, 0.2, 1) — smooth, not jarring

## Structural Zones

| Zone | Treatment | Notes |
|------|-----------|-------|
| Header/Nav | Glass-surface with soft-lg shadow | Always elevated; persistent across pages |
| Sidebar (Left) | Glass-card overlay, 18% opacity, 24px blur | Collapsible on mobile; semi-transparent |
| Main Content | bg-background + soft-md shadow for sections | Color varies by theme; breathing room |
| Card Panels | Glass-card + soft-lg shadow, rounded-lg | Primary information containers |
| Alerts/Status | Badge or pill with semantic color (verified/pending/rejected) | High contrast, compact |
| Footer | Subtle bg-muted/15 border-t | Minimal visual weight |

## Status Badges & Pills

- **Verified Badge** (green): `.badge-verified` — 15% bg opacity, 30% border opacity
- **Pending Badge** (amber): `.badge-pending` — 15% bg opacity, 30% border opacity
- **Rejected Badge** (red): `.badge-rejected` — 15% bg opacity, 30% border opacity
- **Verified Pill** (glass): `.pill-verified` — 20% bg, 40% border, glass-surface overlay
- **Pending Pill** (glass): `.pill-pending` — 20% bg, 40% border, glass-surface overlay
- **Rejected Pill** (glass): `.pill-rejected` — 20% bg, 40% border, glass-surface overlay

## Transaction Workflow (5 Stages)

| Stage | Color | Hue | Name | Icon |
|-------|-------|-----|------|------|
| 1 | Chart-1 (Teal) | 200° | Request | Clipboard |
| 2 | Chart-2 (Amber) | 85° | Under Review | Clock |
| 3 | Chart-3 (Purple) | 280° | Processing | Gears |
| 4 | Chart-4 (Red) | 25° | Final Review | CheckCircle |
| 5 | Chart-5 (Blue) | 240° | Complete | CheckCircle2 |

Dots scale on active stage; connecting lines gradient from prior to current color.

## Component Patterns

- **Buttons**: Primary = bg-primary text-primary-foreground, Secondary = bg-secondary, Tertiary = bg-transparent border-border
- **Inputs**: bg-input border-input focus:ring-ring, text-foreground, rounded-md
- **Dropdowns**: Glass-card overlay with soft shadows, keyboard navigation
- **Tables**: Striped rows (bg-muted/0.05), hover effect (bg-muted/0.1), condensed spacing
- **Modals**: Glass-card overlay with 24px blur backdrop, centered, focus trap
- **Notifications**: Toast + slide-up animation, positioned top-right, auto-dismiss 5s

## Motion & Animation

- **Page Load**: Fade-in (0.3s) + slide-up (0.4s) staggered for sections
- **Interactions**: Buttons glow on hover (glass-glow 3s infinite), cards lift (scale 1.02), inputs focus with ring
- **Transitions**: All 0.3s; no bounce; prefers-reduced-motion respected
- **Glassmorphism Glow**: Subtle pulse on active states, not overwhelming

## Background

- **Nature-Inspired Gradient**: 135° diagonal, organic earth tones (greens 145°, oranges 35°, reds 25°)
- **Animation**: Gradient flow 20s ease infinite (position: 0%→100%→0%)
- **Dark Mode**: Darker values (L:25%–16%) maintaining hue, saturation reduced
- **Land-Gold Mode**: Warmer, lighter earth tones (L:80%–60%), hue 80°
- **Futuristic Mode**: Deep purples/blues (L:20%–12%), high chroma, 280° hue

## Responsive Grid

- **Mobile** (≤640px): Single-column, 16px padding, stacked sidebar off-canvas
- **Tablet** (641–1024px): Two-column, 24px padding, sidebar collapsible
- **Desktop** (≥1025px): Three-column + sidebar, 32px padding, full sidebar visible

## Anti-Patterns

- ❌ No vibrant neon gradients; no rainbow colors; no bouncy animations
- ❌ No hardcoded hex colors or `bg-[#123]` arbitrary classes
- ❌ No generic Bootstrap-blue defaults; all tokens customized
- ❌ No shadow abuse (max 2–3 depths); no glowing text
- ❌ No mismatched font weights or excessive type scales

## Signature Detail

Glassmorphic overlay cards on nature-inspired animated gradient background create a "secure digital overlay on land" visual metaphor — reinforcing the app's purpose of bringing transparency and digitization to physical land ownership.
