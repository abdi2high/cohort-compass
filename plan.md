# StudySmarter - Collaborative Study Platform Plan

A social, gamified study platform to help students stay motivated through collaboration, tracking, and rewards.

## Scope Summary
- **User Management:** Onboarding and profiles (client-side only for MVP).
- **Study Groups:** Create/join groups by subject, group chat interface, and resource sharing.
- **Study Sessions:** Scheduling, timer, and attendance tracking.
- **Goals & Progress:** Goal setting, study hour tracking, and progress visualization.
- **Quiz Generator:** Basic quiz creation and leaderboard.
- **Gamification:** Points, badges, and streaks.

## Non-Goals
- Real-time backend sync (Supabase is not available; will use `localStorage` for persistence).
- Actual PDF/file hosting (will simulate with metadata/links).
- Email notifications (will use in-app alerts).

## Assumptions & Open Questions
- **Assumption:** Since no Supabase is available, all data will be stored in `localStorage`. Data will persist on the same browser/device only.
- **Assumption:** "Shared Notes" will be text-based or simulated links.
- **Question:** Should we include a landing page or go straight to the dashboard? *Plan: Include a simple landing/onboarding flow.*

## Affected Areas
- **Frontend:**
  - Layout (Sidebar navigation, Header)
  - Dashboard (Overview of goals, streaks, and upcoming sessions)
  - Groups (List, Detail, Chat UI, Resources)
  - Study Timer (Interactive timer with session logging)
  - Profile (Stats, Badges, Goal setting)
  - Quiz (Interface for taking and creating quizzes)
- **Data Layer:**
  - `localStorage` management for groups, sessions, and user stats.
  - Context/Hooks for global state management (auth-sim, user-data).

## Phase 1: Foundation & Layout (frontend_engineer)
- Set up routing (React Router) if needed, or a state-based navigation.
- Implement main layout with sidebar (Dashboard, Groups, Sessions, Profile).
- Create basic theme and typography.

## Phase 2: User Onboarding & Dashboard (frontend_engineer)
- Simple "Login/Signup" simulation (save name/subject to `localStorage`).
- Dashboard view: Streaks, Goal progress (charts using shadcn/chart if available or simple bars), and "Next Session" card.

## Phase 3: Groups & Collaboration (frontend_engineer)
- Group listing and search/filter.
- Group detail page: Chat UI (mock messages), Resources list (add/view note links).
- "Create Group" modal.

## Phase 4: Study Timer & Session Tracking (frontend_engineer)
- Interactive Pomodoro or stopwatch timer.
- Modal to "Join Session" or "Start Session".
- Logic to log completed hours to `localStorage`.

## Phase 5: Quizzes & Gamification (frontend_engineer)
- Quiz interface: Question/Answer flow.
- Points calculation logic.
- Badges and Leaderboard UI based on stored points.

## Phase 6: Final Polish & "Quick Fixes" (quick_fix_engineer)
- Refine CSS/animations.
- Fix any typos or UX inconsistencies.
- Ensure responsive behavior on mobile.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the core application structure, navigation, and feature modules.
2. quick_fix_engineer — Polish UI, fix minor bugs, and ensure responsive design.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1-5
- **Scope:** Build the entire functional UI including the sidebar layout, dashboard, group management, study timer, and gamification components. Use `localStorage` for all data persistence.
- **Files:** `src/App.tsx`, `src/components/`, `src/hooks/`
- **Depends on:** none
- **Acceptance criteria:** App is fully navigable; users can "create" groups, "start" timers, and see their "progress" updated in the dashboard via `localStorage`.

### 2. quick_fix_engineer
- **Phases:** 6
- **Scope:** Review the UI for polish. Correct any alignment issues, improve colors/contrast, and fix text labels.
- **Files:** `src/index.css`, various components in `src/components/`
- **Depends on:** frontend_engineer
- **Acceptance criteria:** UI looks professional and responsive across desktop and mobile.

**Do not dispatch:**
- supabase_engineer (No Supabase allowed for this session).
