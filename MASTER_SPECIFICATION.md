# IMPORTANT

This document is the single source of truth for the entire project.

Before making any code changes, read this specification completely.

Do not ignore any section.

If any implementation conflicts with this document, this document takes precedence.

Never redesign the project.

Never replace the architecture.

Never introduce new patterns unless explicitly instructed.

Always preserve existing business rules.

Always extend existing implementation.

Always minimize code changes.

Follow this specification throughout the entire task.

# Retirement Waypoint
## Enterprise Software Specification
### Chapter 01 — Project Overview, Business Domain & Core Engineering Principles

Version: 1.0

Status:
Production Project

Document Owner:
Engineering Team

Target Reader:
Senior Full Stack Engineer
AI Coding Agent (Codex)
Future Developers

---

# 1. Introduction

Welcome to the Retirement Waypoint project.

This is NOT a greenfield application.

This is an existing production-oriented software project that already contains completed backend modules, frontend architecture, authentication, payment integration, dashboard system, review system, invoice generation, purchase management, and ebook delivery.

Your responsibility is to CONTINUE development while preserving the existing architecture.

You are joining an existing engineering team.

Your responsibility is NOT to redesign the project.

Your responsibility is to understand it first.

Only then implement new features.

Always preserve architecture consistency.

Never sacrifice maintainability for speed.

Always think as a Senior Software Engineer.

---

# 2. Project Vision

Retirement Waypoint is a digital retirement planning platform designed for professionals preparing for retirement.

The platform combines:

• Retirement Assessments
• Educational Resources
• Premium Digital Books (PDF)
• Personalized Guidance
• Progress Tracking
• Retirement Readiness

The project is NOT an ecommerce marketplace.

Books are digital products that support retirement education.

Everything in the system exists to improve the retirement journey.

---

# 3. Business Model

The platform sells digital PDF books.

Users purchase ebooks.

After successful payment they receive:

• Lifetime access
• Download permission
• Reading access
• Invoice
• Purchase history

Users do NOT receive physical products.

There is no shipping.

There is no warehouse.

There is no inventory management.

There are no multiple quantities for ebooks.

One purchase unlocks one book forever.

---

# 4. Primary User Types

There are only two primary roles.

## User

A normal customer.

Capabilities include:

- Create account
- Login
- Link Google account
- Complete retirement assessment
- Purchase books
- Download purchased books
- Read purchased books
- View invoices
- Manage profile
- Submit reviews
- Track progress

---

## Admin

Platform administrator.

Capabilities include:

- Dashboard
- Analytics
- Manage Books
- Manage Orders
- Manage Purchases
- Manage Reviews
- Manage Coupons
- Manage Refunds
- Manage Users
- Monitor Payments

Admin does NOT purchase books.

Admin manages the platform.

---

# 5. Business Philosophy

Everything revolves around one business flow.

Assessment

↓

Recommendation

↓

Book Discovery

↓

Purchase

↓

Payment

↓

Invoice

↓

Purchase Record

↓

Book Access

↓

Review

↓

Admin Approval

↓

Public Review

Every feature must support this business flow.

Never break it.

---

# 6. Core Business Rules

These rules define the entire system.

Rule 1

Only published books are purchasable.

---

Rule 2

Payment must succeed before unlocking a book.

---

Rule 3

Invoice is generated only after successful payment.

---

Rule 4

Purchase record must exist before download.

---

Rule 5

A user cannot review a book that has never been purchased.

---

Rule 6

Reviews remain pending until approved.

---

Rule 7

Only approved reviews appear publicly.

---

Rule 8

Orders represent payment history.

Purchases represent ownership.

These are NOT the same thing.

---

Rule 9

Invoices are immutable.

Never modify generated invoices.

---

Rule 10

Downloads are lifetime unless future business rules change.

---

# 7. Software Engineering Philosophy

This project follows enterprise software principles.

Everything should be:

Maintainable

Reusable

Scalable

Predictable

Consistent

Readable

Future-proof

Every implementation should assume:

Another developer will maintain this project after you.

Write code accordingly.

---

# 8. Existing Architecture

This project already contains an established architecture.

Never replace it.

Never redesign it.

Instead:

Understand

Reuse

Extend

Preserve

---

# 9. Development Philosophy

Before writing code:

Understand the feature.

Understand related backend modules.

Understand related frontend components.

Understand related API.

Understand business rules.

Reuse existing implementation whenever possible.

Only then implement the feature.

Never start coding immediately.

Thinking comes before coding.

---

# 10. Definition of "Senior-Level Development"

Every implementation should satisfy the following.

No duplicated logic.

No duplicated components.

No duplicated API calls.

No unnecessary abstraction.

No unnecessary complexity.

No random helper functions.

No inconsistent styling.

No inconsistent naming.

No dead code.

No temporary hacks.

No quick fixes.

No console.log left behind.

No commented-out production code.

Every change should improve the project without damaging existing architecture.

---

# 11. Engineering Priorities

Priority 1

Protect business logic.

Priority 2

Protect architecture.

Priority 3

Protect existing APIs.

Priority 4

Protect UI consistency.

Priority 5

Protect code readability.

Never sacrifice higher priorities for lower ones.

---

# 12. Existing Features

The following systems already exist in the project.

Authentication

Better Auth

Book Module

Order Module

Payment Module

Purchase Module

Invoice Module

Review Module

Assessment Module

Profile Module

Dashboard

My Books

Download System

Upload System

Stripe Integration

Cloudinary Integration

React Query

These systems must be reused.

Never recreate them.

---

# 13. Existing UI Philosophy

Current UI is based on:

Premium

Luxury

Elegant

Professional

Minimal

Glassmorphism

Soft Shadows

Rounded Corners

Warm Gold Accent

Deep Navy Backgrounds

Generous White Space

Modern Typography

Every new page must follow the same design language.

---

# 14. Existing Technical Stack

Frontend

Next.js App Router

React

TailwindCSS

React Query

Better Auth Client

Framer Motion

Lucide React

shadcn/ui

Backend

Node.js

Express

MongoDB

Better Auth

Stripe

Cloudinary

Nodemailer

These technologies are already adopted.

Do NOT replace them.

---

# 15. Long-Term Goal

The long-term goal is to evolve Retirement Waypoint into a fully production-ready SaaS platform.

Every implementation should move the project toward that goal.

Never implement features that reduce maintainability.

Never implement shortcuts that create future technical debt.

Always build with long-term scalability in mind.

---

End of Chapter 01

# Chapter 02A
## Frontend Architecture Foundation

---

# 1. Frontend Philosophy

This frontend is already implemented.

Do NOT redesign it.

Do NOT migrate it.

Do NOT replace the architecture.

The responsibility is to extend the existing frontend.

Always preserve consistency.

Every new feature should feel like it was originally written with the project.

Never make a newly created page visually different from existing pages.

---

# 2. Architecture Overview

Current frontend follows Feature Driven Architecture.

The application is divided into independent layers.

Current architecture

src

app

components

features

hooks

context

lib

animations

public

Every folder has a dedicated responsibility.

Never mix responsibilities.

---

# 3. App Router

The project uses

Next.js App Router.

Never introduce Pages Router.

Never create pages outside App Router.

Always use

layout.jsx

page.jsx

loading.jsx

error.jsx

not-found.jsx

when appropriate.

---

# 4. Route Groups

The application is organized using Route Groups.

(auth)

(public)

(site)

(dashboard)

Never move routes between groups.

Never flatten the structure.

Never reorganize routing.

---

(auth)

Authentication only.

Examples

Login

Register

Forgot Password

Reset Password

Verify Email

Nothing else belongs here.

---

(public)

Public pages.

Examples

Books

Book Details

Resources

Assessments

Landing Pages

These pages are publicly accessible.

---

(site)

Main website layout.

Contains

Navbar

Footer

Global Site Layout

Cart Provider

Everything using the public website UI belongs here.

---

(dashboard)

Authenticated area.

Contains

User Dashboard

Admin Dashboard

Dashboard Layout

Dashboard Navigation

Dashboard Components

Never place public pages here.

---

# 5. Dashboard Separation

The dashboard is intentionally divided.

(admin-dashboard)

(user-dashboard)

Never mix components.

Admin pages should never import user components unless they are truly reusable.

User pages should never depend on admin pages.

---

# 6. Feature-Based Development

Business logic belongs inside Features.

Current feature folders include

books

orders

payments

reviews

profile

dashboard

my-books

purchases

Future features should follow the same pattern.

Never place feature logic inside components.

---

# 7. Component Layer

Components are UI only.

Business logic should remain inside Features.

Components should receive data.

Components should render UI.

Components should never fetch unrelated data.

---

Good

Features

↓

Hooks

↓

Component

↓

UI

Bad

Component

↓

API

↓

Business Logic

↓

Database Decisions

---

# 8. Component Categories

Current project already separates components.

shared

Reusable across project.

Examples

Navbar

Footer

Loader

Pagination

Section Header

---

ui

Reusable UI primitives.

Examples

Button

Input

Dialog

Dropdown

Sheet

Badge

Card

Never duplicate shadcn components.

Always reuse them.

---

dashboard

Dashboard specific UI.

Sidebar

Header

Stats Card

Navigation

Overview Cards

---

book

Book specific presentation.

Book Card

Book Details

Book CTA

Book Hero

Book Grid

Book Filter

---

assessment

Assessment related UI.

---

auth

Authentication UI.

Forms

Buttons

Layouts

---

home

Landing page sections.

Hero

Features

CTA

Testimonials

---

# 9. Folder Responsibilities

Each folder has one responsibility.

Never violate responsibility boundaries.

Example

features/books

Responsible for

Book API

Book Hooks

Book Logic

Book Services

Book Types

NOT

Navbar

Sidebar

Buttons

Those belong elsewhere.

---

# 10. Pages Should Be Thin

Pages should never contain large business logic.

A page should mostly compose components.

Good

Page

↓

Feature Component

↓

Reusable Components

Bad

500 lines inside page.jsx

---

# 11. Layout Responsibilities

Layouts own

Navigation

Providers

Headers

Footers

Sidebars

Shared wrappers

Pages should never recreate layouts.

---

# 12. Global Providers

Providers belong in Root Layout.

Examples

React Query

Toaster

Theme

Authentication

Never wrap individual pages unnecessarily.

---

# 13. Context Rules

Only use Context for truly global state.

Current example

CartContext

Future examples

Theme

Language

Authentication

Do NOT create Context for page-local state.

---

# 14. State Management

Local State

useState

Feature State

React Query

Global State

Context

Never introduce Redux.

Never introduce MobX.

Never introduce Zustand.

Current architecture is sufficient.

---

# 15. Navigation Rules

Use

next/link

Use

next/navigation

Never use

window.location

unless a full browser redirect is required.

Example

Stripe Checkout

OAuth

External URLs

Otherwise always use App Router navigation.

---

# 16. Design Consistency

Every page must match existing design.

Current language

Luxury

Minimal

Elegant

Modern

Glassmorphism

Soft Shadows

Deep Navy

Warm Gold

Rounded Components

Large White Space

Never invent a new design style.

---

# 17. Responsive Philosophy

Everything is Mobile First.

Every page must support

Mobile

Tablet

Laptop

Desktop

Never implement Desktop-only layouts.

---

# 18. Existing Design System

Primary Background

Warm Off White

Primary Surface

White

Accent

Warm Gold

Primary Text

Deep Navy

Hover

Soft Gold

Borders

Very Light

Backdrop Blur

Glassmorphism

Shadows

Soft

Animations

Smooth

Professional

Subtle

Never replace these colors.

Never introduce random colors.

---

# 19. Typography

Use existing font.

Maintain hierarchy.

Heading

Bold

Large

Body

Readable

Comfortable

Never use random font sizes.

Follow existing spacing rhythm.

---

# 20. Core Principle

Before creating anything new ask

Does this already exist?

Can I reuse an existing component?

Can I extend an existing feature?

Can I avoid duplicate code?

If yes,

Reuse.

Do not recreate.

---

End of Chapter 02A

# Chapter 02B
## Feature Layer & Component Architecture

---

# 1. Feature-Driven Architecture

The frontend follows Feature Driven Architecture.

Every business domain owns its own feature.

Current feature folders include

books

dashboard

my-books

orders

payments

profile

purchases

reviews

Future features must follow the same architecture.

Never create business logic outside the appropriate feature.

---

# 2. Feature Ownership

Each feature owns everything related to its business domain.

Example

features/books

Owns

API

Hooks

Business Logic

Types

Utilities (if specific)

Feature Components (if reusable only inside the feature)

It does NOT own

Navbar

Footer

Sidebar

Shared Buttons

Shared Dialogs

Shared Layout

---

# 3. Existing Features

Current frontend contains these business domains.

books

Responsible for

Book Store

Book Listing

Book Details

Book CTA

Featured Books

Book APIs

Book Hooks

---

dashboard

Responsible for

Dashboard Overview

Dashboard Widgets

Dashboard Cards

Dashboard Statistics

Dashboard Landing Page

---

my-books

Responsible for

Purchased Books

Downloads

Book Reader Entry

Purchase Validation

Download APIs

---

orders

Responsible for

Orders

Order Details

Pending Orders

Order Status

Order History

Invoices Navigation

---

payments

Responsible for

Checkout

Stripe Integration

Payment Status

Payment Return Pages

Payment Retry

---

profile

Responsible for

Profile

Personal Information

Linked Accounts

Password

Profile Update

---

reviews

Responsible for

Review Submission

Review List

Review Summary

Review Hooks

Admin Review Approval Integration

---

purchases

Responsible for

Purchase Validation

Purchase Status

Purchased Book Lookup

---

# 4. Feature Independence

Features should be independent.

Example

Orders should never directly access Review API.

Instead

Order

↓

Backend

↓

Review Module

↓

Shared API

Maintain clear boundaries.

---

# 5. Shared Components

Never duplicate UI.

Before creating any component

Search existing components.

Reuse first.

Create only when necessary.

---

Current reusable folders

components/ui

components/shared

components/dashboard

---

# 6. Component Hierarchy

Always follow

Page

↓

Feature Component

↓

Shared Component

↓

UI Component

Never skip layers without reason.

---

Good

page.jsx

↓

OrdersPage

↓

OrderCard

↓

Card

↓

Button

---

Bad

page.jsx

↓

400 lines JSX

↓

Inline Business Logic

↓

API Calls

↓

Everything Together

---

# 7. Feature Components

Feature components belong inside the feature only when

they are NOT reusable outside that feature.

Example

features/orders/components

OrderTimeline

OrderSummary

OrderItem

These should remain inside Orders feature.

---

If reusable across project

Move to

components/shared

or

components/ui

---

# 8. Business Logic Rules

Business logic belongs inside

Hooks

Services

Utilities

Never inside JSX.

Examples

Filtering

Sorting

Transforming Data

Status Calculation

Permission Checks

Should not live inside components.

---

# 9. API Layer

Every feature communicates through its API layer.

Good

Component

↓

Hook

↓

API

↓

Backend

Bad

Component

↓

Axios

↓

Backend

Never call axios directly inside components.

---

# 10. Hooks

Hooks own feature behavior.

Example

useBooks()

useOrders()

useReviews()

useProfile()

Hooks are responsible for

Fetching

Mutations

Caching

Invalidation

Loading State

Error State

Components simply render.

---

# 11. React Query

Every server request should use React Query.

Always use

Queries

Mutations

Query Keys

Invalidation

Avoid manual fetching.

Do not replace React Query.

---

# 12. Local State

useState is allowed only for UI state.

Examples

Modal Open

Dropdown

Tabs

Accordion

Hover

Selected Item

Search Text

Never use useState for server data.

---

# 13. Feature Communication

Features should communicate through

Backend

React Query Cache

Shared Hooks

Never through random prop drilling.

---

# 14. Component Size

Ideal

100–200 lines

Maximum

~300 lines

If larger

Split it.

Never create 700-line components.

---

# 15. Component Naming

Always use descriptive names.

Good

OrderCard

BookDetailsContent

ProfileInformationCard

ReviewForm

PendingOrderCard

Bad

Card2

TestComponent

Temp

FinalCard

---

# 16. File Naming

React Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Constants

UPPER_CASE only when true constants.

Maintain existing naming conventions.

---

# 17. UI Consistency

Every newly created component must visually match

Dashboard

Books

Orders

Profile

My Books

Existing spacing

Existing colors

Existing typography

Existing border radius

Existing shadows

Existing animations

Never invent a different style.

---

# 18. Animations

Current project already uses

Framer Motion.

Use subtle animations only.

Examples

Fade

Slide

Scale

Opacity

Never use flashy animations.

Never animate every element.

Animation should enhance UX.

---

# 19. Empty States

Every feature must support

No Data

No Orders

No Books

No Reviews

No Downloads

Use meaningful empty states.

Never leave blank screens.

---

# 20. Loading States

Every server request should provide

Loading Skeleton

Loading Spinner

Loading Placeholder

Avoid layout shifts.

---

# 21. Error States

Every feature must gracefully handle

API Errors

Network Errors

Unauthorized

Forbidden

404

500

Payment Failure

Never crash the page.

---

# 22. Responsive Components

Every component should support

Mobile

Tablet

Desktop

Large Desktop

Never hardcode widths.

Prefer flexible layouts.

---

# 23. Accessibility

Buttons

Must have clear labels.

Forms

Must have labels.

Icons

Should not be the only indicator.

Interactive elements

Must be keyboard accessible.

---

# 24. Reusability Score

Before creating a component ask

Will this be reused?

If Yes

Move it to Shared.

If No

Keep it inside Feature.

---

# 25. Golden Rule

Never create duplicate business logic.

Never duplicate API calls.

Never duplicate components.

Always extend existing implementation.

Always preserve architecture.

---

End of Chapter 02B

# Chapter 02C
## Data Layer, React Query, API Architecture & State Management

---

# 1. Frontend Data Architecture

This project follows a layered architecture.

Never skip layers.

Always follow

UI Component

↓

Feature Hook

↓

Feature API

↓

Backend API

↓

Service

↓

Repository

↓

Database

Components should NEVER communicate directly with the backend.

---

# 2. Data Fetching Strategy

All server communication must go through React Query.

Never fetch data directly inside components.

Bad

Component

↓

axios.get()

Good

Component

↓

useBooks()

↓

book.api.js

↓

Backend

---

# 3. Feature API Layer

Every feature owns its own API file.

Example

features/books/api/book.api.js

features/orders/api/order.api.js

features/profile/api/profile.api.js

features/reviews/api/review.api.js

Never create duplicate API files.

Never move APIs into components.

---

# 4. Axios Rules

There must be only one centralized Axios client.

Location

lib/api.js

or existing API client.

Never create multiple axios instances.

Never hardcode backend URLs.

Always use

API_ENDPOINTS

---

# 5. API Endpoints

All endpoints are centralized.

API_ENDPOINTS

is the single source of truth.

Never write

"/api/books"

inside components.

Instead

API_ENDPOINTS.BOOKS.ALL

Always reuse endpoint constants.

---

# 6. React Query Philosophy

React Query manages

Server State

NOT UI State.

Never store server data using

useState

Example

Bad

const [books,setBooks]

Good

const { data } = useBooks()

---

# 7. Query Keys

Every feature owns its query keys.

Example

BOOKS

BOOK_DETAILS

FEATURED_BOOKS

MY_BOOKS

MY_ORDERS

ORDER_DETAILS

PROFILE

REVIEWS

ASSESSMENTS

Never duplicate query keys.

Keep naming predictable.

---

# 8. Query Hook Rules

Every GET request should have its own hook.

Examples

useBooks()

useBook()

useOrders()

useOrder()

useInvoices()

useProfile()

Never call API directly inside JSX.

---

# 9. Mutation Rules

Every POST

PATCH

DELETE

PUT

should be wrapped inside

React Query Mutation.

Example

useCreateOrder()

useUpdateProfile()

useSubmitReview()

useDownloadBook()

Never call mutations directly inside components.

---

# 10. Cache Invalidation

Every successful mutation must invalidate related queries.

Example

Review Created

↓

Invalidate

Book Reviews

Review Summary

My Reviews

Example

Profile Updated

↓

Invalidate

Profile

Session

Example

Order Completed

↓

Invalidate

Orders

Purchases

Invoices

My Books

Never forget cache invalidation.

---

# 11. Optimistic Updates

Only use optimistic updates when appropriate.

Examples

Bookmark

Favorite

Like

Not appropriate

Payments

Orders

Invoices

Purchases

Never fake successful payment.

Always wait for backend confirmation.

---

# 12. Error Handling

Every API request must handle

Loading

Success

Failure

Unauthorized

Forbidden

Validation Error

Server Error

Timeout

Never leave rejected promises unhandled.

---

# 13. Toast Strategy

Use toast only for user actions.

Examples

Profile Updated

Book Purchased

Review Submitted

Password Changed

Do NOT show toast

while loading pages.

Do NOT spam users.

---

# 14. Loading Strategy

Every feature must expose

isLoading

isFetching

isPending

Use existing loading UI.

Avoid blank screens.

---

# 15. Empty State Strategy

If server returns

[]

Show proper empty UI.

Never display

undefined

null

empty card

broken layout.

---

# 16. Custom Hooks

Business logic belongs in hooks.

Good

useOrders()

↓

sorting

pagination

filter

status

API

Bad

Component

↓

sorting

API

mutation

cache

Everything mixed together.

---

# 17. Context Rules

Context is NOT a replacement for React Query.

Current Context

CartContext

Only global client-side state belongs here.

Examples

Theme

Cart

Language

Sidebar

Never put API data into Context.

---

# 18. Authentication State

Authentication already uses Better Auth.

Never create another auth system.

Reuse existing

useSession()

useAuth()

signIn()

signOut()

session

Never duplicate auth logic.

---

# 19. Route Protection

Protected pages already exist.

Do not create another middleware.

Reuse

Dashboard Layout

Admin Layout

Server Principal

Existing auth guards.

---

# 20. Forms

Every form should have

Validation

Loading State

Disabled Submit

Error Message

Success Toast

Reset State

Never submit twice.

---

# 21. Pagination

If backend supports pagination

Frontend must reuse it.

Never fetch everything.

Examples

Books

Orders

Reviews

Invoices

Users

Assessments

---

# 22. Filtering

Filtering belongs

Backend first

Frontend second.

If backend supports

status

search

page

limit

sort

Always use backend filtering.

Never download thousands of records.

---

# 23. Sorting

Always use backend sorting if available.

Example

Newest

Oldest

Price

Rating

Status

Only use frontend sorting if backend cannot.

---

# 24. API Reuse Policy

Before writing any API

Search existing feature.

Check

api/

hooks/

services/

If endpoint exists

Reuse it.

Never duplicate endpoints.

---

# 25. Backend Contract

Frontend must NEVER invent API responses.

Always follow backend contracts.

Never rename backend fields.

Never assume data exists.

Respect existing DTOs.

---

# 26. Existing Modules

The following backend modules already exist.

Books

Orders

Purchases

Invoices

Payments

Reviews

Assessments

Coupons

Refunds

Uploads

Authentication

Frontend must integrate with them.

Never rebuild backend logic on frontend.

---

# 27. File Editing Policy

Before editing

Understand file purpose.

Modify minimum code.

Do not reformat entire file.

Do not rename existing exports.

Do not change unrelated logic.

Preserve code style.

---

# 28. DO NOT TOUCH

Unless explicitly required

Do NOT modify

Authentication

Providers

Query Client

Root Layout

Dashboard Layout

Existing API Client

Endpoint Constants

Route Groups

Folder Structure

Business Rules

---

# 29. Engineering Principle

Small change.

Minimal impact.

Maximum consistency.

Never rewrite working code.

Always extend.

Never replace.

---

End of Chapter 02C

# Chapter 02D
## UI Design System, Component Standards & Frontend Engineering Rules

---

# 1. UI Design Philosophy

Retirement Waypoint follows a premium enterprise design language.

Every screen should feel

Professional

Elegant

Minimal

Luxury

Modern

Calm

Readable

The user should feel confidence while using the application.

Never create flashy interfaces.

Never use playful designs.

Never use unnecessary gradients.

Never use random colors.

Always preserve visual consistency.

---

# 2. Design Language

Current design language

Luxury

Minimal

Glassmorphism

Soft Elevation

Rounded Components

Premium Typography

Warm Gold Accent

Deep Navy Primary

Large White Space

Balanced Spacing

Every new page must match this language.

Never introduce another style.

---

# 3. Color System

Always reuse existing colors.

Primary

#1B2B4B

Accent

#C9A84C

Accent Hover

#D6B45A

Background

#F8F5EF

White

#FFFFFF

Success

Green

Warning

Yellow

Danger

Red

Never hardcode random colors.

If a color already exists,

reuse it.

---

# 4. Typography

Use existing project font only.

Heading

Bold

Large

Clear

Body

Readable

Comfortable

Labels

Small

Muted

Buttons

Medium

Bold

Never introduce different fonts.

Never randomly increase font sizes.

---

# 5. Spacing Rules

Follow consistent spacing.

Preferred spacing

4

6

8

12

16

20

24

32

40

48

64

Never randomly use

7px

13px

19px

Consistency is mandatory.

---

# 6. Border Radius

Existing UI uses

Large rounded corners.

Examples

rounded-xl

rounded-2xl

rounded-3xl

Never use sharp corners unless intentionally required.

---

# 7. Shadows

Current project prefers

Soft shadows.

Never use heavy dark shadows.

Examples

shadow-md

shadow-lg

custom soft shadow

Avoid excessive elevation.

---

# 8. Glassmorphism

Existing project already uses

backdrop-blur

transparent surfaces

soft borders

Reuse them.

Never overuse blur.

---

# 9. Cards

Cards are the primary content container.

Cards should include

Padding

Rounded Corners

Soft Shadow

Consistent Background

Proper Spacing

Cards should never feel cramped.

---

# 10. Buttons

Always use existing Button component.

Never create custom buttons unless necessary.

Button hierarchy

Primary

Accent Gold

Secondary

Outline

Ghost

Danger

Never invent new button styles.

---

# 11. Forms

All forms should follow

Input

↓

Validation

↓

Error

↓

Submit

↓

Loading

↓

Success

Never leave users without feedback.

---

# 12. Icons

Project uses

Lucide React.

Never mix multiple icon libraries.

Keep icon size consistent.

Typical sizes

16

18

20

24

---

# 13. Images

Always use

Next/Image

Never use HTML img.

Always support

Loading

Fallback

Error State

Correct Aspect Ratio

---

# 14. Animations

Project already uses

Framer Motion.

Animation philosophy

Subtle

Professional

Smooth

Never animate every element.

Use animations only when they improve UX.

Examples

Fade

Slide

Opacity

Scale

Small Hover Lift

Avoid

Bounce

Crazy Rotation

Long Animation Chains

---

# 15. Responsive Design

Every page must support

Mobile

Tablet

Laptop

Desktop

Wide Desktop

Never build desktop-only pages.

---

# 16. Skeleton Loading

Every important page should support

Skeleton UI.

Examples

Books

Orders

Dashboard

Invoices

Profile

Never display blank pages while loading.

---

# 17. Empty States

Every list page requires

Meaningful illustration

Short explanation

Primary action

Examples

No Orders

No Books

No Reviews

No Purchases

No Invoices

No Assessments

Never leave an empty white screen.

---

# 18. Error Pages

Support

404

500

Unauthorized

Forbidden

Network Error

Payment Failed

Session Expired

Reuse existing design language.

---

# 19. Accessibility

Buttons

Must be keyboard accessible.

Inputs

Must have labels.

Dialogs

Must trap focus.

Icons

Should not be the only indicator.

Color should never be the only status indicator.

---

# 20. Component Creation Rules

Before creating any component ask

Does this already exist?

Can I extend an existing component?

Can I reuse a shared component?

If yes,

Reuse.

Never duplicate.

---

# 21. File Naming Rules

Pages

page.jsx

Layouts

layout.jsx

Loading

loading.jsx

Errors

error.jsx

Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Keep naming consistent.

---

# 22. Import Rules

Group imports.

Example

React

↓

Next

↓

Third Party

↓

Shared Components

↓

Feature Components

↓

Hooks

↓

Utilities

↓

Styles

Avoid random import ordering.

---

# 23. Component Size

Ideal

100–200 lines.

Maximum

300 lines.

If larger

Split into smaller components.

---

# 24. Page Composition

A page should mostly compose components.

Avoid large JSX blocks.

Good

Page

↓

Header

↓

Filters

↓

Cards

↓

Pagination

Bad

800-line page.jsx

---

# 25. Dashboard Rules

Dashboard pages should follow

Page Header

↓

Stats

↓

Main Content

↓

Secondary Widgets

↓

Pagination

Maintain consistency across

User Dashboard

Admin Dashboard

---

# 26. Notification Rules

Use existing toast system.

Never use alert().

Every mutation should provide

Loading

Success

Failure

messages.

---

# 27. Performance Rules

Avoid unnecessary re-renders.

Memoize only when necessary.

Use React Query cache.

Lazy load heavy components.

Optimize images.

Do not prematurely optimize.

---

# 28. Code Style

Readable first.

Performance second.

Never sacrifice readability.

Use meaningful names.

Keep functions small.

Avoid deeply nested logic.

---

# 29. File Editing Rules

Before editing any file

Understand its responsibility.

Only modify what is necessary.

Never reformat the entire file.

Never rename exports.

Never move files.

Never change unrelated logic.

---

# 30. Strict DO NOT MODIFY List

Unless explicitly requested,

Do NOT modify

Root Layout

Providers

Query Client

Authentication Core

Better Auth Configuration

API Client

Endpoint Constants

Dashboard Layout

Site Layout

Folder Structure

Existing Route Groups

Existing Business Rules

Completed Features

Never introduce breaking changes.

---

# 31. Development Checklist

Before submitting any feature verify

✓ Responsive

✓ Loading State

✓ Empty State

✓ Error State

✓ API Integration

✓ React Query

✓ Design Consistency

✓ Accessibility

✓ Existing Architecture Preserved

✓ No Duplicate Logic

---

# 32. Final Frontend Principle

Every new page should feel like it has always been part of Retirement Waypoint.

Users should never be able to distinguish between old pages and newly implemented pages.

Architecture consistency is more important than writing more code.

Always extend.

Never rewrite.

Always preserve.

---

End of Chapter 02D

# Chapter 03A
## Backend Architecture Foundation

Version: 1.0

---

# 1. Backend Philosophy

This backend is already implemented.

This is NOT a starter project.

Do NOT redesign it.

Do NOT migrate it.

Do NOT introduce another architecture.

Your responsibility is to understand the existing backend and continue development while preserving all existing business rules.

Always think as a Senior Backend Engineer.

---

# 2. Technology Stack

Current backend uses

Node.js

Express.js

MongoDB

Mongoose

Better Auth

Stripe

Cloudinary

Nodemailer

Zod Validation

Every future implementation must continue using these technologies.

Never replace them.

---

# 3. Existing Backend Architecture

The backend follows Module-Based Architecture.

Every business domain owns one module.

Current modules include

analytics

assessment

auth

book

coupon

dashboard

download

invoice

my-book

order

payment

purchase

refund

review

upload

These modules already define the business architecture.

Never reorganize them.

---

# 4. Module Structure

Every module follows exactly the same structure.

Example

modules/order

↓

order.routes.js

↓

order.controller.js

↓

order.service.js

↓

order.repository.js

↓

order.model.js

↓

order.validation.js

↓

(optional helpers)

Every future module must follow the same structure.

---

# 5. Layer Responsibilities

The backend follows layered architecture.

Request

↓

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Model

↓

MongoDB

Never skip layers.

---

# 6. Route Layer

Routes define API endpoints only.

Responsibilities

Define endpoint

Apply middleware

Apply validation

Forward request to controller

Routes should NEVER contain business logic.

---

# 7. Controller Layer

Controllers are extremely thin.

Controller responsibilities

Receive request

Extract params

Extract body

Call service

Return response

Handle next(error)

Nothing else.

Controllers should never

Access MongoDB

Calculate prices

Generate invoices

Validate business rules

Upload files

Process Stripe logic

---

# 8. Service Layer

Service is the heart of the application.

Business rules belong here.

Examples

Create Order

Generate Invoice

Create Purchase

Validate Coupon

Review Permission

Assessment Scoring

Payment Processing

Download Permission

Everything business-related belongs here.

---

# 9. Repository Layer

Repository communicates with MongoDB.

Repository responsibilities

Create

Update

Delete

Find

Aggregate

Populate

Nothing else.

Repositories should never

Generate invoices

Calculate discounts

Send emails

Create Stripe sessions

Repositories are data access only.

---

# 10. Model Layer

Models define MongoDB schema.

Responsibilities

Schema

Indexes

Virtuals

Statics

Methods

Relationships

Never put business workflows inside models.

---

# 11. Validation Layer

Validation uses Zod.

Every request must be validated before reaching controllers.

Validation layer checks

Body

Query

Params

Files

Never duplicate validation inside services unless required by business rules.

---

# 12. Middleware

Current middleware includes

Authentication

Authorization

Upload

Validation

Error Handling

Logging

Reuse existing middleware.

Never duplicate middleware.

---

# 13. Authentication

Authentication is already implemented.

Uses Better Auth.

Supports

Email Login

Google Login

Linked Accounts

Session Management

Never replace authentication.

Never create JWT manually.

Always reuse Better Auth.

---

# 14. Authorization

Role checking already exists.

Examples

protect()

restrictTo()

Reuse existing middleware.

Never create another authorization system.

---

# 15. API Response Philosophy

Every endpoint should return

Success

Message

Data

Meta (when needed)

Pagination (when needed)

Errors should follow one consistent format.

Never return inconsistent JSON structures.

---

# 16. Error Handling

Errors should flow

Controller

↓

next(error)

↓

Global Error Middleware

Never send custom responses from random places.

---

# 17. Logging

Avoid console.log.

Only use logging when necessary.

Never leave debug statements in production.

---

# 18. Database Access

MongoDB access must happen only inside repositories.

Never query models inside controllers.

Never query models directly inside routes.

Always go through repository.

---

# 19. File Modification Policy

Before editing backend files

Understand the module.

Understand existing business logic.

Modify only necessary code.

Never rewrite completed modules.

Never change unrelated APIs.

---

# 20. Backend Golden Rule

Business Logic

↓

Service

Database

↓

Repository

Validation

↓

Validation Layer

Transport

↓

Controller

Routing

↓

Route

Always preserve this architecture.

Never violate layer responsibilities.

---

End of Chapter 03A

# Chapter 03B
# Backend Business Modules & Complete Business Flow

Version: 1.0

---

# 1. Backend Business Overview

The backend is divided into independent business modules.

Each module owns exactly one business domain.

Modules communicate through the Service Layer.

Never allow one module to directly manipulate another module's database.

Always communicate through Services or well-defined APIs.

---

# 2. Current Business Modules

The current backend contains the following modules.

Authentication

Book

Order

Payment

Purchase

Invoice

My Book

Review

Assessment

Coupon

Refund

Upload

Download

Analytics

Dashboard

Each module has a single responsibility.

Never merge responsibilities.

---

# 3. Authentication Module

Folder

modules/auth

Purpose

Identity Management

Current Responsibilities

• Email Registration
• Email Login
• Google OAuth Login
• Linked Accounts
• Session Management
• User Roles
• Profile Information
• Password Management
• Forgot Password
• Email Verification

Business Rule

Authentication decides WHO the user is.

It never decides WHAT the user can purchase.

That belongs to Purchase.

---

# 4. Book Module

Folder

modules/book

Purpose

Digital Product Management

Responsibilities

Create Book

Update Book

Archive Book

Publish Book

Upload Cover

Upload PDF

Featured Books

Public Books

Book Details

Slug Generation

Business Rules

Only Published books are visible publicly.

Draft books cannot be purchased.

Archived books remain historical but are unavailable.

Books never know who purchased them.

Purchase ownership belongs elsewhere.

---

# 5. Order Module

Folder

modules/order

Purpose

Commercial Transaction

Responsibilities

Create Order

Store Purchased Items

Store Prices

Store Coupon

Store Tax

Store Payment Status

Store Order Status

Business Rules

Order represents

A payment attempt.

NOT ownership.

Order can exist without successful payment.

Order Status

Pending

Paid

Cancelled

Failed

Refunded

Order NEVER grants book access.

---

# 6. Payment Module

Folder

modules/payment

Purpose

Stripe Integration

Responsibilities

Create Checkout Session

Receive Stripe Webhooks

Verify Stripe Events

Update Order Status

Update Payment Status

Business Rules

Payment is responsible only for money.

It never grants books.

Never creates purchases directly.

Payment only confirms

Money received.

---

# 7. Purchase Module

Folder

modules/purchase

Purpose

Ownership

Responsibilities

Create Purchase

Find Purchase

Validate Purchase

Purchased Books

Business Rules

Purchase means

User owns the book.

Only successful payment creates Purchase.

Without Purchase

No download

No reader

No review

No ownership

Purchase is the source of truth.

---

# 8. My Book Module

Folder

modules/my-book

Purpose

Purchased Library

Responsibilities

Return Purchased Books

Download Links

Reader Access

Book Availability

Business Rules

Never returns unpaid books.

Uses Purchase records.

Never reads Orders directly.

---

# 9. Download Module

Folder

modules/download

Purpose

Secure PDF Delivery

Responsibilities

Validate Purchase

Track Download

Return PDF

Protect Files

Business Rules

Only purchased users may download.

Public users never receive PDFs.

---

# 10. Invoice Module

Folder

modules/invoice

Purpose

Financial Record

Responsibilities

Generate Invoice

Invoice Number

Invoice Download

Invoice Lookup

Business Rules

Invoice is generated

ONLY

after successful payment.

Invoices never change.

Invoices are immutable.

---

# 11. Review Module

Folder

modules/review

Purpose

Book Feedback

Responsibilities

Create Review

Update Review

Delete Review

Approve Review

Reject Review

Review Summary

Ratings

Business Rules

User must own the book.

Purchase required.

Review remains

Pending

until Admin approves.

Only approved reviews appear publicly.

Users cannot review twice.

---

# 12. Assessment Module

Folder

modules/assessment

Purpose

Retirement Readiness

Responsibilities

Assessment Submission

Scoring

History

Results

Recommendations

Business Rules

Assessment has no dependency on Orders.

Assessment is independent.

---

# 13. Coupon Module

Folder

modules/coupon

Purpose

Discount Management

Responsibilities

Validate Coupon

Calculate Discount

Usage Count

Expiration

Activation

Business Rules

Coupon affects

Order Total

Only.

Coupon never affects Purchase records.

---

# 14. Refund Module

Folder

modules/refund

Purpose

Refund Requests

Responsibilities

Refund Request

Refund Approval

Refund Rejection

Stripe Refund

Business Rules

Refund begins

AFTER purchase.

Refund may revoke access.

Current frontend hides refund feature.

Backend already supports future implementation.

---

# 15. Upload Module

Folder

modules/upload

Purpose

Cloudinary Integration

Responsibilities

Profile Image

Book Cover

Book PDF

Media Upload

Media Delete

Business Rules

Uploads never contain business logic.

Only file handling.

---

# 16. Analytics Module

Purpose

Admin Dashboard

Responsibilities

Revenue

Sales

Books

Downloads

Users

Orders

Charts

Business Rules

Analytics never modifies data.

Read-only.

---

# 17. Dashboard Module

Purpose

Dashboard APIs

Responsibilities

Overview Cards

Counts

Recent Activity

Statistics

Business Rules

Dashboard aggregates existing modules.

Never duplicates business logic.

---

# 18. Complete Purchase Flow

Current backend business flow

User

↓

Book Details

↓

Buy Now

↓

Create Order

↓

Stripe Checkout Session

↓

Stripe Hosted Payment

↓

Webhook

↓

Payment Verified

↓

Update Order

↓

Create Purchase

↓

Generate Invoice

↓

Unlock Book

↓

My Books

↓

Download

↓

Review

↓

Admin Approval

↓

Public Review

Never change this order.

---

# 19. Pending Payment Flow

User

↓

Create Order

↓

Payment Pending

↓

Pending Order Exists

↓

User Can Retry Payment

↓

Stripe Success

↓

Webhook

↓

Purchase Created

↓

Invoice Generated

↓

Books Unlocked

Pending orders do NOT unlock books.

---

# 20. Failed Payment Flow

Create Order

↓

Stripe Failed

↓

Order Failed

↓

No Purchase

↓

No Invoice

↓

No Download

↓

Retry Allowed

---

# 21. Review Flow

Purchase

↓

Review Form

↓

Pending Review

↓

Admin Review Queue

↓

Approve

↓

Public Review

Reject

↓

Hidden

Never bypass Admin approval.

---

# 22. File Dependency

Current dependency

Book

↓

Order

↓

Payment

↓

Purchase

↓

Invoice

↓

My Books

↓

Review

Never reverse dependencies.

---

# 23. Existing APIs

The frontend must reuse existing backend APIs.

Never create duplicate endpoints.

Never create parallel business logic.

Always inspect

Routes

Controller

Service

Repository

before implementing new code.

---

# 24. Safe Modules

Generally safe to extend

Dashboard

Analytics

Profile

Review UI

Orders UI

My Books UI

Admin Pages

Analytics Pages

---

# 25. High Risk Modules

Modify only when necessary.

Authentication

Payment

Purchase

Invoice

Better Auth

Stripe Webhook

Download Security

Changing these may break the whole application.

---

# 26. Engineering Principle

Every backend feature should answer one question.

Who owns this business logic?

If unsure,

do not write code.

Find the correct Service first.

Never duplicate business logic.

---

End of Chapter 03B

# Chapter 03C
# Backend Engineering Standards, Layer Responsibilities & Development Rules

Version: 1.0

---

# 1. Backend Engineering Philosophy

This backend follows Enterprise Layered Architecture.

Every layer has exactly one responsibility.

Never mix responsibilities.

A request should always travel through the following flow.

HTTP Request

↓

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Repository

↓

Service

↓

Controller

↓

HTTP Response

Never skip any layer.

---

# 2. Route Responsibilities

Routes are responsible only for

• Defining API endpoints
• Applying middleware
• Applying validation
• Calling controller

Routes should NEVER

Query MongoDB

Generate Stripe Sessions

Create Orders

Create Purchases

Send Emails

Upload Files

Generate Invoices

Routes contain almost no logic.

---

# 3. Validation Responsibilities

Validation happens immediately after routing.

Current project uses

Zod

Validation must verify

Request Body

Request Params

Request Query

Uploaded Files

Validation should reject bad requests before reaching Controller.

Controllers should assume validated input.

---

# 4. Controller Responsibilities

Controllers are transport layers.

Responsibilities

Receive Request

Extract Params

Extract Query

Extract Body

Extract Authenticated User

Call Service

Return Response

Forward Errors

Controllers should NEVER

Access MongoDB

Calculate Prices

Generate Invoice

Apply Coupon

Verify Purchase

Generate Download Links

Calculate Assessment Score

Controllers should remain extremely small.

Ideal controller size

20–80 lines

---

# 5. Service Responsibilities

The Service Layer owns all business logic.

Everything that represents a business decision belongs here.

Examples

Create Order

Apply Coupon

Validate Purchase

Generate Invoice

Create Purchase

Review Permission

Download Permission

Assessment Calculation

Refund Decision

Business rules must NEVER exist elsewhere.

---

# 6. Repository Responsibilities

Repository owns database communication.

Responsibilities

Create

Update

Delete

Find

Populate

Aggregate

Count

Exists

Nothing else.

Repository must NEVER

Create Stripe Session

Generate Invoice

Send Email

Apply Business Rules

Repositories are data access only.

---

# 7. Model Responsibilities

Models define

Collections

Schema

Indexes

Virtuals

Relationships

Statics

Methods

Models should NEVER coordinate business workflows.

---

# 8. Business Logic Rule

Whenever writing code ask

"Is this a business decision?"

If YES

↓

Service

If NO

↓

Repository

Never duplicate business logic.

---

# 9. Transactions

Whenever multiple business operations depend on each other

Use MongoDB Transaction.

Examples

Successful Payment

↓

Update Order

↓

Create Purchase

↓

Create Invoice

↓

Commit

If any step fails

Rollback everything.

Never leave partial data.

---

# 10. Stripe Webhook Rules

Webhook is the only trusted payment confirmation.

Never trust frontend payment success.

Flow

Stripe

↓

Webhook

↓

Verify Signature

↓

Locate Order

↓

Verify Payment

↓

Update Order

↓

Create Purchase

↓

Generate Invoice

↓

Unlock Books

↓

Return 200

Never create Purchase from frontend.

---

# 11. Better Auth Rules

Authentication already exists.

Never replace it.

Never generate your own JWT.

Never create custom session logic.

Always reuse Better Auth APIs.

Supported

Email Login

Google Login

Linked Accounts

Forgot Password

Reset Password

Session

Profile

---

# 12. Database Consistency

Every write operation must preserve consistency.

Examples

Create Purchase

↓

Invoice must exist

↓

Order must become Paid

↓

Books unlocked

↓

Review Permission enabled

No partial updates.

---

# 13. Populate Rules

Populate only when frontend requires additional data.

Do NOT overpopulate.

Good

Order

↓

Items

↓

Book

Bad

Order

↓

Everything

↓

Nested Everything

Populate intentionally.

---

# 14. Aggregation Rules

Aggregation belongs inside Repository.

Examples

Analytics

Revenue

Dashboard Cards

Charts

Reports

Never build aggregation in Service.

---

# 15. Pagination Rules

Every large collection must support

Page

Limit

Sort

Search

Status

Never return thousands of records.

Current modules

Books

Orders

Reviews

Users

Invoices

Refunds

Analytics

must support pagination.

---

# 16. Soft Delete Rules

Whenever applicable

Prefer Soft Delete.

Never destroy historical financial data.

Examples

Invoices

Orders

Purchases

should remain historical.

---

# 17. Audit Philosophy

Financial records should be immutable.

Orders

Invoices

Purchases

Payment History

should never lose historical integrity.

---

# 18. Error Handling

Every Service should throw meaningful errors.

Never return

false

null

undefined

for business failures.

Throw domain-specific errors.

Global Error Middleware formats responses.

---

# 19. Logging

Avoid console.log.

Production logging should focus on

Payment

Webhook

Authentication

Critical Errors

Never leave debugging logs.

---

# 20. Response Format

Every successful response should remain consistent.

Example

success

message

data

meta (optional)

pagination (optional)

Never invent new response structures.

---

# 21. API Stability

Frontend depends on backend contracts.

Never rename

Fields

Properties

Response Shapes

without updating frontend.

API stability is mandatory.

---

# 22. File Editing Policy

Before modifying any backend file

Read

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Model

Understand the existing flow first.

Modify the minimum amount of code necessary.

Never rewrite completed modules.

---

# 23. Safe Files

Usually safe to extend

Controller

Service

Validation

Dashboard

Analytics

Admin Features

Profile

Review

Books

Orders UI APIs

---

# 24. High Risk Files

Modify only when absolutely necessary.

Payment Service

Stripe Webhook

Better Auth

Authentication Middleware

Purchase Service

Invoice Service

Download Security

Changing these may affect the entire platform.

---

# 25. Dependency Rule

Services may depend on

Repositories

Utilities

Other Services (only when appropriate)

Repositories should NEVER depend on Services.

Controllers should NEVER depend on Repositories.

Maintain one-directional dependencies.

---

# 26. Code Quality Rules

Prefer readable code.

Prefer small functions.

Use meaningful names.

Avoid nested conditionals.

Avoid duplicated queries.

Extract reusable logic.

Keep Services cohesive.

---

# 27. Feature Extension Rule

When implementing a new feature

Never create parallel business logic.

Always extend the existing module.

Example

Need Order Feature?

↓

Modify Order Service

NOT

OrderServiceV2

NOT

NewOrderService

NOT

Duplicate APIs

---

# 28. Database First Principle

Before writing backend code ask

Which module owns this data?

Which Service owns this business rule?

Which Repository owns this collection?

If unsure

Stop coding.

Understand the architecture first.

---

# 29. Codex Modification Rules

Before editing

Search existing implementation.

Reuse existing Service.

Reuse existing Repository.

Reuse existing Validation.

Never duplicate functionality.

Never create parallel architecture.

Always preserve existing coding style.

---

# 30. Final Backend Principle

The backend already contains the foundation of the Retirement Waypoint platform.

Every new implementation should feel like it was originally written by the same engineering team.

Preserve consistency.

Preserve architecture.

Preserve business rules.

Extend.

Never rewrite.

---

End of Chapter 03C

# Chapter 03D
# Backend Module Deep Dive & Extension Guidelines

Version: 1.0

---

# Overview

This chapter defines the ownership of every backend module.

Each module owns one business domain.

Every future implementation MUST extend the existing module.

Never duplicate business logic.

Never create parallel implementations.

Always preserve module boundaries.

---

# AUTH MODULE

Folder

modules/auth

Purpose

Identity Management

Current Responsibilities

• Registration

• Login

• Logout

• Better Auth

• Google OAuth

• Session

• Linked Accounts

• Forgot Password

• Reset Password

• Email Verification

• Profile

• Role

Never Add

Order Logic

Invoice Logic

Purchase Logic

Review Logic

Book Logic

Payment Logic

Never touch Better Auth core unless authentication itself is changing.

---

# BOOK MODULE

Folder

modules/book

Purpose

Digital Product Management

Owns

Book CRUD

Book Status

Book Slug

Book Upload

Book Cover

Book PDF

Featured Books

Public Books

Book Search

Book Filtering

Book Pagination

Book Publishing

Future Features

Book Categories

Book Tags

Book Collections

Book Recommendations

Never Own

Purchase

Order

Invoice

Payment

Downloads

Reviews

Those belong elsewhere.

---

# ORDER MODULE

Folder

modules/order

Purpose

Commercial Transaction

Owns

Create Order

Order Items

Subtotal

Coupon

Discount

Tax

Grand Total

Order Status

Payment Status

Stripe Session Reference

Order History

Future Features

Retry Payment

Admin Notes

Manual Payment

Order Timeline

Order Export

Never Own

Invoice

Purchase

Book Ownership

Review Permission

---

# PAYMENT MODULE

Folder

modules/payment

Purpose

Payment Gateway Integration

Current Responsibilities

Stripe Checkout

Webhook Verification

Payment Success

Payment Failure

Payment Pending

Payment Metadata

Future Responsibilities

Payment Retry

Manual Capture

Payment Analytics

Never Own

Invoices

Books

Reviews

Downloads

Payment module only verifies money.

Nothing else.

---

# PURCHASE MODULE

Folder

modules/purchase

Purpose

Ownership

This is the most important business module.

Purchase means

User owns the product.

Current Responsibilities

Create Purchase

Validate Purchase

Purchased Books

Ownership Lookup

Purchase History

Future Responsibilities

Gift Purchase

Bundle Purchase

Enterprise Purchase

Subscription Purchase

Never allow frontend to bypass Purchase validation.

Purchase is the source of truth.

---

# MY BOOK MODULE

Folder

modules/my-book

Purpose

Purchased Library

Responsibilities

Return Purchased Books

Reader Access

Download Access

Book Availability

Future

Recently Read

Bookmarks

Reading Progress

Favorites

Never return unpaid books.

---

# DOWNLOAD MODULE

Purpose

Secure Digital Delivery

Responsibilities

Generate Download

Validate Purchase

Protect PDF

Track Download

Future

Download Limits

Watermark

Signed URLs

Temporary URLs

Never expose raw storage paths.

---

# INVOICE MODULE

Purpose

Financial Record

Responsibilities

Invoice Number

Invoice PDF

Invoice Download

Invoice Search

Invoice History

Future

Tax Invoice

Business Invoice

Refund Invoice

Credit Note

Never regenerate historical invoices.

Invoices are immutable.

---

# REVIEW MODULE

Purpose

Community Feedback

Responsibilities

Rating

Review

Approval

Moderation

Review Summary

Average Rating

Future

Helpful Votes

Images

Replies

Pinned Reviews

Review Reporting

Current Business Rule

Purchase Required

↓

Pending

↓

Admin Approval

↓

Public Review

Never bypass Admin approval.

---

# ASSESSMENT MODULE

Purpose

Retirement Readiness

Responsibilities

Questions

Answers

Scoring

History

Recommendations

Future

Assessment Comparison

AI Suggestions

Progress Charts

Assessment Reports

This module is completely independent.

---

# COUPON MODULE

Purpose

Discount System

Responsibilities

Validate Coupon

Discount

Usage Count

Expiration

Activation

Future

Referral Coupons

Bulk Coupons

Automatic Coupons

Campaign Coupons

Coupons affect Orders only.

Never Purchases.

---

# REFUND MODULE

Purpose

Refund Lifecycle

Responsibilities

Refund Request

Refund Approval

Refund Rejection

Stripe Refund

Future

Partial Refund

Automatic Refund

Refund Analytics

Current Frontend

Refund UI intentionally hidden.

Backend already supports future implementation.

---

# ANALYTICS MODULE

Purpose

Business Intelligence

Responsibilities

Revenue

Orders

Downloads

Users

Books

Reviews

Charts

Future

Sales Forecast

Customer Lifetime Value

Conversion Rate

Revenue Trends

Analytics is Read Only.

Never modify business data.

---

# DASHBOARD MODULE

Purpose

Dashboard APIs

Responsibilities

Overview

Statistics

Recent Activity

Charts

Cards

Widgets

Future

Real-time Dashboard

Notifications

Growth Metrics

Dashboard aggregates.

It never owns data.

---

# UPLOAD MODULE

Purpose

Cloudinary Integration

Responsibilities

Upload

Delete

Replace

Profile Images

Book Covers

Book PDFs

Future

Video

Audio

Multiple Files

Upload module should never contain business logic.

---

# MODULE COMMUNICATION

Correct

Order Service

↓

Payment Service

↓

Purchase Service

↓

Invoice Service

↓

My Book

↓

Review

Incorrect

Order Repository

↓

Invoice Repository

Repositories should never communicate.

Services coordinate modules.

---

# CROSS MODULE RULES

Services may call Services.

Repositories never call Repositories.

Controllers never call Repositories.

Routes never call Services directly without Controller.

Maintain strict layer boundaries.

---

# FEATURE EXTENSION STRATEGY

When adding a feature

Step 1

Find the owner module.

Step 2

Read

Routes

Controller

Service

Repository

Validation

Model

Step 3

Understand existing implementation.

Step 4

Extend existing code.

Never create duplicate APIs.

Never create

OrderV2

ReviewServiceNew

PaymentService2

BookRepositoryFinal

Never.

---

# SAFE MODULES TO EXTEND

Books

Reviews

Dashboard

Analytics

Profile

Orders

Assessment

These modules are safe for feature expansion.

---

# HIGH RISK MODULES

Better Auth

Payment

Stripe Webhook

Purchase

Invoice

Download

Changing these may affect the entire platform.

Only modify with full understanding.

---

# CODING DECISION TREE

Need Business Rule?

↓

Service

Need Database?

↓

Repository

Need Validation?

↓

Validation Layer

Need Endpoint?

↓

Routes

Need Response?

↓

Controller

Need Schema?

↓

Model

Always place code in the correct layer.

---

# FINAL ENGINEERING PRINCIPLE

Every backend module already has a clear owner.

Respect ownership.

Respect architecture.

Reuse existing code.

Extend existing modules.

Never duplicate.

Never redesign.

Build as if you are continuing another Senior Engineer's work—not replacing it.

---

End of Chapter 03D

# Chapter 04
# Complete API Contracts, Business Flow & System Integration

Version: 1.0

---

# Overview

This chapter explains how every frontend feature communicates with the backend.

It also explains

• API ownership
• Business flow
• Module interaction
• Frontend integration
• React Query lifecycle
• Payment lifecycle
• Purchase lifecycle

This chapter is the source of truth for all future integrations.

---

# SYSTEM ARCHITECTURE

Frontend

↓

Feature Hook

↓

Feature API

↓

Express Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

MongoDB

↓

Repository

↓

Service

↓

Controller

↓

Frontend

Never skip this architecture.

---

# BOOK DISCOVERY FLOW

User

↓

Book Store

↓

GET Public Books

↓

Book List

↓

Book Details

↓

Buy Now

The Book module never knows

Payment

Purchase

Invoice

Download

Those belong to other modules.

---

# BOOK DETAILS FLOW

Frontend

Book Details Page

↓

GET Public Book

↓

Display Information

↓

Reviews

↓

Review Summary

↓

Purchase Status (optional)

↓

Buy Now

Business Rules

Anyone can view books.

Only authenticated users can purchase.

Only purchased users can review.

---

# PURCHASE FLOW

User

↓

Buy Now

↓

Create Order API

↓

Order Created

↓

Stripe Checkout Session Created

↓

Frontend Redirects

↓

Stripe Hosted Checkout

↓

Webhook

↓

Payment Verified

↓

Update Order

↓

Create Purchase

↓

Generate Invoice

↓

Unlock Book

↓

My Books

↓

Download Available

This is the most important business flow.

Never bypass it.

---

# PAYMENT FLOW

Frontend

↓

POST Create Order

↓

Receive Checkout URL

↓

Redirect

↓

Stripe

↓

Webhook

↓

Backend Verification

↓

Update Payment Status

↓

Generate Purchase

↓

Generate Invoice

↓

Success Page

Never trust frontend payment success.

Only Stripe Webhook can confirm payment.

---

# ORDER FLOW

Frontend

↓

My Orders

↓

Order List API

↓

Order Details API

↓

Pending Order

↓

Retry Payment

↓

Paid Order

↓

Invoice

↓

Purchased Book

Business Rules

Orders are payment records.

Orders are NOT ownership.

---

# PENDING PAYMENT FLOW

Create Order

↓

Payment Pending

↓

Pending Order Card

↓

Continue Payment

↓

Stripe

↓

Webhook

↓

Purchase Created

↓

Invoice Generated

↓

Books Unlocked

Pending orders must never unlock books.

---

# FAILED PAYMENT FLOW

Create Order

↓

Stripe Failure

↓

Failed Payment

↓

Order Updated

↓

Retry Payment

↓

No Purchase

↓

No Invoice

↓

No Download

---

# PURCHASE FLOW

Payment Success

↓

Purchase Created

↓

Ownership Granted

↓

Book Available

↓

Download Enabled

↓

Review Enabled

Purchase is the only ownership source.

Never use Orders.

---

# MY BOOKS FLOW

Frontend

↓

GET My Books

↓

Purchased Books

↓

Read

↓

Download

↓

Review

Never display unpaid books.

---

# DOWNLOAD FLOW

User

↓

Download Book

↓

Validate Purchase

↓

Generate Secure URL

↓

Return File

↓

Track Download

Never expose raw storage.

---

# INVOICE FLOW

Payment Success

↓

Invoice Generated

↓

Invoice Stored

↓

Invoice Listed

↓

Invoice Download

Invoices are immutable.

Never edit invoices.

---

# REVIEW FLOW

Book Purchased

↓

Review Form

↓

POST Review

↓

Pending

↓

Admin Approval

↓

Approved

↓

Public Reviews

Rejected reviews remain hidden.

---

# PROFILE FLOW

Authentication

↓

Profile

↓

Update Information

↓

Update Password

↓

Link Google Account

↓

Linked Accounts

↓

Profile Updated

Profile updates must invalidate session cache.

---

# PASSWORD FLOW

Email Login User

↓

Change Password

OR

Forgot Password

↓

Reset Password

Google-only users cannot change password until password login is linked.

---

# LINK ACCOUNT FLOW

Existing Email User

↓

Connect Google

↓

Linked Accounts

↓

Future Login

↓

Email OR Google

↓

Same Account

Never create duplicate users.

---

# ASSESSMENT FLOW

Assessment

↓

Questions

↓

Submission

↓

Scoring

↓

History

↓

Results

↓

Recommendations

Assessment is independent.

No dependency on Orders.

---

# ADMIN BOOK FLOW

Admin

↓

Books

↓

Create

↓

Upload Cover

↓

Upload PDF

↓

Publish

↓

Users Can Purchase

Draft books remain hidden.

---

# ADMIN REVIEW FLOW

Admin

↓

Pending Reviews

↓

Approve

↓

Public Review

Reject

↓

Hidden Review

Only Admin controls visibility.

---

# ADMIN ORDER FLOW

Admin

↓

Orders

↓

View Details

↓

Payment Status

↓

Order Status

↓

Invoice

Admin never manually creates purchases.

---

# ADMIN USER FLOW

Admin

↓

Users

↓

View

↓

Deactivate

↓

Activate

↓

Role Management

Never delete financial history.

---

# REACT QUERY FLOW

Page

↓

Hook

↓

API

↓

Backend

↓

Cache

↓

Component

Every mutation must invalidate affected queries.

---

# QUERY INVALIDATION

Profile Updated

↓

Profile

↓

Session

Review Submitted

↓

Book Reviews

↓

Review Summary

↓

My Reviews

Payment Success

↓

Orders

↓

Purchases

↓

Invoices

↓

My Books

Dashboard Refresh

↓

Dashboard

↓

Analytics

Never forget invalidation.

---

# LOADING STRATEGY

Every page must support

Loading

Error

Success

Empty

Unauthorized

Forbidden

Payment Failure

Network Failure

Never leave blank pages.

---

# FILE OWNERSHIP

Books

↓

features/books

Orders

↓

features/orders

Profile

↓

features/profile

Payments

↓

features/payments

Reviews

↓

features/reviews

Dashboard

↓

features/dashboard

Never place business logic inside shared components.

---

# SAFE FRONTEND FILES

Usually safe

Feature Components

Hooks

API

Dashboard Pages

Cards

Forms

Profile Components

Orders Components

Review Components

---

# HIGH RISK FRONTEND FILES

Root Layout

Providers

Query Client

Site Layout

Dashboard Layout

Authentication

Endpoint Constants

Modify only if absolutely necessary.

---

# SAFE BACKEND FILES

Controllers

Services

Repositories

Validation

Analytics

Dashboard

Books

Orders

Reviews

Profile

---

# HIGH RISK BACKEND FILES

Better Auth

Stripe Webhook

Payment Service

Purchase Service

Invoice Service

Download Security

Modify only after fully understanding existing implementation.

---

# DEVELOPMENT WORKFLOW

Every feature must follow

Understand

↓

Search Existing Code

↓

Reuse

↓

Extend

↓

Test

↓

Verify

↓

Complete

Never implement before understanding.

---

# FINAL PROJECT PRINCIPLE

Retirement Waypoint already has a mature architecture.

Every implementation should feel like it was written by the same engineering team.

Architecture consistency is more important than writing more code.

Reuse.

Extend.

Preserve.

Never redesign.

Never duplicate.

Never break existing business rules.

---

End of Chapter 04

# Chapter 05
# Engineering Standards, Coding Guidelines & File Modification Policy

Version: 1.0

---

# Purpose

This chapter defines how development must be performed inside this project.

Understanding the architecture is not enough.

Every implementation must also follow the existing engineering style.

The goal is not only to write working code.

The goal is to write code that feels like it was written by the original engineering team.

Architecture consistency is more important than implementation speed.

---

# 1. General Development Philosophy

Before writing a single line of code

STOP

Understand the feature.

Understand existing implementation.

Understand related modules.

Understand business rules.

Understand current UI.

Only then start implementation.

Never code first.

Think first.

---

# 2. Existing Code Comes First

This project already contains thousands of lines of code.

Never assume something doesn't exist.

Before creating anything new

Search the project.

Ask yourself

Does this already exist?

Can this be reused?

Can this be extended?

Can I avoid duplicate code?

If YES

Reuse.

Never recreate.

---

# 3. Existing Architecture Must Never Change

Never

Rename folders

Move folders

Reorganize project

Replace libraries

Replace architecture

Replace authentication

Replace React Query

Replace Stripe

Replace Better Auth

Replace layouts

Replace providers

This project already has an established architecture.

Respect it.

---

# 4. Before Creating A File

Always search.

Examples

Need Order Card?

Search

OrderCard

Need Modal?

Search

Dialog

Sheet

Modal

Need Loader?

Search

Skeleton

Loader

Spinner

Never create duplicate files.

---

# 5. File Modification Policy

When modifying an existing file

Read the entire file first.

Understand its responsibility.

Modify only the necessary lines.

Never rewrite the entire file.

Never change formatting unnecessarily.

Never rename exports.

Never rename functions without reason.

Never reorder imports just for style.

Minimize the diff.

---

# 6. Minimal Change Principle

Good

Add required logic.

Keep everything else untouched.

Bad

Rewrite 400 lines to change 10 lines.

The project should evolve, not restart.

---

# 7. Never Break Existing Features

Every implementation must preserve

Authentication

Payment

Orders

Invoices

Purchases

Downloads

Reviews

Dashboard

Books

Profile

If unrelated functionality is working

Leave it untouched.

---

# 8. Single Responsibility Principle

One file

One responsibility.

One component

One UI responsibility.

One hook

One business responsibility.

One service

One business domain.

Avoid "God Components".

Avoid "God Services".

---

# 9. Naming Convention

Components

PascalCase

Hooks

camelCase

Utilities

camelCase

Constants

UPPER_CASE

Types

PascalCase

Files should always have meaningful names.

Never create

temp.js

test2.js

newFile.js

final.js

copy.js

---

# 10. Import Convention

Group imports consistently.

Example

React

↓

Next

↓

Third Party Libraries

↓

Shared Components

↓

Feature Components

↓

Hooks

↓

Utilities

↓

Styles

Never create random import order.

---

# 11. Component Rules

Components render UI.

Hooks manage behaviour.

API files communicate.

Services implement business rules.

Repositories access database.

Never mix responsibilities.

---

# 12. Function Size

Prefer small functions.

Large functions become difficult to maintain.

Extract reusable logic.

Avoid deeply nested code.

---

# 13. Duplicate Code

Never duplicate

Business logic

Validation

API calls

Components

Utility functions

Always extract reusable logic.

---

# 14. React Query Rules

Never manually cache server data.

Always reuse existing query keys.

Invalidate related queries after mutations.

Do not bypass React Query.

---

# 15. API Rules

Never hardcode endpoints.

Always use API_ENDPOINTS.

Never call axios inside components.

Always go through feature API layer.

---

# 16. Error Handling

Every implementation must handle

Loading

Empty

Success

Failure

Unauthorized

Forbidden

Network Error

Validation Error

Payment Error

Never leave unhandled states.

---

# 17. Responsive Rule

Every page must support

Mobile

Tablet

Laptop

Desktop

Test all layouts.

Never assume desktop only.

---

# 18. Design Consistency

Use existing

Colors

Typography

Spacing

Buttons

Cards

Animations

Icons

Do not invent a new visual language.

---

# 19. Performance Rules

Avoid unnecessary re-renders.

Use React Query cache.

Use Next/Image.

Use pagination.

Avoid fetching unnecessary data.

Only optimize when needed.

---

# 20. Safe Files

Usually safe to modify

Feature Components

Feature Hooks

Feature APIs

Dashboard Pages

Forms

Cards

Lists

Tables

Profile Pages

Order Pages

Book Pages

Review Pages

---

# 21. High Risk Files

Modify only after understanding completely

Root Layout

Providers

Query Client

Cart Context

Authentication

Better Auth Configuration

Stripe Webhook

Payment Service

Purchase Service

Invoice Service

Download Service

API Client

Endpoint Constants

Dashboard Layout

Site Layout

---

# 22. Do Not Touch List

Unless explicitly required

Do NOT

Rename Routes

Rename APIs

Rename Models

Rename Database Fields

Rename Query Keys

Replace Folder Structure

Replace Design System

Replace Authentication

Replace Stripe

Replace Better Auth

Replace React Query

Introduce Redux

Introduce Zustand

Introduce MobX

Rewrite Existing Modules

---

# 23. Feature Development Workflow

Every task must follow this exact sequence.

Step 1

Understand the feature request.

↓

Step 2

Locate the related frontend feature.

↓

Step 3

Locate the related backend module.

↓

Step 4

Read existing implementation.

↓

Step 5

Reuse existing components.

↓

Step 6

Reuse existing APIs.

↓

Step 7

Implement only required changes.

↓

Step 8

Verify responsive behaviour.

↓

Step 9

Verify loading, empty and error states.

↓

Step 10

Verify no existing feature is broken.

Never skip steps.

---

# 24. Regression Prevention Checklist

Before completing any task verify

Authentication still works.

Orders still work.

Payments still work.

Purchases still work.

Downloads still work.

Reviews still work.

Dashboard still works.

Profile still works.

Books still work.

Invoices still work.

No existing functionality should break.

---

# 25. Code Review Checklist

Before considering work complete ask

Did I reuse existing code?

Did I preserve architecture?

Did I modify only necessary files?

Did I avoid duplicate logic?

Did I follow existing naming?

Did I preserve UI consistency?

Did I avoid unnecessary refactoring?

Did I maintain responsive design?

Did I preserve business rules?

If any answer is NO

The implementation is not complete.

---

# 26. Codex Execution Rules

Before writing code

Read related files.

Search existing implementation.

Understand architecture.

Never guess.

Never invent new business logic.

Never create duplicate APIs.

Never create duplicate hooks.

Never create duplicate services.

Always extend existing implementation.

---

# 27. Final Engineering Principle

This project is already production-oriented.

Your responsibility is not to redesign it.

Your responsibility is to continue it.

Write code as if you joined an existing senior engineering team.

Every new feature should feel indistinguishable from the existing codebase.

Always

Understand

Reuse

Extend

Preserve

Never

Rewrite

Duplicate

Refactor unnecessarily

Break existing functionality

---

End of Chapter 05

# Chapter 06
# Complete Admin Dashboard Blueprint

Version: 1.0

---

# Purpose

This chapter defines the complete Admin Dashboard roadmap.

The Admin Dashboard is the control center of the Retirement Waypoint platform.

Every admin feature must reuse the existing backend architecture.

Never implement duplicate business logic.

Always consume existing backend APIs.

---

# Admin Dashboard Architecture

Current Route

app/(dashboard)/(admin-dashboard)/admin

Current Files

layout.jsx

page.jsx

Future pages will live inside this route.

Never change the existing routing structure.

---

# Admin Layout Responsibilities

The Admin Layout already handles

Authentication

Authorization

Navigation

Dashboard Shell

Sidebar

Header

Protected Routes

Every admin page must render inside this layout.

Never recreate another dashboard layout.

---

# Sidebar Structure

Current sidebar should eventually contain

Dashboard

Books

Orders

Users

Reviews

Coupons

Refunds

Analytics

Settings

Logout

Future modules may be added without restructuring the sidebar.

---

# Dashboard Page

Route

/admin

Purpose

Platform overview.

Widgets

Total Revenue

Total Orders

Total Books

Published Books

Draft Books

Archived Books

Total Users

Total Purchases

Downloads

Pending Reviews

Pending Refunds

Recent Orders

Recent Reviews

Revenue Chart

Sales Chart

Quick Actions

Backend

Analytics Module

Dashboard Module

Loading State

Skeleton Cards

Empty State

Zero Statistics

Permission

Admin only.

---

# Books Page

Route

/admin/books

Purpose

Manage digital products.

Functions

Book List

Search

Filter

Pagination

Create

Edit

Archive

Publish

Delete (Soft)

View Details

Backend

Book Module

Required APIs

Get Books

Create Book

Update Book

Publish

Archive

Delete

Future

Bulk Actions

Categories

Collections

Tags

Import Export

---

# Create Book Page

Route

/admin/books/create

Purpose

Add a new digital product.

Sections

Book Information

Pricing

Book Cover

PDF Upload

Status

Preview

Validation

Required Fields

Title

Description

Price

Cover

PDF

Backend

Upload Module

Book Module

---

# Edit Book Page

Route

/admin/books/:id/edit

Purpose

Modify existing books.

Rules

Preserve Slug

Preserve History

Replace Files Safely

Update Metadata

Never create duplicate books.

---

# Orders Page

Route

/admin/orders

Purpose

Monitor all transactions.

Features

Order List

Search

Status Filter

Payment Filter

Date Filter

Pagination

Order Details

Backend

Order Module

Analytics Module

Future

Export CSV

Print

Manual Notes

---

# Order Details

Route

/admin/orders/:id

Purpose

View complete order lifecycle.

Sections

Customer

Purchased Books

Order Timeline

Payment Status

Order Status

Invoice

Purchase Record

Actions

Update Status

Retry Payment

Future

Admin Notes

---

# Users Page

Route

/admin/users

Purpose

Manage platform users.

Features

Search

Filter

Pagination

User Details

Deactivate

Activate

Role Management

Backend

Auth Module

Future

Activity History

Purchases

Downloads

Assessments

---

# User Details

Route

/admin/users/:id

Purpose

View complete customer profile.

Sections

Profile

Orders

Purchases

Invoices

Downloads

Reviews

Assessments

Backend

Auth

Order

Purchase

Invoice

Review

Assessment

---

# Reviews Page

Route

/admin/reviews

Purpose

Moderate reviews.

Tabs

Pending

Approved

Rejected

Actions

Approve

Reject

Delete

Backend

Review Module

Business Rule

Approval controls visibility.

Never bypass approval.

---

# Coupons Page

Route

/admin/coupons

Purpose

Manage promotional campaigns.

Features

Coupon List

Create

Update

Activate

Deactivate

Usage History

Expiration

Backend

Coupon Module

Future

Campaign Analytics

---

# Refund Page

Route

/admin/refunds

Purpose

Manage refund requests.

Current Backend

Already Exists.

Current Frontend

Hidden.

Future Features

Refund Queue

Approve

Reject

Reason

Timeline

Backend

Refund Module

---

# Analytics Page

Route

/admin/analytics

Purpose

Business Intelligence.

Charts

Revenue

Sales

Books

Orders

Users

Downloads

Reviews

Backend

Analytics Module

Dashboard Module

Future

Custom Date Range

Export

Forecast

---

# Settings Page

Route

/admin/settings

Purpose

Application configuration.

Possible Sections

General

Branding

SMTP

Payment

Security

Cloudinary

Platform Settings

Current Status

Future implementation.

---

# Notification Center

Future

Admin notifications.

Examples

New Orders

Pending Reviews

Refund Requests

Payment Failures

---

# Search Strategy

Every major page should support

Search

Filter

Pagination

Sorting

Status

Date Range

Never return thousands of records.

---

# Table Standards

Admin tables should support

Pagination

Sorting

Searching

Filtering

Bulk Selection (Future)

Loading

Empty State

Error State

Responsive Layout

---

# Card Standards

Cards should reuse

Current project design language.

Rounded

Glass

Soft Shadow

Luxury Style

No new design language.

---

# Forms

All forms must support

Validation

Loading

Error

Success

Reset

Cancel

Never allow duplicate submissions.

---

# Permissions

Every admin page requires

Admin Authentication

Admin Authorization

Never rely only on frontend protection.

Backend remains the source of truth.

---

# React Query

Every admin page should have

Dedicated Hook

Dedicated API

Dedicated Query Keys

Proper Cache Invalidation

Never fetch directly inside components.

---

# File Organization

Example

features/admin/books

↓

api

hooks

components

schemas

utils

Each admin feature follows the same architecture as user features.

---

# Backend Mapping

Dashboard

↓

Dashboard Module

Analytics

↓

Analytics Module

Books

↓

Book Module

Orders

↓

Order Module

Users

↓

Auth Module

Reviews

↓

Review Module

Coupons

↓

Coupon Module

Refunds

↓

Refund Module

Settings

↓

Future Module

Never bypass backend architecture.

---

# Feature Completion Checklist

Every admin page must have

Loading

Empty State

Error State

Responsive Design

Pagination

Search

Filters

Permission Checks

Toast Notifications

React Query

Business Rule Compliance

No duplicate code

---

# Future Expansion

Potential future modules

CMS

Blog

Email Campaign

Support Tickets

Affiliates

Reports

Audit Logs

Feature Flags

These should become new modules instead of modifying unrelated modules.

---

# Admin Development Order

Recommended implementation order

1. Dashboard

2. Books

3. Orders

4. Order Details

5. Users

6. User Details

7. Reviews

8. Coupons

9. Analytics

10. Settings

11. Refunds

This sequence minimizes dependency issues and allows incremental testing.

---

# Final Principle

The Admin Dashboard is not a separate application.

It is another interface over the same backend architecture.

Every page must reuse existing APIs, services, business rules, React Query hooks, and UI design.

Never duplicate backend logic.

Never create parallel APIs.

Always extend the existing system.

---

End of Chapter 06

# Chapter 07
# Codex AI Operating Manual & Execution Protocol

Version: 1.0

---

# Purpose

This document defines how Codex must operate while working on the Retirement Waypoint project.

This is NOT merely a coding guideline.

This is the operating protocol that Codex must follow before, during and after every implementation.

Architecture consistency is more important than implementation speed.

Business correctness is more important than writing more code.

Never optimize for the amount of code written.

Always optimize for maintainability.

---

# PRIMARY OBJECTIVE

Your responsibility is NOT to redesign this application.

Your responsibility is to continue development exactly as an existing Senior Software Engineer on the project would.

Every implementation must feel like it was written by the original engineering team.

---

# CORE PRINCIPLES

Always

Understand

Reuse

Extend

Preserve

Never

Guess

Duplicate

Rewrite

Refactor unnecessarily

Break existing functionality

Invent new architecture

---

# EXECUTION PIPELINE

Every task MUST follow this sequence.

STEP 1

Read the request completely.

↓

STEP 2

Understand the business objective.

↓

STEP 3

Locate related frontend feature.

↓

STEP 4

Locate related backend module.

↓

STEP 5

Read existing implementation.

↓

STEP 6

Search for reusable components.

↓

STEP 7

Search for reusable hooks.

↓

STEP 8

Search for reusable APIs.

↓

STEP 9

Search for reusable services.

↓

STEP 10

Implement the minimum required change.

↓

STEP 11

Verify existing functionality.

↓

STEP 12

Complete task.

Never skip any step.

---

# THINK BEFORE CODING

Before writing code ask

What module owns this feature?

Where does this business logic belong?

Does this API already exist?

Does this component already exist?

Does this hook already exist?

Can this be extended?

Only then begin implementation.

---

# SEARCH STRATEGY

Before creating anything

Search the project.

Components

Hooks

Services

Repositories

Utilities

Validation

Routes

Models

If something already exists

Reuse it.

Never duplicate.

---

# FILE MODIFICATION STRATEGY

Before editing

Read the entire file.

Understand responsibility.

Understand dependencies.

Modify only necessary lines.

Preserve formatting.

Preserve exports.

Preserve coding style.

Never rewrite complete files.

---

# ARCHITECTURE PROTECTION

Never replace

Authentication

Better Auth

React Query

Stripe

Cloudinary

Layouts

Providers

Folder Structure

API Architecture

Business Rules

These are protected parts of the system.

---

# BUSINESS LOGIC PROTECTION

Business logic belongs only inside Services.

Never move business logic into

Components

Controllers

Repositories

Routes

Validation

Maintain existing architecture.

---

# DATABASE RULES

Database access belongs only inside Repository.

Never query MongoDB from

Controller

Route

Frontend

Validation

Keep database access isolated.

---

# FRONTEND RULES

Never fetch data directly inside components.

Always

Hook

↓

API

↓

Backend

↓

React Query

↓

Component

Never bypass React Query.

---

# BACKEND RULES

Always

Route

↓

Validation

↓

Controller

↓

Service

↓

Repository

↓

Database

Never skip layers.

---

# UI CONSISTENCY

Every new page must match

Typography

Spacing

Cards

Buttons

Animations

Colors

Icons

Responsive behavior

Never introduce another design language.

---

# RESPONSIVE POLICY

Every implementation must work on

Mobile

Tablet

Laptop

Desktop

Never assume desktop only.

---

# PERFORMANCE POLICY

Reuse cache.

Reuse hooks.

Reuse components.

Use pagination.

Use lazy loading where appropriate.

Optimize only when necessary.

---

# PAYMENT POLICY

Never trust frontend.

Only backend confirms payment.

Only Stripe Webhook creates Purchase.

Only Purchase unlocks Books.

Never bypass payment flow.

---

# REVIEW POLICY

Only purchased users may review.

Reviews remain pending.

Admin approval required.

Never expose pending reviews publicly.

---

# PURCHASE POLICY

Purchase equals ownership.

Order does NOT equal ownership.

Payment does NOT equal ownership.

Invoice does NOT equal ownership.

Purchase is the single source of truth.

---

# FILE CREATION POLICY

Create a new file only when

The feature truly requires it.

Do not create

HelperFinal.js

Utils2.js

NewService.js

Copy.js

Temp.js

If a file exists

Extend it.

---

# COMPONENT POLICY

One component

One responsibility.

Prefer composition over duplication.

Avoid huge components.

Split only when necessary.

---

# REFACTOR POLICY

Never refactor working code unless explicitly requested.

Do not rename

Variables

Functions

Files

Folders

Exports

just because another naming style seems better.

Stability is preferred over perfection.

---

# CODE STYLE POLICY

Write code that is

Readable

Maintainable

Consistent

Predictable

Prefer clarity over cleverness.

---

# ERROR HANDLING POLICY

Every feature must support

Loading

Empty

Error

Unauthorized

Forbidden

Network Failure

Validation Error

Payment Failure

Never leave unfinished states.

---

# TESTING CHECKLIST

Before considering work complete verify

Authentication still works.

Books still work.

Orders still work.

Payments still work.

Purchases still work.

Invoices still work.

Reviews still work.

Downloads still work.

Dashboard still works.

Profile still works.

No regression introduced.

---

# DEFINITION OF DONE

A task is NOT complete simply because it compiles.

A task is complete only when

Business rules are respected.

Architecture is preserved.

No duplicate logic exists.

Responsive design works.

Loading states exist.

Error states exist.

React Query integration works.

API integration works.

No unrelated files were modified.

No existing features broke.

---

# WHEN TO ASK QUESTIONS

Ask only when

Business requirements are ambiguous.

Required backend API does not exist.

User requirements conflict with architecture.

Critical information is missing.

Otherwise

Implement confidently.

---

# WHEN NOT TO ASK QUESTIONS

Do not ask questions for

Existing project conventions.

Existing architecture.

Existing APIs.

Existing UI patterns.

Search first.

Understand first.

Then implement.

---

# OUTPUT EXPECTATION

Every completed task should

Reuse existing code.

Modify minimal files.

Preserve architecture.

Preserve business rules.

Feel native to the project.

No unnecessary comments.

No unnecessary files.

No unnecessary refactoring.

---

# GOLDEN RULES

1.
Never duplicate business logic.

2.
Never create parallel architecture.

3.
Always extend existing implementation.

4.
Always search before creating.

5.
Always preserve business rules.

6.
Always preserve design consistency.

7.
Always preserve backend architecture.

8.
Always preserve frontend architecture.

9.
Minimize code changes.

10.
Think like an existing Senior Engineer—not a code generator.

---

# FINAL MISSION

You are joining an existing engineering team.

Your goal is not to showcase your own architecture.

Your goal is to seamlessly continue the existing Retirement Waypoint codebase.

Every commit should feel like it was written by the original developers.

Respect the architecture.

Respect the business rules.

Respect the codebase.

Build with discipline.

---

# END OF DOCUMENT

This document serves as the official engineering handbook for the Retirement Waypoint project.

It defines the architecture, development philosophy, engineering standards, business rules, frontend structure, backend structure, admin roadmap, and AI execution protocol.

Any future implementation must follow this handbook unless explicitly instructed otherwise by the project owner.

Version 1.0 Complete

# AI EXECUTION AGREEMENT

By following this document, the AI agent agrees to:

✓ Preserve the architecture

✓ Preserve business rules

✓ Reuse existing code

✓ Avoid duplicate implementations

✓ Modify minimum files

✓ Respect frontend architecture

✓ Respect backend architecture

✓ Respect design consistency

✓ Respect coding conventions

✓ Never perform unnecessary refactoring

✓ Never introduce breaking changes