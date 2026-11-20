# Testing Procedure Template

This template outlines a standard testing procedure. When creating a PR, ensure you provide clear, step-by-step instructions for manual verification, including expected results.

## Manual Verification Steps

1.  **Prerequisites**: List any setup steps required before testing (e.g., "Ensure you have a user account with admin privileges").
2.  **Step 1**: Describe the first action to take.
    *   **Expected Result**: What should happen after Step 1?
3.  **Step 2**: Describe the next action.
    *   **Expected Result**: What should happen after Step 2?
4.  ...and so on for all relevant steps.

## Expected Results

Be specific about what constitutes a successful test. Include screenshots or links to expected UI if applicable.

## Relevant Documentation

Link to any internal or external documentation that might be helpful for understanding the feature or testing process.

Example:

```
## Manual Verification Steps

1.  Log in as a standard user.
    *   **Expected Result**: The dashboard should load without errors, and the new "Feature X" button should be visible in the navigation bar.
2.  Click on the "Feature X" button.
    *   **Expected Result**: A new page titled "Feature X Management" should appear, displaying a table with existing data.
3.  Attempt to create a new entry by clicking "Add New" and filling out the form with valid data.
    *   **Expected Result**: The new entry should be successfully added to the table and a success notification should appear.

## Expected Results

-   Successful navigation to "Feature X Management" page.
-   Ability to create, read, update, and delete entries without errors.
-   All data displayed correctly according to specifications.

## Relevant Documentation

-   [Feature X Design Document](https://example.com/feature-x-design-doc)
-   [API Endpoints for Feature X](https://example.com/api-docs#feature-x)
```