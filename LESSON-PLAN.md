# Lesson Plan

The plan outline for setting up and building out the sample project.

## Project Setup

Provide a brief background of the app and its purpose. Describe which features have already been implemented and which new features we expect the developer to implement. 

Guide developer through installing the GitHub CLI and provide commands to extract the project folder (sample-project) into a local git repo which they can initialize. Provide instructions to get the dashboard running + have them look through the project structure, interact with the existing features, and possibly identify any bugs. Describe the outline of the lesson plan and which parts will be beneficial to strategy vs dev (or both). 

## Warm Up Task 

As a warm up task have the developer fix any of the UI bugs they discovered with the agent (give some hints to where these are located) - this will help the developer get familiar with the code base and the agent they are using. Have the developer note down any quirks in the agent's response (responses are too long/convoluted, agent is not asking enough questions before making changes to code, context window becoming too large, etc.). Restate the prompt engineering basics in this section. 

Have the developer take a look at the `AGENTS.md` file to familiarize themselves with the code base and add any detail they feel is missing (or anything they found themselves repeating when debugging earlier). As the develoepr debugs, have them experiment with the read-only "Ask" mode to ask questions about the codebase: for example _How does the `useStorage` hook work?_ or _What is the layout pattern for existing dashboard cards?_

in this section lets give them 2 prompts to try (reverting in between) so they can compare the output of a fix; this should be before they try to fix their own bug, and something we pick out as a good example of a prompt to show the diff in output.

## Adding a Skill

Create a new skill using the anthropic skill creator `npx skills add https://github.com/anthropics/skills --skill skill-creator` tell them not to install the skill finder skill if prompted.

using this new skill create a skill for requirements writing based on the existing requirements 

## Requirements Gathering

This is a Strategy-focused exercise aimed at exercising some of the info learned in the Requirements Gathering and Requirements Writing chapters. First, have the developers look through existing Requirements pages. Have them use the "Ask" mode to poke holes in the existing requirements (some requirements will intentionally leave critical information out so they will need to use the AI to figure which details are missing): _Identify x edge cases or technical gaps in the Habit Tracker requirements that may cause issues during development._ Essentially AI rubber ducking (give some example prompts). This is a good time to remind the developers to point the AI directly at the files they are discussing when necessary (in this case, the requirements docs). 

Final task here is to have them use one of the existing requirements docs as a golden master to create their own requirements file for a new feature (either one of their choosing or provide an example feature for them to use). Have them flesh out the idea with AI (again, can refer to the "Ask" mode) and when ready, have the AI spin up a requirements doc. Reminders to have the AI ask questions where necessary, poke holes in the logic, ask for additional details, etc.

## Task Breakdowns

Have the developer set up a task breakdown skill that follows the template of existing task breakdowns (description, acceptance criteria, files to create/modify, dependencies) - provide a template for this allow them to change or update anything as they see fit. For each feature, have the AI spin up a task breakdown. Review and edit where necessary and pay special attention to the verification criteria sections.  

## Development

### Task Breakdown to First Commit

Have developers pick one of the task breakdowns they created in the previous section. Have them reference the task breakdown file directly in their prompt (e.g. _implement the feature described in @docs/tasks/habit-tracker-task-1.md_). The task breakdown they already wrote is the prompt. A well-structured task breakdown should produce working code on the first or second try with minimal additional direction.

As a side task, have them download the conventional commits skill from the training guide to use throughout the rest of the exercises. Remind them to start a fresh chat session for each distinct task and commit after every successful prompt cycle.

### Plan Mode Before You Build

Use the Notepad feature for this exercise. It's the most complex unbuilt feature: it has two distinct parts (a volatile dashboard scratchpad and a persistent full-page notes collection), cross-component state (the "Convert to Note" flow bridges the dashboard and the `/notes` page), autosave logic with lifecycle cleanup, and a sidebar + editor layout that's architecturally different from the existing card-based features. This complexity means the AI will need to make real structural decisions that the developer should weigh in on before code gets written.

Have developers reference the notepad task breakdown file and go straight into agent mode, letting the AI start coding. Then revert everything and try the same task again, but this time start in plan mode first. Have the AI explain its approach before writing any code. Review the plan, ask questions, adjust, then switch to agent mode to execute. Compare the two experiences: the plan-first approach should produce cleaner code with fewer iterations. This is where people stop treating AI like autocomplete and start treating it like a collaborator.

**Note for the author:** Before writing this section, actually run the notepad prompt yourself in agent mode and see what the AI produces. Look at the structural decisions it made (shared vs. separate storage, autosave approach, scratchpad-to-note flow) and note where it went wrong or made choices you'd push back on. Use those real examples in the lesson to show what plan mode would have caught. If the AI actually does fine without a plan, pick a different prompt or add constraints that force more ambiguity.

### The Git Safety Net

Design an exercise where the AI goes down a bad path due to an intentionally ambiguous prompt. Instead of trying to fix it with follow-up prompts (which people instinctively do), have them `git stash` or `git checkout .`, rephrase the prompt, and try again in a fresh chat. Time both approaches if possible. The throw-it-away-and-retry path is almost always faster, but most people don't believe it until they experience it. Reinforce that AI-generated code is cheap to produce; don't get attached to a bad thread.

### Convention Enforcement

Have developers implement a feature by pointing the AI at an already-completed feature as a golden master (e.g. _follow the same patterns used in @src/components/ExistingFeature.tsx_). Then have them try implementing a similar feature without that reference. The difference in consistency (naming, file structure, patterns) should be obvious. This reinforces the golden master concept from earlier chapters and shows that a single file reference in a prompt can save significant review and rework time.

### Code Review: Catching What the AI Missed

Two parts:

1. **Intentionally insecure prompt:** Give developers a prompt that will produce something with a security issue (e.g. a form that doesn't sanitize input, or an API call that exposes credentials in the URL). Have them review the diff using `git diff` or their IDE's diff view and identify the problem. This makes the "you own this code" lesson tangible.

2. **Reading the diff as your primary job:** After completing a feature, have them review every line of the diff before committing. Plant a subtle issue in the task breakdown (a missing edge case, an unclear requirement) that will cause the AI to make a questionable choice they need to catch. Emphasize that development with AI shifts time from writing code to reviewing code, and that reviewing is where the developer's judgment matters most.

### Validation Against Acceptance Criteria

After completing a feature, have developers reference the original task breakdown file and ask the AI to verify each acceptance criterion (e.g. _review the code changes against the acceptance criteria in @docs/tasks/habit-tracker-task-1.md and tell me if anything is missing_). Also have the AI run type/lint checks. This closes the loop on the full cycle: requirements -> tasks -> code -> validation, all AI-assisted but human-directed.

### Building a Conventional Commits Skill

If they haven't already, have developers build a conventional commits skill using the skill creator. They should use this for all commits going forward. This is a quick exercise that reinforces the skill-building workflow from earlier.

### PR Creation with GitHub CLI

Have developers build two skills during this exercise:

1. **Conventional commits skill** (if not already created above)
2. **PR creation skill** that uses the `gh` CLI to create pull requests with AI-generated descriptions

The PR skill should generate a PR title, summary of changes, and a testing procedure section. The testing procedure is the key focus: it should list specific manual testing steps someone can follow to verify the feature works.

Once the PR is created, have the developer go into GitHub in their browser to review:
- The code diff (not just locally, but in the GitHub UI)
- The testing procedure (would someone unfamiliar with the feature be able to follow these steps?)
- The overall PR description (does it accurately describe what changed and why?)

This exercise brings together multiple concepts: skills, CLI tools, git workflow, and the idea that AI can handle the formatting and structure of a PR while the developer focuses on verifying accuracy and completeness.

### Ownership and Review (Ongoing)

This should run throughout the development exercises, not as a separate step. Emphasize that developers should be reviewing AI diffs and asking questions as they go. Before pushing any changes, they should have the AI create manual testing plans for the new feature and personally verify that these pass. They own the code regardless of who (or what) wrote it.

## Documentation

As a final exercise, have devs generate documentation for this project. This can be ongoing throughout development however the docs should highlight technical choices or tradeoffs they made (with AI) during implementation. The AI can generate the "what" but devs should be performing reviews and adding context/reasoning (the "why"). As final documentation, devs should update the `AGENTS.md` file if they've added any libraries or patterns the AI sessions should know about. 