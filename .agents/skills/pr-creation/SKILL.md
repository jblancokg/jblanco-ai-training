---
name: pr-creation
description: Automates GitHub Pull Request (PR) creation. Analyzes recent commits to generate a conventional-style PR title and a comprehensive PR body, including a summary of changes and a step-by-step testing procedure. Use this skill when creating a new Pull Request.
---

# PR Creation

## Overview

This skill streamlines the process of creating GitHub Pull Requests. It helps you craft a well-structured PR by analyzing recent commits, generating a concise title, and providing a detailed body with a summary of changes and a clear testing procedure.

## Workflow

1.  **Analyze Changes**: The skill will comprehensively examine the changes by comparing the current branch against the `master` branch. Use `git merge-base master HEAD` to find the common ancestor, then run `git diff <ancestor>..HEAD` to understand the actual code modifications. While `git log` provides context, the **code diff is the primary source of truth** for the PR content.
2.  **Generate PR Title**: A concise, conventional-style PR title will be generated. While commit messages provide clues, the title should reflect the **actual functional changes** observed in the diff, adhering to the guidelines in `references/conventional_commits.md`.
3.  **Generate PR Body**: A comprehensive PR body will be constructed, primarily using the code diff to identify all additions, removals, and modifications. This includes:
    *   **Summary of Changes**: A high-level overview of the key changes introduced and the reasons behind them, derived primarily from the code modifications.
    *   **Testing Procedure**: A step-by-step manual verification guide, including expected results, tailored to the specific code paths modified in the diff.
    *   **Relevant Documentation**: Links to any pertinent internal or external documentation.
4.  **Create GitHub PR**: Finally, the generated title and body will be used to execute the `gh pr create` command via the `scripts/create_pr.sh` script, targeting the `master` branch.

## Resources

### scripts/create_pr.sh
This shell script takes the generated PR title and body as arguments and executes the `gh pr create` command to create the pull request on GitHub.

### references/conventional_commits.md
This document provides guidelines and examples for crafting conventional commit messages. These guidelines are used to inform the generation of the PR title and to help summarize changes in the PR body.

### references/testing_procedure_template.md
This template outlines the recommended structure for documenting a testing procedure. It ensures that all pull requests include clear, step-by-step manual verification instructions with expected results.
