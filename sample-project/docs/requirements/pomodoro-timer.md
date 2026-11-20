# Pomodoro Timer

## Overview
The Pomodoro Timer is a productivity widget for the dashboard that helps users manage focused work intervals and breaks. It features standard presets, a visual progress indicator, and a visual cue to signal transition points based on the "Pomodoro Technique".

## Requirements

1. **Timer Presets & Modes**
   - The timer supports three fixed intervals:
     - **Focus**: 25 minutes.
     - **Short Break**: 5 minutes.
     - **Long Break**: 15 minutes.
   - The UI provides three buttons to switch between these modes. The currently active mode is visually highlighted.
   - Switching modes immediately resets the countdown to that mode's full duration.

2. **Playback Controls**
   - **Play/Pause**: Toggle the countdown.
   - **Reset**: Stop the timer and return the countdown to the full duration of the current mode.
   - **Manual Start**: When a session ends, the next session does not start automatically. The user must click a "Play" button to begin the next interval.

3. **Progress Visualization**
   - A standard circular progress ring (SVG) that depletes as time elapses.
   - A digital countdown (MM:SS) is centered within the ring.

4. **Session Completion & Audio Notification**
   - When the timer reaches 00:00, the dashboard triggers a highly visible border flash on the viewport to notify the user the time is up (as oppposed to an audio alert).
   - Upon completion, the widget card displays a "Time's up!" message until the user interacts with the controls.

5. **Auto-Transition Logic**
   - When a **Focus** session successfully reaches 00:00, the UI automatically switches the active mode to **Short Break** (but does not start the timer).

6. **Daily Session Counter**
   - The widget tracks the number of "Focus" sessions completed (reaching 00:00) during the current calendar day.
   - The counter persists in `localStorage` across page refreshes.
   - The counter resets to zero automatically when the user first opens the app on a new calendar day.

## UI/UX

### Dashboard Widget

The dashboard widget will be a card containing the circular progress ring and controls. Three pill-style bottoms at the bottom of the card (representing the Focus, Short Break, and Long Break states) will be used to control the timer. The active button uses a primary background color, while inactive ones use an outline or ghost style. There should also be small counter display in the corner of the card indicating the number of successful focus sessions the user has completed in that day. 

There are three possible UI states for the timer: running, paused, and on completion. While running, the timer should show the countdown and an active progress ring. While paused, the ring and the text should remain static. On completion, the card should display "Time's up!" in place of the mode label, with a prominent Play button centered or below to prompt the next session. 

## Data Model

```typescript
interface Pomodoro {
  sessionsCompletedToday: number;
  lastCompletedDate: string; // ISO date string (YYYY-MM-DD)
}
```

## Edge Cases
- If the user refreshes the page mid-timer, the timer resets to the full duration of the current mode. However, the `sessionsCompletedToday` count is preserved.
- To ensure accuracy when the browser tab is not active, the timer must calculate elapsed time by comparing the "Start Timestamp" against the "Current Timestamp" rather than relying solely on a 1-second interval.
- If the user completes a timer interval over midnight, this timer session should contribute to the next day's session counter.
- If the user refreshes or changes modes in the middle of a focus timer, the focus session is not added to the daily session counter.

## Out of Scope
- Customizing interval durations.
- Updating the browser tab title with the remaining time.
- Historical analytics or "Focus" streaks.
- Integration with the Todo list (e.g., "Assign Pomodoro to Task").
- Audio alert on timer completion.

## Technical Notes
- Feature code will live in `src/features/pomodoro-timer/`.
- The widget component will be imported directly into the dashboard home page.
- Persistence for session counts will use the shared `src/lib/storage.ts` and `src/hooks/use-storage.ts` hook
- shadcn components used: `Card` and `Button`.
- The progress ring will be implemented via SVG `stroke-dasharray` and `stroke-dashoffset`.
- Timer completion will be indicated by a border flash on the viewport with a contrasting color for 15 seconds. 
- Timers will be managed by a single `setInterval` (1000ms) that updates a local state variable derived from a `startTime` ref.
- Use last completed date in the data model to determine whether session counter should be reset. 
