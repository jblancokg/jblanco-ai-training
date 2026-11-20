# AI Tool Configuration File Reference

Comprehensive reference for where each AI coding tool stores its configuration files.
Last updated: 2026-03-12

## Claude Code

### Project Instructions
- `CLAUDE.md` (project root) - Main project instructions
- `src/CLAUDE.md` (any subdirectory) - Directory-scoped overrides
- `.claude/rules/` - Path-scoped modular instruction files

### Skills, Agents & Commands
- `.claude/skills/<name>/SKILL.md` - Project skills (Agent Skills standard)
- `~/.claude/skills/<name>/SKILL.md` - User-level skills
- `.claude/agents/<name>.md` - Project sub-agents
- `~/.claude/agents/<name>.md` - User-level sub-agents
- `.claude/commands/<name>.md` - Project custom slash commands (legacy, merged into skills)
- `~/.claude/commands/<name>.md` - User-level commands (legacy)

### Settings & MCP
- `.claude/settings.json` - Project settings (permissions, model, hooks)
- `.claude/settings.local.json` - Personal project settings (not version-controlled)
- `~/.claude/settings.local.json` - User-level global settings
- `.mcp.json` (project root) - Project-scoped MCP server configuration
- `~/.claude/CLAUDE.md` - Global instructions

### Documentation
- Overview: https://docs.anthropic.com/en/docs/claude-code/overview
- Settings: https://docs.anthropic.com/en/docs/claude-code/settings
- Sub-agents & skills: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Skills: https://code.claude.com/docs/en/skills

---

## OpenAI Codex CLI

### Project Instructions
- `AGENTS.md` (project root) - Primary project instructions
- `AGENTS.override.md` (project root) - Override file (takes priority)
- `~/.codex/AGENTS.md` - User-level default instructions
- `~/.codex/AGENTS.override.md` - User-level override instructions

### Skills
- `.agents/skills/<name>/SKILL.md` - Project skills (Agent Skills standard, canonical path)
- `../.agents/skills/` - Parent directory (searched upward)
- `$REPO_ROOT/.agents/skills/` - Repo root
- `~/.agents/skills/` - User-level skills
- `/etc/codex/skills/` - Admin-level skills
- `.codex/skills/` - Legacy project path (still supported)

### Settings & MCP
- `~/.codex/config.toml` - User-level configuration (model, approval mode, MCP servers)
- `.codex/config.toml` - Project-scoped configuration
- `~/.codex/rules/default.rules` - Auto-populated allow-list
- `.codex/rules/` - Project-scoped rules

### Documentation
- AGENTS.md guide: https://developers.openai.com/codex/guides/agents-md/
- Config basics: https://developers.openai.com/codex/config-basic/
- Config reference: https://developers.openai.com/codex/config-reference/
- MCP: https://developers.openai.com/codex/mcp/
- Rules: https://developers.openai.com/codex/rules/
- Skills: https://developers.openai.com/codex/skills/

---

## Google Gemini CLI

### Project Instructions
- `GEMINI.md` (project root) - Project-level instructions
- `GEMINI.md` (any subdirectory) - Directory-scoped instructions
- `~/.gemini/GEMINI.md` - Global default instructions
- Filename configurable via `context.fileName` in settings.json
- Walks up from cwd to `.git` boundary, respects `.geminiignore`

### Commands & Extensions
- `.gemini/commands/<name>.toml` - Project custom commands
- `~/.gemini/commands/<name>.toml` - User-level custom commands
- `~/.gemini/extensions/<name>/gemini-extension.json` - User-level extensions (MCP-based)
- Subdirectory commands use colon namespacing: `commands/git/commit.toml` -> `/git:commit`
- Also supports Agent Skills standard: `.agents/skills/`

### Settings & MCP
- `~/.gemini/settings.json` - Global configuration and MCP servers
- `.gemini/settings.json` - Project-scoped configuration and MCP servers
- `~/.gemini/mcp-oauth-tokens.json` - Stored OAuth tokens
- `.geminiignore` - File/directory ignore patterns

### Documentation
- GEMINI.md: https://google-gemini.github.io/gemini-cli/docs/cli/gemini-md.html
- Configuration: https://google-gemini.github.io/gemini-cli/docs/get-started/configuration.html
- Custom commands: https://google-gemini.github.io/gemini-cli/docs/cli/custom-commands
- Extensions: https://google-gemini.github.io/gemini-cli/docs/extensions/
- MCP servers: https://geminicli.com/docs/tools/mcp-server/
- Skills: https://geminicli.com/docs/cli/skills/

---

## GitHub Copilot

### Project Instructions
- `.github/copilot-instructions.md` - Repository-wide instructions
- `.github/instructions/<name>.instructions.md` - Path-specific instructions (with `applyTo` glob frontmatter)
- `AGENTS.md` (anywhere in repo, nearest wins) - Agent instructions
- Also reads `CLAUDE.md` and `GEMINI.md` when present
- Priority: Personal > Repository > Organization

### Skills & Prompts
- `.github/skills/<name>/SKILL.md` - Project skills (Agent Skills standard)
- `.claude/skills/` - Compatibility path (also searched)
- `~/.copilot/skills/` - User-level skills
- `~/.claude/skills/` - Compatibility path (also searched)
- `.github/prompts/<name>.prompt.md` - Reusable prompt files (VS Code, Visual Studio, JetBrains)

### MCP
- `.vscode/mcp.json` - Workspace-local MCP configuration
- `~/.copilot/mcp-config.json` - Global MCP (path configurable via `COPILOT_HOME` env var)

### Documentation
- Custom instructions: https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- VS Code custom instructions: https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- MCP setup: https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/set-up-the-github-mcp-server
- Coding agent + MCP: https://docs.github.com/copilot/how-tos/agents/copilot-coding-agent/extending-copilot-coding-agent-with-mcp
- Custom agents config: https://docs.github.com/en/copilot/reference/custom-agents-configuration
- Agent Skills: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills

---

## Cursor

### Project Instructions
- `.cursor/rules/<name>.md` or `.mdc` - Project rules with optional YAML frontmatter
- `.cursorrules` - Legacy single-file rules (deprecated, still supported)
- `AGENTS.md` (root or nested) - Also supported
- User Rules via Cursor Settings > Rules
- Team Rules via Cursor dashboard (Team/Enterprise)
- Priority: Team > Project > User > Legacy

### Skills
- `.agents/skills/<name>/SKILL.md` - Project skills (Agent Skills standard, canonical)
- `.cursor/skills/<name>/SKILL.md` - Cursor-specific project path
- `.claude/skills/` - Compatibility path
- `.codex/skills/` - Compatibility path
- `~/.cursor/skills/` - User-level skills
- `~/.claude/skills/` and `~/.codex/skills/` - Compatibility paths

### Rule Application Modes
- Always Apply: loaded every time
- Apply Intelligently: agent decides based on description
- Apply to Specific Files: glob pattern matching
- Apply Manually: `@rule-name` in chat

### MCP
- Configured through Cursor Settings > Tools & Integrations

### Documentation
- Rules: https://cursor.com/docs/context/rules
- Skills: https://cursor.com/docs/context/skills

---

## Agent Skills Open Standard

An open standard (https://agentskills.io) for reusable AI workflows, originally developed by Anthropic.

### Canonical Path
- `.agents/skills/<name>/SKILL.md` (project level)

### File Format
Directory containing `SKILL.md` with YAML frontmatter (`name`, `description` required) + markdown body.
Optional subdirectories: `scripts/`, `references/`, `assets/`

### Supported By
- Claude Code (also `.claude/skills/`)
- Codex CLI (also `.codex/skills/`)
- Gemini CLI
- GitHub Copilot (also `.github/skills/`)
- Cursor (also `.cursor/skills/`)
