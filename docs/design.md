# Project: 냠 (Nyam) - Minimalist Taste SNS

## 1. Project Overview

- **Name:** 냠 (Nyam)
- **Concept:** A minimalist travel food SNS focusing purely on 'Taste'.
- **Core Value:** "Don't write a blog post. Just show me the food and tell me how it tastes in 100 characters."
- **Target Platform:** Apps in Toss (Mobile Webview Environment), iOS/Android WebApp.
- **Tone & Manner:** Witty, Fast, Visual-first, Native-app-like feel.

## 2. Tech Stack & Architecture

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Mobile-first utility classes)
- **UI Components:** Shadcn/UI (Radix UI based) + Framer Motion (for Toss-like animations)
- **State Management:** Zustand (Lightweight store)
- **Backend/DB (Recommended):** Supabase (Postgres, Auth, Storage for images)
- **Maps:** Kakao Map API or Google Maps API (via Capacitor or Web SDK)
- **Utils:** - `exif-js` (for extracting GPS data from photos)
  - `compressorjs` (client-side image optimization before upload)

## 3. Core Features & Requirements

### A. Photo Upload & Metadata Extraction (The "Killer" Feature)

1. **Input:** User uploads a photo (Camera/Gallery).
2. **Process:** - Auto-compress image (Mobile web performance is critical).
   - Extract EXIF data (Latitude/Longitude, Date).
   - _Logic:_ If GPS data exists, auto-select the location. If not, open a map search modal.
3. **AI Tagging (Simulated or Real):** - Extract tags from image content (e.g., #Ramen, #Spicy, #Busan).
   - _Implementation:_ Use Vercel AI SDK or simple pre-defined category selection for MVP.

### B. The "Taste" Post (Content)

1. **Menu Name:** Short text input.
2. **Taste Review:** **Strict limit of 100 characters.**
   - _UX:_ Show a circular progress bar filling up as user types (Toss style).
3. **Rating:** No star ratings. Just "Good" (😋) or "Best" (🤯). Keep it positive.

### C. The Feed (Discovery)

1. **UI Layout:** Masonry Grid (Pinterest style) to emphasize visuals.
2. **Card Info:** Only shows the Photo + Menu Name + Location (City level).
3. **Interaction:** Tap to expand (Bottom Sheet modal).
   - _Expanded View:_ Photo, 100-char review, Exact Map Location, Save Button.

### D. User Profile & Archive

1. **My Map:** A map view showing pins of all the food user has uploaded/saved.
2. **Collections:** "Saved" list.

## 4. "Apps in Toss" Specific UX/UI Guidelines

- **Viewport:** strict `viewport-fit=cover`, `user-scalable=no`.
- **Navigation:**
  - Avoid browser history navigation where possible. Use Modal/Bottom Sheet for details to keep the user in the "App" flow.
  - Custom Top Navigation Bar (mimicking Toss Design System).
- **Design System (TDS Vibe):**
  - **Font:** Pretendard or System San-serif.
  - **Colors:** - Primary: Toss Blue (#0064FF) or a appetizing Orange/Red.
    - Background: Light Gray (#F2F4F6) for feed, White (#FFFFFF) for cards.
  - **Interactions:**
    - Active states on all buttons (scale down slightly on press).
    - Skeleton loaders for all images.

## 5. Directory Structure (Suggested)

/src /app /(main) # Bottom Tab Layout /feed # Main Feed /map # Map View /profile # My Page /upload # Upload Flow (Full screen modal) /detail/[id] # Post Detail /components /shared # Buttons, Inputs (TDS style) /features # FeedCard, MapView, ExifExtractor /layout # BottomNav, Header /lib /store # Zustand stores (useUploadStore, useUserStore) /utils # exif-helpers.ts, image-compression.ts /services # Supabase client & API calls

## 6. Implementation Steps for Cursor

### Step 1: Scaffold Project

- Initialize Next.js with Tailwind, TS, Shadcn/UI.
- Set up `next.config.js` for `output: 'export'` (if static) or standard Vercel deploy.
- **Important:** Add `manifest.json` for PWA capabilities.

### Step 2: Build the Upload Logic (Frontend First)

- Create a `FileUpload` component that handles:
  1. File selection.
  2. Client-side compression.
  3. `exif-js` parsing to log GPS coordinates.
- Create the 100-character Textarea with a visual counter.

### Step 3: UI Implementation

- Build the **Masonry Feed**.
- Build the **Bottom Navigation Bar** (Home, Map, Upload(+), Saved, My).
- _Style Check:_ Ensure all touch targets are >44px for mobile fingers.

### Step 4: Map Integration

- Create a component that takes `lat/lng` and renders a marker.
- _Constraint:_ Lazy load the map SDK to avoid initial page load slowness.

### Step 5: Data Binding (Supabase)

- Create tables: `users`, `posts`, `saved_posts`.
- Implement `uploadImage` storage logic.

## 7. Prompt for Logo/Icon Generation (If needed)

_Use the "icon-maker.md" system prompt with the following details:_

- **Object:** A glossy, appetizing fried egg or a burger.
- **Text:** "냠" (Nyam)
- **Character:** A small, happy figure holding a spoon.
- **Action:** Ready to dive into the food.
