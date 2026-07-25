# Retirement Waypoint — PROJECT_MAP

> Generated: 2026-07-25
> Two-repo setup: `retirement-waypoint` (Next.js frontend) + `retirement-waypoint-backend` (Express API)

---

## 1. COMPLETE FOLDER TREE

### Frontend — `retirement-waypoint/`

```
retirement-waypoint/
├── .env.local                          # Backend URL for dev proxy (mostly commented)
├── .gitignore                          # Ignores node_modules, .next, .env*, build
├── MASTER_SPECIFICATION.md             # ~10,000-line engineering spec (all chapters)
├── README.md                           # Default Next.js boilerplate README
├── components.json                     # shadcn/ui configuration (radix-nova style, RSC)
├── eslint.config.mjs                   # ESLint with next/core-web-vitals
├── jsconfig.json                       # Path alias: @/ → ./src/*
├── next.config.mjs                     # BACKEND_URL validation, image patterns, API rewrites
├── package.json                        # Next 16.2.6, React 19.2.4, Better Auth 1.6.20, RQ 5
├── package-lock.json
├── postcss.config.mjs                  # @tailwindcss/postcss
├── text                                # (unidentified file)
│
├── public/
│   ├── fav.png                         # Favicon
│   ├── globe.svg
│   ├── logo-01.png through logo-04.png
│   ├── logo-jpg.jpg
│   ├── images/                         # (empty or static images)
│   └── lottie/
│       └── not-found-animation.json    # 404 page animation
│
└── src/
    ├── proxy.js                        # Next.js middleware — auth gate + route protection
    │
    ├── app/
    │   ├── globals.css                 # Tailwind v4 + shadcn design tokens (oklch colors)
    │   ├── layout.js                   # Root layout: Plus Jakarta Sans, Providers, Toaster
    │   ├── not-found.jsx               # Animated 404 page (Lottie + Framer Motion)
    │   ├── providers.jsx               # QueryClientProvider + ReactQueryDevtools
    │   │
    │   ├── (site)/                     # Route group: Public pages
    │   │   ├── layout.js               # SiteLayout: Navbar + CartProvider + Footer
    │   │   ├── page.js                 # Homepage: Hero, Trust, Assessment, Books, etc.
    │   │   ├── about/page.jsx
    │   │   ├── assessment/page.jsx
    │   │   ├── assessment/[slug]/page.jsx
    │   │   ├── book/page.jsx
    │   │   ├── book/[slug]/page.jsx    # Book details with reviews + purchase CTA
    │   │   ├── checkout/page.jsx       # Cart checkout → order creation → Stripe
    │   │   ├── coaching/page.jsx
    │   │   ├── contact/page.jsx
    │   │   ├── payment/
    │   │   │   ├── success/page.jsx
    │   │   │   ├── cancel/page.jsx
    │   │   │   └── pending/page.jsx
    │   │   ├── resources/page.jsx
    │   │   └── verify-email/page.jsx
    │   │
    │   ├── (auth)/                     # Route group: Authentication
    │   │   └── auth/
    │   │       ├── page.jsx            # Server component — session check + redirect
    │   │       └── callback/page.jsx   # OAuth callback → role-based redirect
    │   │
    │   └── (dashboard)/                # Route group: Authenticated area
    │       ├── (user-dashboard)/
    │       │   └── dashboard/
    │       │       ├── layout.jsx      # DashboardLayout: header + sidebar + main
    │       │       ├── page.jsx        # Dashboard: WelcomeCard, StatsGrid, widgets
    │       │       ├── my-books/page.jsx
    │       │       ├── my-books/[bookId]/page.jsx
    │       │       ├── my-books/[bookId]/read/page.jsx
    │       │       ├── orders/page.jsx
    │       │       ├── orders/[orderId]/page.jsx
    │       │       └── profile/page.jsx
    │       │
    │       └── (admin-dashboard)/
    │           └── admin/
    │               ├── layout.jsx      # AdminLayout: header + sidebar + role check
    │               ├── page.jsx        # AdminDashboardContent
    │               ├── books/page.jsx
    │               ├── books/create/page.jsx
    │               ├── books/[id]/page.jsx
    │               ├── books/[id]/edit/page.jsx
    │               ├── orders/page.jsx
    │               ├── orders/[id]/page.jsx
    │               ├── reviews/page.jsx
    │               ├── coupons/page.jsx
    │               ├── coupons/create/page.jsx
    │               ├── coupons/[id]/page.jsx
    │               ├── coupons/[id]/edit/page.jsx
    │               ├── assessments/page.jsx
    │               ├── assessments/[id]/builder/page.jsx
    │               ├── assessments/[id]/introduction/page.jsx
    │               ├── assessment-participants/page.jsx
    │               ├── assessment-participants/[id]/page.jsx
    │               ├── contact-messages/page.jsx
    │               ├── contact-messages/[id]/page.jsx
    │               ├── newsletter-subscribers/page.jsx
    │               ├── newsletter-subscribers/[id]/page.jsx
    │               └── profile/page.jsx
    │
    ├── components/
    │   ├── ui/                         # shadcn/ui primitives (18 files)
    │   │   ├── accordion.jsx
    │   │   ├── alert-dialog.jsx
    │   │   ├── avatar.jsx
    │   │   ├── badge.jsx
    │   │   ├── BookPlaceholder.jsx
    │   │   ├── button.jsx
    │   │   ├── card.jsx
    │   │   ├── dialog.jsx
    │   │   ├── dropdown-menu.jsx
    │   │   ├── input.jsx
    │   │   ├── label.jsx
    │   │   ├── scroll-area.jsx
    │   │   ├── select.jsx
    │   │   ├── separator.jsx
    │   │   ├── sheet.jsx
    │   │   ├── skeleton.jsx
    │   │   ├── switch.jsx
    │   │   ├── table.jsx
    │   │   ├── tabs.jsx
    │   │   └── textarea.jsx
    │   │
    │   ├── shared/
    │   │   ├── footer/footer.jsx
    │   │   ├── navbar/navbar.jsx       # Responsive nav with mobile menu
    │   │   └── ...SectionHeader, Loader, Pagination, etc.
    │   │
    │   ├── dashboard/
    │   │   ├── header/DashboardHeader.jsx
    │   │   ├── sidebar/
    │   │   │   ├── DashboardSidebar.jsx
    │   │   │   └── config/menuConfig.js  # Role-based nav items
    │   │   ├── shared/EmptyState.jsx
    │   │   └── skeletons/DashboardSkeleton.jsx
    │   │
    │   ├── about/                      # About page sections (6 files)
    │   ├── assessment/                 # Assessment UI (8 files)
    │   ├── auth/                       # Auth forms (6 files)
    │   ├── book/                       # Book display (12 files)
    │   ├── coaching/                   # Coaching page (FiveDomainsSection)
    │   ├── contact/                    # Contact messages detail page
    │   ├── home/                       # Landing page sections (6+ sections)
    │   ├── payment/                    # Payment status pages (3 files)
    │   ├── smooth-scroll/              # SmoothScrollWrapper
    │   └── verifyemail/VerifyEmailPage.jsx
    │
    ├── context/
    │   └── CartContext.jsx             # Only global context — cart with localStorage
    │
    ├── features/                       # Feature-driven modules (15 domains)
    │   ├── books/
    │   │   ├── api/book.api.js         # BookApi class (separate axios)
    │   │   ├── hooks/
    │   │   │   ├── useBooks.js         # useState-based (NOT React Query — inconsistency)
    │   │   │   ├── useBook.js
    │   │   │   ├── useFeaturedBooks.js
    │   │   │   ├── useAdminBooks.js
    │   │   │   ├── useDebouncedSearch.js
    │   │   │   └── useCategories.js
    │   │   └── components/             # Feature-specific book components
    │   │
    │   ├── orders/
    │   │   ├── api/order.api.js        # OrderApi class (separate axios)
    │   │   ├── services/orders.api.js  # ordersApi (shared axios + API_ENDPOINTS) ⚡
    │   │   ├── hooks/
    │   │   │   ├── useOrders.js        # React Query hooks
    │   │   │   └── useOrderDetails.js
    │   │   ├── constants/
    │   │   │   ├── order.constants.js
    │   │   │   └── orders.constants.js
    │   │   ├── types/orders.types.js
    │   │   └── components/             # Order-specific UI
    │   │
    │   ├── payments/
    │   │   ├── index.js                # Re-exports
    │   │   ├── api/payment.api.js      # PaymentApi class (separate axios)
    │   │   └── hooks/usePayment.js     # useCreateCheckoutSession, useRetryPayment
    │   │
    │   ├── purchases/
    │   │   ├── index.js
    │   │   ├── api/purchase.api.js
    │   │   └── hooks/usePurchase.js    # useCheckPurchase, useMyPurchases
    │   │
    │   ├── reviews/
    │   │   ├── api/review.api.js       # ReviewApi class (separate axios)
    │   │   ├── hooks/useReviews.js     # Full RQ hooks + custom query keys
    │   │   └── components/index.js
    │   │
    │   ├── profile/
    │   │   ├── services/profile.api.js # Shared axios + API_ENDPOINTS
    │   │   ├── hooks/useProfile.js     # RQ: useProfile, useUpdateProfile, etc.
    │   │   ├── types/profile.types.js
    │   │   └── admin/
    │   │       ├── hooks/useAdminProfile.js
    │   │       └── types/adminProfile.types.js
    │   │
    │   ├── dashboard/
    │   │   ├── services/dashboard.api.js   # Shared axios — admin + user dashboards
    │   │   ├── hooks/useDashboard.js       # RQ: useAdminDashboard, useDashboard, etc.
    │   │   ├── types/dashboard.types.js
    │   │   └── components/                 # Dashboard widgets (8+ components)
    │   │
    │   ├── my-books/
    │   │   ├── services/myBooks.api.js     # Shared axios + API_ENDPOINTS
    │   │   └── hooks/useMyBooks.js         # RQ: useMyBooks, useDownloadBook, useGetReadUrl
    │   │
    │   ├── coupons/
    │   │   ├── api/coupon.api.js
    │   │   └── hooks/useCoupons.js
    │   │
    │   ├── assessment/
    │   │   ├── api/
    │   │   │   ├── assessment.api.js
    │   │   │   └── assessment-landing.api.js
    │   │   ├── hooks/
    │   │   │   ├── useAssessmentLanding.js
    │   │   │   └── (admin subfolder)
    │   │   │       ├── useAssessmentQueries.js
    │   │   │       ├── useAssessmentMutations.js
    │   │   │       └── useAssessmentBuilder.js
    │   │   ├── admin/
    │   │   │   ├── data/mockData.js
    │   │   │   └── types/assessment.types.js
    │   │   └── public/assessment/          # User-facing assessment flow
    │   │       ├── index.js
    │   │       └── hooks/useAssessmentSubmission.js
    │   │
    │   ├── assessment-participants/
    │   │   ├── index.js
    │   │   ├── api/assessment-participants.api.js
    │   │   └── hooks/useAssessmentParticipants.js
    │   │
    │   ├── contact/
    │   │   ├── api/contact.api.js
    │   │   └── hooks/useContact.js
    │   │
    │   ├── contact-messages/
    │   │   ├── contact-messages-index.js
    │   │   ├── api/contact-messages.api.js
    │   │   └── hooks/useContactMessages.js
    │   │
    │   ├── newsletter/
    │   │   ├── api/newsletter.api.js
    │   │   └── hooks/useNewsletter.js
    │   │
    │   └── newsletter-subscribers/
    │       ├── api/newsletter-subscribers.api.js
    │       ├── hooks/useNewsletterSubscribers.js
    │       └── components/index.js
    │
    ├── hooks/
    │   ├── useAuth.js                  # Auth wrapper: login, register, logout, googleLogin
    │   ├── useSession.js               # Better Auth useSession wrapper
    │   └── dashboard/useUser.js
    │
    ├── lib/
    │   ├── api/
    │   │   ├── axios.js                # Centralized axios instance
    │   │   └── endpoints.js            # Complete API_ENDPOINTS (15 sections)
    │   ├── auth-client.js              # Better Auth client (createAuthClient)
    │   ├── auth-server.js              # Server-side session validation
    │   ├── date-utils.js               # formatDate, formatDateTime
    │   ├── navLinks.js                 # Site navigation link data
    │   ├── phoneFormatter/phone-utils.js
    │   ├── query-client.js             # React Query client + QUERY_KEYS + INVALIDATION_KEYS
    │   ├── themeChangeSections.js      # Section theme identifiers
    │   └── utils.js                    # cn() helper (clsx + tailwind-merge)
    │
    ├── data/
    │   └── books.js                    # Static fallback book data (10 hardcoded books)
    │
    └── animations/
        └── message-sent.json           # Lottie animation
```

### Backend — `retirement-waypoint-backend/`

```
retirement-waypoint-backend/
├── .env                               # All secrets (⚠️ committed to git)
├── .gitignore
├── package.json                       # Express 5, Mongoose 9, Better Auth 1.6.20, Stripe 22
├── package-lock.json
├── vercel.json                        # Serverless config: all routes → api/index.js
│
├── api/
│   └── index.js                       # Vercel serverless entry: connectDB → app(req, res)
│
└── src/
    ├── server.js                      # Entry: DB connect, Cloudinary check, listen
    ├── app.js                         # Express: helmet → cors → auth → webhook → JSON → API → 404 → error
    │
    ├── config/
    │   ├── betterAuth.js              # Full Better Auth config (MongoDB adapter, plugins)
    │   ├── cloudinary.js              # Cloudinary v2 config + utility upload fn
    │   ├── database.js                # Mongoose singleton connection
    │   ├── env.js                     # dotenv loader
    │   ├── mailer.js                  # Nodemailer transporter (Gmail SMTP)
    │   ├── origins.js                 # CORS + auth allowed hosts with wildcard support
    │   └── stripe.js                  # Stripe SDK + webhook secret + FRONTEND_URL
    │
    ├── middleware/
    │   ├── authMiddleware.js          # protect(), restrictTo(), isAdmin, isCoach
    │   ├── errorMiddleware.js         # Global error handler (Mongoose, Zod, Multer)
    │   └── uploadMiddleware.js        # Multer config (images/docs/videos) + bookFilesUpload
    │
    ├── routes/
    │   └── index.js                   # Master route registry — 19 module mounts
    │
    ├── modules/                       # 19 business modules
    │   ├── analytics/                 # Analytics
    │   │   ├── analytics.controller.js
    │   │   ├── analytics.routes.js
    │   │   ├── analytics.service.js
    │   │   └── analytics.validation.js
    │   │
    │   ├── assessment/                # Assessment management
    │   │   ├── assessment.controller.js
    │   │   ├── assessment.model.js
    │   │   ├── assessment.repository.js
    │   │   ├── assessment.routes.js
    │   │   ├── assessment.service.js
    │   │   ├── assessment.validation.js
    │   │   └── index.js
    │   │
    │   ├── assessment-landing/        # Assessment landing page content
    │   │   ├── assessment-landing.controller.js
    │   │   ├── assessment-landing.model.js
    │   │   ├── assessment-landing.routes.js
    │   │   ├── assessment-landing.service.js
    │   │   └── assessment-landing.validation.js
    │   │
    │   ├── assessment-submission/     # User assessment submissions
    │   │   ├── assessmentSubmission.controller.js
    │   │   ├── assessmentSubmission.model.js
    │   │   ├── assessmentSubmission.routes.js
    │   │   ├── assessmentSubmission.service.js
    │   │   └── assessmentSubmission.validation.js
    │   │
    │   ├── auth/                      # Authentication + Profile
    │   │   ├── auth.controller.js     # 12 handlers (getMe, updateProfile, users CRUD, etc.)
    │   │   ├── auth.model.js          # UserProfile schema
    │   │   ├── auth.routes.js         # /api/auth routes + Better Auth handler
    │   │   ├── auth.service.js        # User CRUD, role management, email verification
    │   │   └── auth.validation.js
    │   │
    │   ├── book/                      # Book CRUD (admin + public)
    │   │   ├── book.controller.js
    │   │   ├── book.model.js          # Book schema (title, slug, price, status, etc.)
    │   │   ├── book.routes.js
    │   │   ├── book.service.js
    │   │   └── book.validation.js
    │   │
    │   ├── contact/                   # Contact form
    │   │   ├── contact-index.js
    │   │   ├── contact.controller.js
    │   │   ├── contact.model.js
    │   │   ├── contact.repository.js
    │   │   ├── contact.routes.js
    │   │   ├── contact.service.js
    │   │   └── contact.validation.js
    │   │
    │   ├── coupon/                    # Discount coupons
    │   │   ├── coupon.controller.js
    │   │   ├── coupon.model.js        # Coupon + CouponUsage schemas
    │   │   ├── coupon.routes.js
    │   │   ├── coupon.service.js
    │   │   └── coupon.validation.js
    │   │
    │   ├── dashboard/                 # Dashboard API (admin + user)
    │   │   ├── dashboard.controller.js
    │   │   ├── dashboard.routes.js
    │   │   ├── dashboard.service.js
    │   │   └── dashboard.validation.js
    │   │
    │   ├── download/                  # Download logging
    │   │   └── downloadLog.model.js
    │   │
    │   ├── invoice/                   # Invoice + PDF generation
    │   │   ├── invoice.controller.js
    │   │   ├── invoice.model.js
    │   │   ├── invoice.pdf.js         # PDF generation (pdfkit)
    │   │   ├── invoice.routes.js
    │   │   ├── invoice.service.js
    │   │   └── invoice.validation.js
    │   │
    │   ├── my-books/                  # User's purchased library
    │   │   ├── myBooks.controller.js
    │   │   ├── myBooks.routes.js
    │   │   ├── myBooks.service.js     # Download, read URL, stream PDF
    │   │   └── myBooks.validation.js
    │   │
    │   ├── newsletter/                # Newsletter subscriptions
    │   │   ├── index.js
    │   │   ├── newsletter.admin.controller.js
    │   │   ├── newsletter.admin.routes.js
    │   │   ├── newsletter.controller.js
    │   │   ├── newsletter.model.js
    │   │   ├── newsletter.repository.js
    │   │   ├── newsletter.routes.js
    │   │   ├── newsletter.service.js
    │   │   └── newsletter.validation.js
    │   │
    │   ├── order/                     # Order management
    │   │   ├── order.controller.js    # 6 handlers
    │   │   ├── order.model.js         # Order schema (auto orderNumber via nanoid)
    │   │   ├── order.routes.js
    │   │   ├── order.service.js       # Create, apply coupon, get, paginate
    │   │   ├── order.validation.js
    │   │   ├── orderItem.model.js     # Individual order items
    │   │   └── payment.helper.js      # Legacy helpers (processSuccessfulPayment, prepareOrderForStripe)
    │   │
    │   ├── payment/                   # Stripe payment integration
    │   │   ├── payment.controller.js
    │   │   ├── payment.routes.js
    │   │   ├── payment.service.js     # Checkout session, webhook, retry, refund
    │   │   └── payment.validation.js
    │   │
    │   ├── purchase/                  # Purchase = ownership
    │   │   ├── purchase.controller.js
    │   │   ├── purchase.model.js
    │   │   ├── purchase.routes.js
    │   │   ├── purchase.service.js    # Create after payment, validate, revoke
    │   │   └── purchase.validation.js
    │   │
    │   ├── refund/                    # Refund lifecycle
    │   │   ├── refund.controller.js
    │   │   ├── refund.routes.js
    │   │   ├── refund.service.js
    │   │   ├── refund.validation.js
    │   │   ├── refundLog.model.js
    │   │   └── refundRequest.model.js
    │   │
    │   ├── review/                    # Reviews + moderation
    │   │   ├── review.controller.js
    │   │   ├── review.model.js
    │   │   ├── review.routes.js
    │   │   ├── review.service.js      # Verify purchase, create, approve, stats
    │   │   └── review.validation.js
    │   │
    │   └── upload/                    # Cloudinary file uploads
    │       ├── upload.controller.js
    │       ├── upload.model.js
    │       ├── upload.routes.js
    │       ├── upload.service.js      # Upload, delete, validate files
    │       └── upload.validation.js
    │
    ├── utils/
    │   ├── ApiError.js                # Custom error class (statusCode, isOperational)
    │   ├── catchAsync.js              # Async error wrapper for controllers
    │   ├── result-calculator.js       # Assessment scoring algorithm
    │   └── sendResponse.js            # Unified response: { success, message, data, meta }
    │
    └── scripts/
        ├── migrate-auth-principal.js  # Auth migration script
        ├── assessment.seeder.js       # Assessment data seeder
        └── seed-landing.js            # Landing page seeder
```

---

## 2. AUTHENTICATION FLOW

```
┌─────────────────────────────────────────────────────────────────────┐
│  REGISTRATION                                                       │
│                                                                     │
│  Frontend: AuthPage → signUp.email({ name, email, password })       │
│       ↓                                                             │
│  Frontend: useAuth.register() → checks email existence first via    │
│       GET /api/auth/check-email?email=xxx                           │
│       ↓                                                             │
│  Backend: Auth Service → Better Auth creates user in MongoDB        │
│       (Better Auth "user" collection)                               │
│       ↓                                                             │
│  Backend: databaseHooks → UserProfile created automatically         │
│       ↓                                                             │
│  Backend: sendVerificationEmail callback fires → sends email link   │
│       ↓                                                             │
│  User clicks verification link → GET /api/auth/verify-email?token=  │
│       → Better Auth verifies, sets emailVerified: true              │
│       ↓                                                             │
│  User can now sign in                                               │
│                                                                     │
│  LOGIN                                                              │
│                                                                     │
│  Frontend: AuthPage → signIn.email({ email, password })             │
│       ↓                                                             │
│  Better Auth validates credentials, checks emailVerified            │
│       ↓                                                             │
│  If not verified → show "Please verify your email" error            │
│       ↓                                                             │
│  If verified → sets session cookie, returns user                    │
│       ↓                                                             │
│  Frontend: refetchSession() → redirect based on role                │
│       /admin for admin, /dashboard for user                         │
│                                                                     │
│  GOOGLE OAUTH                                                       │
│                                                                     │
│  Frontend: signIn.social({ provider: "google" })                    │
│       ↓                                                             │
│  Redirects to Google OAuth consent screen                           │
│       ↓                                                             │
│  Google redirects to callback → Better Auth creates/links account   │
│       ↓                                                             │
│  Redirect to /auth/callback → getServerPrincipal → /admin or /dashboard
│                                                                     │
│  ACCOUNT LINKING                                                    │
│                                                                     │
│  Email user can link Google account via Better Auth account linking  │
│  (accountLinking: { enabled: true, trustedProviders: ["google"] })  │
│                                                                     │
│  SESSION MANAGEMENT                                                 │
│                                                                     │
│  Server-side: getServerSession() → fetch /api/auth/get-session       │
│  Client-side: useSession() → Better Auth useSession() with cookies   │
│  Middleware: proxy.js checks session for protected routes            │
│  Backend: protect() middleware → auth.api.getSession()               │
│  Session expiry: 7 days                                              │
│                                                                     │
│  ADMIN BOOTSTRAP                                                    │
│                                                                     │
│  First admin: POST /api/auth/bootstrap-admin with x-admin-setup-secret
│  Only works if no admin exists yet. Protected by ADMIN_SETUP_SECRET  │
│                                                                     │
│  PASSWORD RESET                                                     │
│                                                                     │
│  Uses emailOTP plugin: 6-digit code, 5-min expiry, 3 attempts       │
│  Or traditional link via sendResetPassword callback                  │
│                                                                     │
│  ROLES                                                              │
│                                                                     │
│  user → default role, can browse/purchase/read/review                │
│  admin → can manage books/orders/users/reviews/coupons/refunds      │
│  coach → future role (isCoach exported but not used)                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. PAYMENT FLOW (Complete)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PURCHASE FLOW                                                              │
│                                                                             │
│  User browses books → adds to cart → proceeds to checkout                   │
│       ↓                                                                     │
│  Checkout Page: POST /api/orders with { items: [{ bookId }], couponCode }   │
│       ↓                                                                     │
│  Backend: OrderService.applyCouponToOrder()                                  │
│    1. Check already purchased (Purchase.find)                               │
│    2. Fetch books, validate PUBLISHED                                       │
│    3. Build order items, calculate subtotal                                 │
│    4. Validate coupon via CouponService.validateCoupon()                    │
│    5. Calculate total (subtotal - discount)                                 │
│    6. Create Order + OrderItem (MongoDB transaction)                        │
│       ↓                                                                     │
│  Frontend receives order with _id, totalAmount                               │
│       ↓                                                                     │
│  POST /api/payments/create-checkout-session with { orderId }                │
│       ↓                                                                     │
│  Backend: PaymentService.createCheckoutSession()                             │
│    1. Get order with items                                                  │
│    2. Verify order belongs to user, paymentStatus === "PENDING"             │
│    3. Build Stripe line items                                               │
│    4. Create Stripe Checkout Session                                        │
│    5. Save stripeSessionId to order                                         │
│    6. Return { checkoutUrl, sessionId }                                     │
│       ↓                                                                     │
│  Frontend: window.location.href = checkoutUrl (redirects to Stripe)         │
│       ↓                                                                     │
│  User enters card details on Stripe's hosted page                           │
│       ↓                                                                     │
│  Stripe sends webhook to POST /api/payments/webhook                         │
│       ↓                                                                     │
│  Backend: webhook routes raw body BEFORE JSON parser                        │
│       ↓                                                                     │
│  PaymentController.webhookHandler:                                          │
│    1. PaymentService.verifyWebhookSignature(rawBody, signature)             │
│    2. Route event.type:                                                     │
│       - checkout.session.completed → handlePaymentSuccess                   │
│       - checkout.session.async_payment_failed → handlePaymentFailure        │
│       - charge.refunded → handleRefund                                      │
│       ↓                                                                     │
│  handlePaymentSuccess:                                                      │
│    1. Get orderId from session.metadata                                     │
│    2. Check if already PAID (idempotency)                                   │
│    3. OrderService.updatePaymentStatus(PAID)                                │
│    4. OrderService.updateOrderStatus(COMPLETED)                             │
│    5. PurchaseService.createPurchaseAfterPayment(orderId)                   │
│       → For each OrderItem, create Purchase record (transaction)            │
│    6. InvoiceService.createInvoice(orderId)                                 │
│       → Generate invoice number                                             │
│       → Create Invoice document                                             │
│       → Generate PDF via pdfkit                                             │
│       → Upload PDF to Cloudinary                                            │
│       → Save pdfUrl to invoice                                              │
│    7. OrderService.recordCouponUsageAfterPayment() if coupon used           │
│       ↓                                                                     │
│  User redirected to /payment/success?orderId=xxx                            │
│       ↓                                                                     │
│  Frontend checks order status, shows success page                           │
│  Book appears in My Books                                                   │
│                                                                             │
│  FAILED / CANCEL FLOW                                                       │
│                                                                             │
│  handlePaymentFailure → update paymentStatus to FAILED, orderStatus CANCEL  │
│  User redirected to /payment/cancel?orderId=xxx                             │
│  Can retry: POST /api/payments/retry/:orderId                               │
│    → Creates new Stripe session, resets paymentStatus to PENDING            │
│                                                                             │
│  BUSINESS RULES                                                             │
│  • Only Stripe webhook can confirm payment (never trust frontend)           │
│  • Purchase = ownership. Order ≠ ownership.                                 │
│  • Without Purchase: no download, no read, no review                        │
│  • Invoice generated only after successful payment                          │
│  • Downloads are lifetime (no expiry on accessStatus)                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. DATABASE MODELS (All Collections)

| # | Collection | Model File | Key Fields |
|---|-----------|-----------|-----------|
| 1 | `users` | (Better Auth managed) | `id`, `name`, `email`, `emailVerified`, `role` ("user"/"admin"), `banned`, `banReason`, `banExpires` |
| 2 | `session` | (Better Auth managed) | Session data, userId, expires |
| 3 | `account` | (Better Auth managed) | OAuth account links |
| 4 | `verification` | (Better Auth managed) | Email verification tokens |
| 5 | `userprofiles` | `auth.model.js` | `userId` (unique), `role`, `phone`, `profileImage`, `profileImagePublicId` (select:false), `bio`, `isActive`, `preferences` (newsletter, notifications), `lastLogin` |
| 6 | `books` | `book.model.js` | `title`, `slug` (unique), `description`, `authorName`, `coverImage`, `coverImagePublicId` (select:false), `pdfFile`, `pdfFilePublicId` (select:false), `price`, `pageCount`, `previewEnabled`, `previewEndPage`, `averageRating`, `totalReviews`, `featured`, `status` (DRAFT/PUBLISHED/ARCHIVED), `publishedAt`, `deletedAt` |
| 7 | `orders` | `order.model.js` | `userId`, `orderNumber` (unique, auto: ORD-YYYYMMDDHHMM-XXXXXX), `couponId`, `couponCode`, `discountAmount`, `subtotal`, `totalAmount`, `paymentStatus` (PENDING/PAID/FAILED/REFUNDED), `orderStatus` (PENDING/COMPLETED/CANCELLED/REFUNDED), `stripeSessionId`, `stripePaymentIntentId`, `checkoutUrl`, `notes` |
| 8 | `orderitems` | `orderItem.model.js` | `orderId`, `bookId`, `bookTitle`, `bookCoverImage`, `bookPrice` |
| 9 | `purchases` | `purchase.model.js` | `userId`, `bookId`, `orderId`, `purchasedAt`, `accessStatus` (ACTIVE/REVOKED). Unique index: userId+bookId. |
| 10 | `invoices` | `invoice.model.js` | `orderId` (unique), `userId`, `invoiceNumber` (unique, auto: INV-YYYYMMDD-XXXXXX), `subtotal`, `totalAmount`, `currency`, `status`, `issuedAt`, `pdfUrl`, `pdfPublicId` (select:false) |
| 11 | `reviews` | `review.model.js` | `userId`, `bookId`, `rating` (1-5), `title`, `comment`, `isVerifiedPurchase`, `isApproved`, `approvedBy`, `approvedAt`. Unique index: userId+bookId. |
| 12 | `coupons` | `coupon.model.js` | `code` (unique, uppercase), `name`, `description`, `type` (PERCENTAGE/FIXED_AMOUNT), `value`, `minimumOrderAmount`, `maximumDiscountAmount`, `usageLimit`, `usedCount`, `perUserLimit`, `validFrom`, `expiresAt`, `isActive`, `createdBy` |
| 13 | `couponusages` | `coupon.model.js` | `couponId`, `orderId`, `userId`, `discountAmount`, `usedAt` |
| 14 | `refundrequests` | `refundRequest.model.js` | `userId`, `orderId` (unique), `purchaseId`, `reason`, `details`, `status` (PENDING/APPROVED/REJECTED/COMPLETED), `adminNotes`, `approvedBy`, `approvedAt`, `rejectedAt`, `refundAmount`, `stripeRefundId`, `requestedAt` |
| 15 | `refundlogs` | `refundLog.model.js` | `refundRequestId`, `action`, `performedBy`, `notes`, `metadata` |
| 16 | `assessments` | `assessment.model.js` | Questions, domains, scoring configuration |
| 17 | `assessmentsubmissions` | `assessmentSubmission.model.js` | User answers, domain scores, overall score |
| 18 | `assessmentlandings` | `assessment-landing.model.js` | Landing page content |
| 19 | `downloadlogs` | `downloadLog.model.js` | `userId`, `bookId`, `purchaseId`, `ipAddress`, `userAgent`, `downloadedAt` |
| 20 | `contactmessages` | `contact.model.js` | `name`, `email`, `subject`, `message`, `status` (unread/read/replied/archived), `ipAddress`, `userAgent` |
| 21 | `newslettersubscribers` | `newsletter.model.js` | `email` (unique), `status` (active/unsubscribed), `source` (homepage/footer/contact/manual), `subscribedAt`, `unsubscribedAt` |
| 22 | `uploads` | `upload.model.js` | File metadata records from Cloudinary |

---

## 5. COMPLETE API ENDPOINTS

### Auth — `/api/auth`
| Method | Endpoint | Auth | Controller |
|--------|----------|------|-----------|
| GET | `/check-email` | None | `AuthController.checkEmailExists` |
| POST | `/resend-verification` | None | `AuthController.resendVerification` |
| GET | `/verify-email` | None | `AuthController.verifyEmail` |
| GET | `/me` | Auth | `AuthController.getMe` |
| PATCH | `/me` | Auth | `AuthController.updateProfile` |
| PATCH | `/me/profile-image` | Auth | `AuthController.updateProfileImage` |
| DELETE | `/me/profile-image` | Auth | `AuthController.removeProfileImage` |
| GET | `/users` | Admin | `AuthController.getAllUsers` |
| GET | `/users/:id` | Admin | `AuthController.getUserById` |
| PATCH | `/users/:id/role` | Admin | `AuthController.updateUserRole` |
| POST | `/users/:id/deactivate` | Admin | `AuthController.deactivateUser` |
| POST | `/users/:id/activate` | Admin | `AuthController.activateUser` |
| POST | `/bootstrap-admin` | Auth | `AuthController.bootstrapAdmin` |
| * | `/*` | Mixed | `AuthController.authHandler` (Better Auth) |

### Books (Admin) — `/api/books`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/` | Admin | List with pagination, search, status filter |
| POST | `/` | Admin | Create with cover + PDF upload |
| GET | `/:id` | Admin | Single book |
| PATCH | `/:id` | Admin | Update book |
| DELETE | `/:id` | Admin | Soft delete |
| PATCH | `/:id/publish` | Admin | Set status PUBLISHED |
| PATCH | `/:id/archive` | Admin | Set status ARCHIVED |
| POST | `/:id/upload-cover` | Admin | Upload cover image |
| POST | `/:id/upload-pdf` | Admin | Upload PDF file |

### Books (Public) — `/api/public/books`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/` | None | List published books, search, featured filter |
| GET | `/featured` | None | Featured books |
| GET | `/:slug` | None | Book details by slug |
| GET | `/:slug/preview` | None | Preview PDF (page-limited) |

### Upload — `/api/upload`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/single` | Admin | Single file upload |
| POST | `/multiple` | Admin | Multiple files |
| POST | `/profile-image` | Admin | Profile image |
| POST | `/book-cover` | Admin | Book cover |
| GET | `/my-files` | Admin | User's files |
| DELETE | `/:publicId` | Admin | Delete file |

### Orders — `/api/orders`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/` | Auth | Create order (with optional coupon) |
| GET | `/my-orders` | Auth | User's orders with pagination |
| GET | `/:id` | Auth | Single order (owner or admin) |
| GET | `/` | Admin | All orders with filters/pagination |
| PATCH | `/:id/payment-status` | Admin | Update payment status |
| PATCH | `/:id/order-status` | Admin | Update order status |

### Payments — `/api/payments`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/webhook` | None | Stripe webhook (raw body) |
| POST | `/create-checkout-session` | Auth | Create Stripe checkout session |
| POST | `/retry/:orderId` | Auth | Retry failed/pending payment |

### Purchases — `/api/purchases`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/my-purchases` | Auth | User purchases |
| GET | `/my-purchases-with-details` | Auth | Purchases with book details |
| GET | `/check/:bookId` | Auth | Check if purchased |
| GET | `/:id` | Auth | Single purchase |
| GET | `/:id/with-details` | Auth | Purchase + book details |
| GET | `/` | Admin | All purchases (filtered) |

### Invoices — `/api/invoices`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/my-invoices` | Auth | User's invoices |
| GET | `/:id` | Auth | Single invoice |
| GET | `/by-number/:number` | Auth | By invoice number |
| GET | `/:id/download` | Auth | Download PDF |
| GET | `/` | Admin | All invoices |
| POST | `/:id/regenerate-pdf` | Admin | Regenerate PDF |

### My Books — `/api/my-books`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/` | Auth | Purchased books with details |
| GET | `/:bookId` | Auth | Single purchased book |
| GET | `/:bookId/download` | Auth | Generate signed download URL (15min) |
| GET | `/:bookId/read` | Auth | Generate signed read URL (1hr) |
| GET | `/:bookId/stream` | Auth | Stream PDF directly |

### Reviews — `/api/reviews`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/` | Auth | Create review (purchase required) |
| PATCH | `/:id` | Auth | Update review |
| DELETE | `/:id` | Auth | Delete review |
| GET | `/my-review/:bookId` | Auth | User's review for a book |
| GET | `/books/:bookId/reviews` | None | Approved reviews (public) |
| GET | `/books/:bookId/reviews/summary` | None | Rating summary |
| GET | `/admin/reviews` | Admin | All reviews (filtered) |
| PATCH | `/admin/reviews/:id/approve` | Admin | Approve review |
| PATCH | `/admin/reviews/:id/reject` | Admin | Reject review |
| DELETE | `/admin/reviews/:id` | Admin | Delete review |

### Coupons — `/api/coupons`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/validate` | Auth | Validate coupon code |
| GET | `/admin/coupons` | Admin | List all |
| POST | `/admin/coupons` | Admin | Create |
| GET | `/admin/coupons/:id` | Admin | Single |
| PATCH | `/admin/coupons/:id` | Admin | Update |
| PATCH | `/admin/coupons/:id/activate` | Admin | Activate |
| PATCH | `/admin/coupons/:id/deactivate` | Admin | Deactivate |
| GET | `/admin/coupons/:id/usage` | Admin | Usage history |

### Assessments — `/api/assessments`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/public` | None | Public assessments |
| GET | `/public/:slug` | None | Single public assessment |
| POST | `/` | Auth | Submit assessment |
| GET | `/my-assessments` | Auth | User's history |
| GET | `/:id` | Auth | Single assessment |
| GET | `/:id/results` | Auth | Results |
| Admin CRUD | `/` + `/:id` | Admin | Full management |
| PATCH | `/:id/publish` | Admin | Publish |
| PATCH | `/:id/archive` | Admin | Archive |
| PATCH | `/:id/restore` | Admin | Restore |
| POST | `/:id/duplicate` | Admin | Duplicate |
| GET | `/stats` | Admin | Stats |
| GET | `/deleted` | Admin | Deleted assessments |

### Assessment Submissions — `/api/assessment-submissions`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/` | Auth | Submit answers |
| GET | `/my-submissions` | Auth | History |

### Assessment Landing — `/api/assessment-landing`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/` | None | Public landing data |
| GET | `/admin` | Admin | Admin view |
| PUT | `/admin/:id` | Admin | Update |

### Dashboard — `/api/dashboard`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/` | Auth | Dashboard data |
| GET | `/stats` | Auth | User stats |
| GET | `/recent-books` | Auth | Recent purchased books |
| GET | `/recent-orders` | Auth | Recent orders |
| GET | `/activities` | Auth | Activity timeline |
| GET | `/assessment-progress` | Auth | Assessment progress |

### Analytics (Admin) — `/api/admin/analytics`
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/overview` | Platform overview metrics |
| GET | `/dashboard` | Dashboard charts |
| GET | `/orders` | Order analytics |
| GET | `/revenue` | Revenue data |
| GET | `/books` | Book performance |
| GET | `/purchases` | Purchase analytics |
| GET | `/users` | User analytics |
| GET | `/downloads` | Download stats |
| GET | `/reviews` | Review analytics |
| GET | `/coupons` | Coupon analytics |

### Refunds — `/api/refunds`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/` | Auth | Request refund |
| GET | `/my-refunds` | Auth | User's refunds |
| GET | `/admin/refunds` | Admin | All refund requests |
| GET | `/admin/refunds/:id` | Admin | Single |
| PATCH | `/admin/refunds/:id/approve` | Admin | Approve (+ process Stripe refund) |
| PATCH | `/admin/refunds/:id/reject` | Admin | Reject |

### Contact — `/api/contact`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/` | None | Submit contact form |

### Contact Messages (Admin) — `/api/admin/contact-messages`
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/` | List all |
| GET | `/stats` | Statistics |
| GET | `/unread-count` | Unread count |
| GET | `/:id` | Single message |
| PATCH | `/:id/status` | Update status |

### Newsletter — `/api/newsletter`
| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| POST | `/subscribe` | None | Subscribe email |

### Newsletter (Admin) — `/api/admin/newsletter`
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/` | List subscribers |
| GET | `/stats` | Stats |
| GET | `/export` | Export CSV |
| GET | `/:id` | Single subscriber |

### Assessment Participants (Admin) — `/api/admin/assessment-participants`
| Method | Endpoint | Notes |
|--------|----------|-------|
| GET | `/` | List participants |
| GET | `/:id` | Participant details |

---

## 6. DASHBOARD FEATURES

### User Dashboard (`/dashboard`)
| Feature | Component | Backend | Description |
|---------|-----------|---------|-------------|
| Welcome | `WelcomeCard` | session data | Greeting with user name |
| Stats | `StatsGrid` | `GET /api/dashboard/stats` | Books, Orders, Assessments, Reviews counts |
| Recent Books | `RecentBooksCard` | `GET /api/dashboard/recent-books` | Last 4 purchased books |
| Recent Orders | `RecentOrdersCard` | `GET /api/dashboard/recent-orders` | Last 3 orders with status |
| Activity Timeline | `ActivityTimelineCard` | `GET /api/dashboard/activities` | Recent activity feed |
| Assessment Progress | `AssessmentProgressCard` | `GET /api/dashboard/assessment-progress` | Assessment completion status |
| Quick Actions | `QuickActionsCard` | — | Navigation shortcuts |
| Recommendations | `RecommendationsCard` | dashboard service | Personalized suggestions |
| My Books | — | `GET /api/my-books` | List/read/download purchased books |
| Orders | — | `GET /api/orders/my-orders` | Order history + details |
| Profile | — | `GET /api/auth/me` | Edit profile, change password |

### Admin Dashboard (`/admin`)
| Feature | Route | Backend (8 parallel calls) | Description |
|---------|-------|---------------------------|-------------|
| Overview | `/admin` | `GET /api/admin/analytics/overview` | Total revenue, orders, books, users |
| Revenue Chart | `/admin` | `GET /api/admin/analytics/revenue` | Daily revenue data |
| Orders | `/admin` | `GET /api/admin/analytics/orders` | Order metrics |
| Books | `/admin` | `GET /api/admin/analytics/books` | Top books |
| Reviews | `/admin` | `GET /api/admin/analytics/reviews` | Review stats |
| Recent Orders | `/admin` | `GET /api/orders` | Last 5 orders |
| Unread Messages | `/admin` | `GET /api/admin/contact-messages/unread-count` | Contact message count |
| Newsletter Stats | `/admin` | `GET /api/admin/newsletter/stats` | Subscriber count |
| Books | `/admin/books` | Book module | CRUD, search, publish, archive |
| Orders | `/admin/orders` | Order module | List, filter, status, details |
| Reviews | `/admin/reviews` | Review module | Approve/reject moderation |
| Coupons | `/admin/coupons` | Coupon module | CRUD, activate/deactivate |
| Assessments | `/admin/assessments` | Assessment module | Build questions, manage |
| Assessment Participants | `/admin/assessment-participants` | AssessmentSubmission | View submissions |
| Contact Messages | `/admin/contact-messages` | Contact module | Read, update status |
| Newsletter Subscribers | `/admin/newsletter-subscribers` | Newsletter module | View, export |
| Profile | `/admin/profile` | Auth module | Admin profile settings |

---

## 7. EVERY REUSABLE COMPONENT

### UI Primitives (shadcn/ui — `components/ui/`)
- `Button` — Variants: default, secondary, outline, ghost, danger. Sizes: sm, md, lg, icon
- `Card` — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Input` — Styled text input
- `Textarea` — Multi-line text input
- `Label` — Form label
- `Select` — Dropdown select
- `Badge` — Status badge (default, secondary, outline)
- `Dialog` — Modal dialog with overlay
- `Sheet` — Slide-out panel
- `Tabs` — Tabbed content
- `Accordion` — Expandable sections
- `Avatar` — User avatar with fallback
- `DropdownMenu` — Context menus
- `Separator` — Visual divider
- `Switch` — Toggle switch
- `Table` — Data table
- `Skeleton` — Loading placeholder
- `ScrollArea` — Custom scrollbar area
- `AlertDialog` — Confirmation dialogs
- `BookPlaceholder` — Book cover placeholder

### Shared Components (`components/shared/`)
- `Navbar` — Responsive navigation with mobile hamburger menu
- `Footer` — Site footer with links
- `SectionHeader` — Section title + subtitle
- `Loader` / `Spinner` — Loading indicator
- `Pagination` — Page navigation

### Dashboard Components (`components/dashboard/`)
- `DashboardSidebar` — Role-based sidebar (reads `menuConfig.js`)
- `DashboardHeader` — Top header bar with user info
- `StatsCard` — Metric display card
- `EmptyState` — No-data placeholder with icon + message + action
- `DashboardSkeleton` — Loading skeleton for dashboard

### Auth Components (`components/auth/`)
- `AuthPage` — Main auth page (login/register modes)
- `AuthForm` — Shared form wrapper
- `SignInForm` — Email/password sign in
- `SignUpForm` — Registration form
- `AuthIllustration` — Decorative illustration
- `ForgotPasswordModal` — Password reset modal
- `VerifyEmailChangeModal` — Email change verification

### Book Components (`components/book/`)
- `BookCard` — Book store card with hover effects
- `BookGrid` — Responsive grid layout
- `BookHero` — Book page hero section
- `BookCTA` — Call-to-action section
- `BookReviews` — Review display
- `BookFilters` — Search/filter bar
- `BookStore` — Full book listing
- `BookPreviewModal` — PDF preview
- `ShoppingCart` — Cart sidebar
- `PDFViewer` — In-browser PDF reader
- `BookSkeleton` / `BookEmpty` / `BookError` / `BookDetailsSkeleton` — Loading/empty/error states
- `GetSamplePreview` — Sample download button

### Home Components (`components/home/`)
- `HeroSection` — Landing hero with headline + CTA
- `SupportSection` — Support/info section
- `TrustSection` — Trust indicators
- `BookSection` — Featured books
- `AssessmentPreviewSection` — Assessment preview
- `AboutDaveSection` — Author introduction
- `NewsletterSection` — Email signup

### About Components (`components/about/`)
- `AboutHero` / `DaveStory` / `MissionVision` / `ProfessionalTimeline` / `CoreValues` / `FinalCTA` / `LifestyleCTA`

### Assessment Components (`components/assessment/`)
- `AssessmentShell` — Assessment wrapper
- `AssessmentForm` — Full assessment form
- `CoverPage` — Assessment intro
- `RegistrationPage` — Participant registration
- `SurveyPage` — Question survey
- `DomainProgress` — Domain progress bar
- `QuestionItem` — Individual question
- `ReflectionInput` — Reflection text input
- `ResultsPage` — Assessment results

### Payment Components (`components/payment/`)
- `PaymentSuccessPage` — Success confirmation
- `PaymentPendingPage` — Processing state
- `PaymentCancelPage` — Cancelled/failed state

---

## 8. PROVIDERS

| Provider | File | Scope | Purpose |
|----------|------|-------|---------|
| `QueryClientProvider` | `app/providers.jsx` | Root | React Query cache + devtools |
| `CartProvider` | `context/CartContext.jsx` | `(site)` route group | Cart state with localStorage |
| (Auth) | Better Auth `authClient` | Global via hooks | Session management (no provider needed) |
| (Toaster) | `react-hot-toast` | Root layout | Global toast notifications |

---

## 9. MIDDLEWARE

| Middleware | File | Purpose |
|-----------|------|---------|
| `proxy.js` | `src/proxy.js` | Next.js middleware — route protection, auth redirects, role-based access |
| `protect()` | `backend/authMiddleware.js` | Backend — validates Better Auth session, sets req.user, checks banned |
| `restrictTo()` | `backend/authMiddleware.js` | Backend — role-based access (`admin`, `coach`) |
| `isAdmin` / `isCoach` | `backend/authMiddleware.js` | Backend — pre-configured restrictTo helpers |
| `errorMiddleware` | `backend/errorMiddleware.js` | Backend — global error formatting |
| `uploadConfig` | `backend/uploadMiddleware.js` | Multer config for images/docs/videos |
| `bookFilesUpload` | `backend/uploadMiddleware.js` | Multer — coverImage + pdfFile (55MB limit) |
| `profileImageUpload` | `backend/uploadMiddleware.js` | Multer — single image upload |
| Helmet | `app.js` | Security headers (default config) |
| CORS | `app.js` | Dynamic origin check via `isAllowedOrigin()` |
| Morgan | `app.js` | HTTP request logging (`dev` mode) |
| Express JSON | `app.js` | JSON body parsing (after webhook raw body) |
| Express URL-encoded | `app.js` | URL-encoded body parsing |

---

## 10. UTILITIES

### Frontend (`src/lib/`)
| Utility | File | Purpose |
|---------|------|---------|
| `cn()` | `utils.js` | Merge Tailwind classes (clsx + tailwind-merge) |
| `formatDate()` | `date-utils.js` | Locale date formatting (en-US) |
| `formatDateTime()` | `date-utils.js` | Date + time formatting |
| `authClient` | `auth-client.js` | Better Auth client with plugins |
| `getServerSession()` | `auth-server.js` | Server-side session validation |
| `getServerPrincipal()` | `auth-server.js` | Extract user from server session |
| `queryClient` | `query-client.js` | React Query client config |
| `QUERY_KEYS` | `query-client.js` | All query keys (15 domains) |
| `INVALIDATION_KEYS` | `query-client.js` | Cache invalidation helpers |
| `API_ENDPOINTS` | `endpoints.js` | All API paths (15 sections) |
| `api` (axios) | `axios.js` | Centralized axios instance |

### Backend (`src/utils/`)
| Utility | File | Purpose |
|---------|------|---------|
| `ApiError` | `ApiError.js` | Custom error with statusCode |
| `catchAsync()` | `catchAsync.js` | Async controller wrapper |
| `sendResponse()` | `sendResponse.js` | Unified response format |
| `sendSuccess()` | `sendResponse.js` | 200 success shortcut |
| `sendError()` | `sendResponse.js` | Error response shortcut |
| `sendCreated()` | `sendResponse.js` | 201 response shortcut |
| `sendNoContent()` | `sendResponse.js` | 204 response shortcut |
| `calculateDomainScores()` | `result-calculator.js` | Assessment domain scoring |
| `calculateOverallScore()` | `result-calculator.js` | Overall assessment score |
| `findResultRange()` | `result-calculator.js` | Score range lookup |
| `validateAnswers()` | `result-calculator.js` | Answer validation |
| `generateRecommendations()` | `result-calculator.js` | Recommendation generation |

---

## 11. EVERY HOOK

### Frontend Custom Hooks

| Hook | File | Type | Purpose |
|------|------|------|---------|
| `useAuth()` | `hooks/useAuth.js` | Custom | login, register, logout, googleLogin, resendVerification |
| `useSession()` | `hooks/useSession.js` | Wrapper | Better Auth session wrapper |
| `useUser()` | `hooks/dashboard/useUser.js` | RQ? | User data |
| `useBooks()` | `features/books/hooks/useBooks.js` | useState | **Not React Query** — manual fetch with bookApi |
| `useBook(slug)` | `features/books/hooks/useBook.js` | useState | Single book by slug |
| `useFeaturedBooks()` | `features/books/hooks/useFeaturedBooks.js` | RQ | Featured books query |
| `useAdminBooks()` | `features/books/hooks/useAdminBooks.js` | RQ | Admin book list |
| `useDebouncedSearch()` | `features/books/hooks/useDebouncedSearch.js` | Custom | Debounced search input |
| `useCategories()` | `features/books/hooks/useCategories.js` | RQ | Book categories |
| `useMyOrders()` | `features/orders/hooks/useOrders.js` | RQ | User orders query |
| `useAllOrders()` | `features/orders/hooks/useOrders.js` | RQ | Admin: all orders |
| `useOrder(id)` | `features/orders/hooks/useOrders.js` | RQ | Single order |
| `useOrderDetails(id)` | `features/orders/hooks/useOrderDetails.js` | RQ | Order details with items |
| `useUpdateOrderStatus()` | `features/orders/hooks/useOrders.js` | RQ Mutation | Admin update status |
| `useUpdatePaymentStatus()` | `features/orders/hooks/useOrders.js` | RQ Mutation | Admin update payment |
| `useCreateCheckoutSession()` | `features/payments/hooks/usePayment.js` | RQ Mutation | Create Stripe session |
| `useRetryPayment()` | `features/payments/hooks/usePayment.js` | RQ Mutation | Retry failed payment |
| `useCheckPurchase(bookId)` | `features/purchases/hooks/usePurchase.js` | RQ | Check if purchased |
| `usePurchaseByBook(bookId)` | `features/purchases/hooks/usePurchase.js` | RQ | Single purchase lookup |
| `useMyPurchases()` | `features/purchases/hooks/usePurchase.js` | RQ | All purchases |
| `useProfile()` | `features/profile/hooks/useProfile.js` | RQ | User profile |
| `useUpdateProfile()` | `features/profile/hooks/useProfile.js` | RQ Mutation | Update profile |
| `useUpdateProfileImage()` | `features/profile/hooks/useProfile.js` | RQ Mutation | Upload image |
| `useRemoveProfileImage()` | `features/profile/hooks/useProfile.js` | RQ Mutation | Remove image |
| `useBookReviews(bookId)` | `features/reviews/hooks/useReviews.js` | RQ | Paginated reviews |
| `useBookReviewsInfinite(bookId)` | `features/reviews/hooks/useReviews.js` | RQ Infinite | Infinite scroll reviews |
| `useReviewSummary(bookId)` | `features/reviews/hooks/useReviews.js` | RQ | Rating summary |
| `useMyReview(bookId)` | `features/reviews/hooks/useReviews.js` | RQ | User's review |
| `useCreateReview(bookId)` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Submit review |
| `useUpdateReview(bookId)` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Edit review |
| `useDeleteReview(bookId)` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Delete review |
| `useAdminReviews()` | `features/reviews/hooks/useReviews.js` | RQ | Admin: all reviews |
| `useAdminApproveReview()` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Approve review |
| `useAdminRejectReview()` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Reject review |
| `useAdminDeleteReview()` | `features/reviews/hooks/useReviews.js` | RQ Mutation | Delete (admin) |
| `useAdminDashboard()` | `features/dashboard/hooks/useDashboard.js` | RQ | Admin dashboard data |
| `useDashboard()` | `features/dashboard/hooks/useDashboard.js` | RQ | User dashboard data |
| `useDashboardStats()` | `features/dashboard/hooks/useDashboard.js` | RQ | Stats only |
| `useRecentBooks()` | `features/dashboard/hooks/useDashboard.js` | RQ | Recent purchased books |
| `useRecentOrders()` | `features/dashboard/hooks/useDashboard.js` | RQ | Recent orders |
| `useActivityTimeline()` | `features/dashboard/hooks/useDashboard.js` | RQ | Activity feed |
| `useAssessmentProgress()` | `features/dashboard/hooks/useDashboard.js` | RQ | Assessment progress |
| `useMyBooks()` | `features/my-books/hooks/useMyBooks.js` | RQ | Library list |
| `useMyBook(bookId)` | `features/my-books/hooks/useMyBooks.js` | RQ | Single library item |
| `useDownloadBook()` | `features/my-books/hooks/useMyBooks.js` | RQ Mutation | Download + blob save |
| `useGetReadUrl(bookId)` | `features/my-books/hooks/useMyBooks.js` | RQ | PDF read URL |
| `useCoupons()` | `features/coupons/hooks/useCoupons.js` | RQ | Coupon validation |
| `useAssessmentSubmission()` | `features/assessment/public/hooks/useAssessmentSubmission.js` | RQ | Submit assessment |
| `useAssessmentLanding()` | `features/assessment/hooks/useAssessmentLanding.js` | RQ | Landing page data |
| `useAssessmentQueries()` | `features/assessment/admin/hooks/useAssessmentQueries.js` | RQ | Admin assessment list |
| `useAssessmentMutations()` | `features/assessment/admin/hooks/useAssessmentMutations.js` | RQ Mutations | CRUD assessments |
| `useAssessmentBuilder()` | `features/assessment/admin/hooks/useAssessmentBuilder.js` | RQ | Question builder |
| `useAssessmentParticipants()` | `features/assessment-participants/hooks/useAssessmentParticipants.js` | RQ | Participant list |
| `useContact()` | `features/contact/hooks/useContact.js` | RQ | Submit contact form |
| `useContactMessages()` | `features/contact-messages/hooks/useContactMessages.js` | RQ | Admin: contact messages |
| `useNewsletter()` | `features/newsletter/hooks/useNewsletter.js` | RQ | Newsletter subscribe |
| `useNewsletterSubscribers()` | `features/newsletter-subscribers/hooks/useNewsletterSubscribers.js` | RQ | Admin: subscribers |
| `useAdminProfile()` | `features/profile/admin/hooks/useAdminProfile.js` | RQ | Admin profile |

---

## 12. EVERY SERVICE

### Frontend Services (API abstraction layer)
| Service | File | Pattern | Endpoints Used |
|---------|------|---------|----------------|
| `bookApi` | `features/books/api/book.api.js` | Class (separate axios) | Public + Admin book endpoints |
| `orderApi` | `features/orders/api/order.api.js` | Class (separate axios) | Create order, get order |
| `ordersApi` | `features/orders/services/orders.api.js` | Object (shared axios) | List orders, update status |
| `paymentApi` | `features/payments/api/payment.api.js` | Class (separate axios) | Checkout, retry |
| `purchaseApi` | `features/purchases/api/purchase.api.js` | Class | Purchases |
| `reviewApi` | `features/reviews/api/review.api.js` | Class (separate axios) | Reviews CRUD + admin |
| `profileApi` | `features/profile/services/profile.api.js` | Object (shared axios) | Profile CRUD |
| `dashboardApi` | `features/dashboard/services/dashboard.api.js` | Object (shared axios) | Dashboard + analytics |
| `myBooksApi` | `features/my-books/services/myBooks.api.js` | Object (shared axios) | My books |
| `couponApi` | `features/coupons/api/coupon.api.js` | Class | Coupons |
| `assessmentApi` | `features/assessment/api/assessment.api.js` | Class | Assessments |
| `assessmentLandingApi` | `features/assessment/api/assessment-landing.api.js` | Class | Landing |
| `contactApi` | `features/contact/api/contact.api.js` | Class | Contact form |
| `newsletterApi` | `features/newsletter/api/newsletter.api.js` | Class | Newsletter |

### Backend Services (business logic layer)
| Service | Module | Key Methods |
|---------|--------|------------|
| `AuthService` | auth | `getAuthUserById()`, `getUserById()`, `getUserProfile()`, `updateUserProfile()`, `updateProfileImage()`, `removeProfileImage()`, `getAllUsers()`, `updateUserRole()`, `deactivateUser()`, `activateUser()`, `checkEmailExists()`, `resendVerificationEmail()`, `verifyEmailToken()`, `bootstrapAdmin()` |
| `OrderService` | order | `createOrder()`, `applyCouponToOrder()`, `getOrderById()`, `getUserOrders()`, `getAllOrders()`, `updatePaymentStatus()`, `updateOrderStatus()`, `isOrderOwner()`, `recordCouponUsageAfterPayment()` |
| `PaymentService` | payment | `createCheckoutSession()`, `handlePaymentSuccess()`, `handlePaymentFailure()`, `handleRefund()`, `verifyWebhookSignature()`, `retryPayment()` |
| `PurchaseService` | purchase | `createPurchase()`, `createPurchasesForOrder()`, `createPurchaseAfterPayment()`, `getPurchaseWithBookDetails()`, `getUserPurchasesWithBooks()`, `hasPurchasedBook()`, `getPurchaseById()`, `getUserPurchases()`, `getAllPurchases()`, `revokeAccess()`, `restoreAccess()` |
| `InvoiceService` | invoice | `generateInvoiceNumber()`, `createInvoice()`, `getInvoiceById()`, `getInvoiceByNumber()`, `getUserInvoices()`, `getAllInvoices()`, `isInvoiceOwner()`, `updateInvoiceStatus()`, `regeneratePDF()` |
| `MyBooksService` | my-books | `hasPurchasedBook()`, `getPurchaseByUserAndBook()`, `getUserBooks()`, `getUserBookById()`, `generateSecureDownloadUrl()`, `generateReadUrl()`, `streamBookPdf()`, `getDownloadLogs()`, `getDownloadStats()` |
| `ReviewService` | review | `verifyPurchase()`, `getMyReview()`, `hasReviewed()`, `recalculateBookStats()`, `createReview()`, `updateReview()`, `deleteReview()`, `approveReview()`, `rejectReview()`, `getBookReviews()`, `getReviewSummary()` |
| `BookService` | book | CRUD, publish, archive, upload |
| `CouponService` | coupon | `validateCoupon()`, `recordCouponUsage()`, CRUD |
| `RefundService` | refund | `createRefundRequest()`, `approveRefund()`, `rejectRefund()` |
| `AssessmentService` | assessment | Question management, scoring |
| `DashboardService` | dashboard | `getDashboardData()`, `getUserStats()`, dashboard widgets |
| `AnalyticsService` | analytics | Revenue, orders, books, users analytics |
| `UploadService` | upload | `uploadFile()`, `deleteFile()`, `uploadFileWithValidation()` |
| `NewsletterService` | newsletter | Subscribe, unsubscribe, CRUD |
| `ContactService` | contact | Create, read, update status |

---

## 13. CONFIGURATION FILES

| File | Purpose | Key Variables |
|------|---------|---------------|
| `.env` (backend) | All secrets | `PORT`, `NODE_ENV`, `MONGODB_URI`, `BETTER_AUTH_SECRET`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FRONTEND_URL`, `GOOGLE_CLIENT_ID/SECRET`, `SMTP_*`, `CLOUDINARY_*`, `ADMIN_*` |
| `.env.local` (frontend) | Dev config | `BACKEND_URL=http://localhost:5000` |
| `next.config.mjs` | Next.js | `BACKEND_URL` validation, image patterns, API rewrites |
| `postcss.config.mjs` | PostCSS | `@tailwindcss/postcss` |
| `vercel.json` (backend) | Vercel | All routes → `api/index.js` |
| `components.json` | shadcn/ui | radix-nova style, RSC, `@/` path alias |
| `jsconfig.json` | Paths | `@/` → `./src/*` |
| `eslint.config.mjs` | ESLint | `next/core-web-vitals` rules |

---

## 14. KEY ARCHITECTURAL NOTES & INCONSISTENCIES

### Patterns
- **Frontend**: Feature-Driven Architecture with React Query for server state
- **Backend**: Module-Based Layered Architecture (Route → Validation → Controller → Service → Repository → Model)
- **Auth**: Better Auth on both ends, cookie-based sessions
- **Payments**: Stripe hosted checkout + webhooks as the only payment truth
- **File storage**: All media on Cloudinary, signed URLs for PDF access

### Known Inconsistencies
1. **Two axios patterns**: Some APIs use shared `lib/api/axios.js` (orders services, profile, my-books, dashboard), others create their own `new axios.create()` or use vanilla `axios.get()` (books, reviews, payments, orders API layer)
2. **Missing repository layer**: Order, Book, Invoice, Purchase, Review, Auth services query MongoDB directly instead of through a repository
3. **N+1 queries**: `getUserOrders`, `getAllOrders`, `getDownloadLogs` fetch per-item sequentially
4. **Duplicate logic**: `createOrder()` and `applyCouponToOrder()` share ~90% identical code
5. **useBooks() not using React Query**: Uses `useState` + manual fetch instead of RQ pattern
6. **console.log in production**: Present in order.service.js, purchase.service.js, invoice.service.js
7. **Commented dead code**: Multiple blocks throughout order.service.js, payment.service.js
8. **Secrets in .git**: Production .env committed with real credentials
9. **No rate limiting wired up**: Env config exists but middleware not applied
10. **Payment API creates axios instance** instead of using the centralized one
