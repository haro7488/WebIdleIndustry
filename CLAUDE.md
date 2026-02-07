# CLAUDE.md — WebIdleIndustry

This file provides guidance for AI assistants (and developers) working in this repository.

## Project Overview

**WebIdleIndustry** is a web-based idle/incremental game with an industrial theme. The repository is currently in its initial bootstrapping phase — no application code has been committed yet.

### Current State

- **Status**: Empty repository — no source code, dependencies, or configuration files exist yet.
- **Branch**: Development is happening on feature branches prefixed with `claude/`.
- **Remote**: Hosted at `haro7488/WebIdleIndustry`.

## Repository Structure

```
WebIdleIndustry/
├── CLAUDE.md          # This file — project guidance for AI assistants
└── .git/              # Git repository metadata
```

> **Note**: This section should be updated as the project grows. Add entries for `src/`, `public/`, config files, and other directories as they are created.

## Development Workflow

### Git Conventions

- **Branch naming**: Feature branches use the pattern `claude/<description>-<session-id>`.
- **Commit messages**: Use clear, descriptive messages summarizing the "why" of changes.
- **Push**: Always use `git push -u origin <branch-name>`.
- **No force pushes** to `main`/`master`.

### Getting Started (once project is bootstrapped)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

> **Note**: Update these commands once the actual build tooling is configured.

## Architecture Guidelines

The following conventions should be adopted as the project is built out:

### Recommended Tech Stack (for a web idle game)

- **Language**: TypeScript
- **Build tool**: Vite
- **UI framework**: Choose one — React, Vue, Svelte, or vanilla DOM
- **State management**: Centralized game state (e.g., Zustand, Redux, or a custom store)
- **Testing**: Vitest for unit tests

### Code Organization (suggested)

```
src/
├── core/              # Core game loop, tick engine, save/load
├── systems/           # Game systems (production, upgrades, prestige, etc.)
├── ui/                # UI components and rendering
├── data/              # Static game data (buildings, upgrades, costs)
├── utils/             # Shared utility functions
├── types/             # TypeScript type definitions
└── main.ts            # Entry point
```

### Key Idle Game Systems to Implement

1. **Game loop / tick engine** — Drives resource production over time
2. **Resource system** — Tracks currencies, materials, and rates
3. **Building/producer system** — Purchasable units that generate resources
4. **Upgrade system** — Multipliers and unlocks
5. **Prestige / reset layers** — Long-term progression mechanics
6. **Offline progress** — Calculate gains while the player is away
7. **Save/load** — Persist game state to localStorage or IndexedDB

## Conventions for AI Assistants

### Do

- Read existing code before making changes.
- Keep changes focused — only modify what is requested.
- Use TypeScript with strict type checking.
- Write pure functions for game logic where possible (easier to test).
- Separate game logic from UI rendering.
- Use descriptive variable and function names.
- Add tests for core game math and systems.

### Don't

- Don't over-engineer — idle games benefit from simplicity.
- Don't add frameworks or libraries without a clear need.
- Don't create unnecessary abstraction layers.
- Don't commit secrets, credentials, or `.env` files.
- Don't modify unrelated code when fixing bugs or adding features.

### Big Number Handling

Idle games often deal with very large numbers. Consider using a big number library (e.g., `break_infinity.js` or `decimal.js`) from the start to avoid refactoring later.

### Save System

- Serialize game state to JSON.
- Store in `localStorage` with a versioned schema.
- Include migration logic for save format changes.
- Encode saves (e.g., base64) to prevent casual tampering.

## Testing

> **Note**: Update this section once a test runner is configured.

- Unit test core game math (resource calculations, cost formulas, prestige formulas).
- Test save/load round-tripping.
- Test offline progress calculations.

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run test suite |
| `npm run lint` | Lint code |

> **Note**: These are placeholders. Update once `package.json` is created.

## Updating This File

Keep this file current as the project evolves:

- Add new directories and key files to the repository structure section.
- Document actual commands once the build system is set up.
- Record architectural decisions and patterns as they are established.
- Remove placeholder notes and replace with real information.
