# TSMart — Context & Architecture Document

## Project Overview
**TSMart** (Tawsif Software Marketplace) is a production-grade frontend for a software solutions and automation scripts marketplace. Built with Next.js 14+ App Router, TypeScript, and modern animation libraries.

**Owner:** Tawsif  
**Vision:** Luxurious, game-like digital marketplace selling time, money, and energy back to businesses through software automations, scripts, CLI tools, desktop tools, and web applications.

**Design Direction:** Clean Sci-Fi × Dark Luxury  
- Deep navy voids, soft cyan glows, champagne gold accents, emerald highlights
- Inspired by Destiny (clean sci-fi) + Tesla/Rolex (dark luxury)
- Glassmorphism, neon glows, particle effects, smoke/water backgrounds

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 14+ (App Router) | Core architecture, routing, API routes |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Animations | GSAP + ScrollTrigger | 3.x | Scroll-driven animations, transitions |
| 3D/WebGL | Three.js (React Three Fiber) | 8.x | 3D scenes, particles, smoke effects |
| State | Zustand | 4.x | Lightweight global state (cart, auth) |
| Forms | React Hook Form + Zod | 7.x + 3.x | Validation |
| UI Base | shadcn/ui | latest | Accessible component primitives |
| Icons | Lucide React | latest | Iconography |
| Fonts | Inter, Space Grotesk, Orbitron | Google Fonts | Typography |

---

## Color System (Tailwind Config)

```js
colors: {
  // Primary — Deep Navy Void
  void: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',
    600: '#486581',
    700: '#334e68',
    800: '#243b53',
    900: '#102a43',
    950: '#0a1929',  // Darkest — main bg
  },
  // Accent — Soft Cyan
  cyan: {
    glow: '#00d4ff',
    dim: '#0891b2',
    soft: '#67e8f9',
  },
  // Luxury — Champagne Gold
  gold: {
    light: '#f5e6c8',
    DEFAULT: '#d4af37',
    dark: '#b8941f',
    muted: '#8a7a5a',
  },
  // Secondary — Emerald
  emerald: {
    glow: '#10b981',
    soft: '#34d399',
    dark: '#059669',
  },
  // Glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.12)',
    heavy: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 0.1)',
  }
}
```

---

## Project Structure

```
tsmart/
├── app/
│   ├── (marketing)/              # Public pages (no auth required)
│   │   ├── page.tsx              # Home / Landing (Hero + Top Products + How It Works)
│   │   ├── layout.tsx            # Marketing layout (nav + footer)
│   │   ├── products/
│   │   │   ├── page.tsx          # Products grid (store)
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual product detail
│   │   ├── custom-solutions/
│   │   │   └── page.tsx          # Custom request form + progress tracker
│   │   ├── about/
│   │   │   └── page.tsx          # About Tawsif + TSMart
│   │   ├── how-to-purchase/
│   │   │   └── page.tsx          # Purchase guide + talk to dev
│   │   └── contact/
│   │       └── page.tsx          # Social gauntlet + collab form
│   ├── (dashboard)/              # Authenticated pages
│   │   ├── layout.tsx            # Dashboard layout (sidebar/header)
│   │   ├── profile/
│   │   │   └── page.tsx          # User profile + purchases + avatar
│   │   └── cart/
│   │       └── page.tsx          # Cart + checkout flow
│   ├── api/                      # Mock API routes (REPLACEABLE with real backend)
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── register/route.ts
│   │   │   └── verify/route.ts
│   │   ├── products/
│   │   │   └── route.ts          # GET products list
│   │   ├── orders/
│   │   │   └── route.ts          # POST create order
│   │   └── contact/
│   │       └── route.ts          # POST contact/collab request
│   ├── layout.tsx                # Root layout (providers, fonts, metadata)
│   └── globals.css               # Global styles, CSS variables, animations
├── components/
│   ├── ui/                       # shadcn/ui base components (Button, Card, Dialog, etc.)
│   ├── effects/                  # 3D scenes, particles, smoke, water
│   │   ├── ParticleField.tsx     # Main 3D particle background
│   │   ├── SmokeEffect.tsx       # Smoke/water background layers
│   │   ├── NeonGlow.tsx          # Neon glow text effects
│   │   └── GlassCard.tsx         # Glassmorphism card wrapper
│   ├── navigation/               # Navigation components
│   │   ├── MainNav.tsx           # Extraordinary nav panel
│   │   ├── NavItem.tsx           # Animated nav item
│   │   └── MobileNav.tsx         # Mobile navigation
│   ├── products/                 # Product-related components
│   │   ├── ProductCard.tsx       # Animated product card
│   │   ├── ProductGrid.tsx       # Products grid with filtering
│   │   ├── ProductModal.tsx      # Product detail modal/overlay
│   │   └── ProductFilter.tsx     # Filter sidebar
│   └── sections/                 # Reusable page sections
│       ├── HeroSection.tsx       # Landing hero with 3D scene
│       ├── TopProducts.tsx       # Top viewed products showcase
│       ├── HowItWorks.tsx        # Process explanation
│       ├── Footer.tsx            # Site footer
│       └── CTASection.tsx        # Call-to-action sections
├── hooks/
│   ├── useScrollAnimation.ts     # GSAP scroll trigger hook
│   ├── useMousePosition.ts       # Mouse tracking for effects
│   └── useAuth.ts                # Authentication state hook
├── lib/
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   ├── constants.ts              # Site constants
│   └── data.ts                   # Mock data (products, testimonials)
├── store/
│   ├── cartStore.ts              # Zustand cart state
│   ├── authStore.ts              # Zustand auth state
│   └── uiStore.ts                # UI state (modals, nav, etc.)
├── types/
│   ├── product.ts                # Product type definitions
│   ├── user.ts                   # User type definitions
│   └── order.ts                  # Order type definitions
├── public/
│   ├── images/                   # Product images, screenshots
│   └── fonts/                    # Custom fonts if needed
├── tailwind.config.ts            # Tailwind configuration with custom colors
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## Pages & Features Map

### Navigation
- **Home** — Landing page
- **Products** — Store grid
- **Custom Solutions** — Request form + progress tracker
- **About** — Company + Tawsif details
- **How to Purchase** — Guide + talk to dev
- **Cart** — Cart items + checkout
- **Contact a Representative** — Social gauntlet
- **Profile** — Sign in → Profile dashboard
- **Collab (for Devs)** — Collaboration portal

### Home Page Sections
1. **Hero** — 3D particle field, kinetic logo reveal, tagline
2. **Top Products** — Animated product cards, hover effects
3. **How It Works** — Process visualization with scroll animations
4. **Stats/Trust** — Time/money saved metrics
5. **CTA** — Contact / Browse products

### Products Page
- Grid layout with filtering (category, price, type)
- Smooth scroll with parallax
- Click → Product detail overlay/modal
- Add to cart functionality
- Product types: Scripts, CLI Tools, Desktop Apps, Web Services

### Product Detail
- Full description
- Pricing (one-time / monthly / subscription)
- Order methods (Buy, Download, Web Service)
- Usage manual
- Time/money saved visual data
- Add to cart

### Custom Solutions
- Field selector (industry, problem type)
- Requirement description form
- File upload (optional)
- Submit → Mock API → Show confirmation
- Progress tracker: Sent → Reviewed → Offered → Architected → Building → Done → Delivered

### About
- Tawsif's story with cinematic scroll
- Company mission
- Tech stack showcase
- Visual effects throughout

### How to Purchase
- Step-by-step guide (interactive)
- Video embeds
- Talk to a dev CTA

### Cart
- Items list with descriptions
- Price breakdown
- Checkout flow (mock)

### Contact
- Social media links styled like a game gauntlet
- Contact form
- Collab form for developers

### Profile
- Sign in / Register modals
- Post-auth: Profile dashboard
- Purchase history
- Avatar
- Settings

---

## Animation Strategy

| Effect | Library | Implementation |
|--------|---------|----------------|
| 3D Particle Background | Three.js / React Three Fiber | `ParticleField.tsx` — floating particles with mouse interaction |
| Smoke/Water Background | Three.js + custom shaders | `SmokeEffect.tsx` — layered noise-based fog |
| Neon Text Glow | CSS + GSAP | `NeonGlow.tsx` — text-shadow animation |
| Parallax Scroll | GSAP ScrollTrigger | `useScrollAnimation.ts` — section-based triggers |
| Page Transitions | GSAP | Layout-level transition wrapper |
| Nav Animation | GSAP | Radial/holographic reveal on hover |
| Card Hover | CSS + GSAP | 3D tilt, glow expansion |
| Logo Reveal | GSAP + Three.js | Kinetic assembly on page load |
| Cursor Trail | Custom canvas | Neon trail following cursor |

---

## State Management (Zustand)

### Cart Store
```ts
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}
```

### Auth Store
```ts
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}
```

---

## API Routes (Mock → Real Backend)

All API routes are designed as **drop-in replacements**:

| Route | Method | Current | Future |
|-------|--------|---------|--------|
| `/api/auth/login` | POST | Returns mock JWT | NextAuth.js / Clerk |
| `/api/auth/register` | POST | Returns mock user | Real DB + email verification |
| `/api/auth/verify` | POST | Returns mock success | Real email/phone verification |
| `/api/products` | GET | Returns mock products | Database query (Prisma + PostgreSQL/MongoDB) |
| `/api/orders` | POST | Logs to console | Stripe/PayPal + order creation |
| `/api/contact` | POST | Logs to console | Nodemailer / Telegram Bot / CRM |

---

## Security Considerations

- Input validation on all forms (Zod schemas)
- CSRF protection via Next.js built-ins
- Rate limiting on API routes (to be implemented)
- Sanitized HTML rendering
- Secure auth token handling (httpOnly cookies when real backend)
- Environment variables for secrets

---

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+ (all categories)
- 3D effects: 60fps on mid-tier devices
- Lazy load all non-critical assets
- Code split by route

---

## Deployment

**Primary:** Vercel (optimized for Next.js)  
**Alternative:** Netlify, AWS Amplify  
**Requirements:** Node.js 18+, Git repository

---

## Future Backend Integration Checklist

- [ ] Database setup (PostgreSQL / MongoDB / Supabase)
- [ ] Authentication provider (NextAuth.js / Clerk / Auth0)
- [ ] Email service (Resend / SendGrid) for verification
- [ ] SMS verification (Twilio)
- [ ] Payment gateway (Stripe / PayPal)
- [ ] File storage (AWS S3 / Cloudflare R2) for product downloads
- [ ] Telegram Bot for notifications
- [ ] Admin dashboard for order management
- [ ] Analytics (Plausible / Google Analytics)

---

## Notes for AI Assistants

When working on this codebase:
1. **Preserve the design system** — colors, spacing, typography
2. **Maintain animation consistency** — use GSAP for complex, CSS for simple
3. **Keep components modular** — one component per file, clear props interface
4. **Mock API routes** — always return realistic data shapes
5. **Type everything** — strict TypeScript, no `any`
6. **Test responsiveness** — mobile-first approach
7. **Performance first** — lazy load heavy components, optimize images

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-06-25 | Initial project scaffold + context doc | Kimi (AI) |
| 2026-06-25 | Phase 1: Complete frontend built (homepage, products, auth, cart, all pages) | Kimi (AI) |
| 2026-06-25 | Phase 1: Homepage foundation built | Kimi (AI) |

---

*Document Version: 1.0*  
*Last Updated: 2026-06-25*
