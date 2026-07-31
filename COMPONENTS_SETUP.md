# Components Setup - Radix UI & shadcn/ui Integration

## Overview

Your project is now configured with:

- **shadcn/ui** - For complex, pre-built components with full accessibility
- **Radix UI** - Primitives (via Base UI) for low-level component building
- **Tailwind CSS** - For all styling with consistent design system

## Component Architecture

### Landing Page Components

#### 1. **Hero.tsx**

- Uses: **shadcn Button** (Radix Primitive underneath)
- Features: Hero section with CTA buttons
- Styling: Tailwind gradient backgrounds and spacing

#### 2. **WhatIsVPS.tsx**

- Uses: **shadcn Accordion** (Base UI primitive)
- Features: Collapsible FAQ section
- Styling: Custom dark theme with Tailwind

#### 3. **Features.tsx**

- Uses: **shadcn Card** (Radix + Tailwind wrapper)
- Features: Feature cards in responsive grid
- Styling: Hover effects and gradient backgrounds

#### 4. **Regions.tsx**

- Uses: **shadcn Card + Badge** (Radix primitives)
- Features: Regional data with location badges
- Styling: Dark theme with blue accents

#### 5. **Systems.tsx**

- Uses: **shadcn Badge** (Radix primitive)
- Features: Operating system grid display
- Styling: Icon + badge combination

#### 6. **FAQ.tsx**

- Uses: **shadcn Accordion** (Base UI)
- Features: Interactive expandable FAQ items
- Styling: Custom dark theme with hover states

#### 7. **CTA.tsx**

- Uses: **shadcn Button** (Radix primitive)
- Features: Call-to-action section
- Styling: Gradient background with button variants

#### 8. **Footer.tsx**

- Uses: Plain HTML with Tailwind
- Features: Footer links and company info
- Styling: Dark background with link transitions

## Key Libraries

### Installed Dependencies

- `@base-ui/react` - Base UI components (Radix alternative)
- `lucide-react` - Icon library (included with shadcn)
- `tailwindcss` - Utility-first CSS framework
- `next` - React framework

### Component Locations

- UI Components: `src/components/ui/`
- Feature Components: `src/components/`
- Utilities: `src/lib/utils.ts`
- Configuration: `components.json`

## Tailwind Configuration

All components use Tailwind's utility classes with:

- **Color scheme**: Neutral base with blue accents
- **Dark mode**: Full dark theme support
- **CSS Variables**: Using Tailwind v4 features
- **Spacing**: Consistent 4px grid system

## Adding More Components

To add new shadcn components:

```bash
npx shadcn@latest add [component-name]
```

Popular components for landing pages:

- `dialog` - Modal/popup
- `select` - Dropdown selector
- `input` - Text input with validation
- `checkbox` - Checkbox groups
- `radio-group` - Radio button groups
- `dropdown-menu` - Navigation menus

## Development Workflow

1. **Create component** in `src/components/`
2. **Import shadcn components** as needed from `ui/`
3. **Apply Tailwind classes** for custom styling
4. **Use Radix UI primitives** directly for headless components

## Example: Creating a New Component

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewComponent() {
  return (
    <Card className="border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Action</Button>
      </CardContent>
    </Card>
  );
}
```

## Build & Deployment

- Build: `npm run build`
- Development: `npm run dev`
- All components are type-safe with TypeScript
- Ready for production deployment
