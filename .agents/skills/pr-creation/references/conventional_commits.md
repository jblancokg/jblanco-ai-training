# Conventional Commits

Conventional Commits is a specification for adding human and machine readable meaning to commit messages.

## Format

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type

The `type` is mandatory and should be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scope (optional)

The `scope` provides additional contextual information. It is optional and is enclosed in parentheses.

### Description

The `description` is a concise, imperative, present tense: subject line that is no longer than 72 characters.

### Body (optional)

The `body` should provide additional contextual information about the code changes. It should be written in the imperative mood and explain the *why* and *how* of the change.

### Footer (optional)

The `footer` is typically used for referencing issues (e.g., `Closes #123`, `Fixes #456`) or breaking change information.

Example:

```
feat(authentication): add OAuth 2.0 support

This commit introduces OAuth 2.0 support for user authentication,
allowing users to log in with their social media accounts.

BREAKING CHANGE: The old authentication API is no longer supported.
Please refer to the updated documentation for migration steps.

Closes #789
```