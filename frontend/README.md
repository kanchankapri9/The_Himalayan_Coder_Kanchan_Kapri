# FestFlow Frontend

This frontend is built with `React + Vite` and is being developed phase by phase in a beginner-friendly way.

The goal is to create the UI for a hyper-local event ticketing platform where:

- attendees can explore, save, and register for events
- organizers can create events and manage attendance
- event passes are generated with QR codes

This README explains the frontend plan in detail so you always know what to build next.

## Tech Used

- `React`
- `Vite`
- `Material UI`
- `Font Awesome`
- `React Router DOM`
- `Axios`

## Current Folder Structure

```txt
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   └── layout/
│   ├── pages/
│   │   └── public/
│   ├── styles/
│   ├── theme/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Why This Structure Is Good

- `components/` stores reusable UI parts
- `pages/` stores route-level screens
- `layout/` stores shared UI like navbar and footer
- every main component has its own CSS file, which keeps styling easy to understand
- `theme/` keeps Material UI colors and typography in one place

## Phase 1: Project Foundation

This is the phase started now.

### Main goal

Create a clean frontend base before building real attendee and organizer features.

### What is included in Phase 1

- install frontend libraries
- set up Material UI
- set up Font Awesome icons
- set up React Router
- create app layout
- create navbar and footer
- create starter public pages
- create beginner-friendly folder structure
- create separate CSS files for components

### Files created in Phase 1

- `src/theme/theme.js`
- `src/styles/global.css`
- `src/components/layout/*`
- `src/components/common/*`
- `src/components/home/*`
- `src/pages/public/*`

### Why Phase 1 matters

If this phase is skipped, later pages become messy. A clean structure now saves time in every later phase.

### What to learn in this phase

- how routing works
- how components are divided
- how to use Material UI with custom CSS
- how to keep reusable code separate from page code

## Phase 2: Public Event Discovery UI

### Main goal

Build the pages that regular users see before login.

### Pages to build

- homepage
- explore events page
- event details page

### Features to add

- event cards
- search bar
- filter section
- location section
- category chips
- price and date display

### How to approach it

1. first build static event cards using dummy data
2. then create filter UI without backend
3. then connect it to event APIs later

### Why this order is useful

It helps you finish visible UI quickly and avoids waiting for backend.

## Phase 3: Authentication UI

### Main goal

Build simple and clean login and registration screens.

### Pages to build

- login page
- register page
- OAuth success page later

### Features to add

- attendee and organizer role selection
- email and password fields
- Google login button
- GitHub login button

### Important note

At first, you only build the UI. Later you connect it to:

- JWT login
- bcrypt-based password auth handled by backend
- Google auth
- GitHub auth

## Phase 4: Attendee Dashboard UI

### Main goal

Build the pages an attendee will use after login.

### Pages to build

- attendee dashboard
- saved events
- my registrations
- pass details

### Features to show

- registered event cards
- pending approval state
- approved ticket state
- rejected request state
- QR pass preview
- add to calendar button

### Suggested workflow

1. build dashboard layout
2. create cards for registered events
3. create pass card UI
4. create empty state UI

## Phase 5: Organizer Dashboard UI

### Main goal

Build the pages used by college fest committees and event organizers.

### Pages to build

- organizer dashboard
- create event
- manage event
- registrations page
- check-in page
- analytics page

### Features to add

- event creation form
- ticket type form
- approval toggle
- attendee request table
- QR scan placeholder
- basic charts and summary cards

### Suggested workflow

1. start with dashboard cards
2. build event form next
3. then build approval and registration tables
4. then build analytics UI

## Phase 6: API Integration

### Main goal

Connect frontend pages to backend endpoints.

### API files to create later

- `src/api/authApi.js`
- `src/api/eventApi.js`
- `src/api/bookingApi.js`
- `src/api/organizerApi.js`
- `src/api/analyticsApi.js`

### What to connect

- fetch all events
- fetch single event
- login and register
- create event
- approve or reject requests
- fetch pass details
- fetch organizer stats

### Best practice

- keep API logic outside components
- use loading state on each page
- use error state on each page
- use dummy data first if backend is delayed

## Phase 7: Maps and Hyper-Local Experience

### Main goal

Make the product feel local and location-aware.

### Features to add

- location detect UI
- manual city selection
- nearby event labels
- venue map preview

### Tools later

- `Mapbox`

## Phase 8: UI Polish and Responsiveness

### Main goal

Make the project look complete and work properly on mobile too.

### Things to improve

- mobile layout
- spacing consistency
- typography consistency
- empty states
- loading states
- button hierarchy
- error messages

### Final checks

- navbar works on smaller screens
- cards do not break on mobile
- forms are easy to use
- buttons are aligned properly

## Recommended Beginner Workflow

Whenever you build a new page, follow this process:

1. create the page file
2. create the page CSS file
3. add route in `App.jsx`
4. create reusable components if needed
5. use static dummy data first
6. connect API only after UI looks correct

## Commands

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Configure API URL

Create or update `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

This frontend now expects the backend server to run on port `5000` by default.

### Create production build

```bash
npm run build
```

## What Has Been Completed Right Now

- Material UI added
- Font Awesome added
- routing added
- global theme added
- navbar created
- footer created
- landing page created
- home page created and connected to live events API
- event details page created and connected to live event API
- login UI created and connected to backend auth
- register UI created and connected to backend auth
- dark/light theme toggle added
- component-wise CSS structure started
- frontend API base URL setup added with `.env.example`

## What You Should Build Next

The best next frontend step is:

1. create `attendee dashboard layout`
2. create `my registrations` page
3. create `saved events` page
4. create `organizer dashboard layout`

That will move you smoothly into Phase 2 and Phase 3.
