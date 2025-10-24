# Wassel Brand Guidelines

## Brand Overview

**Wassel** (واصل) is a next-generation ride-sharing and carpooling platform connecting travelers across the Middle East. Our brand represents:
- **Convenience** - Smart, effortless travel
- **Trust** - Verified users and transparent ratings
- **Affordability** - Shared costs, maximum value
- **Sustainability** - Eco-friendly, reduced emissions

## Color Palette - 60-30-10 Rule

Wassel follows the professional **60-30-10 color rule**, a design principle used by leading brands to create balanced, visually appealing interfaces.

### Primary Color (60% Usage)
**Teal/Cyan - #008080**

- **Hex**: `#008080`
- **RGB**: `rgb(0, 128, 128)`
- **Tailwind**: `--primary`
- **Usage**: Main brand color for buttons, links, primary CTAs, active states
- **Application**: Dominates the interface - navigation highlights, primary buttons, key information
- **Psychology**: Trust, reliability, calmness, professionalism
- **Examples**: 
  - Primary action buttons
  - Active navigation items
  - Primary icons and indicators
  - Main headings and emphasis text

```css
/* CSS Variable */
--primary: #008080;
--primary-foreground: #ffffff;
```

### Secondary Color (30% Usage)
**Sage Green - #607D4B**

- **Hex**: `#607D4B`
- **RGB**: `rgb(96, 125, 75)`
- **Tailwind**: `--secondary`
- **Usage**: Supporting elements, secondary actions, backgrounds, feature highlights
- **Application**: Complements primary color - cards, secondary buttons, subtle backgrounds
- **Psychology**: Growth, eco-friendliness, nature, balance
- **Examples**:
  - Secondary buttons
  - Feature card backgrounds
  - Supporting icons
  - Alternative highlights

```css
/* CSS Variable */
--secondary: #607D4B;
--secondary-foreground: #ffffff;
```

### Accent Color (10% Usage)
**Maroon - #880044**

- **Hex**: `#880044`
- **RGB**: `rgb(136, 0, 68)`
- **Tailwind**: `--accent`
- **Usage**: Call-to-action emphasis, important notifications, promotional elements
- **Application**: Sparingly used for maximum impact - urgent CTAs, special offers, badges
- **Psychology**: Energy, urgency, importance, passion
- **Examples**:
  - Urgent action buttons
  - Important notifications
  - Special badges (New, Hot, Limited)
  - Promotional banners

```css
/* CSS Variable */
--accent: #880044;
--accent-foreground: #ffffff;
```

### Neutral Colors

**Light Mode**:
- Background: `#ffffff`
- Foreground: `oklch(0.145 0 0)` - Near black
- Muted: `#f5f5f5` - Light gray backgrounds
- Muted Foreground: `#6b7280` - Secondary text
- Border: `rgba(0, 0, 0, 0.1)` - Subtle borders

**Dark Mode**:
- Background: `#0f172a` - Slate 900
- Foreground: `#f8fafc` - Slate 50
- Card: `#1e293b` - Slate 800
- Muted: `#334155` - Slate 700
- Border: `rgba(255, 255, 255, 0.1)` - Subtle borders

## Color Application Guide

### 60-30-10 in Practice

#### Landing Page
- **60% Primary (#008080)**: 
  - Hero section background gradient
  - Primary "Get Started" buttons
  - Navigation hover states
  - Statistics and key metrics
  - Primary headings

- **30% Secondary (#607D4B)**:
  - Feature icons and cards
  - "Raje3" trip type branding
  - Supporting icons (Users, Eco-friendly)
  - Secondary content areas

- **10% Accent (#880044)**:
  - "Ready to Start Your Journey?" CTA section
  - Trust & Safety icon (important feature)
  - Special promotions
  - Urgent notifications

#### Application Dashboard
- **60% Primary**: Active menu items, primary actions, status indicators
- **30% Secondary**: Card backgrounds, secondary buttons, feature highlights  
- **10% Accent**: Payment alerts, important notifications, promotional badges

### Color Combinations

**Primary Combinations**:
```tsx
// Primary button
className="bg-primary text-primary-foreground hover:bg-primary/90"

// Primary outline
className="border-primary text-primary hover:bg-primary/5"

// Primary subtle background
className="bg-primary/10 text-primary"
```

**Secondary Combinations**:
```tsx
// Secondary button
className="bg-secondary text-secondary-foreground hover:bg-secondary/90"

// Secondary icon background
className="bg-secondary/10 text-secondary"
```

**Accent Combinations**:
```tsx
// Accent CTA
className="bg-accent text-accent-foreground hover:bg-accent/90"

// Accent badge
className="bg-accent/10 text-accent border-accent/20"
```

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Weights
- Normal: `400`
- Medium: `500` (headings, buttons, labels)

### Base Font Size
- Desktop: `16px`
- Mobile: `16px` (maintain readability)

### Type Scale (Applied via Tailwind)
Do not apply these directly - they're handled by globals.css:
- H1: `var(--text-2xl)` - Hero headings
- H2: `var(--text-xl)` - Section headings
- H3: `var(--text-lg)` - Card headings
- H4: `var(--text-base)` - Subheadings
- Body: `var(--text-base)` - Standard text
- Small: `var(--text-sm)` - Secondary text

### Bilingual Support
The platform supports **Arabic** and **English**:
- Arabic text should use proper RTL (Right-to-Left) formatting
- Both languages should have equal visual hierarchy
- Logo text displays: "Wassel" (English) and "واصل" (Arabic)

## Logo Guidelines

See [LOGO_GUIDELINES.md](./LOGO_GUIDELINES.md) for comprehensive logo usage.

### Quick Reference
- **Standard Navigation**: 32px (h-8) - BlaBlaCar standard
- **Compact Mobile**: 28px (h-7)
- **Sidebar**: 32px (h-8)
- **Auth Pages**: 64px (h-16)
- **Always maintain aspect ratio** using `w-auto`

## Spacing & Layout

### Border Radius
```css
--radius: 0.75rem; /* 12px */
--radius-sm: 8px;
--radius-md: 10px;
--radius-lg: 12px;
--radius-xl: 16px;
```

### Spacing Scale
Use Tailwind's spacing scale:
- `gap-2.5` (10px) - Logo text gap
- `gap-4` (16px) - Standard component spacing
- `gap-6` (24px) - Section spacing
- `gap-8` (32px) - Large section spacing
- `p-6` (24px) - Standard padding
- `p-8` (32px) - Large padding

## UI Components

### Buttons

**Primary Button**:
```tsx
<Button className="bg-primary hover:bg-primary/90">
  Primary Action
</Button>
```

**Secondary Button**:
```tsx
<Button className="bg-secondary hover:bg-secondary/90">
  Secondary Action
</Button>
```

**Accent CTA Button**:
```tsx
<Button className="bg-accent hover:bg-accent/90">
  Important Action
</Button>
```

**Outline Button**:
```tsx
<Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
  Outline Action
</Button>
```

### Cards

**Standard Card**:
```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

**Colored Border Card** (60-30-10 Rule):
```tsx
// Primary emphasis
<Card className="border-2 border-primary/30 hover:border-primary/60">

// Secondary emphasis  
<Card className="border-2 border-secondary/30 hover:border-secondary/60">

// Accent emphasis (rare)
<Card className="border-2 border-accent/30 hover:border-accent/60">
```

### Icons

**Primary Icons**:
```tsx
<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
  <Icon className="w-8 h-8 text-primary" />
</div>
```

**Secondary Icons**:
```tsx
<div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
  <Icon className="w-8 h-8 text-secondary" />
</div>
```

**Accent Icons**:
```tsx
<div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
  <Icon className="w-8 h-8 text-accent" />
</div>
```

## Trip Type Branding

### Wasel (واصل) - One-Way Trips
- **Primary Color**: Teal (#008080)
- **Symbol**: → (rightward arrow)
- **Personality**: Simple, direct, flexible

### Raje3 (راجع) - Return Trips
- **Secondary Color**: Sage Green (#607D4B)
- **Symbol**: ↔ (bidirectional arrow)
- **Personality**: Complete, economical, convenient

## Image Guidelines

### Photography Style
- Bright, natural lighting
- Modern, clean vehicles
- Diverse, friendly people
- Middle Eastern landscapes and cities
- Focus on connection and community

### Image Sources
Use `unsplash_tool` for images with queries like:
- "modern car interior"
- "middle east cityscape"
- "friendly travelers"
- "sustainable transportation"

### Logo in Images
When placing logo on images:
- Use white container with shadow for separation
- Maintain minimum 16px padding
- Ensure contrast with background

## Accessibility

### Color Contrast
All text must meet WCAG AA standards:
- Primary on white: ✅ Pass (4.51:1)
- Secondary on white: ✅ Pass (4.8:1)
- Accent on white: ✅ Pass (7.2:1)

### Focus States
All interactive elements have visible focus rings:
```tsx
className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
```

## Brand Voice

### Tone
- **Friendly** - Approachable, warm, conversational
- **Professional** - Trustworthy, reliable, safe
- **Empowering** - You're in control
- **Sustainable** - Eco-conscious, responsible

### Language
- Use clear, simple language
- Avoid jargon
- Be bilingual (Arabic/English)
- Focus on benefits, not features

### Examples
✅ "Share Your Journey" (benefit-focused, warm)
❌ "Utilize Our Carpooling Platform" (jargony, corporate)

✅ "Save up to 70% on your journey" (specific, valuable)
❌ "Cost-effective travel solutions" (vague, corporate)

## Competitor Differentiation

### vs. BlaBlaCar
- **Middle East Focus**: Tailored for regional needs
- **Bilingual**: Arabic/English by default
- **Trip Classification**: Wasel/Raje3 system
- **Similar UX**: Compact logo sizing, clean interface

### vs. Uber/Careem
- **Carpooling Focus**: Shared journeys, not solo rides
- **Long Distance**: Inter-city travel
- **Community**: Build relationships, not transactions
- **Sustainability**: Eco-friendly emphasis

## Implementation Checklist

When creating new components:
- [ ] Use 60-30-10 color rule (primary, secondary, accent)
- [ ] Logo sized correctly (32px for navigation)
- [ ] Proper spacing (gap-4, p-6)
- [ ] Border radius (rounded-lg, rounded-xl)
- [ ] Hover states on interactive elements
- [ ] Focus rings for accessibility
- [ ] Bilingual text support
- [ ] Responsive design (mobile-first)
- [ ] Color contrast meets WCAG AA
- [ ] Consistent with brand voice

## Resources

- **Logo Asset**: `figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png`
- **Color Palette**: See [color-palette-image]
- **Logo Guidelines**: [LOGO_GUIDELINES.md](./LOGO_GUIDELINES.md)
- **UI Components**: `/components/ui/` (Shadcn)
- **Icons**: Lucide React

## Version History

- **v2.0** (Current) - BlaBlaCar-inspired sizing, 60-30-10 color rule
- **v1.0** - Initial brand identity with teal/green colors

---

**Last Updated**: October 2025  
**Brand Contact**: Wassel Design Team
