# Daily Habit Tracker

## Overview
The Daily Habit Tracker is a dashboard widget that helps users track a single habit. It provides a weekly view and a streak counter to encourage consistency.

## Requirements

1. **Habit Title**
   - The user can define a habit name.
   - The name should be editable directly on the widget.
   - Show a placeholder if no name is set.

2. **Weekly View**
   - Display 7 days of the week.
   - Highlight the current day.

3. **Completion Logic**
   - Users can toggle days as completed.
   - Completed days should look different from incomplete ones.

4. **Weekly Reset**
   - The tracker should reset for the new week.
   - The streak should not be lost during the reset.

5. **Streak Tracking**
   - Show the current streak of consecutive completed days.
   - The streak should be visible on the widget.

6. **Storage**
   - Habit data should be saved locally.

## UI/UX
The habit tracker is a card in the dashboard. The title is at the top, followed by the 7 days. The streak count is shown at the bottom. It should use smooth transitions for interactions.

## Data Model
The system needs to track the habit name, the completion status of the current week's days, and the current streak.

## Edge Cases
- Handling missed days.
- Switching between weeks.

## Out of Scope
- Multiple habits.
- Historical data beyond the current week.
- Notifications.

## Technical Notes
- Implement as a React component.
- Use local storage for data.
- Integrate with the existing dashboard layout.
