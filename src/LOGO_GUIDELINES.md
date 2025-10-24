# Wassel Logo Guidelines

## Logo Asset
The Wassel logo is a circular illustration featuring sustainable transportation elements including:
- City skyline representing Middle Eastern urban centers
- Highways and roads showing connectivity
- Cars and airplane symbolizing various travel modes
- Green trees representing eco-friendliness and sustainability
- Blue waterways showing comprehensive coverage

**Asset Location**: `figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png`

## Logo Component

We've created a reusable `<Logo>` component for consistent implementation across the platform.

### Usage

```tsx
import { Logo } from './components/Logo';

// Default - Small size with text (BlaBlaCar standard)
<Logo />

// Extra small logo without text (compact mobile)
<Logo size="xs" showText={false} />

// Medium logo with text (sidebar, prominent headers)
<Logo size="md" />

// Large logo without text (featured sections)
<Logo size="lg" showText={false} />

// Extra large logo (auth pages)
<Logo size="xl" showText={false} />
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` | Logo size |
| `showText` | `boolean` | `true` | Show "Wassel / واصل" text |
| `className` | `string` | `''` | Additional CSS classes |

### Size Reference (BlaBlaCar-Inspired Best Practices)

| Size | Height | Use Case | BlaBlaCar Equivalent |
|------|--------|----------|---------------------|
| `xs` | 28px (h-7) | Compact mobile headers, tight spaces | Mobile header compact |
| `sm` | 32px (h-8) | Standard navigation, desktop header | **Primary navigation (BlaBlaCar standard)** |
| `md` | 40px (h-10) | Sidebar header, prominent sections | Sidebar/emphasized placement |
| `lg` | 48px (h-12) | Featured sections, dashboard cards | Featured content |
| `xl` | 64px (h-16) | Auth pages, hero sections, large displays | Marketing/Hero |

**Default Size**: `sm` (32px) - Following BlaBlaCar's standard of keeping navigation logos compact and unobtrusive.

## Logo Placement Guidelines

### 1. **Landing Page Header**
- Size: `sm` (32px) - **BlaBlaCar Standard**
- Placement: Top-left corner
- With text: Yes
- Background: White with backdrop blur
```tsx
<Logo size="sm" />
```

### 2. **Authentication Pages**
- Size: `xl` (64px)
- Placement: Center of card header
- With text: No (text appears below)
- Background: White card
```tsx
<Logo size="xl" showText={false} />
```

### 3. **Sidebar Navigation**
- Size: `sm` (32px) - **BlaBlaCar Standard**
- Placement: Top of sidebar
- With text: Yes
- Background: White
```tsx
<Logo size="sm" />
```

### 4. **Mobile Header**
- Size: `xs` (28px) - **Compact Mobile**
- Placement: Center-left after menu button
- With text: No (space constrained)
- Background: White
```tsx
<Logo size="xs" showText={false} className="lg:hidden" />
```

### 5. **Dashboard Welcome Section**
- Size: `lg` (48px)
- Placement: Inside gradient card with white background container
- With text: No (used as icon)
- Background: White rounded container on gradient
```tsx
<div className="bg-white rounded-xl p-3 shadow-lg">
  <img src={wasselLogo} className="h-12 w-auto" />
</div>
```

### 6. **Landing Page Hero**
- Size: Custom (256px / w-64)
- Placement: Right side hero section
- With text: No
- Background: Gradient card
```tsx
<img src={wasselLogo} className="w-64 h-auto" />
```

### 7. **Footer**
- Size: `sm` (32px)
- Placement: Top-left of footer
- With text: Yes (with custom styling)
- Background: Dark (gray-900)
```tsx
<Logo size="sm" className="[&_h3]:text-white [&_p]:text-gray-200" />
```

## Best Practices (BlaBlaCar-Inspired)

### ✅ Do's
- **Keep navigation logos compact** - Use `sm` (32px) or `xs` (28px) for headers
- Always maintain aspect ratio (use `w-auto` with height)
- Use the Logo component for consistency
- Ensure adequate white space around the logo (minimum 12px)
- Use on clean backgrounds for maximum visibility
- Pair with "Wassel / واصل" text when space allows
- Apply subtle shadows on cards for depth
- **Prioritize content over branding** - Logo shouldn't dominate the interface

### ❌ Don'ts
- Don't use oversized logos in navigation (breaks BlaBlaCar best practices)
- Don't distort or stretch the logo
- Don't use fixed width and height (breaks aspect ratio)
- Don't place on busy backgrounds without container
- Don't change logo colors or apply filters
- Don't make logo too small (minimum 28px height)
- Don't use low-quality versions

## Responsive Behavior

### Mobile (< 640px)
- Use `xs` (28px) or `sm` (32px) sizes only
- Hide text labels to save space in headers
- Logo in header should be `xs` size
- Logo in auth pages can be `lg` or `xl`

### Tablet (640px - 1024px)
- Use `sm` (32px) or `md` (40px) sizes
- Show text labels when possible
- Balance logo size with content

### Desktop (> 1024px)
- Use `sm` (32px) for navigation (BlaBlaCar standard)
- Use `md` (40px) for sidebars
- Use `lg` (48px) or `xl` (64px) for hero/auth sections
- Always show text labels in sidebar

## Color Contexts

The Wassel color palette follows the **60-30-10 rule**:

### Brand Colors
- **Primary (60%)**: `#008080` - Teal/Cyan for main actions, buttons, links
- **Secondary (30%)**: `#607D4B` - Sage Green for supporting elements, backgrounds
- **Accent (10%)**: `#880044` - Maroon for CTAs, highlights, important indicators

### Light Backgrounds (Default)
- Logo: Full color version
- Text: `text-primary` for "Wassel"
- Text: `text-muted-foreground` for "واصل"

### Dark Backgrounds (Footer, Dark Cards)
- Logo: Full color version (stands out naturally)
- Text: `text-white` for "Wassel"
- Text: `text-gray-200` for "واصل"

### Gradient Backgrounds
- Logo: Place in white container with shadow
- Creates clean separation and premium look
- Example: Dashboard welcome section

## Accessibility

- Always include `alt="Wassel"` attribute
- Logo component includes proper alt text
- Ensure sufficient contrast with background
- Logo is decorative but aids brand recognition
- Minimum size of 28px ensures readability

## Technical Implementation

### Import Statement
```tsx
import wasselLogo from 'figma:asset/1ccf434105a811706fd618a3b652ae052ecf47e1.png';
```

### Direct Usage (when Logo component not suitable)
```tsx
<img 
  src={wasselLogo} 
  alt="Wassel" 
  className="h-8 w-auto"
/>
```

### With Container
```tsx
<div className="bg-white rounded-xl p-3 shadow-lg">
  <img src={wasselLogo} alt="Wassel" className="h-12 w-auto" />
</div>
```

## Current Implementation

The logo is currently implemented in:

1. ✅ Landing Page Header (32px - BlaBlaCar standard)
2. ✅ Landing Page Hero Section (256px - Hero size)
3. ✅ Landing Page Footer (32px - Standard)
4. ✅ Authentication Page (64px - Auth emphasis)
5. ✅ Sidebar Navigation (32px - BlaBlaCar standard)
6. ✅ Mobile Header (28px - Compact mobile)
7. ✅ Dashboard Welcome Section (48px - Featured)

## Brand Consistency

The logo is a key part of the Wassel brand identity and should:
- Represent sustainable, eco-friendly travel
- Convey connectivity across the Middle East
- Symbolize modern, smart transportation
- Reflect trust and professionalism
- Support the bilingual nature (Arabic/English)
- **Follow BlaBlaCar sizing principles** - Compact, unobtrusive, content-first

The circular design represents:
- **Global connectivity** - Round earth perspective
- **Completeness** - Full journey coverage
- **Community** - Circular economy of ride-sharing
- **Sustainability** - Green cities and eco-friendly travel

## Comparison with Industry Leaders

### BlaBlaCar Logo Sizing
- **Navigation**: ~32px (matches our `sm` size)
- **Mobile**: ~28px (matches our `xs` size)
- **Focus**: Content-first, compact branding

### Wassel Logo Sizing
- **Navigation**: 32px (`sm`) - Same as BlaBlaCar
- **Mobile**: 28px (`xs`) - Same as BlaBlaCar
- **Sidebar**: 32px (`sm`) - Balanced prominence
- **Hero/Auth**: 48-64px (`lg`/`xl`) - Marketing emphasis

Our sizing strategy aligns with BlaBlaCar's proven UX principles while maintaining flexibility for different contexts.
