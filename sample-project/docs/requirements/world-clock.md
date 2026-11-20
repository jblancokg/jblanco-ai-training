# World Clock

## Overview

The world clock widget will display the current time for five specific cities on the dashboard. It will update every second and provide visual cues for day versus night in each timezone. This feature exists only as a dashboard widget with no dedicated full-page view.

## Requirements

1. **Display Clocks for Fixed Cities**
   - The widget will show the current time for the following cities and timezones:
     - Toronto (America/Toronto)
     - New York (America/New_York)
     - San Jose, Costa Rica (America/Costa_Rica)
     - London (Europe/London)
     - Gurgaon, India (Asia/Kolkata)
   - Each clock will display the city name, current time (HH:MM:SS, 12-hour format with AM/PM), and the current date.

2. **Live Updates**
   - All clocks will update every second using a single shared interval.
   - The update will be smooth with no visible flicker or layout shift.

3. **Timezone Offset Display**
   - Each clock will show the offset relative to the user's local timezone (e.g., "+5:30" or "-3:00").
   - If a city matches the user's local timezone, it will display "Local" instead of an offset.

4. **Day/Night Indicator**
   - Each clock will display a sun icon if the local time in that city is between 6:00 AM and 5:59 PM.
   - Each clock will display a moon icon if the local time is between 6:00 PM and 5:59 AM.
   - The background or border of each clock card will subtly reflect day (warm tone) or night (cool tone).

5. **Compact Grid Layout**
   - The clocks will render in a grid within the dashboard card.
   - The grid will show 2-3 clocks per row depending on available width.
   - Each individual clock will be compact: city name, time, offset, and icon in a small tile.

## UI/UX

The world clock widget will occupy a single dashboard card. Inside the card, the five clocks will be arranged in a tight grid (e.g., 3 columns on wider cards, 2 columns on narrower ones). Each clock tile will show the city name in a small bold label, the time in a larger font, the date below it in a muted smaller font, and the offset plus day/night icon on the side or corner. The sun/moon icon will be small (16-20px) and use a warm yellow for sun, cool blue for moon.

The overall card will have the same styling as other dashboard cards (consistent with the shell's card design).

## Data Model

No persisted data model. The city list is hardcoded configuration:

```typescript
interface ClockCity {
  name: string;       // Display name, e.g., "Toronto"
  timezone: string;   // IANA timezone, e.g., "America/Toronto"
}

const CITIES: ClockCity[] = [
  { name: "Toronto", timezone: "America/Toronto" },
  { name: "New York", timezone: "America/New_York" },
  { name: "San Jose, CR", timezone: "America/Costa_Rica" },
  { name: "London", timezone: "Europe/London" },
  { name: "Gurgaon", timezone: "Asia/Kolkata" },
];
```

## Edge Cases

- If the browser does not support the `Intl.DateTimeFormat` API with timezone options, the widget will display an error message instead of incorrect times. (All modern browsers support this.)
- Daylight saving time transitions are handled automatically by the `Intl` API using IANA timezone identifiers.
- If the user's system clock is significantly wrong, the displayed times will also be wrong. This is expected and not something the app will attempt to detect or correct.
- The shared interval will be cleaned up on component unmount to prevent memory leaks.

## Out of Scope

- Adding or removing cities from the list.
- User-configurable timezone selection.
- A dedicated full-page view for the world clock.
- Analog clock faces or animated clock hands.
- Displaying weather or sunrise/sunset times.
- 24-hour format toggle.

## Technical Notes

- Feature code will live in `src/features/world-clock/`.
- The widget component will be imported directly into the dashboard home page. There is no route for this feature.
- Time formatting will use the native `Intl.DateTimeFormat` API with the `timeZone` option. No third-party date library is needed.
- The single `setInterval` will run at 1000ms and update a shared timestamp in state; each clock tile will derive its display from that timestamp.
- shadcn components used: `Card` for the widget container.
- Icons (sun/moon) will use `lucide-react`, which ships with shadcn.
