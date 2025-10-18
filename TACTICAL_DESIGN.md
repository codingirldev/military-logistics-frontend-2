# Tactical Military Design System

## Overview
The Military Logistics Platform has been redesigned with a modern tactical military aesthetic - functional, rugged, but with a refined edge.

## Color Palette

### Primary Colors
| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Base / Background** | `#1E252F` | rgb(30, 37, 47) | Main background - deep gunmetal/charcoal |
| **Primary** | `#556B4E` | rgb(85, 107, 78) | Muted olive green - buttons, accents |
| **Accent** | `#C2A878` | rgb(194, 168, 120) | Warm brass/sand - highlights, selected states |
| **Secondary** | `#324832` | rgb(50, 72, 50) | Dark forest green - depth, cards |
| **Text** | `#E2E2E2` | rgb(226, 226, 226) | Light neutral gray - primary text |

### Supporting Colors
| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Card Background** | `#2A3542` | rgb(42, 53, 66) | Elevated surfaces, cards |
| **Border** | `#3A4754` | rgb(58, 71, 84) | Borders, dividers |
| **Muted Text** | `#9CA3AF` | rgb(156, 163, 175) | Secondary text, labels |
| **Sidebar** | `#252F3D` | rgb(37, 47, 61) | Sidebar background |

## Typography
- **Font Family**: Rajdhani (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Letter Spacing**: 0.025em for headings
- **Monospace**: Geist Mono (for technical data)

## Design Principles

### 1. Disciplined & Operational
- Clean, functional layouts
- High contrast for legibility
- Sharp, precise edges (0.5rem border radius)

### 2. Modern Military Minimalism
- No camouflage patterns
- Tone-on-tone layering
- Subtle depth with flat shadows
- Muted lighting effects

### 3. Visual Hierarchy
- **Primary Actions**: Olive green (#556B4E)
- **Secondary Actions**: Brass accent (#C2A878)
- **Status Indicators**: Color-coded badges
- **Selected States**: Brass border with shadow

### 4. Interactive Elements
- Hover states with subtle color shifts
- Border highlights on focus
- Smooth transitions (300ms)
- Scale effects on important actions

## Component Styling

### Buttons
- **Primary**: Olive green background with white text
- **Secondary**: Brass accent with dark text
- **Destructive**: Red with white text
- All buttons have subtle shadows and hover states

### Cards
- Background: `#2A3542`
- Border: `#3A4754`
- Hover: Border changes to accent color
- Shadow: Subtle glow effect on hover

### Input Fields
- Background: `#1E252F`
- Border: `#3A4754`
- Focus: Border changes to `#556B4E`
- Placeholder: `#6B7280`

### Status Badges
- **Verified**: Dark forest green with olive text
- **Pending**: Brass with semi-transparent background
- **Flagged**: Red with semi-transparent background

## Background Effects
- Subtle grid pattern overlay (50x50px)
- Brass color (#C2A878) at 3% opacity
- Fixed position, non-interactive
- Creates technical, structured feel

## Accessibility
- High contrast ratios (WCAG AA compliant)
- Clear focus indicators
- Readable font sizes (minimum 14px)
- Color is not the only indicator of state

## File Structure
```
src/
├── app/
│   ├── globals.css          # Color variables and base styles
│   ├── layout.tsx           # Font configuration
│   ├── page.tsx             # Landing page
│   └── logistics/
│       └── page.tsx         # Main dashboard
└── components/
    └── logistics/
        ├── TrackView.tsx
        ├── CheckpointTable.tsx
        ├── CheckpointForm.tsx
        └── AuditorPanel.tsx
```

## Usage Examples

### Applying Colors
```tsx
// Background
className="bg-[#1E252F]"

// Primary color
className="bg-[#556B4E] text-[#E2E2E2]"

// Accent color
className="text-[#C2A878] border-[#C2A878]"

// Muted text
className="text-[#9CA3AF]"
```

### Button Styling
```tsx
// Primary button
<button className="bg-[#556B4E] hover:bg-[#4A5E43] text-[#E2E2E2] px-4 py-2 rounded transition-colors">
  Action
</button>

// Accent button
<button className="bg-[#C2A878] hover:bg-[#B89A6A] text-[#1E252F] px-4 py-2 rounded transition-colors">
  Action
</button>
```

### Card Styling
```tsx
<div className="bg-[#2A3542] border border-[#3A4754] rounded-lg p-6 hover:border-[#556B4E] transition-all">
  Content
</div>
```

## Design Philosophy
The aesthetic draws inspiration from:
- Modern military command interfaces
- Tactical equipment design
- Field uniforms and gear
- Precision engineering
- Operational dashboards

**Avoid**: Bright colors, camouflage patterns, playful elements, excessive animations

**Embrace**: Discipline, precision, functionality, clarity, professionalism

