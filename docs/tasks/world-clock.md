# World Clock Feature

A dashboard widget showing live clocks for five cities across different time zones.

---

## Task 1: Define ClockZone Type and Zone Configuration

**Description**

Create the TypeScript type for a clock zone entry and define the list of five cities the widget will display. Each zone needs a display name, IANA timezone identifier, and an optional short label.

**Acceptance Criteria**

- [ ] `ClockZone` type at `src/features/world-clock/types.ts` includes: `id` (string), `label` (string), `timezone` (string, IANA format), `shortLabel` (string, optional)
- [ ] Zone configuration at `src/features/world-clock/zones.ts` exports a `ZONES` array with entries for:
  - Toronto (`America/Toronto`)
  - New York (`America/New_York`)
  - San Jose, Costa Rica (`America/Costa_Rica`)
  - London (`Europe/London`)
  - Gurgaon (`Asia/Kolkata`)
- [ ] Each entry has a human-readable label and a short label (e.g., "TOR", "NYC", "SJO", "LDN", "GGN")

**Files to Create or Modify**

- `src/features/world-clock/types.ts`
- `src/features/world-clock/zones.ts`

**Dependencies**

None.

**Estimated Scope:** Small (1hr)

---

## Task 2: Build WorldClockCard Component

**Description**

Create the world clock dashboard widget that displays a live-updating clock for each of the five configured zones. Each clock updates every second using `setInterval`. The component shows the current time, the UTC offset relative to the user's local time, and a sun or moon icon indicating whether it is daytime or nighttime in that zone.

**Acceptance Criteria**

- [ ] `WorldClockCard` component at `src/features/world-clock/WorldClockCard.tsx`
- [ ] Displays all five zones from the `ZONES` configuration
- [ ] Each zone shows: city label, current time (HH:MM:SS format), current date (if different from local date), UTC offset relative to local time (e.g., "+5.5h" or "-3h")
- [ ] Times update every second via `setInterval`, cleaned up properly in `useEffect` cleanup
- [ ] Day/night detection based on the hour in that timezone: daytime between 6:00 and 18:00, nighttime otherwise
- [ ] Sun icon displayed for daytime zones, moon icon for nighttime zones
- [ ] Uses `Intl.DateTimeFormat` with the `timeZone` option for timezone conversion (no external date libraries)
- [ ] Compact grid layout: 2 or 3 columns on larger screens, single column on mobile
- [ ] Uses shadcn Card component for consistent styling with other dashboard widgets
- [ ] Integrated into the dashboard home page, replacing the World Clock placeholder card

**Files to Create or Modify**

- `src/features/world-clock/WorldClockCard.tsx`
- `src/routes/index.tsx` (replace placeholder card with WorldClockCard)

**Dependencies**

- Task 1 (types and zone config)
- Dashboard Shell Task 5 (home page with grid)

**Estimated Scope:** Medium (2hr)
